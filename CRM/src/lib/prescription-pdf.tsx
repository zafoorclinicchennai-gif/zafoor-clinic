import { Document, Page, Text, View, Image, StyleSheet, renderToBuffer } from "@react-pdf/renderer"
import sharp from "sharp"
import { formatDate } from "@/lib/format"
import { CLINIC_INFO } from "@/lib/hospital-info"
import { DOCTOR_LETTERHEAD, type PrintablePrescription, type PrintablePatient } from "@/lib/print-prescription"

const styles = StyleSheet.create({
  page: { padding: 32, fontSize: 10, fontFamily: "Helvetica", color: "#1f2937" },
  header: { flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 2, borderBottomColor: "#0f766e", paddingBottom: 10, marginBottom: 14 },
  clinicName: { fontSize: 16, fontWeight: 700, color: "#0f766e" },
  doctorLine: { fontSize: 10, fontWeight: 700, marginTop: 2 },
  muted: { color: "#6b7280" },
  patientBox: { backgroundColor: "#f0fdf4", borderWidth: 1, borderColor: "#bbf7d0", borderRadius: 6, padding: 10, marginBottom: 14, flexDirection: "row", justifyContent: "space-between" },
  sectionTitle: { fontSize: 12, fontWeight: 700, color: "#0f766e", marginTop: 12, marginBottom: 6 },
  tableHeader: { flexDirection: "row", backgroundColor: "#f3f4f6", padding: 6, fontSize: 9, fontWeight: 700, textTransform: "uppercase", color: "#4b5563" },
  tableRow: { flexDirection: "row", padding: 6, borderBottomWidth: 1, borderBottomColor: "#e5e7eb" },
  col1: { width: "30%" },
  col2: { width: "17.5%" },
  col3: { width: "17.5%" },
  col4: { width: "15%" },
  col5: { width: "20%", fontStyle: "italic", color: "#4b5563" },
  noteBox: { marginTop: 14, backgroundColor: "#fafafa", borderLeftWidth: 3, borderLeftColor: "#0f766e", padding: 10 },
  footer: { marginTop: 50, borderTopWidth: 1, borderTopColor: "#e5e7eb", paddingTop: 14, flexDirection: "row", justifyContent: "space-between" },
  sigImage: { height: 40, marginBottom: 4 },
})

async function compressSignature(signatureUrl: string): Promise<string | null> {
  try {
    const res = await fetch(signatureUrl)
    if (!res.ok) return null
    const buffer = Buffer.from(await res.arrayBuffer())
    // Keep the embedded signature tiny — the PDF text itself is a few KB, so
    // capping this at ~15KB comfortably keeps the whole document in the
    // 100-200KB target band.
    const compressed = await sharp(buffer, { failOn: "none" })
      .resize({ width: 300, withoutEnlargement: true })
      .png({ quality: 60, compressionLevel: 9 })
      .toBuffer()
    return `data:image/png;base64,${compressed.toString("base64")}`
  } catch {
    return null
  }
}

export async function renderPrescriptionPdf(
  prescription: PrintablePrescription,
  patient: PrintablePatient,
  signatureUrl?: string | null
): Promise<Buffer> {
  const doctorName = prescription.doctor?.name || DOCTOR_LETTERHEAD.name
  const embeddedSignature = signatureUrl ? await compressSignature(signatureUrl) : null

  const doc = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.clinicName}>{CLINIC_INFO.name.toUpperCase()}</Text>
            <Text style={styles.doctorLine}>
              {doctorName}
              {!prescription.doctor && `, ${DOCTOR_LETTERHEAD.qualifications}`}
            </Text>
            <Text style={styles.muted}>{prescription.doctor?.specialization || DOCTOR_LETTERHEAD.designation}</Text>
            <Text style={[styles.muted, { marginTop: 4 }]}>
              {CLINIC_INFO.address}{CLINIC_INFO.landmark ? ` (Landmark: ${CLINIC_INFO.landmark})` : ""}
            </Text>
            <Text style={styles.muted}>Phone: +91 {CLINIC_INFO.phone} | Email: {CLINIC_INFO.email}</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={{ fontSize: 13, fontWeight: 700, color: "#0f766e" }}>℞ PRESCRIPTION</Text>
            {prescription.prescriptionNumber && <Text style={styles.muted}>{prescription.prescriptionNumber}</Text>}
            <Text style={styles.muted}>Date: {formatDate(prescription.issuedAt)}</Text>
          </View>
        </View>

        <View style={styles.patientBox}>
          <Text>
            <Text style={{ fontWeight: 700 }}>Patient: </Text>
            {patient.name}  <Text style={{ fontWeight: 700 }}>UHID: </Text>
            {patient.uhid}
          </Text>
          <Text>
            {patient.age != null && <Text><Text style={{ fontWeight: 700 }}>Age: </Text>{patient.age}  </Text>}
            {patient.gender && <Text><Text style={{ fontWeight: 700 }}>Gender: </Text>{patient.gender}  </Text>}
            {prescription.weightAtVisit && <Text><Text style={{ fontWeight: 700 }}>Weight: </Text>{prescription.weightAtVisit}</Text>}
          </Text>
        </View>

        {prescription.diagnosis && (
          <Text style={{ marginBottom: 10 }}>
            <Text style={{ fontWeight: 700 }}>Complaint / Diagnosis: </Text>
            {prescription.diagnosis}
          </Text>
        )}

        <Text style={styles.sectionTitle}>℞ Prescribed Medications</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.col1}>Medicine</Text>
          <Text style={styles.col2}>Dosage</Text>
          <Text style={styles.col3}>Frequency</Text>
          <Text style={styles.col4}>Duration</Text>
          <Text style={styles.col5}>Instructions</Text>
        </View>
        {prescription.items.length === 0 ? (
          <Text style={{ padding: 8, textAlign: "center", color: "#6b7280" }}>No medicine items listed.</Text>
        ) : (
          prescription.items.map((item, idx) => (
            <View key={idx} style={styles.tableRow}>
              <Text style={styles.col1}>{idx + 1}. {item.medicineName}</Text>
              <Text style={styles.col2}>{item.dosage || "—"}</Text>
              <Text style={styles.col3}>{item.frequency || "—"}</Text>
              <Text style={styles.col4}>{item.duration || "—"}</Text>
              <Text style={styles.col5}>{item.instructions || "—"}</Text>
            </View>
          ))
        )}

        {prescription.advice && (
          <View style={styles.noteBox}>
            <Text><Text style={{ fontWeight: 700 }}>Advice: </Text>{prescription.advice}</Text>
          </View>
        )}
        {prescription.reviewAfter && (
          <Text style={{ marginTop: 10 }}><Text style={{ fontWeight: 700 }}>Review after: </Text>{prescription.reviewAfter}</Text>
        )}
        {prescription.notes && (
          <View style={styles.noteBox}>
            <Text><Text style={{ fontWeight: 700 }}>Doctor&apos;s Notes: </Text>{prescription.notes}</Text>
          </View>
        )}

        <View style={styles.footer}>
          <Text style={styles.muted}>Generated by Zafoor Clinic Electronic Medical Record System</Text>
          <View style={{ alignItems: "flex-end" }}>
            {embeddedSignature && <Image src={embeddedSignature} style={styles.sigImage} />}
            <Text>_____________________________________</Text>
            <Text style={{ fontWeight: 700 }}>{doctorName}</Text>
            <Text style={styles.muted}>{prescription.doctor?.specialization || DOCTOR_LETTERHEAD.designation}</Text>
          </View>
        </View>
      </Page>
    </Document>
  )

  return renderToBuffer(doc)
}
