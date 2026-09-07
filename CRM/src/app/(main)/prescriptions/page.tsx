import { getPrescriptions } from "@/actions/patients"
import { Card, CardContent } from "@/components/ui/card"
import { PrescriptionFilters } from "@/components/patients/profile/prescription-filters"
import { PrescriptionListTable } from "@/components/patients/profile/prescription-list-table"
import { Pagination } from "@/components/shared/pagination"

export default async function PrescriptionsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; from?: string; to?: string; page?: string }>
}) {
  const sp = await searchParams
  const page = Number(sp.page) || 1
  const { prescriptions, total, pageSize } = await getPrescriptions({
    query: sp.query,
    from: sp.from,
    to: sp.to,
    page,
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Prescriptions</h1>
        <p className="text-sm text-muted-foreground">
          {total} prescription{total === 1 ? "" : "s"} across all patients — search by name, UHID, or date.
        </p>
      </div>

      <PrescriptionFilters />

      <Card>
        <CardContent className="p-0">
          <PrescriptionListTable prescriptions={prescriptions} />
        </CardContent>
      </Card>

      <Pagination total={total} pageSize={pageSize} currentPage={page} />
    </div>
  )
}
