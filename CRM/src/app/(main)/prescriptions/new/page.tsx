import { notFound } from "next/navigation"
import { getPatientById, getPrescriptionForEdit } from "@/actions/patients"
import { getDoctors, getCurrentUser } from "@/lib/auth"
import { patientDisplayName, calculateAge } from "@/lib/format"
import { PrescriptionPadForm } from "@/components/patients/profile/prescription-pad-form"

export default async function NewPrescriptionPage({
  searchParams,
}: {
  searchParams: Promise<{ patientId?: string; appointmentId?: string; prescriptionId?: string }>
}) {
  const sp = await searchParams
  if (!sp.patientId) notFound()

  const [patient, doctors, currentUser, existingPrescription] = await Promise.all([
    getPatientById(sp.patientId),
    getDoctors(),
    getCurrentUser(),
    sp.prescriptionId ? getPrescriptionForEdit(sp.prescriptionId) : Promise.resolve(null),
  ])
  if (!patient) notFound()
  if (sp.prescriptionId && !existingPrescription) notFound()

  const defaultDoctorId = existingPrescription?.doctorId ?? (currentUser.role === "DOCTOR" ? currentUser.id : doctors[0]?.id ?? "")

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          {existingPrescription ? "Edit Prescription" : "New Prescription"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {patientDisplayName(patient)} · UHID {patient.uhid}
          {patient.dob != null && ` · ${calculateAge(patient.dob)} yrs`}
          {patient.gender && ` · ${patient.gender}`}
        </p>
      </div>
      <PrescriptionPadForm
        patient={{
          id: patient.id,
          name: patientDisplayName(patient),
          uhid: patient.uhid,
          age: calculateAge(patient.dob),
          gender: patient.gender,
          phone: patient.phone,
        }}
        doctors={doctors.map((d) => ({ id: d.id, name: d.name, specialization: d.specialization }))}
        defaultDoctorId={defaultDoctorId}
        appointmentId={sp.appointmentId}
        existingPrescription={existingPrescription}
      />
    </div>
  )
}
