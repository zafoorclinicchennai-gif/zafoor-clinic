import { notFound } from "next/navigation"
import { getPatientById } from "@/actions/patients"
import { getDoctors, getCurrentUser } from "@/lib/auth"
import { patientDisplayName, calculateAge } from "@/lib/format"
import { PrescriptionPadForm } from "@/components/patients/profile/prescription-pad-form"

export default async function NewPrescriptionPage({
  searchParams,
}: {
  searchParams: Promise<{ patientId?: string; appointmentId?: string }>
}) {
  const sp = await searchParams
  if (!sp.patientId) notFound()

  const [patient, doctors, currentUser] = await Promise.all([
    getPatientById(sp.patientId),
    getDoctors(),
    getCurrentUser(),
  ])
  if (!patient) notFound()

  const defaultDoctorId = currentUser.role === "DOCTOR" ? currentUser.id : doctors[0]?.id ?? ""

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">New Prescription</h1>
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
        }}
        doctors={doctors.map((d) => ({ id: d.id, name: d.name, specialization: d.specialization }))}
        defaultDoctorId={defaultDoctorId}
        appointmentId={sp.appointmentId}
      />
    </div>
  )
}
