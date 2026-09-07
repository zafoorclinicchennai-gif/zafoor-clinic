import { getSupabase } from "@/lib/supabase"

export async function nextValue(key: string, _tx?: any) {
  const supabase = getSupabase()
  const { data: existing } = await supabase
    .from("Counter")
    .select("value")
    .eq("key", key)
    .maybeSingle()

  const nextVal = (existing?.value ?? 0) + 1
  const { error } = await supabase
    .from("Counter")
    .upsert({ key, value: nextVal })

  if (error) {
    console.error("[nextValue] Counter upsert error:", error)
  }

  return nextVal
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
