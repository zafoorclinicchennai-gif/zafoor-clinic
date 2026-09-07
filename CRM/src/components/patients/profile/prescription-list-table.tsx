import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatDateTime, patientDisplayName } from "@/lib/format"
import type { getPrescriptions } from "@/actions/patients"

type Prescriptions = Awaited<ReturnType<typeof getPrescriptions>>["prescriptions"]

export function PrescriptionListTable({ prescriptions }: { prescriptions: Prescriptions }) {
  if (prescriptions.length === 0) {
    return <p className="py-12 text-center text-sm text-muted-foreground">No prescriptions found.</p>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Rx #</TableHead>
          <TableHead>Patient</TableHead>
          <TableHead>Doctor</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Medicines</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {prescriptions.map((rx) => (
          <TableRow key={rx.id}>
            <TableCell className="font-medium">{rx.prescriptionNumber ?? "—"}</TableCell>
            <TableCell>
              <Link href={`/patients/${rx.patientId}?tab=prescriptions`} className="hover:underline">
                {patientDisplayName(rx.patient)} <span className="text-xs text-muted-foreground">({rx.patient.uhid})</span>
              </Link>
            </TableCell>
            <TableCell>{rx.doctor?.name ?? "—"}</TableCell>
            <TableCell>{formatDateTime(rx.issuedAt)}</TableCell>
            <TableCell>
              <Badge variant={rx.source === "SCANNED" ? "secondary" : "default"}>
                {rx.source === "SCANNED" ? "Scanned" : "Digital"}
              </Badge>
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {rx.items.length > 0 ? rx.items.map((i) => i.medicineName).join(", ") : "—"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
