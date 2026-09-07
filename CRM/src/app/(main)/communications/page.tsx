import Link from "next/link"
import { MessageCircle } from "lucide-react"
import { getMessages } from "@/actions/crm"
import { getMessageTemplates, getCampaigns, getWhatsappConnectionStatus } from "@/actions/broadcasts"
import { listAllTags } from "@/actions/patients"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CommunicationsFilters } from "@/components/crm/communications-filters"
import { CommunicationsList } from "@/components/crm/communications-list"
import { LogMessageDialog } from "@/components/crm/log-message-dialog"
import { BroadcastWizard } from "@/components/crm/broadcast-wizard"
import { CampaignHistoryList } from "@/components/crm/campaign-history-list"

export default async function CommunicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ channel?: string }>
}) {
  const sp = await searchParams
  const [messages, templates, campaigns, connection, tags] = await Promise.all([
    getMessages({ channel: sp.channel }),
    getMessageTemplates(),
    getCampaigns(),
    getWhatsappConnectionStatus(),
    listAllTags(),
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Communication Center</h1>
          <p className="text-sm text-muted-foreground">SMS, Email, WhatsApp, and call logs across all patients.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            className="gap-2"
            nativeButton={false}
            render={
              <Link href="/communications/whatsapp">
                <MessageCircle className="h-4 w-4 text-emerald-600" /> WhatsApp Bulk Messaging
              </Link>
            }
          />
        </div>
      </div>

      <Tabs defaultValue="log">
        <TabsList>
          <TabsTrigger value="log">Message Log</TabsTrigger>
          <TabsTrigger value="broadcasts">Broadcasts</TabsTrigger>
        </TabsList>

        <TabsContent value="log" className="mt-4 space-y-4">
          <div className="flex justify-end">
            <LogMessageDialog />
          </div>
          <CommunicationsFilters />
          <Card>
            <CardContent className="p-0">
              <CommunicationsList messages={messages} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="broadcasts" className="mt-4 space-y-6">
          <BroadcastWizard templates={templates} tags={tags} connection={connection} />
          <CampaignHistoryList campaigns={campaigns} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
