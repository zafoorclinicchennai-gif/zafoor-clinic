// Zafoor Clinic — real patient seed, digitized from 6 physical prescriptions
// handed to us by Dr. Mufeeda Roohi. NOTE: only 5 numbered patients were
// actually listed in the brief (Zainab, Tamil, Yousuf, "B.L", Mohamed
// Faizoon) despite the "6 physical prescriptions" framing — this script
// seeds exactly the 5 that were transcribed and does not invent a 6th.
//
// Idempotent (safe to re-run): patients are upserted by a synthetic natural
// key (name + dob), inventory items by name (case-insensitive, matching the
// same lookup dispensePrescriptionItems already uses), and IDs are
// generated through the same Counter-table sequence the running app uses
// (see src/lib/sequence.ts) — just called through the direct Postgres
// connection this script already has open, since that table is a normal
// Postgres table and isn't Supabase-specific.
//
// Run with: npx tsx prisma/seed-real-patients.ts  (or `npm run db:seed:real`)
import "dotenv/config"
import { PrismaClient } from "../src/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

const PLACEHOLDER_PRICE_FLAG = "[PLACEHOLDER PRICE — confirm with founder, not a real price]"
const NO_PHONE_ON_CHART_NOTE =
  "Seeded from a physical paper prescription. No phone number was on the original chart — placeholder used; please confirm and update contact details."

async function nextValue(key: string) {
  const existing = await prisma.counter.findUnique({ where: { key } })
  const nextVal = (existing?.value ?? 0) + 1
  await prisma.counter.upsert({
    where: { key },
    create: { key, value: nextVal },
    update: { value: nextVal },
  })
  return nextVal
}

async function generateUHID() {
  const year = new Date().getFullYear()
  const value = await nextValue(`UHID-${year}`)
  return `ZC-${year}-${String(value).padStart(6, "0")}`
}
async function generatePrescriptionNumber() {
  const year = new Date().getFullYear()
  const value = await nextValue(`PRESCRIPTION-${year}`)
  return `RX-${year}-${String(value).padStart(6, "0")}`
}
async function generateBillNumber() {
  const year = new Date().getFullYear()
  const value = await nextValue(`BILL-${year}`)
  return `INV-${year}-${String(value).padStart(6, "0")}`
}

// ── Medicine catalog inferred from the 5 charts ────────────────────────
// category/unit are best-effort guesses from the "T." / "Syrup" / topical
// prefixes on each chart; currentStock is left at 0 (no real count is
// known) and unitPrice is left null — both flagged in `description`.
type MedicineDef = { name: string; category: string; unit: string }
const MEDICINES: MedicineDef[] = [
  { name: "Cuticlean Brightening Face Wash", category: "Topical / Cream", unit: "Tube" },
  { name: "Skin Lightening Moisturizer", category: "Topical / Cream", unit: "Tube" },
  { name: "Follihair New", category: "Tablet", unit: "Strip" },
  { name: "Wishcare Hairfall Shampoo (Multipeptide)", category: "Topical / Cream", unit: "Bottle" },
  { name: "Advanced Hair Serum (Man Matters)", category: "Topical / Cream", unit: "Bottle" },
  { name: "Keraglo-AD Shampoo", category: "Topical / Cream", unit: "Bottle" },
  { name: "Floxip 500 (Ciprofloxacin)", category: "Tablet", unit: "Strip" },
  { name: "Rantac 150", category: "Tablet", unit: "Strip" },
  { name: "Paracip 500", category: "Tablet", unit: "Strip" },
  { name: "Neorephe", category: "Syrup", unit: "Bottle" },
  { name: "Rantac Forte", category: "Syrup", unit: "Bottle" },
  { name: "Azithral 200", category: "Syrup", unit: "Bottle" },
  { name: "Montek LC Kid", category: "Syrup", unit: "Bottle" },
  { name: "Ascoril LS Junior", category: "Syrup", unit: "Bottle" },
  { name: "Kidpred", category: "Syrup", unit: "Bottle" },
  { name: "Junior Banzd 15mg", category: "Tablet", unit: "Strip" },
  { name: "Coscin 240", category: "Syrup", unit: "Bottle" },
]

function slugify(name: string) {
  return name
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 24)
}

async function ensureMedicine(name: string) {
  const existing = await prisma.inventoryItem.findFirst({
    where: { name: { equals: name, mode: "insensitive" } },
  })
  if (existing) return existing

  const def = MEDICINES.find((m) => m.name.toLowerCase() === name.toLowerCase())
  const created = await prisma.inventoryItem.create({
    data: {
      name,
      category: def?.category ?? "Other",
      sku: `SEED-${slugify(name)}`,
      unit: def?.unit ?? "Unit",
      description: `${PLACEHOLDER_PRICE_FLAG} Auto-created from digitized paper prescription seed data.`,
      currentStock: 0,
      referenceStock: 20,
      lowStockThresholdPercent: 20,
      lowStockThresholdQty: 4,
      unitPrice: null,
      active: true,
    },
  })
  return created
}

type RxItem = { medicineName: string; dosage?: string; frequency?: string; duration?: string; instructions?: string }

