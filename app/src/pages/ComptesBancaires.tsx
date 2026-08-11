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
import { type Period, type Agency, comptesByPeriod, fmtNum, fmtPct } from "@/lib/period-data";

export function ComptesBancaires() {
  const [period, setPeriod] = useState<Period>("mois");
  const [agency, setAgency] = useState<Agency>("all");
  const comptes = comptesByPeriod[period][agency];

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
              MODULE SPÉCIALISÉ — GESTION DES COMPTES CLIENTS
            </span>
            <h1 className="mt-0.5 text-2xl font-bold tracking-tight text-white">
              Comptes Bancaires — Gestion &amp; Analyse
            </h1>
          </div>
          <div className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-white/5 bg-white/5 px-4 py-2 text-right text-sm font-bold text-white">
            <span className="mr-2 text-emerald-400">●</span>
            <span className="tabular-nums">{fmtPct(comptes.actifsPct)} de comptes actifs</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
          <Card className="flex min-h-[130px] flex-col justify-between rounded-[1.25rem] border-border bg-card p-4 sm:p-5">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[12px]">
              Comptes Ouverts
            </span>
            <div className="mt-2 text-2xl font-semibold tracking-tight text-white tabular-nums sm:text-3xl">
              {fmtNum(comptes.ouverts)}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Portefeuille total consolidé</p>
          </Card>

          <Card className="flex min-h-[130px] flex-col justify-between rounded-[1.25rem] border-border bg-card p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-1">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[12px]">
                Actifs
              </span>
              <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-lg border border-white/5 bg-secondary/60 px-2.5 py-1 text-[11px] font-semibold text-slate-300">
                <span className="text-emerald-400">●</span> {fmtPct(comptes.actifsPct)}
              </span>
            </div>
            <div className="mt-2 text-2xl font-semibold tracking-tight text-white tabular-nums sm:text-3xl">
              {fmtNum(comptes.actifs)}
            </div>
            <p className="mt-2 text-xs font-medium text-emerald-400">Comptes avec activité récente</p>
          </Card>

          <Card className="flex min-h-[130px] flex-col justify-between rounded-[1.25rem] border-border bg-card p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-1">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[12px]">
                Clôturés
              </span>
              <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-lg border border-white/5 bg-secondary/60 px-2.5 py-1 text-[11px] font-semibold text-slate-300">
                <span className="text-slate-400">●</span> {fmtPct(comptes.cloturesPct)}
              </span>
            </div>
            <div className="mt-2 text-2xl font-semibold tracking-tight text-white tabular-nums sm:text-3xl">
              {fmtNum(comptes.clotures)}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Sorties définitives de portefeuille</p>
          </Card>

          <Card className="flex min-h-[130px] flex-col justify-between rounded-[1.25rem] border-border bg-card p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-1">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[12px]">
                En Clôture
              </span>
              <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-lg border border-white/5 bg-secondary/60 px-2.5 py-1 text-[11px] font-semibold text-slate-300">
                <span className="text-amber-400">●</span> WaitingClosing
              </span>
            </div>
            <div className="mt-2 text-2xl font-semibold tracking-tight text-white tabular-nums sm:text-3xl">
              {fmtNum(comptes.enCloture)}
            </div>
            <p className="mt-2 text-xs font-medium text-amber-400">Procédure de clôture en cours</p>
          </Card>

          <Card className="col-span-2 flex min-h-[130px] flex-col justify-between rounded-[1.25rem] border-border bg-card p-4 sm:col-span-1 sm:p-5">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[12px]">
              Types Distincts
            </span>
            <div className="mt-2 text-2xl font-semibold tracking-tight text-white tabular-nums sm:text-3xl">
              {comptes.typesDistincts}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Types de comptes référencés</p>
          </Card>
        </div>

        <Card className="space-y-3 rounded-[1.25rem] border-border bg-card p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-xs font-medium text-muted-foreground">
            <span>Répartition des {fmtNum(comptes.ouverts)} comptes ouverts par statut</span>
          </div>

          <div className="flex h-3 w-full gap-0.5 overflow-hidden rounded-full border border-secondary bg-secondary">
            <div
              className="flex h-full items-center justify-center overflow-hidden whitespace-nowrap px-1 text-[11px] font-bold text-slate-950"
              style={{ width: `${comptes.actifsPct}%`, backgroundColor: "var(--chart-1)" }}
              title={`${fmtNum(comptes.actifs)} comptes actifs (${fmtPct(comptes.actifsPct)})`}
            >
              {fmtPct(comptes.actifsPct)}
            </div>
            <div
              className="h-full overflow-hidden whitespace-nowrap"
              style={{ width: `${comptes.cloturesPct}%`, backgroundColor: "var(--chart-5)" }}
              title={`${fmtNum(comptes.clotures)} comptes clôturés (${fmtPct(comptes.cloturesPct)})`}
            />
            <div
              className="h-full overflow-hidden whitespace-nowrap"
              style={{ width: `${comptes.enCloturePct}%`, backgroundColor: "var(--chart-4)" }}
              title={`${fmtNum(comptes.enCloture)} comptes en clôture (${fmtPct(comptes.enCloturePct)})`}
            />
          </div>

          <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 pt-1 text-[12px] font-medium text-muted-foreground">
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" /> Actifs — {fmtNum(comptes.actifs)} (
              {fmtPct(comptes.actifsPct)})
            </span>
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="h-2 w-2 shrink-0 rounded-full bg-slate-500" /> Clôturés — {fmtNum(comptes.clotures)} (
              {fmtPct(comptes.cloturesPct)})
            </span>
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="h-2 w-2 shrink-0 rounded-full bg-amber-500" /> En clôture — {fmtNum(comptes.enCloture)} (
              {fmtPct(comptes.enCloturePct)})
            </span>
          </div>
        </Card>

        <Card className="space-y-5 rounded-[1.25rem] border-border bg-card p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2">
            <div>
              <h2 className="text-base font-semibold text-slate-300">Comptes par type — Top 10</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Détail par produit sur {comptes.typesDistincts} types de comptes référencés
              </p>
            </div>
            <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-white/5 bg-white/5 px-2 py-0.5 text-[11px] font-semibold text-slate-300">
              10 / {comptes.typesDistincts} types
            </span>
          </div>

          <div className="overflow-x-auto pt-2">
            <Table className="min-w-[720px] text-xs">
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Type de compte</TableHead>
                  <TableHead className="text-right text-muted-foreground">Nb Total</TableHead>
                  <TableHead className="text-right text-muted-foreground">Actifs</TableHead>
                  <TableHead className="text-right text-muted-foreground">Clôturés</TableHead>
                  <TableHead className="text-right text-muted-foreground">Solde total (XOF)</TableHead>
                  <TableHead className="text-center text-muted-foreground">Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comptes.parType.map((row) => (
                  <TableRow key={row.type} className="border-border/50 text-slate-300 hover:bg-transparent">
                    <TableCell className="font-mono font-medium text-white">{row.type}</TableCell>
                    <TableCell className="text-right tabular-nums text-white">{fmtNum(row.total)}</TableCell>
                    <TableCell className="text-right tabular-nums">{fmtNum(row.actifs)}</TableCell>
                    <TableCell className="text-right tabular-nums">{fmtNum(row.clotures)}</TableCell>
                    <TableCell
                      className={`text-right tabular-nums font-medium ${
                        row.solde < 0 ? "text-rose-400" : "text-white"
                      }`}
                    >
                      {fmtNum(row.solde)}
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-lg border border-white/5 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-slate-300">
                        {row.statut === "Sain" ? (
                          <>
                            <span className="text-emerald-400">●</span> Sain
                          </>
                        ) : (
                          <>
                            <span className="text-rose-400">●</span> Déficit
                          </>
                        )}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </main>
    </>
  );
}
