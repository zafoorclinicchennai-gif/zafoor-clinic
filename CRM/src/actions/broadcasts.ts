"use server"

// WhatsApp Broadcasts (bulk campaigns) — kept as a separate data model from
// the one-to-one Message log in actions/crm.ts. Sending is a deliberate stub:
// no WhatsApp Business API credentials (Meta Cloud API / AiSensy / Interakt /
// WATI, etc.) are configured anywhere in this repo or environment, so
// publishCampaign() below never contacts a real provider — it marks every
// recipient FAILED with a clear reason instead of faking a successful send.
// See ClinicSettings.whatsappConfigured / whatsappProvider for the connection
// stub shown in Step 1 of the wizard.

import { safeRevalidatePath as revalidatePath } from "@/lib/revalidate"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"
import { logAudit } from "@/lib/audit"
import { toPlain } from "@/lib/serialize"
import { z } from "zod"

const DEFAULT_TEMPLATES = [
  {
    name: "Appointment Reminder",
    body: "Hi {{patientName}}, this is a reminder for your appointment with {{doctorName}} at {{time}} on {{date}} at Zafoor Clinic.",
    quickReplyButtons: ["Confirm Appointment", "Reschedule"],
  },
  {
    name: "Review Follow-up",
    body: "Hi {{patientName}}, it's time for your review with {{doctorName}}. Please book a slot at your convenience.",
    quickReplyButtons: ["Book Now"],
  },
  {
    name: "General Announcement",
    body: "Hi {{patientName}}, {{clinicName}} has an update for you. Please reach out if you have questions.",
    quickReplyButtons: [],
  },
]

export async function getWhatsappConnectionStatus() {
  const settings = await prisma.clinicSettings.findUnique({ where: { id: "clinic" } })
  return {
    configured: settings?.whatsappConfigured ?? false,
    provider: settings?.whatsappProvider ?? null,
  }
}

export async function getMessageTemplates() {
  let templates = await prisma.messageTemplate.findMany({ orderBy: { createdAt: "asc" } })
  if (templates.length === 0) {
    // Seed a starter set of pre-approved templates on first use so Step 3 of
    // the wizard has something to preview against.
    for (const t of DEFAULT_TEMPLATES) {
      await prisma.messageTemplate.create({ data: { ...t, approved: true } })
    }
    templates = await prisma.messageTemplate.findMany({ orderBy: { createdAt: "asc" } })
  }
  return toPlain(templates)
}

const audienceSchema = z.object({
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
  tagIds: z.array(z.string()).optional(),
})
export type AudienceInput = z.infer<typeof audienceSchema>

async function resolveAudience(input: AudienceInput) {
  const data = audienceSchema.parse(input)
  const where: Record<string, unknown> = {}
  if (data.status) where.status = data.status
  if (data.tagIds && data.tagIds.length > 0) where.tags = { some: { tagId: { in: data.tagIds } } }
  return prisma.patient.findMany({ where, select: { id: true, firstName: true, lastName: true, phone: true } })
}

export async function getAudienceCount(input: AudienceInput) {
  const patients = await resolveAudience(input)
  return patients.length
}

const createCampaignSchema = z.object({
  name: z.string().trim().min(1, "Campaign name is required"),
  templateId: z.string().trim().min(1, "Select a template"),
  audience: audienceSchema,
})
export type CreateCampaignInput = z.infer<typeof createCampaignSchema>

export async function createCampaign(input: CreateCampaignInput) {
  const data = createCampaignSchema.parse(input)
  const user = await getCurrentUser()
  const patients = await resolveAudience(data.audience)

  // Recipients are captured now, at the resolved audience snapshot, so
  // publishCampaign later acts on exactly who was targeted at creation time
  // rather than re-resolving the filter (which could drift as patient data
  // changes between creating and publishing a campaign).
  const campaign = await prisma.campaign.create({
    data: {
      name: data.name,
      templateId: data.templateId,
      audienceCount: patients.length,
      status: "DRAFT",
      createdById: user.id,
      recipients: {
        create: patients.map((p) => ({ patientId: p.id, status: "PENDING" as const })),
      },
    },
  })

  await logAudit({
    action: "CAMPAIGN_CREATED",
    entityType: "Campaign",
    entityId: campaign.id,
    metadata: { name: data.name, audienceCount: patients.length },
    userId: user.id,
    userName: user.name,
    userRole: user.role,
  })

  revalidatePath("/communications/broadcasts")
  return toPlain(campaign)
}

/**
 * Queues the send and logs delivered/failed status per contact — per the
 * confirmed stub state, this NEVER contacts a real WhatsApp API. Every
 * recipient is recorded FAILED with an explicit "not configured" reason so
 * the UI never shows a fake successful delivery.
 */
export async function publishCampaign(campaignId: string) {
  const user = await getCurrentUser()
  const campaign = await prisma.campaign.findUniqueOrThrow({ where: { id: campaignId }, include: { recipients: true } })
  const connection = await getWhatsappConnectionStatus()

  const failReason = connection.configured
    ? "Send failed — provider did not accept the message"
    : "WhatsApp Business API not configured. Add credentials in Settings before publishing."

  await prisma.$transaction(async (tx) => {
    for (const recipient of campaign.recipients) {
      await tx.campaignRecipient.update({
        where: { id: recipient.id },
        data: { status: "FAILED", failReason, sentAt: new Date() },
      })
    }
    await tx.campaign.update({
      where: { id: campaignId },
      data: { status: "FAILED", sentAt: new Date() },
    })
  })

  await logAudit({
    action: "CAMPAIGN_PUBLISHED",
    entityType: "Campaign",
    entityId: campaignId,
    metadata: { recipientCount: campaign.recipients.length, reason: failReason },
    userId: user.id,
    userName: user.name,
    userRole: user.role,
  })

  revalidatePath("/communications/broadcasts")
}

export async function getCampaigns() {
  const campaigns = await prisma.campaign.findMany({
    include: {
      template: true,
      createdBy: true,
      recipients: true,
    },
    orderBy: { createdAt: "desc" },
  })
  return toPlain(campaigns)
}
