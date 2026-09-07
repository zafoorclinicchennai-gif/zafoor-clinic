"use client"

import Link from "next/link"
import { useTransition } from "react"
import { Pencil, Plus, Phone, Mail, MapPin, Tag as TagIcon, Lock, Pill } from "lucide-react"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { bloodGroupLabels, genderLabels, patientStatusLabels } from "@/lib/labels"
import { calculateAge, initials, patientDisplayName } from "@/lib/format"
import { updatePatientStatus, togglePatientTag } from "@/actions/patients"
import type { getPatientById } from "@/actions/patients"

type Patient = NonNullable<Awaited<ReturnType<typeof getPatientById>>>
type Tag = { id: string; name: string; color: string }

export function PatientHeader({ patient, allTags }: { patient: Patient; allTags: Tag[] }) {
  const [pending, startTransition] = useTransition()
  const age = calculateAge(patient.dob)

  function handleStatusChange(status: string | null) {
    if (!status) return
    startTransition(async () => {
      await updatePatientStatus(patient.id, status as "ACTIVE" | "INACTIVE")
      toast.success("Status updated")
    })
  }

  return (
    <div className="rounded-xl border bg-card p-4 sm:p-5 shadow-xs">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-3 sm:gap-4 min-w-0 flex-1">
          <Avatar className="h-14 w-14 sm:h-16 sm:w-16 shrink-0 ring-1 ring-border">
            {patient.photoUrl && <AvatarImage src={patient.photoUrl} alt={patientDisplayName(patient)} />}
            <AvatarFallback className="text-base sm:text-lg font-semibold bg-primary text-primary-foreground">
              {initials(patientDisplayName(patient))}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-foreground truncate">
                {patientDisplayName(patient)}
              </h1>
              <Badge variant="outline" className="font-mono text-xs shrink-0">{patient.uhid}</Badge>
              {patient.registrationStatus === "LOCKED_FOR_RECEPTIONIST" && (
                <Badge variant="secondary" className="gap-1 text-[11px] text-amber-700 bg-amber-100 dark:bg-amber-950/40 shrink-0">
                  <Lock className="h-3 w-3" /> Locked
                </Badge>
              )}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              {age !== null ? `${age} yrs` : "Age unknown"}
              {patient.gender ? ` · ${genderLabels[patient.gender]}` : ""}
              {` · ${bloodGroupLabels[patient.bloodGroup ?? "UNKNOWN"]}`}
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs sm:text-sm text-muted-foreground">
              <span className="flex items-center gap-1 shrink-0"><Phone className="h-3.5 w-3.5" />{patient.phone}</span>
              {patient.email && (
                <span className="flex items-center gap-1 truncate"><Mail className="h-3.5 w-3.5 shrink-0" />{patient.email}</span>
              )}
              {patient.city && (
                <span className="flex items-center gap-1 shrink-0"><MapPin className="h-3.5 w-3.5" />{patient.city}</span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
              {patient.tags.map(({ tag }) => (
                <Badge key={tag.id} variant="outline" className="text-xs font-normal" style={{ borderColor: tag.color, color: tag.color }}>
                  {tag.name}
                </Badge>
              ))}
              <TagEditor patient={patient} allTags={allTags} />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0">
          <Select items={patientStatusLabels} value={patient.status} onValueChange={handleStatusChange} disabled={pending}>
            <SelectTrigger className="w-32 sm:w-36 h-9 text-xs sm:text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(patientStatusLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 h-9 text-xs sm:text-sm"
            nativeButton={false}
            render={
              <Link href={`/patients/${patient.id}/edit`}>
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </Link>
            }
          />
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 h-9 text-xs sm:text-sm"
            nativeButton={false}
            render={
              <Link href={`/prescriptions/new?patientId=${patient.id}`}>
                <Pill className="h-3.5 w-3.5" />
                New Prescription
              </Link>
            }
          />
          <Button
            size="sm"
            className="gap-1.5 h-9 text-xs sm:text-sm bg-primary text-primary-foreground font-medium"
            nativeButton={false}
            render={
              <Link href={`/appointments/new?patientId=${patient.id}`}>
                <Plus className="h-3.5 w-3.5" />
                Book Appointment
              </Link>
            }
          />
        </div>
      </div>
    </div>
  )
}

function TagEditor({ patient, allTags }: { patient: Patient; allTags: Tag[] }) {
  const [pending, startTransition] = useTransition()
  const activeTagIds = new Set(patient.tags.map((t) => t.tag.id))

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button size="icon" variant="outline" className="h-6 w-6 rounded-full">
            <TagIcon className="h-3 w-3" />
          </Button>
        }
      />
      <PopoverContent className="w-56" align="start">
        <p className="text-xs font-medium text-muted-foreground mb-2">Tags</p>
        <div className="space-y-2">
          {allTags.map((tag) => (
            <div key={tag.id} className="flex items-center gap-2">
              <Checkbox
                id={`tag-${tag.id}`}
                checked={activeTagIds.has(tag.id)}
                disabled={pending}
                onCheckedChange={() => {
                  startTransition(async () => {
                    try {
                      await togglePatientTag(patient.id, tag.id)
                    } catch {
                      toast.error("Could not update tag")
                    }
                  })
                }}
              />
              <Label htmlFor={`tag-${tag.id}`} className="font-normal text-sm" style={{ color: tag.color }}>
                {tag.name}
              </Label>
            </div>
          ))}
          {allTags.length === 0 && <p className="text-sm text-muted-foreground">No tags yet.</p>}
        </div>
      </PopoverContent>
    </Popover>
  )
}
