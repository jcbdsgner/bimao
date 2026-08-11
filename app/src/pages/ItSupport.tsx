import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TicketsByPriorityChart } from "@/components/it-support/TicketsByPriorityChart";
import {
  itSystemAvailability,
  openTickets,
  type TicketPriority,
  type TicketStatus,
} from "@/lib/mock-data-it-support";
import { type Period, type Agency, itSupportByPeriod, fmtPct } from "@/lib/period-data";

const PRIORITY_STYLES: Record<TicketPriority, string> = {
  Basse: "text-slate-400",
  Moyenne: "text-blue-400",
  Haute: "text-amber-400",
  "Très haute": "text-rose-400",
};

const STATUS_STYLES: Record<TicketStatus, string> = {
  Nouveau: "text-blue-400",
  "En cours (Attribué)": "text-amber-400",
  "En attente": "text-slate-400",
  Résolu: "text-emerald-400",
  Clos: "text-emerald-400",
};

export function ItSupport() {
  const [period, setPeriod] = useState<Period>("mois");
  const [agency, setAgency] = useState<Agency>("all");
  const itSupportSummary = itSupportByPeriod[period][agency];

  return (
    <>
      <Header
        period={period}
        onPeriodChange={(value) => setPeriod(value as Period)}
        agency={agency}
        onAgencyChange={(value) => setAgency(value as Agency)}
      />
      <main className="max-w-[1400px] space-y-6 p-4 sm:space-y-8 sm:p-8">
        <div className="flex flex-col justify-between gap-4 border-b border-border pb-5 sm:flex-row sm:items-center">
          <div>
            <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              MODULE SPÉCIALISÉ — SUPPORT &amp; INFRASTRUCTURE IT
            </span>
            <h1 className="mt-0.5 text-2xl font-bold tracking-tight text-white">Tickets &amp; Incidents Support</h1>
          </div>
          <div className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-white/5 bg-white/5 px-4 py-2 text-right text-sm font-bold text-white">
            <span className="mr-2 text-emerald-400">●</span>
            <span className="tabular-nums">{fmtPct(itSupportSummary.resolutionRate)} de résolution</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          <Card className="flex min-h-[140px] flex-col justify-between rounded-lg border-border bg-card p-4 sm:p-5">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[12px]">
              Tickets Total
            </span>
            <div className="mt-2 text-2xl font-semibold tracking-tight text-white tabular-nums sm:text-3xl">
              {itSupportSummary.totalTickets}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Sur la période sélectionnée</p>
          </Card>

          <Card className="flex min-h-[140px] flex-col justify-between rounded-lg border-border border-l-3 border-l-amber-500 bg-card p-4 sm:p-5">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[12px]">
              Ouverts / En cours
            </span>
            <div className="mt-2 text-2xl font-semibold tracking-tight text-white tabular-nums sm:text-3xl">
              {itSupportSummary.openInProgress}
            </div>
            <p className="mt-2 text-xs font-medium text-amber-400">⚠ À traiter</p>
          </Card>

          <Card className="flex min-h-[140px] flex-col justify-between rounded-lg border-border bg-card p-4 sm:p-5">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[12px]">
              Résolus / Clos
            </span>
            <div className="mt-2 text-2xl font-semibold tracking-tight text-white tabular-nums sm:text-3xl">
              {itSupportSummary.resolvedClosed}
            </div>
            <p className="mt-2 text-xs font-medium text-emerald-400">↑ {fmtPct(itSupportSummary.resolutionRate)} résolution</p>
          </Card>

          <Card className="flex min-h-[140px] flex-col justify-between rounded-lg border-border border-l-3 border-l-rose-600 bg-card p-4 sm:p-5">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[12px]">
              Incidents Très Haute
            </span>
            <div className="mt-2 text-2xl font-semibold tracking-tight text-white tabular-nums sm:text-3xl">
              {itSupportSummary.criticalIncidents}
            </div>
            <p className="mt-2 text-xs font-medium text-rose-400">Priorité critique</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <Card className="space-y-5 rounded-lg border-border bg-card p-4 sm:p-6 lg:col-span-5">
            <div className="border-b border-border pb-2">
              <h2 className="text-base font-semibold text-slate-300">Tickets par priorité</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">Répartition du backlog par niveau d'urgence</p>
            </div>

            <TicketsByPriorityChart data={itSupportSummary.ticketsByPriority} />

            <div className="space-y-2 rounded-md border border-white/5 bg-secondary/40 p-4 text-xs text-muted-foreground">
              <span className="mb-1 block font-semibold text-slate-300">Synthèse Support IT :</span>
              <p>
                • <strong className="text-white">Taux de résolution :</strong> {fmtPct(itSupportSummary.resolutionRate)}
                des tickets clos sur la période.
              </p>
              <p>
                • <strong className="text-rose-400">{itSupportSummary.criticalIncidents} incidents de priorité très haute</strong> nécessitent un suivi
                DSI rapproché.
              </p>
              <p className="border-t border-white/5 pt-2 text-[12px]">
                • <strong className="text-slate-300">Disponibilité du système IT :</strong>{" "}
                {itSystemAvailability.available ? (
                  <span className="text-emerald-400">disponible</span>
                ) : (
                  <span className="italic text-slate-500">
                    donnée à connecter (KPI manuel Excel, formule : {itSystemAvailability.formule})
                  </span>
                )}
              </p>
            </div>
          </Card>

          <Card className="space-y-5 rounded-lg border-border bg-card p-4 sm:p-6 lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2">
              <div>
                <h2 className="text-base font-semibold text-slate-300">Tickets ouverts actifs</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  File active — priorité et statut de traitement
                </p>
              </div>
              <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-white/5 bg-white/5 px-2 py-0.5 text-[11px] font-semibold text-slate-300">
                1 - {openTickets.length} / {openTickets.length}
              </span>
            </div>

            <div className="overflow-x-auto pt-1">
              <Table className="min-w-[480px] text-xs">
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground">ID</TableHead>
                    <TableHead className="text-muted-foreground">Titre</TableHead>
                    <TableHead className="text-muted-foreground">Priorité</TableHead>
                    <TableHead className="text-muted-foreground">Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {openTickets.map((ticket) => (
                    <TableRow key={ticket.id} className="border-border/50 text-slate-300 hover:bg-transparent">
                      <TableCell className="font-medium text-white tabular-nums">{ticket.id}</TableCell>
                      <TableCell className="max-w-[220px] truncate">{ticket.titre}</TableCell>
                      <TableCell className={`font-medium ${PRIORITY_STYLES[ticket.priorite]}`}>
                        {ticket.priorite}
                      </TableCell>
                      <TableCell className={`font-medium ${STATUS_STYLES[ticket.statut]}`}>
                        {ticket.statut}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </main>
    </>
  );
}
