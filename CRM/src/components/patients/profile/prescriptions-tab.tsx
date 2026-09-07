"use client"

import Link from "next/link"
import { Pill, Printer, Calendar, Plus, FileText, ScanLine, Receipt } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDateTime, formatDate } from "@/lib/format"
import { buildPrescriptionPrintHtml } from "@/lib/print-prescription"
import type { getPatientPrescriptions } from "@/actions/patients"

type Prescriptions = Awaited<ReturnType<typeof getPatientPrescriptions>>

export function PrescriptionsTab({
  patientId,
  patientName,
  uhid,
  prescriptions,
}: {
  patientId: string
  patientName: string
  uhid: string
  prescriptions: Prescriptions
}) {
  function handlePrint(prescription: Prescriptions[number]) {
    const printWindow = window.open("", "_blank")
    if (!printWindow) return
    printWindow.document.write(
      buildPrescriptionPrintHtml(
        { ...prescription, issuedAt: prescription.issuedAt || new Date() },
        { name: patientName, uhid }
      )
    )
    printWindow.document.close()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Prescription History</h2>
          <p className="text-sm text-muted-foreground">
            All medications and prescriptions written across consultations ({prescriptions.length} total).
          </p>
        </div>
        <Button
          size="sm"
          className="gap-1.5"
          nativeButton={false}
          render={
            <Link href={`/prescriptions/new?patientId=${patientId}`}>
              <Plus className="h-3.5 w-3.5" />
              New Prescription
            </Link>
          }
        />
      </div>

      {prescriptions.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-sm text-muted-foreground">
            <Pill className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
            No prescriptions recorded for this patient yet.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {prescriptions.map((prescription) => (
            <Card key={prescription.id} className="overflow-hidden border-border/80 shadow-sm">
              <CardHeader className="bg-muted/30 pb-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-500/10 text-teal-600 dark:bg-teal-950/40 dark:text-teal-400">
                      <Pill className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-base font-semibold">
                          Dr. {prescription.doctor?.name || "Consultant"}
                        </CardTitle>
                        {prescription.doctor?.specialization && (
                          <Badge variant="outline" className="text-xs">
                            {prescription.doctor.specialization}
                          </Badge>
                        )}
                        <Badge
                          variant={prescription.source === "SCANNED" ? "secondary" : "default"}
                          className="gap-1 text-xs"
                        >
                          {prescription.source === "SCANNED" ? (
                            <ScanLine className="h-3 w-3" />
                          ) : (
                            <FileText className="h-3 w-3" />
                          )}
                          {prescription.source === "SCANNED" ? "Scanned" : "Digital"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDateTime(prescription.issuedAt || new Date())}
                        {prescription.prescriptionNumber && <span>· {prescription.prescriptionNumber}</span>}
                        {prescription.encounter && (
                          <span className="text-primary font-medium">
                            · Linked to Consultation ({formatDate(prescription.encounter.encounterDate)})
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 self-start sm:self-auto">
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1.5 text-xs"
                      nativeButton={false}
                      render={
                        <Link href={`/billing/new?patientId=${patientId}&prescriptionId=${prescription.id}`}>
                          <Receipt className="h-3.5 w-3.5" />
                          Bill Medicines
                        </Link>
                      }
                    />
                    {prescription.source === "SCANNED" && prescription.document ? (
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1.5 text-xs"
                        nativeButton={false}
                        render={
                          <a href={prescription.document.fileUrl} target="_blank" rel="noopener noreferrer">
                            <FileText className="h-3.5 w-3.5" />
                            View Scanned Copy
                          </a>
                        }
                      />
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1.5 text-xs"
                        onClick={() => handlePrint(prescription)}
                      >
                        <Printer className="h-3.5 w-3.5" />
                        Print Rx
                      </Button>
                    )}
                  </div>
                </div>

                {prescription.diagnosis && (
                  <div className="mt-2 text-xs bg-background/80 rounded px-2.5 py-1.5 border inline-block">
                    <span className="font-semibold text-foreground">Diagnosis:</span>{" "}
                    <span className="text-muted-foreground">{prescription.diagnosis}</span>
                  </div>
                )}
              </CardHeader>

              {prescription.source === "SCANNED" ? (
                <CardContent className="pt-4">
                  <p className="text-xs text-muted-foreground">
                    {prescription.notes || "Scanned copy — see attached file."}
                  </p>
                </CardContent>
              ) : (
                <CardContent className="pt-4">
                  <div className="rounded-lg border overflow-hidden">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-muted/50 text-xs uppercase text-muted-foreground font-semibold border-b">
                        <tr>
                          <th className="px-4 py-2.5">#</th>
                          <th className="px-4 py-2.5">Medicine Name</th>
                          <th className="px-4 py-2.5">Dosage</th>
                          <th className="px-4 py-2.5">Frequency</th>
                          <th className="px-4 py-2.5">Duration</th>
                          <th className="px-4 py-2.5">Instructions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {prescription.items.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="px-4 py-3 text-center text-xs text-muted-foreground">
                              No specific medication items listed.
                            </td>
                          </tr>
                        ) : (
                          prescription.items.map((item, idx) => (
                            <tr key={item.id} className="hover:bg-muted/20">
                              <td className="px-4 py-2.5 text-xs text-muted-foreground font-mono">{idx + 1}</td>
                              <td className="px-4 py-2.5 font-medium text-foreground">{item.medicineName}</td>
                              <td className="px-4 py-2.5 text-xs">{item.dosage || "—"}</td>
                              <td className="px-4 py-2.5 text-xs">
                                <Badge variant="secondary" className="text-xs font-normal">
                                  {item.frequency || "—"}
                                </Badge>
                              </td>
                              <td className="px-4 py-2.5 text-xs">{item.duration || "—"}</td>
                              <td className="px-4 py-2.5 text-xs text-muted-foreground">{item.instructions || "—"}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {prescription.advice && (
                    <div className="mt-3 p-3 bg-muted/30 rounded-lg text-xs text-muted-foreground border">
                      <span className="font-semibold text-foreground">Advice:</span> {prescription.advice}
                    </div>
                  )}
                  {prescription.reviewAfter && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">Review after:</span> {prescription.reviewAfter}
                    </p>
                  )}
                  {prescription.notes && (
                    <div className="mt-3 p-3 bg-muted/30 rounded-lg text-xs text-muted-foreground border">
                      <span className="font-semibold text-foreground">Notes:</span> {prescription.notes}
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
