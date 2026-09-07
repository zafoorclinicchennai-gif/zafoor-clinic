"use client"

import Link from "next/link"
import { Pill, Printer, Stethoscope, Plus, Receipt, FileText, ScanLine } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatDate, calculateAge } from "@/lib/format"
import { buildPrescriptionPrintHtml } from "@/lib/print-prescription"
import type { getPatientPrescriptions } from "@/actions/patients"

type Prescriptions = Awaited<ReturnType<typeof getPatientPrescriptions>>

const CLINIC = {
  name: "Zafoor Clinic",
  doctor: "Dr. Mufeeda Roohi",
  qualifications: "MBBS., FFM., FAM., FID",
  specialty: "Family Physician, Diabetologist & Aesthetic Physician",
  address: "No. 69/70 St. Xavier Street, Opp. Huda Masjid & Next to MedPlus, Seven Wells, Chennai - 600 001.",
  phone: "+91 89403 99403",
  email: "zafoorclinic@gmail.com",
  timings: "Mon - Sat: Evening 6:00 PM - 10:00PM · Sunday: Closed",
}

function genderInitial(g?: string | null) {
  if (g === "MALE") return "M"
  if (g === "FEMALE") return "F"
  return g ? g[0] : "—"
}

export function PrescriptionsTab({
  patientId,
  patientName,
  uhid,
  dob,
  gender,
  prescriptions,
}: {
  patientId?: string
  patientName: string
  uhid: string
  dob?: Date | string | null
  gender?: string | null
  prescriptions: Prescriptions
}) {
  const age = dob ? calculateAge(dob) : null

  function handlePrint(prescription: Prescriptions[number]) {
    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    printWindow.document.write(
      buildPrescriptionPrintHtml(
        { ...prescription, issuedAt: prescription.issuedAt || new Date() },
        { name: patientName, uhid, age, gender }
      )
    )
    printWindow.document.close()
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Prescriptions</h2>
          <p className="text-sm text-muted-foreground">Digital soft copy of every Rx issued ({prescriptions.length} total).</p>
        </div>
        {patientId && (
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
        )}
      </div>

      {prescriptions.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-sm text-muted-foreground">
            <Pill className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
            No prescriptions recorded for this patient yet.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {prescriptions.map((prescription) => (
            <Card key={prescription.id} className="overflow-hidden border-2 border-teal-700/20 shadow-sm py-0">
              <CardContent className="p-0">
                {/* Letterhead */}
                <div className="flex items-start justify-between gap-4 border-b-2 border-teal-700 px-6 py-4 bg-teal-50/50 dark:bg-teal-950/20">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xl font-bold text-foreground">
                        Dr.<span className="text-teal-700 dark:text-teal-400">
                          {(prescription.doctor?.name || CLINIC.doctor).replace("Dr. ", "")}
                        </span>
                      </p>
                      {prescription.source === "SCANNED" ? (
                        <Badge variant="secondary" className="gap-1 text-xs">
                          <ScanLine className="h-3 w-3" /> Scanned
                        </Badge>
                      ) : (
                        <Badge variant="default" className="gap-1 text-xs">
                          <FileText className="h-3 w-3" /> Digital
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-muted-foreground mt-0.5">{CLINIC.qualifications}</p>
                    <p className="text-xs text-muted-foreground">
                      {prescription.doctor?.specialization || CLINIC.specialty}
                    </p>
                    {prescription.prescriptionNumber && (
                      <p className="text-xs text-muted-foreground mt-0.5 font-mono">
                        Rx #{prescription.prescriptionNumber}
                      </p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-2xl font-bold italic text-teal-700 dark:text-teal-400 leading-none">℞</p>
                    <p className="text-xs text-muted-foreground mt-1">{formatDate(prescription.issuedAt || new Date())}</p>
                  </div>
                </div>

                {/* Patient meta row + Action buttons */}
                <div className="flex flex-wrap items-center justify-between gap-2 px-6 py-3 text-sm border-b bg-muted/20">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span><span className="font-semibold">Name:</span> {patientName}</span>
                    <span><span className="font-semibold">Age/Gender:</span> {age ?? "—"}/{genderInitial(gender)}</span>
                    <span><span className="font-semibold">UHID:</span> {uhid}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {patientId && (
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
                    )}
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
                  <div className="px-6 pt-3 text-sm">
                    <span className="font-semibold">Complaint:</span> {prescription.diagnosis}
                  </div>
                )}

                {/* Rx body */}
                {prescription.source === "SCANNED" ? (
                  <div className="px-6 py-4">
                    <p className="text-xs text-muted-foreground">
                      {prescription.notes || "Scanned copy — see attached file."}
                    </p>
                  </div>
                ) : (
                  <div className="px-6 py-4">
                    <div className="flex items-center gap-2 text-teal-700 dark:text-teal-400 font-serif italic text-lg mb-2">
                      <Stethoscope className="h-4 w-4" /> ℞
                    </div>
                    <ol className="space-y-2.5">
                      {prescription.items.length === 0 ? (
                        <p className="text-xs text-muted-foreground">No medication items listed.</p>
                      ) : (
                        prescription.items.map((item, idx) => (
                          <li key={item.id} className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 text-sm border-b border-dashed pb-2 last:border-0">
                            <span className="text-muted-foreground w-5">{idx + 1}.</span>
                            <span className="font-medium">{item.medicineName}</span>
                            {item.dosage && <span className="text-muted-foreground">— {item.dosage}</span>}
                            {item.frequency && (
                              <Badge variant="secondary" className="text-xs font-normal">
                                {item.frequency}
                              </Badge>
                            )}
                            {item.duration && <span className="text-muted-foreground">× {item.duration}</span>}
                            {item.instructions && (
                              <span className="w-full text-xs italic text-muted-foreground pl-5">{item.instructions}</span>
                            )}
                          </li>
                        ))
                      )}
                    </ol>

                    {prescription.advice && (
                      <div className="mt-4 text-xs bg-muted/30 border-l-2 border-teal-700 px-3 py-2">
                        <span className="font-semibold">Advice:</span> {prescription.advice}
                      </div>
                    )}
                    {prescription.notes && (
                      <div className="mt-3 text-xs bg-muted/30 border-l-2 border-teal-700 px-3 py-2">
                        <span className="font-semibold">Notes:</span> {prescription.notes}
                      </div>
                    )}
                    {prescription.reviewAfter && (
                      <p className="mt-2 text-xs text-muted-foreground">
                        <span className="font-semibold text-foreground">Review after:</span> {prescription.reviewAfter}
                      </p>
                    )}
                  </div>
                )}

                {/* Footer / letterhead bottom */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-t px-6 py-3 text-[11px] text-muted-foreground bg-muted/10">
                  <span>{CLINIC.address}</span>
                  <span>{CLINIC.phone} · {CLINIC.email}</span>
                  <span>{CLINIC.timings}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
