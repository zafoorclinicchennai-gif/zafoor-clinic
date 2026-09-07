"use client"

import { useEffect, useMemo, useState, useTransition } from "react"
import { toast } from "sonner"
import { AlertTriangle, CheckCircle2, MessageCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { patientStatusLabels } from "@/lib/labels"
import { getAudienceCount, createCampaign, publishCampaign, type AudienceInput } from "@/actions/broadcasts"

type Template = { id: string; name: string; body: string; quickReplyButtons: string[] }
type Tag = { id: string; name: string; color: string }
type Connection = { configured: boolean; provider: string | null }

const SAMPLE_VARS = { patientName: "Zainab", date: "24 Aug 2026", time: "5:30 PM", doctorName: "Dr. Mufeeda Roohi" }

function fillTemplate(body: string) {
  return body.replace(/{{\s*(\w+)\s*}}/g, (_m, key: string) => (SAMPLE_VARS as Record<string, string>)[key] ?? `{{${key}}}`)
}

export function BroadcastWizard({
  templates,
  tags,
  connection,
}: {
  templates: Template[]
  tags: Tag[]
  connection: Connection
}) {
  const [step, setStep] = useState(1)
  const [campaignName, setCampaignName] = useState("")
  const [status, setStatus] = useState<string>("ACTIVE")
  const [tagIds, setTagIds] = useState<string[]>([])
  const [audienceCount, setAudienceCount] = useState<number | null>(null)
  const [templateId, setTemplateId] = useState(templates[0]?.id ?? "")
  const [pending, startTransition] = useTransition()

  const audience: AudienceInput = useMemo(
    () => ({ status: status === "ALL" ? undefined : (status as "ACTIVE" | "INACTIVE"), tagIds: tagIds.length > 0 ? tagIds : undefined }),
    [status, tagIds]
  )

  useEffect(() => {
    getAudienceCount(audience).then(setAudienceCount)
  }, [audience])

  const selectedTemplate = templates.find((t) => t.id === templateId)

  function toggleTag(id: string) {
    setTagIds((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]))
  }

  function handlePublish() {
    if (!campaignName.trim()) {
      toast.error("Give the campaign a name")
      return
    }
    if (!templateId) {
      toast.error("Choose a template")
      return
    }
    startTransition(async () => {
      try {
        const campaign = await createCampaign({ name: campaignName, templateId, audience })
        await publishCampaign(campaign.id)
        toast.warning("Campaign queued — WhatsApp Business API isn't connected yet, so delivery could not happen. See campaign history below.")
        setCampaignName("")
        setStep(1)
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Could not publish campaign")
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">New Broadcast Campaign</CardTitle>
        <p className="text-sm text-muted-foreground">Step {step} of 3</p>
      </CardHeader>
      <CardContent className="space-y-5">
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="campaign-name">Campaign name</Label>
              <Input id="campaign-name" value={campaignName} onChange={(e) => setCampaignName(e.target.value)} placeholder="e.g. Aug Review Reminders" />
            </div>
            <div className={`flex items-start gap-2.5 rounded-lg border p-3 text-sm ${connection.configured ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900" : "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900"}`}>
              {connection.configured ? (
                <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-emerald-600" />
              ) : (
                <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0 text-amber-600" />
              )}
              <div>
                <p className="font-medium">
                  {connection.configured ? `Connected — ${connection.provider}` : "WhatsApp Business API not connected"}
                </p>
                <p className="text-muted-foreground text-xs mt-0.5">
                  {connection.configured
                    ? "Campaigns will send through the connected provider."
                    : "This clinic has no WhatsApp Business API credentials configured (Meta Cloud API, AiSensy, Interakt, WATI, etc.). You can build and queue a campaign, but publishing will log every recipient as failed until credentials are added in Settings."}
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setStep(2)} disabled={!campaignName.trim()}>Next: Target Customers</Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Patient status</Label>
              <Select items={{ ALL: "All patients", ...patientStatusLabels }} value={status} onValueChange={(v) => setStatus(v ?? "ALL")}>
                <SelectTrigger className="w-full sm:w-56"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All patients</SelectItem>
                  {Object.entries(patientStatusLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Filter by tags (optional)</Label>
              {tags.length === 0 ? (
                <p className="text-sm text-muted-foreground">No patient tags defined yet.</p>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {tags.map((tag) => (
                    <label key={tag.id} className="flex items-center gap-1.5 text-sm">
                      <Checkbox checked={tagIds.includes(tag.id)} onCheckedChange={() => toggleTag(tag.id)} />
                      {tag.name}
                    </label>
                  ))}
                </div>
              )}
            </div>
            <div className="rounded-lg bg-muted p-3 text-sm">
              <span className="font-semibold">{audienceCount ?? "…"}</span> contact{audienceCount === 1 ? "" : "s"} match this selection.
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button onClick={() => setStep(3)}>Next: Template</Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Template</Label>
              <Select items={Object.fromEntries(templates.map((t) => [t.id, t.name]))} value={templateId} onValueChange={(v) => setTemplateId(v ?? "")}>
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {templates.map((t) => (
                    <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedTemplate && (
              <div className="flex justify-center py-4 bg-muted/30 rounded-lg">
                <div className="max-w-xs w-full rounded-2xl rounded-tl-sm bg-[#dcf8c6] dark:bg-emerald-900/60 p-3 text-sm shadow-sm">
                  <p className="flex items-center gap-1 text-xs font-semibold text-emerald-800 dark:text-emerald-300 mb-1">
                    <MessageCircle className="h-3.5 w-3.5" /> Zafoor Clinic
                  </p>
                  <p className="whitespace-pre-wrap text-foreground">{fillTemplate(selectedTemplate.body)}</p>
                  {selectedTemplate.quickReplyButtons.length > 0 && (
                    <div className="mt-2 space-y-1.5 border-t border-emerald-700/20 pt-2">
                      {selectedTemplate.quickReplyButtons.map((btn) => (
                        <div key={btn} className="rounded-md border border-emerald-700/30 bg-white/60 dark:bg-black/20 text-center text-xs font-medium text-emerald-800 dark:text-emerald-300 py-1.5">
                          {btn}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
            <p className="text-xs text-muted-foreground">Preview uses sample values ({SAMPLE_VARS.patientName}, {SAMPLE_VARS.date}) — real sends fill each patient's own details.</p>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
              <Button onClick={handlePublish} disabled={pending}>
                {pending ? "Publishing…" : "Publish Campaign"}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
