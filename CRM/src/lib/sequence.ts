import { getSupabase } from "@/lib/supabase"

/** Atomically allocates the next value for `key` via compare-and-swap, so two
 * concurrent callers (e.g. two "Mark Paid" clicks) never get the same number. */
export async function nextValue(key: string, _tx?: any) {
  const supabase = getSupabase()

  for (let attempt = 0; attempt < 10; attempt++) {
    const { data: existing } = await supabase
      .from("Counter")
      .select("value")
      .eq("key", key)
      .maybeSingle()

    const current = existing?.value ?? 0
    const nextVal = current + 1

    if (existing) {
      const { data: updated, error } = await supabase
        .from("Counter")
        .update({ value: nextVal })
        .eq("key", key)
        .eq("value", current)
        .select()

      if (error) throw error
      if (updated && updated.length > 0) return nextVal
      // Another caller updated the counter first — retry with the new value.
    } else {
      const { error } = await supabase.from("Counter").insert({ key, value: nextVal })
      if (!error) return nextVal
      // Another caller inserted first — retry via the update path above.
    }
  }

  throw new Error(`Could not allocate next value for "${key}" after concurrent retries`)
}

/** ZC-2026-000123 — sequential per calendar year, atomic via Counter table. */
export async function generateUHID(_tx?: any) {
  const year = new Date().getFullYear()
  const value = await nextValue(`UHID-${year}`)
  return `ZC-${year}-${String(value).padStart(6, "0")}`
}

/** INV-2026-000045 */
export async function generateBillNumber(_tx?: any) {
  const year = new Date().getFullYear()
  const value = await nextValue(`BILL-${year}`)
  return `INV-${year}-${String(value).padStart(6, "0")}`
}

/** RCPT-2026-000045 */
export async function generateReceiptNumber(_tx?: any) {
  const year = new Date().getFullYear()
  const value = await nextValue(`RECEIPT-${year}`)
  return `RCPT-${year}-${String(value).padStart(6, "0")}`
}

/** APT-2026-000045 — shown to patients as their appointment reference. */
export async function generateAppointmentCode(_tx?: any) {
  const year = new Date().getFullYear()
  const value = await nextValue(`APPOINTMENT-${year}`)
  return `APT-${year}-${String(value).padStart(6, "0")}`
}

/** RX-2026-000045 */
export async function generatePrescriptionNumber(_tx?: any) {
  const year = new Date().getFullYear()
  const value = await nextValue(`PRESCRIPTION-${year}`)
  return `RX-${year}-${String(value).padStart(6, "0")}`
}
