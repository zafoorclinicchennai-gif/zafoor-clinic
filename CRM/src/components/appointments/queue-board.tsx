"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { initials, patientDisplayName, formatRelative } from "@/lib/format"
import { appointmentTypeLabels } from "@/lib/labels"
import { startConsultation, completeConsultation, markNoShow, type getTodayQueue } from "@/actions/appointments"

type Queue = Awaited<ReturnType<typeof getTodayQueue>>
type Doctor = { id: string; name: string; specialization: string | null }

export function QueueBoard({ queue, doctors }: { queue: Queue; doctors: Doctor[] }) {
  const [doctorFilter, setDoctorFilter] = useState("ALL")

  const filtered = doctorFilter === "ALL" ? queue : queue.filter((q) => q.doctorId === doctorFilter)
  const grouped = new Map<string, Queue>()
  for (const entry of filtered) {
    const key = entry.doctorId
    if (!grouped.has(key)) grouped.set(key, [])
    grouped.get(key)!.push(entry)
  }

  return (
    <div className="space-y-4">
      <Select
        items={{ ALL: "All doctors", ...Object.fromEntries(doctors.map((d) => [d.id, `Dr. ${d.name}`])) }}
        value={doctorFilter}
        onValueChange={(value) => setDoctorFilter(value ?? "ALL")}
      >
        <SelectTrigger className="w-64"><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All doctors</SelectItem>
          {doctors.map((d) => (
            <SelectItem key={d.id} value={d.id}>Dr. {d.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {grouped.size === 0 && (
        <Card><CardContent className="py-12 text-center text-sm text-muted-foreground">No one in the queue right now.</CardContent></Card>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {[...grouped.entries()].map(([doctorId, entries]) => (
          <Card key={doctorId}>
            <CardHeader>
              <CardTitle className="text-base">Dr. {entries[0].doctor.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {entries.map((entry) => (
                <QueueRow key={entry.id} entry={entry} />
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function QueueRow({ entry }: { entry: Queue[number] }) {
  const [pending, startTransition] = useTransition()
  const isInProgress = entry.status === "IN_CONSULTATION"

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-lg border p-3 bg-card hover:bg-muted/30 transition-colors">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <Avatar className="h-9 w-9 shrink-0">
          <AvatarFallback className="text-sm font-semibold">{initials(patientDisplayName(entry.patient))}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Link href={`/patients/${entry.patientId}`} className="text-sm font-semibold hover:underline truncate">
              {patientDisplayName(entry.patient)}
            </Link>
            <Badge variant={isInProgress ? "default" : "secondary"} className="text-[10px] sm:hidden">
              {isInProgress ? "In Progress" : "Waiting"}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            {appointmentTypeLabels[entry.type]} · checked in {formatRelative(entry.checkedInAt)}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-0">
        <Badge variant={isInProgress ? "default" : "secondary"} className="hidden sm:inline-flex text-xs">
          {isInProgress ? "In Progress" : "Waiting"}
        </Badge>
        <div className="flex items-center gap-1.5 shrink-0 ml-auto sm:ml-0">
          {!isInProgress && (
            <Button
              size="sm"
              className="h-8 text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
              disabled={pending}
              onClick={() =>
                startTransition(async () => {
                  try {
                    await startConsultation(entry.id)
                    toast.success("Consultation started")
                  } catch {
                    toast.error("Could not start consultation")
                  }
                })
              }
            >
              Start
            </Button>
          )}
          {isInProgress && (
            <Button
              size="sm"
              variant="outline"
              className="h-8 text-xs"
              nativeButton={false}
              render={<Link href={`/patients/${entry.patientId}/encounters/new?appointmentId=${entry.id}`}>EMR Chart</Link>}
            />
          )}
          <Button
            size="sm"
            variant="outline"
            className="h-8 text-xs"
            nativeButton={false}
            render={<Link href={`/prescriptions/new?patientId=${entry.patientId}&appointmentId=${entry.id}`}>Rx</Link>}
          />
          {isInProgress && (
            <Button
              size="sm"
              variant="default"
              className="h-8 text-xs"
              disabled={pending}
              onClick={() =>
                startTransition(async () => {
                  try {
                    await completeConsultation(entry.id)
                    toast.success("Consultation marked as completed")
                  } catch {
                    toast.error("Could not complete consultation")
                  }
                })
              }
            >
              Complete
            </Button>
          )}
          {!isInProgress && (
            <Button
              size="sm"
              variant="ghost"
              className="h-8 text-xs text-muted-foreground hover:text-destructive"
              disabled={pending}
              onClick={() =>
                startTransition(async () => {
                  try {
                    await markNoShow(entry.id)
                    toast.info("Marked as No-show")
                  } catch {
                    toast.error("Could not update")
                  }
                })
              }
            >
              No-show
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
