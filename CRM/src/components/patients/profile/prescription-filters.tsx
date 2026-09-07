"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function PrescriptionFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function pushParams(next: Record<string, string | null | undefined>) {
    const params = new URLSearchParams(searchParams.toString())
    for (const [key, value] of Object.entries(next)) {
      if (value) params.set(key, value)
      else params.delete(key)
    }
    params.delete("page")
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1 sm:max-w-xs">
        <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search patient name or UHID…"
          defaultValue={searchParams.get("query") ?? ""}
          className="pl-8"
          onChange={(e) => pushParams({ query: e.target.value || undefined })}
        />
      </div>
      <Input
        type="date"
        className="sm:w-44"
        defaultValue={searchParams.get("from") ?? ""}
        onChange={(e) => pushParams({ from: e.target.value || undefined })}
      />
      <Input
        type="date"
        className="sm:w-44"
        defaultValue={searchParams.get("to") ?? ""}
        onChange={(e) => pushParams({ to: e.target.value || undefined })}
      />
    </div>
  )
}
