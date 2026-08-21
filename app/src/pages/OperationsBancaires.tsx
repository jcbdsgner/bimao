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
import { TwoSliceDonut } from "@/components/charts/TwoSliceDonut";
import { DailyCashOps } from "@/components/dashboard/DailyCashOps";
import {
  type Period,
  type Agency,
  operationsBancairesByPeriod,
  monetiqueByPeriod,
  fmtMds,
  fmtNum,
  fmtPct,
} from "@/lib/period-data";

const VOLUME_COLORS = ["var(--chart-3)", "var(--chart-1)", "var(--chart-4)", "var(--chart-6)"];

export function OperationsBancaires() {
  const [period, setPeriod] = useState<Period>("mois");
  const [agency, setAgency] = useState<Agency>("all");
  const data = operationsBancairesByPeriod[period][agency];
  const monetique = monetiqueByPeriod[period][agency];

  const rows = [
    { label: "Virements Émis", count: data.virementsEmis.count, montant: data.virementsEmis.montantMds, taux: null as number | null },
    { label: "Virements Reçus", count: data.virementsRecus.count, montant: data.virementsRecus.montantMds, taux: null as number | null },
    {
      label: "dont Virements RTGS (interbancaires)",
      count: data.virementsRtgs.count,
      montant: data.virementsRtgs.montantMds,
      taux: null as number | null,
      muted: true,
    },
    { label: "Virements Rejetés", count: data.virementsRejetes.count, montant: data.virementsRejetes.montantMds, taux: data.tauxRejetVirements },
    { label: "Chèques Émis", count: data.chequesEmis.count, montant: data.chequesEmis.montantMds, taux: null as number | null },
    {
      label: "Chèques Encaissés (Compensation)",
      count: data.chequesEncaisses.count,
      montant: data.chequesEncaisses.montantMds,
      taux: null as number | null,
    },
    { label: "Chèques Rejetés / Impayés", count: data.chequesRejetes.count, montant: data.chequesRejetes.montantMds, taux: data.tauxRejetCheques },
    { label: "Prélèvements Émis", count: data.prelevementsEmis.count, montant: data.prelevementsEmis.montantMds, taux: null as number | null },
    {
      label: "Prélèvements Rejetés",
      count: data.prelevementsRejetes.count,
      montant: data.prelevementsRejetes.montantMds,
      taux: data.tauxRejetPrelevements,
    },
    { label: "Effets Domiciliés", count: data.effetsDomicilies.count, montant: data.effetsDomicilies.montantMds, taux: null as number | null },
    {
      label: "Effets Encaissés",
      count: data.effetsEncaisses.count,
      montant: data.effetsEncaisses.montantMds,
      taux: null as number | null,
    },
    { label: "Effets Impayés", count: data.effetsImpayes.count, montant: data.effetsImpayes.montantMds, taux: data.tauxImpayesEffets },
  ];

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
              MODULE SPÉCIALISÉ — OPÉRATIONS BANCAIRES
            </span>
            <h1 className="mt-0.5 text-2xl font-bold tracking-tight text-white">
              Suivi des Opérations Bancaires
            </h1>
          </div>
          <div className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-white/5 bg-white/5 px-4 py-2 text-right text-sm font-bold text-white">
            <span className="mr-2 text-emerald-400">●</span>
            <span className="tabular-nums">{fmtNum(data.operationsTotalCount)} opérations traitées</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-5">
          <Card className="flex min-h-[140px] flex-col justify-between rounded-[1.25rem] border-border bg-card p-4 sm:p-5">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[12px]">
              Virements
            </span>
            <div className="mt-2 flex items-baseline gap-1 text-2xl font-semibold tracking-tight text-white tabular-nums sm:text-3xl">
              {fmtMds(data.volumeByType[0].montant)} <span className="text-sm font-medium text-slate-500">Mds FCFA</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {fmtNum(data.virementsEmis.count + data.virementsRecus.count)} opérations
            </p>
          </Card>

          <Card className="flex min-h-[140px] flex-col justify-between rounded-[1.25rem] border-border bg-card p-4 sm:p-5">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[12px]">
              Chèques
            </span>
            <div className="mt-2 flex items-baseline gap-1 text-2xl font-semibold tracking-tight text-white tabular-nums sm:text-3xl">
              {fmtMds(data.volumeByType[1].montant)} <span className="text-sm font-medium text-slate-500">Mds FCFA</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {fmtNum(data.chequesEmis.count + data.chequesEncaisses.count)} opérations
            </p>
          </Card>

          <Card className="flex min-h-[140px] flex-col justify-between rounded-[1.25rem] border-border bg-card p-4 sm:p-5">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[12px]">
              Prélèvements
            </span>
            <div className="mt-2 flex items-baseline gap-1 text-2xl font-semibold tracking-tight text-white tabular-nums sm:text-3xl">
              {fmtMds(data.volumeByType[2].montant)} <span className="text-sm font-medium text-slate-500">Mds FCFA</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{fmtNum(data.prelevementsEmis.count)} prélèvements émis</p>
          </Card>

          <Card className="flex min-h-[140px] flex-col justify-between rounded-[1.25rem] border-border bg-card p-4 sm:p-5">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[12px]">
              Effets de Commerce
            </span>
            <div className="mt-2 flex items-baseline gap-1 text-2xl font-semibold tracking-tight text-white tabular-nums sm:text-3xl">
              {fmtMds(data.volumeByType[3].montant)} <span className="text-sm font-medium text-slate-500">Mds FCFA</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{fmtNum(data.effetsDomicilies.count)} effets domiciliés</p>
          </Card>

          <a href="/monetique-cartes" className="block rounded-[1.25rem] transition-opacity hover:opacity-90">
            <Card className="flex min-h-[140px] flex-col justify-between rounded-[1.25rem] border-border bg-card p-4 sm:p-5">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[12px]">
                Cartes Bancaires
              </span>
              <div className="mt-2 flex items-baseline gap-1 text-2xl font-semibold tracking-tight text-white tabular-nums sm:text-3xl">
                {fmtMds(monetique.volumeM)} <span className="text-sm font-medium text-slate-500">M FCFA</span>
              </div>
              <p className="mt-2 text-xs font-semibold text-blue-400">
                {fmtNum(monetique.transactions)} tx GAB/TPE · Détail →
              </p>
            </Card>
          </a>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <Card className="space-y-6 rounded-[1.25rem] border-border bg-card p-4 sm:p-6 lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2">
              <div>
                <h2 className="text-base font-semibold text-slate-300">Détail des Opérations</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Virements, chèques, prélèvements et effets de commerce — volumes et montants sur la période
                </p>
              </div>
            </div>

            <div className="overflow-x-auto pt-1">
              <Table className="min-w-[560px] text-xs">
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground">Type d'Opération</TableHead>
                    <TableHead className="text-right text-muted-foreground">Nombre</TableHead>
                    <TableHead className="text-right text-muted-foreground">Montant</TableHead>
                    <TableHead className="text-right text-muted-foreground">Taux de Rejet</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.label} className="border-border/50 text-slate-300 hover:bg-transparent">
                      <TableCell className={row.muted ? "pl-6 text-muted-foreground" : "font-medium text-white"}>
                        {row.label}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">{fmtNum(row.count)}</TableCell>
                      <TableCell className={`text-right tabular-nums ${row.muted ? "text-muted-foreground" : "text-white"}`}>
                        {fmtMds(row.montant)} Mds
                      </TableCell>
                      <TableCell
                        className={`text-right tabular-nums ${
                          row.taux !== null && row.taux > 5 ? "font-medium text-rose-400" : "text-muted-foreground"
                        }`}
                      >
                        {row.taux !== null ? fmtPct(row.taux, 2) : "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter className="bg-transparent">
                  <TableRow className="border-border hover:bg-transparent">
                    <TableCell className="font-semibold text-white">Volume total réconcilié</TableCell>
                    <TableCell className="text-right tabular-nums font-semibold text-white">
                      {fmtNum(data.operationsTotalCount)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums font-semibold text-white">
                      {fmtMds(data.volumeTotalMds)} Mds
                    </TableCell>
                    <TableCell />
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </Card>

          <div className="space-y-6 lg:col-span-5">
            <Card className="space-y-5 rounded-[1.25rem] border-border bg-card p-4 sm:p-6">
              <div className="border-b border-border pb-2">
                <h3 className="text-base font-semibold text-slate-300">Répartition du Volume</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">Par nature d'opération, en montant traité</p>
              </div>

              <TwoSliceDonut
                data={data.volumeByType}
                nameKey="type"
                valueKey="montant"
                unit="Mds FCFA"
                colors={VOLUME_COLORS}
              />

              <div className="space-y-2 text-xs">
                {data.volumeByType.map((row, index) => (
                  <div key={row.type} className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 whitespace-nowrap text-muted-foreground">
                      <span
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: VOLUME_COLORS[index % VOLUME_COLORS.length] }}
                      />
                      {row.type}
                    </span>
                    <span className="tabular-nums text-white">
                      {fmtMds(row.montant)} Mds ({fmtPct((row.montant / data.volumeTotalMds) * 100)})
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="space-y-4 rounded-[1.25rem] border-border bg-card p-4 sm:p-6">
              <div className="border-b border-border pb-2">
                <h3 className="text-base font-semibold text-slate-300">Causes de Rejet</h3>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Chèques
                  </span>
                  <div className="space-y-2 text-xs">
                    {data.causesRejetCheques.map((row) => (
                      <div key={row.cause} className="flex items-center justify-between gap-2">
                        <span className="text-muted-foreground">{row.cause}</span>
                        <span className="tabular-nums text-white">{fmtNum(row.count)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Prélèvements
                  </span>
                  <div className="space-y-2 text-xs">
                    {data.causesRejetPrelevements.map((row) => (
                      <div key={row.cause} className="flex items-center justify-between gap-2">
                        <span className="text-muted-foreground">{row.cause}</span>
                        <span className="tabular-nums text-white">{fmtNum(row.count)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <DailyCashOps agency={agency} />
      </main>
    </>
  );
}
