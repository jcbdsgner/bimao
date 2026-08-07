import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CardsByProductChart } from "@/components/monetique/CardsByProductChart";
import { type Period, monetiqueByPeriod, fmtMds, fmtNum, fmtPct } from "@/lib/period-data";

export function MonetiqueCartes() {
  const [period, setPeriod] = useState<Period>("mois");
  const data = monetiqueByPeriod[period];

  return (
    <>
      <Header
        title="Tableau de Pilotage Exécutif"
        subtitle="Données arrêtées au 31 Janvier 2026"
        period={period}
        onPeriodChange={(value) => setPeriod(value as Period)}
      />
      <main className="max-w-[1400px] space-y-6 p-4 sm:space-y-8 sm:p-8">
        <div className="flex flex-col justify-between gap-4 border-b border-border pb-5 sm:flex-row sm:items-center">
          <div>
            <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              MODULE SPÉCIALISÉ — MONÉTIQUE &amp; PAIEMENTS CARTE
            </span>
            <h1 className="mt-0.5 text-2xl font-bold tracking-tight text-white">
              Monétique — Cartes &amp; Transactions GAB/TPE
            </h1>
          </div>
          <div className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-white/5 bg-white/5 px-4 py-2 text-right text-sm font-bold text-white">
            <span className="mr-2 text-emerald-400">●</span>
            <span className="tabular-nums">{fmtPct(data.failureRate, 2)} taux d'échec</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          <Card className="flex min-h-[130px] flex-col justify-between rounded-lg border-border bg-card p-4 sm:p-5">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[12px]">
              Transactions Monétiques
            </span>
            <div className="mt-2 text-2xl font-semibold tracking-tight text-white tabular-nums sm:text-3xl">
              {data.transactions}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Mouvements GAB/TPE sur la période</p>
          </Card>

          <Card className="flex min-h-[130px] flex-col justify-between rounded-lg border-border bg-card p-4 sm:p-5">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[12px]">
              Volume Transactions
            </span>
            <div className="mt-2 flex items-baseline gap-1 text-2xl font-semibold tracking-tight text-white tabular-nums sm:text-3xl">
              {fmtMds(data.volumeM)} <span className="text-sm font-medium text-slate-500">M FCFA</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Cumul période sélectionnée</p>
          </Card>

          <Card className="flex min-h-[130px] flex-col justify-between rounded-lg border-border bg-card p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[12px]">
                Taux d'échec monétique
              </span>
              <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-white/5 bg-white/5 px-2 py-0.5 text-[11px] font-semibold text-slate-300">
                <span className="text-emerald-400">●</span> Sous seuil
              </span>
            </div>
            <div className="mt-2 text-2xl font-semibold tracking-tight text-white tabular-nums sm:text-3xl">
              {fmtPct(data.failureRate, 2)}
            </div>
            <p className="mt-2 text-xs font-medium text-emerald-400">Seuil de vigilance : 2,0%</p>
          </Card>

          <Card className="flex min-h-[130px] flex-col justify-between rounded-lg border-border bg-card p-4 sm:p-5">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[12px]">
              TX Authorization
            </span>
            <div className="mt-2 text-2xl font-semibold tracking-tight text-white tabular-nums sm:text-3xl">
              {data.txAuthorization}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Demandes d'autorisation traitées</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <Card className="space-y-6 rounded-lg border-border bg-card p-4 sm:p-6 lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2">
              <div>
                <h2 className="text-base font-semibold text-slate-300">Types de Transactions Monétiques</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Répartition des mouvements GAB/TPE par nature d'opération
                </p>
              </div>
              <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-white/5 bg-white/5 px-2 py-0.5 text-[11px] font-semibold text-slate-300">
                {data.transactionTotal.count} tx au total
              </span>
            </div>

            <div className="overflow-x-auto pt-1">
              <Table className="min-w-[480px] text-xs">
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground">Type Transaction</TableHead>
                    <TableHead className="text-right text-muted-foreground">Transactions</TableHead>
                    <TableHead className="text-right text-muted-foreground">Volume FCFA</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.transactionTypes.map((row) => (
                    <TableRow key={row.type} className="border-border/50 text-slate-300 hover:bg-transparent">
                      <TableCell className={row.muted ? "text-muted-foreground" : "font-medium text-white"}>
                        {row.type}
                      </TableCell>
                      <TableCell className={`text-right tabular-nums ${row.muted ? "text-muted-foreground" : ""}`}>
                        {row.count}
                      </TableCell>
                      <TableCell className={`text-right tabular-nums ${row.muted ? "text-muted-foreground" : "text-white"}`}>
                        {fmtNum(row.volume)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter className="bg-transparent">
                  <TableRow className="border-border hover:bg-transparent">
                    <TableCell className="font-semibold text-white">Total réconcilié</TableCell>
                    <TableCell className="text-right tabular-nums font-semibold text-white">
                      {data.transactionTotal.count}
                    </TableCell>
                    <TableCell className="text-right tabular-nums font-semibold text-white">
                      {fmtNum(data.transactionTotal.volume)}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>

            <div className="space-y-2 rounded-[0.875rem] border border-white/5 bg-secondary/40 p-4 text-xs text-muted-foreground">
              <span className="mb-1 block font-semibold text-slate-300">Performance Réseau :</span>
              <p>
                • <strong className="text-white">Taux de Disponibilité GAB :</strong> 98,4% d'uptime
              </p>
              <p>
                • <strong className="text-white">Incidents Monétiques :</strong> 1 seul rejet sur carte expirée
                ({fmtPct(data.failureRate, 2)})
              </p>
            </div>
          </Card>

          <Card className="space-y-6 rounded-lg border-border bg-card p-4 sm:p-6 lg:col-span-5">
            <div className="border-b border-border pb-2">
              <h3 className="text-base font-semibold text-slate-300">Cartes par Produit</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Répartition indicative (donnée simulée — non fournie par l'export source)
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <div className="flex flex-col justify-between rounded-[0.875rem] border border-white/5 bg-secondary/40 p-2.5 sm:p-4">
                <span className="text-[11px] font-semibold uppercase text-muted-foreground sm:text-[12px]">
                  Cartes Émises
                </span>
                <span className="mt-2 text-lg font-semibold text-white tabular-nums sm:text-2xl">
                  {fmtNum(data.cardsEmitted)}
                </span>
                <span className="mt-1 text-[11px] font-medium text-muted-foreground sm:text-[12px]">
                  Cumul historique
                </span>
              </div>
              <div className="flex flex-col justify-between rounded-[0.875rem] border border-white/5 bg-secondary/40 p-2.5 sm:p-4">
                <span className="text-[11px] font-semibold uppercase text-emerald-400 sm:text-[12px]">
                  Cartes Actives
                </span>
                <span className="mt-2 text-lg font-semibold text-white tabular-nums sm:text-2xl">
                  {fmtNum(data.cardsActive)}
                </span>
                <span className="mt-1 text-[11px] font-medium text-emerald-400 sm:text-[12px]">
                  {fmtPct(data.cardsActivationRate)} taux d'activation
                </span>
              </div>
            </div>

            <CardsByProductChart data={data.cardsByProduct} />

            <div className="space-y-2 text-xs">
              {data.cardsByProduct.map((entry) => (
                <div key={entry.product} className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 whitespace-nowrap">
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: entry.fill }} />
                    <strong className="font-semibold text-white">{entry.product}</strong>
                  </span>
                  <span className="whitespace-nowrap tabular-nums text-muted-foreground">
                    {fmtNum(entry.count)} ({fmtPct(entry.part)})
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </>
  );
}
