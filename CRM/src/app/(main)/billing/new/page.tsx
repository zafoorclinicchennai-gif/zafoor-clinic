import { getServices } from "@/actions/services"
import { getPatientById, getPrescriptionForBilling } from "@/actions/patients"
import { BillForm } from "@/components/billing/bill-form"

export default async function NewBillPage({
  searchParams,
}: {
  searchParams: Promise<{ patientId?: string; appointmentId?: string; prescriptionId?: string }>
}) {
  const sp = await searchParams
  const [services, patient, prescription] = await Promise.all([
    getServices(true),
    sp.patientId ? getPatientById(sp.patientId) : Promise.resolve(null),
    sp.prescriptionId ? getPrescriptionForBilling(sp.prescriptionId) : Promise.resolve(null),
  ])

  const initialItems = prescription
    ? prescription.items.map((item) => ({
        description: item.medicineName,
        quantity: "1",
        unitPrice: "0", // placeholder — staff fills in the actual price; medicines don't carry price on the prescription itself
        taxRatePercent: "0",
      }))
    : undefined

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">New Bill</h1>
        <p className="text-sm text-muted-foreground">
          {prescription
            ? "Prefilled from the linked prescription — add quantities/prices, and add any extra counter items below."
            : "Tax is computed automatically from each line item's tax rate."}
        </p>
      </div>
      <BillForm
        services={services}
        initialPatient={patient ? { id: patient.id, name: `${patient.firstName} ${patient.lastName ?? ""}`.trim(), uhid: patient.uhid, phone: patient.phone, insurances: patient.insurances } : null}
        defaultAppointmentId={sp.appointmentId}
        initialItems={initialItems}
      />
    </div>
  )
}