type ChartInput = {
  firstName: string
  lastName?: string
  gender: "MALE" | "FEMALE"
  dob: Date
  weight: string
  visitDate: Date
  diagnosis?: string
  items: RxItem[]
  advice?: string
  reviewAfter?: string
  flagNote?: string
}

function yearsAgo(years: number, from = new Date("2026-08-25")) {
  const d = new Date(from)
  d.setFullYear(d.getFullYear() - years)
  return d
}
function yearsMonthsAgo(years: number, months: number, from = new Date("2026-08-25")) {
  const d = new Date(from)
  d.setFullYear(d.getFullYear() - years)
  d.setMonth(d.getMonth() - months)
  return d
}

const CHARTS: ChartInput[] = [
  {
    firstName: "Zainab",
    gender: "FEMALE",
    dob: yearsAgo(40),
    weight: "65kg",
    visitDate: new Date("2026-08-24"),
    diagnosis: "Skin (face) - pigmentation",
    items: [
      { medicineName: "Cuticlean Brightening Face Wash", instructions: "As advised" },
      { medicineName: "Skin Lightening Moisturizer", instructions: "As advised" },
    ],
    advice:
      "Cuticlean Brightening face wash, Skin lightening moisturizer, Hydrafacial + Microfacial (medium), Medifacial - 1st sitting.",
  },
  {
    firstName: "Tamil",
    gender: "MALE",
    dob: yearsAgo(23),
    weight: "67kg",
    visitDate: new Date("2026-08-22"),
    items: [
      { medicineName: "Follihair New", dosage: "Tablet", frequency: "Continuous", duration: "6 months", instructions: "A/F (After Food)" },
      {
        medicineName: "Wishcare Hairfall Shampoo (Multipeptide)",
        frequency: "3x/week",
        duration: "6 months",
        instructions: "Apply, massage, wait 10 min, then wash with shampoo",
      },
      { medicineName: "Advanced Hair Serum (Man Matters)", dosage: "1ml-0-1ml", duration: "6 months" },
      { medicineName: "Keraglo-AD Shampoo", frequency: "1x/week for 8 weeks", duration: "6 months" },
    ],
    advice: "Tests to do: CBC, Vitamin D, FT3/FT4/TSH, Serum Ferritin, Vitamin B12.",
    reviewAfter: "Review with reports",
  },
  {
    firstName: "Yousuf",
    gender: "MALE",
    dob: yearsAgo(13),
    weight: "",
    visitDate: new Date("2026-08-08"),
    items: [
      { medicineName: "Floxip 500 (Ciprofloxacin)", dosage: "Tablet", frequency: "1-0-1", duration: "14 days", instructions: "A/F (After Food)" },
      { medicineName: "Rantac 150", dosage: "Tablet", frequency: "1-0-1", duration: "14 days", instructions: "1/2 hr B/F (Before Food)" },
      { medicineName: "Paracip 500", dosage: "Tablet", frequency: "1-0-1", instructions: "SOS" },
    ],
    reviewAfter: "2 weeks — with CBC, Widal test report",
  },
  {
    firstName: "B.L",
    gender: "MALE",
    dob: yearsMonthsAgo(1, 3),
    weight: "11.5kg",
    visitDate: new Date("2026-08-24"),
    items: [
      {
        medicineName: "Neorephe",
        dosage: "5ml-0-5ml x5 days, then 5ml-0-0 x1 month",
        instructions: "A/F (After Food)",
      },
      { medicineName: "Rantac Forte", dosage: "5ml-0-0", duration: "5 days", instructions: "1/2 hr B/F (Before Food)" },
    ],
    reviewAfter: "5 days",
    flagNote:
      "Name abbreviated on the original paper chart as \"B.L\" — please confirm the patient's full name with the founder before this record is shown to patients.",
  },
  {
    firstName: "Mohamed",
    lastName: "Faizoon",
    gender: "MALE",
    dob: yearsMonthsAgo(5, 4),
    weight: "14kg",
    visitDate: new Date("2026-08-15"),
    items: [
      { medicineName: "Azithral 200", dosage: "3ml-0-0", duration: "5 days", instructions: "A/F (After Food)" },
      { medicineName: "Montek LC Kid", dosage: "5ml-0-5ml", duration: "5 days", instructions: "A/F (After Food)" },
      { medicineName: "Ascoril LS Junior", dosage: "5ml-5ml-5ml", duration: "5 days", instructions: "A/F (After Food)" },
      { medicineName: "Kidpred", dosage: "5ml-0-0", duration: "5 days", instructions: "A/F (After Food)" },
      { medicineName: "Junior Banzd 15mg", dosage: "Tablet", frequency: "1-0-1", duration: "5 days", instructions: "1/2 hr B/F (Before Food)" },
      {
        medicineName: "Coscin 240",
        dosage: "4ml-4ml-4ml",
        duration: "5 days",
        instructions: "A/F (After Food); 6th hourly SOS if diarrhea/symptoms increase",
      },
    ],
    reviewAfter: "Review",
  },
]

