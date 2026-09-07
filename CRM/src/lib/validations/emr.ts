import { z } from "zod"

export const chiefComplaintsSchema = z.object({
  chiefComplaints: z.array(z.string().trim().min(1)).default([]),
})
export type ChiefComplaintsInput = z.infer<typeof chiefComplaintsSchema>

export const vitalsSchema = z.object({
  heightCm: z.coerce.number().positive().optional().nullable(),
  weightKg: z.coerce.number().positive().optional().nullable(),
  temperatureC: z.coerce.number().optional().nullable(),
  pulseBpm: z.coerce.number().int().positive().optional().nullable(),
  bpSystolic: z.coerce.number().int().positive().optional().nullable(),
  bpDiastolic: z.coerce.number().int().positive().optional().nullable(),
  spo2: z.coerce.number().int().min(0).max(100).optional().nullable(),
})
export type VitalsInput = z.infer<typeof vitalsSchema>

export const diagnosisSchema = z.object({
  description: z.string().trim().min(1, "Description is required"),
  icdCode: z.string().trim().optional(),
  type: z.enum(["PRIMARY", "SECONDARY", "DIFFERENTIAL"]),
  status: z.enum(["ACTIVE", "RESOLVED"]),
})
export type DiagnosisInput = z.infer<typeof diagnosisSchema>

export const clinicalNoteSchema = z.object({
  subjective: z.string().optional(),
  objective: z.string().optional(),
  assessment: z.string().optional(),
  plan: z.string().optional(),
})
export type ClinicalNoteInput = z.infer<typeof clinicalNoteSchema>

export const medicalHistorySchema = z.object({
  description: z.string().trim().min(1, "Description is required"),
  occurredOn: z.string().optional(),
  notes: z.string().trim().optional(),
})
export type MedicalHistoryInput = z.infer<typeof medicalHistorySchema>

export const familyHistorySchema = z.object({
  relation: z.string().trim().min(1, "Relation is required"),
  condition: z.string().trim().min(1, "Condition is required"),
  notes: z.string().trim().optional(),
})
export type FamilyHistoryInput = z.infer<typeof familyHistorySchema>

export const surgicalHistorySchema = z.object({
  procedure: z.string().trim().min(1, "Procedure is required"),
  surgeryDate: z.string().optional(),
  surgeon: z.string().trim().optional(),
  hospital: z.string().trim().optional(),
  notes: z.string().trim().optional(),
})
export type SurgicalHistoryInput = z.infer<typeof surgicalHistorySchema>

export const currentMedicationSchema = z.object({
  medicineName: z.string().trim().min(1, "Medicine name is required"),
  dosage: z.string().trim().optional(),
  frequency: z.string().trim().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  status: z.enum(["ACTIVE", "STOPPED"]),
  prescribedBy: z.string().trim().optional(),
  notes: z.string().trim().optional(),
})
export type CurrentMedicationInput = z.infer<typeof currentMedicationSchema>

export const doctorTemplateSchema = z.object({
  name: z.string().trim().min(1, "Template name is required"),
  type: z.enum(["SOAP", "PRESCRIPTION", "CERTIFICATE"]),
  subjective: z.string().optional(),
  objective: z.string().optional(),
  assessment: z.string().optional(),
  plan: z.string().optional(),
  content: z.string().optional(),
})
export type DoctorTemplateInput = z.infer<typeof doctorTemplateSchema>

export const clinicalReportSchema = z.object({
  type: z.enum(["LAB", "RADIOLOGY"]),
  title: z.string().trim().min(1, "Title is required"),
  modality: z.string().trim().optional(),
  findings: z.string().trim().optional(),
  impression: z.string().trim().optional(),
  status: z.enum(["PENDING", "COMPLETED"]),
  reportDate: z.string().optional(),
  attachmentUrl: z.string().trim().optional(),
})
export type ClinicalReportInput = z.infer<typeof clinicalReportSchema>

export const labResultItemSchema = z.object({
  testName: z.string().trim().min(1, "Test name is required"),
  value: z.string().trim().min(1, "Value is required"),
  unit: z.string().trim().optional(),
  referenceRange: z.string().trim().optional(),
  flag: z.enum(["NORMAL", "LOW", "HIGH", "CRITICAL"]),
})
export type LabResultItemInput = z.infer<typeof labResultItemSchema>

export const referralNoteSchema = z.object({
  toDoctor: z.string().trim().min(1, "Referred-to doctor is required"),
  toSpecialty: z.string().trim().optional(),
  reason: z.string().trim().min(1, "Reason is required"),
  notes: z.string().trim().optional(),
  urgency: z.enum(["ROUTINE", "URGENT"]),
})
export type ReferralNoteInput = z.infer<typeof referralNoteSchema>

export const prescriptionItemSchema = z.object({
  medicineName: z.string().trim().min(1, "Medicine name is required"),
  dosage: z.string().trim().optional(),
  frequency: z.string().trim().optional(),
  duration: z.string().trim().optional(),
  instructions: z.string().trim().optional(),
})
export type PrescriptionItemInput = z.infer<typeof prescriptionItemSchema>

export const prescriptionSchema = z.object({
  diagnosis: z.string().trim().optional(),
  notes: z.string().trim().optional(),
  weightAtVisit: z.string().trim().optional(),
  advice: z.string().trim().optional(),
  reviewAfter: z.string().trim().optional(),
  items: z.array(prescriptionItemSchema).min(1, "Add at least one medicine"),
})
export type PrescriptionInput = z.infer<typeof prescriptionSchema>

export const scannedPrescriptionSchema = z.object({
  documentId: z.string().trim().min(1, "Attach the scanned file first"),
  issuedAt: z.string().optional(),
  notes: z.string().trim().optional(),
})
export type ScannedPrescriptionInput = z.infer<typeof scannedPrescriptionSchema>

export const certificateSchema = z.object({
  type: z.enum(["FITNESS", "SICK_LEAVE", "MEDICAL", "OTHER"]),
  title: z.string().trim().min(1, "Title is required"),
  content: z.string().trim().min(1, "Content is required"),
  validFrom: z.string().optional(),
  validTo: z.string().optional(),
})
export type CertificateInput = z.infer<typeof certificateSchema>
