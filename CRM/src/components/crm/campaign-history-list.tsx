import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDateTime } from "@/lib/format"
import type { getCampaigns } from "@/actions/broadcasts"

type Campaigns = Awaited<ReturnType<typeof getCampaigns>>

const statusColors: Record<string, string> = {
  DRAFT: "bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
  QUEUED: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
  SENT: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
  FAILED: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300",
}

export function CampaignHistoryList({ campaigns }: { campaigns: Campaigns }) {
  return (
    <Card>
      <CardHeader><CardTitle className="text-base">Campaign History</CardTitle></CardHeader>
      <CardContent className="p-0">
        {campaigns.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">No campaigns yet.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Template</TableHead>
                <TableHead>Audience</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Delivered / Failed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((c) => {
                const delivered = c.recipients.filter((r) => r.status === "DELIVERED").length
                const failed = c.recipients.filter((r) => r.status === "FAILED").length
                return (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell>{c.template?.name ?? "—"}</TableCell>
                    <TableCell>{c.audienceCount}</TableCell>
                    <TableCell>{formatDateTime(c.createdAt)}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={statusColors[c.status]}>{c.status}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      <span className="text-emerald-600">{delivered} delivered</span>
                      {" · "}
                      <span className="text-red-600">{failed} failed</span>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