async function main() {
  console.log("Seeding real patient data from digitized prescriptions…")

  const doctor = await prisma.user.findUnique({ where: { email: "doctor@zafoorclinic.com" } })
  if (!doctor) {
    throw new Error(
      "Doctor user (doctor@zafoorclinic.com / Dr. Mufeeda Roohi) not found — run `npm run db:seed` first."
    )
  }

  const summary: Array<{
    name: string
    uhid: string
    prescriptionNumber: string
    billNumber: string
    medicineCount: number
    flags: string[]
  }> = []

  for (const chart of CHARTS) {
    const flags: string[] = ["Placeholder phone number (0000000000) — not on the original chart"]
    if (chart.flagNote) flags.push(chart.flagNote)

    // Idempotency key: same first/last name + dob = same seed patient.
    let patient = await prisma.patient.findFirst({
      where: { firstName: chart.firstName, lastName: chart.lastName ?? null, dob: chart.dob },
    })

    if (!patient) {
      const uhid = await generateUHID()
      patient = await prisma.patient.create({
        data: {
          uhid,
          firstName: chart.firstName,
          lastName: chart.lastName ?? null,
          dob: chart.dob,
          gender: chart.gender,
          phone: "0000000000",
          source: "CRM",
          status: "ACTIVE",
          notesSummary: "Seeded from a physical Zafoor Clinic prescription — see flags on prescription/bill records.",
        },
      })
      if (chart.flagNote) {
        await prisma.patientNote.create({
          data: { patientId: patient.id, category: "FRONT_DESK", body: chart.flagNote, pinned: true },
        })
      }
      await prisma.patientNote.create({
        data: { patientId: patient.id, category: "FRONT_DESK", body: NO_PHONE_ON_CHART_NOTE },
      })
    }

    // Idempotency for the prescription+bill pair: skip re-creating them if
    // this patient already has a digitized-from-paper prescription on file.
    const existingRx = await prisma.prescription.findFirst({
      where: { patientId: patient.id, notes: { startsWith: "Digitized from a physical" } },
    })
    if (existingRx) {
      summary.push({
        name: [chart.firstName, chart.lastName].filter(Boolean).join(" "),
        uhid: patient.uhid,
        prescriptionNumber: existingRx.prescriptionNumber ?? "(existing)",
        billNumber: "(existing — not re-created)",
        medicineCount: chart.items.length,
        flags: [...flags, "Already seeded — prescription/bill left as-is on this run"],
      })
      continue
    }

    // Medicine catalog + prescription items
    const items: RxItem[] = []
    for (const item of chart.items) {
      await ensureMedicine(item.medicineName)
      items.push(item)
    }

    const prescriptionNumber = await generatePrescriptionNumber()
    const prescription = await prisma.prescription.create({
      data: {
        prescriptionNumber,
        patientId: patient.id,
        doctorId: doctor.id,
        source: "DIGITAL",
        diagnosis: chart.diagnosis ?? null,
        weightAtVisit: chart.weight || null,
        advice: chart.advice ?? null,
        reviewAfter: chart.reviewAfter ?? null,
        notes: "Digitized from a physical paper prescription (not a scanned image) — verify against the original chart.",
        issuedAt: chart.visitDate,
        items: {
          create: items.map((i) => ({
            medicineName: i.medicineName,
            dosage: i.dosage ?? null,
            frequency: i.frequency ?? null,
            duration: i.duration ?? null,
            instructions: i.instructions ?? null,
          })),
        },
      },
      include: { items: true },
    })

    // Bill with one line item per prescribed medicine (placeholder prices, flagged)
    const billNumber = await generateBillNumber()
    const billItemsData = items.map((i) => ({
      description: `${i.medicineName} ${PLACEHOLDER_PRICE_FLAG}`,
      quantity: 1,
      unitPrice: 0,
      taxRatePercent: 0,
      taxAmount: 0,
      amount: 0,
    }))
    await prisma.bill.create({
      data: {
        billNumber,
        patientId: patient.id,
        totalAmount: 0,
        discountAmount: 0,
        taxAmount: 0,
        netAmount: 0,
        amountPaid: 0,
        balanceDue: 0,
        status: "PENDING",
        issuedAt: chart.visitDate,
        items: { create: billItemsData },
      },
    })

    summary.push({
      name: [chart.firstName, chart.lastName].filter(Boolean).join(" "),
      uhid: patient.uhid,
      prescriptionNumber,
      billNumber,
      medicineCount: items.length,
      flags,
    })
  }

  console.log("\n=== Seed summary (spot-check against the original charts) ===")
  for (const s of summary) {
    console.log(`\n${s.name} — UHID ${s.uhid}`)
    console.log(`  Prescription: ${s.prescriptionNumber} (${s.medicineCount} medicines)`)
    console.log(`  Bill: ${s.billNumber} (all line items PENDING, ₹0 placeholder prices)`)
    for (const f of s.flags) console.log(`  ⚠ ${f}`)
  }
  console.log("\nNote: only 5 patients were transcribed from the brief's numbered list (1–5), despite the")
  console.log("\"6 physical prescriptions\" framing — no 6th patient was invented.")
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
