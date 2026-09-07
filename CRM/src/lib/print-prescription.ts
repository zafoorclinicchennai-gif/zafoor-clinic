import { formatDate } from "@/lib/format"
import { CLINIC_INFO } from "@/lib/hospital-info"

// Fixed letterhead info — the same on every digitally-created prescription,
// per the reference format across all physical Zafoor Clinic Rx pads.
export const DOCTOR_LETTERHEAD = {
  name: "Dr. Mufeeda Roohi",
  qualifications: "MBBS., FFM., FAM., FID",
  designation: "Family Physician, Diabetologist & Aesthetic Physician",
}

export type PrintablePrescription = {
  prescriptionNumber?: string | null
  issuedAt: Date | string
  diagnosis?: string | null
  weightAtVisit?: string | null
  advice?: string | null
  reviewAfter?: string | null
  notes?: string | null
  items: {
    medicineName: string
    dosage?: string | null
    frequency?: string | null
    duration?: string | null
    instructions?: string | null
  }[]
  doctor?: { name: string; specialization?: string | null } | null
}

export type PrintablePatient = {
  name: string
  uhid: string
  age?: number | null
  gender?: string | null
}

/** Builds the print-friendly / PDF-export HTML for a prescription — shared by the
 * patient-profile PrescriptionsTab "Print Rx" button and the digital Rx pad's
 * print/export action, so both modes render identically. */
export function buildPrescriptionPrintHtml(
  prescription: PrintablePrescription,
  patient: PrintablePatient,
  signatureUrl?: string | null
) {
  const itemsHtml =
    prescription.items.length > 0
      ? prescription.items
          .map(
            (item, idx) => `
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 10px 8px; font-weight: 600;">${idx + 1}. ${item.medicineName}</td>
          <td style="padding: 10px 8px;">${item.dosage || "—"}</td>
          <td style="padding: 10px 8px;">${item.frequency || "—"}</td>
          <td style="padding: 10px 8px;">${item.duration || "—"}</td>
          <td style="padding: 10px 8px; color: #4b5563; font-style: italic;">${item.instructions || "—"}</td>
        </tr>
      `
          )
          .join("")
      : `<tr><td colspan="5" style="padding: 12px 8px; text-align:center; color:#6b7280;">No medicine items listed.</td></tr>`

  const doctorName = prescription.doctor?.name || DOCTOR_LETTERHEAD.name

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Prescription — ${patient.name} (${patient.uhid})</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 40px; color: #1f2937; }
          .header { border-bottom: 2px solid #0f766e; padding-bottom: 15px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-start; }
          .clinic-name { font-size: 22px; font-weight: bold; color: #0f766e; }
          .doctor-line { font-size: 13px; font-weight: 600; margin-top: 2px; }
          .doctor-quals { font-size: 11px; color: #6b7280; }
          .clinic-info { font-size: 12px; color: #6b7280; line-height: 1.4; margin-top: 6px; }
          .patient-box { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px 16px; margin-bottom: 20px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px; }
          .section-title { font-size: 16px; font-weight: bold; color: #0f766e; margin-top: 20px; margin-bottom: 10px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 14px; }
          th { text-align: left; background: #f3f4f6; padding: 10px 8px; border-bottom: 2px solid #d1d5db; font-size: 12px; text-transform: uppercase; color: #4b5563; }
          .footer { margin-top: 60px; border-top: 1px solid #e5e7eb; padding-top: 20px; display: flex; justify-content: space-between; font-size: 12px; color: #6b7280; }
          .doctor-sig { text-align: right; }
          .doctor-sig img { height: 50px; margin-bottom: 4px; }
          @media print { body { margin: 20px; } button { display: none; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="clinic-name">${CLINIC_INFO.name.toUpperCase()}</div>
            <div class="doctor-line">${doctorName}${prescription.doctor ? "" : `, ${DOCTOR_LETTERHEAD.qualifications}`}</div>
            <div class="doctor-quals">${prescription.doctor?.specialization || DOCTOR_LETTERHEAD.designation}</div>
            <div class="clinic-info">
              ${CLINIC_INFO.address}${CLINIC_INFO.landmark ? ` (Landmark: ${CLINIC_INFO.landmark})` : ""}<br/>
              Phone: +91 ${CLINIC_INFO.phone} | Email: ${CLINIC_INFO.email}
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 18px; font-weight: bold; color: #0f766e;">℞ PRESCRIPTION</div>
            ${prescription.prescriptionNumber ? `<div style="font-size: 12px; color: #6b7280;">${prescription.prescriptionNumber}</div>` : ""}
            <div style="font-size: 13px; color: #6b7280;">Date: ${formatDate(prescription.issuedAt)}</div>
          </div>
        </div>

        <div class="patient-box">
          <div><strong>Patient:</strong> ${patient.name} &nbsp;|&nbsp; <strong>UHID:</strong> ${patient.uhid}</div>
          <div>
            ${patient.age != null ? `<strong>Age:</strong> ${patient.age} &nbsp;` : ""}
            ${patient.gender ? `<strong>Gender:</strong> ${patient.gender} &nbsp;` : ""}
            ${prescription.weightAtVisit ? `<strong>Weight:</strong> ${prescription.weightAtVisit}` : ""}
          </div>
        </div>

        ${prescription.diagnosis ? `<div style="margin-bottom: 15px; font-size: 14px;"><strong>Complaint / Diagnosis:</strong> ${prescription.diagnosis}</div>` : ""}

        <div class="section-title">℞ Prescribed Medications</div>
        <table>
          <thead>
            <tr>
              <th>Medicine / Strength</th>
              <th>Dosage</th>
              <th>Frequency</th>
              <th>Duration</th>
              <th>Special Instructions</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        ${
          prescription.advice
            ? `<div style="margin-top: 20px; font-size: 14px; background: #fafafa; padding: 12px; border-left: 3px solid #0f766e;">
                <strong>Advice:</strong><br/>${prescription.advice}
              </div>`
            : ""
        }

        ${prescription.reviewAfter ? `<div style="margin-top: 12px; font-size: 14px;"><strong>Review after:</strong> ${prescription.reviewAfter}</div>` : ""}

        ${
          prescription.notes
            ? `<div style="margin-top: 15px; font-size: 14px; background: #fafafa; padding: 12px; border-left: 3px solid #0f766e;">
                <strong>Doctor's Notes:</strong><br/>${prescription.notes}
              </div>`
            : ""
        }

        <div class="footer">
          <div>Generated by Zafoor Clinic Electronic Medical Record System</div>
          <div class="doctor-sig">
            ${signatureUrl ? `<img src="${signatureUrl}" alt="Doctor signature" />` : "<br/><br/>"}
            <div>_____________________________________</div>
            <strong>${doctorName}</strong><br/>
            ${prescription.doctor?.specialization || DOCTOR_LETTERHEAD.designation}
          </div>
        </div>
        <script>window.print();</script>
      </body>
    </html>
  `
}
