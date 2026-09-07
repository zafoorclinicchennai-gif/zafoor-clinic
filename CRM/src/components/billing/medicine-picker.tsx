"use client"

import { useEffect, useRef, useState } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { getInventoryItems } from "@/actions/inventory"

type MedicineOption = { id: string; name: string; sku: string; unit: string; currentStock: number; unitPrice: number | null }

/** Searchable medicine picker for Billing — mirrors PatientPicker's debounced-search
 * combobox pattern. Search hits the same Medicine & Stock catalog (getInventoryItems)
 * used on /inventory, so staff add real stocked items instead of typing free text. */
export function MedicinePicker({ onSelect }: { onSelect: (item: MedicineOption) => void }) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<MedicineOption[]>([])
  const [open, setOpen] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      const items = await getInventoryItems({ query })
      setResults(
        items.slice(0, 8).map((i) => ({ id: i.id, name: i.name, sku: i.sku, unit: i.unit, currentStock: i.currentStock, unitPrice: i.unitPrice }))
      )
    }, 250)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search Medicine & Stock to add a line item…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          className="pl-8 pr-8"
        />
        {query && (
          <button
            type="button"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={() => {
              setQuery("")
              setResults([])
            }}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {open && query.trim() && (
        <div className="absolute z-20 mt-1 w-full rounded-md border bg-popover shadow-md max-h-64 overflow-y-auto">
          {results.length === 0 ? (
            <p className="px-3 py-2.5 text-sm text-muted-foreground">No matching medicines in stock catalog.</p>
          ) : (
            results.map((item) => (
              <button
                key={item.id}
                type="button"
                className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm hover:bg-muted"
                onClick={() => {
                  onSelect(item)
                  setQuery("")
                  setResults([])
                  setOpen(false)
                }}
              >
                <span className="min-w-0">
                  <span className="font-medium truncate block">{item.name}</span>
                  <span className="text-xs text-muted-foreground">
                    SKU {item.sku} · Stock: {item.currentStock} {item.unit}s
                  </span>
                </span>
                <span className="text-xs font-medium shrink-0">
                  {item.unitPrice != null ? `₹${item.unitPrice}` : "No price set"}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}
