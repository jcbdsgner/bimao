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
import { TwoSliceDonut } from "@/components/charts/TwoSliceDonut";
import { type Period, creditRisqueByPeriod, fmtMds, fmtPct, fmtSigned } from "@/lib/period-data";

const NPL_SCALE_MAX = 50; // échelle de référence de la jauge réglementaire (fixe)
const NPL_PLAFOND = 15;

export function CreditRisque() {
  const [period, setPeriod] = useState<Period>("mois");
  const data = creditRisqueByPeriod[period];

  const impayesRows = [
    {
      dot: "bg-rose-500",
      label: "Douteux / Contentieux",
      labelStrong: true,
      risque: <span className="font-medium text-rose-400">NPL</span>,
      count: `${data.impayesDouteux.count} (${fmtPct((data.impayesDouteux.count / data.impayesTotalCount) * 100)})`,
      countClass: "font-medium text-white",
      amount: `${fmtMds(data.impayesDouteux.montant)} Mds FCFA`,
      amountClass: "font-semibold text-white",
      retard: "> 180 jours",
      procedure: "Recouvrement Forcé",
    },
    {
      dot: "bg-slate-500",
      label: "Sains (En retard)",
      labelStrong: false,
      risque: <span className="font-medium text-slate-400">Sain</span>,
      count: `${data.impayesSains.count} (${fmtPct((data.impayesSains.count / data.impayesTotalCount) * 100)})`,
      countClass: "text-white",
      amount: `${fmtMds(data.impayesSains.montant)} Md FCFA`,
      amountClass: "text-white",
      retard: "30 à 90 jours",
      procedure: "Relance Amiable",
    },
    {
      dot: "bg-slate-600",
      label: "Restructurés",
      labelStrong: false,
      labelMuted: true,
      risque: <span className="font-medium text-slate-500">Restr.</span>,
      count: `${data.impayesRestructures.count} (${fmtPct((data.impayesRestructures.count / data.impayesTotalCount) * 100)})`,
      countClass: "text-muted-foreground",
      amount: `${fmtMds(data.impayesRestructures.montant)} Md FCFA`,
      amountClass: "text-muted-foreground",
      retard: "Rééchelonné",
      procedure: "Suivi Échéancier",
    },
  ];

  const plafondWidthPct = (NPL_PLAFOND / NPL_SCALE_MAX) * 100;
  const overshootWidthPct = (data.depassementPts / NPL_SCALE_MAX) * 100;

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
              MODULE SPÉCIALISÉ — RISQUE &amp; PORTEFEUILLE DE CRÉDIT
            </span>
            <h1 className="mt-0.5 text-2xl font-bold tracking-tight text-white">
              Analyse Détaillée du Risque &amp; Recouvrement
            </h1>
          </div>
          <div className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-white/5 bg-white/5 px-4 py-2 text-right text-sm font-bold text-white">
            <span className="mr-2 text-rose-400">●</span>
            <span className="tabular-nums">{fmtPct(data.nplPct)} NPL ({fmtMds(data.douteuxMds)} Mds)</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          <Card className="flex min-h-[140px] flex-col justify-between rounded-[1.25rem] border-border bg-card p-4 sm:p-5">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[12px]">
              Crédits Accordés (Cumul)
            </span>
            <div className="mt-2 flex items-baseline gap-1 text-2xl font-semibold tracking-tight text-white tabular-nums sm:text-3xl">
              {fmtMds(data.creditsAccordesMds)} <span className="text-sm font-medium text-slate-500">Mds FCFA</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">100% Historique signé</p>
          </Card>

          <Card className="flex min-h-[140px] flex-col justify-between rounded-[1.25rem] border-border bg-card p-4 sm:p-5">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[12px]">
              Encours Sains Restants
            </span>
            <div className="mt-2 flex items-baseline gap-1 text-2xl font-semibold tracking-tight text-white tabular-nums sm:text-3xl">
              {fmtMds(data.sainsMds)} <span className="text-sm font-medium text-slate-500">Mds FCFA</span>
            </div>
            <p className="mt-2 text-xs font-medium text-emerald-400">{fmtPct(data.sainsPct)} de capital restants dûs</p>
          </Card>

          <Card className="flex min-h-[140px] flex-col justify-between rounded-[1.25rem] border-border border-l-3 border-l-rose-600 bg-card p-4 sm:p-5">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[12px]">
              Créances Douteuses (NPL)
            </span>
            <div className="mt-2 flex items-baseline gap-1 text-2xl font-semibold tracking-tight text-white tabular-nums sm:text-3xl">
              {fmtMds(data.douteuxMds)} <span className="text-sm font-medium text-slate-500">Mds FCFA</span>
            </div>
            <p className="mt-2 text-xs font-medium text-rose-400">Capital total exposé ({fmtPct(data.nplPct)})</p>
          </Card>

          <Card className="flex min-h-[140px] flex-col justify-between rounded-[1.25rem] border-border bg-card p-4 sm:p-5">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[12px]">
              Provisions Constituées
            </span>
            <div className="mt-2 flex items-baseline gap-1 text-2xl font-semibold tracking-tight text-white tabular-nums sm:text-3xl">
              {fmtMds(data.provisionsMds)} <span className="text-sm font-medium text-slate-500">Mds FCFA</span>
            </div>
            <p className="mt-2 text-xs font-medium text-blue-400">Taux de couverture : {fmtPct(data.couverturePct)}</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <Card className="space-y-6 rounded-[1.25rem] border-border bg-card p-4 sm:p-6 lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2">
              <div>
                <h2 className="text-base font-semibold text-slate-300">
                  Dossiers d'Impayés en Recouvrement ({data.impayesTotalCount} cas / {fmtMds(data.impayesTotalMontant)} Mds)
                </h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Échéances échues et non payées sous suivi opérationnel
                </p>
              </div>
              <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-white/5 bg-white/5 px-2 py-0.5 text-[11px] font-semibold text-slate-300">
                Chantier d'action
              </span>
            </div>

            <div className="overflow-x-auto pt-1">
              <Table className="min-w-[640px] text-xs">
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground">Classification</TableHead>
                    <TableHead className="text-center text-muted-foreground">Risque</TableHead>
                    <TableHead className="text-right text-muted-foreground">Dossiers</TableHead>
                    <TableHead className="text-right text-muted-foreground">Montant Impayé</TableHead>
                    <TableHead className="text-center text-muted-foreground">Retard Moyen</TableHead>
                    <TableHead className="text-center text-muted-foreground">Procédure Engagée</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {impayesRows.map((row) => (
                    <TableRow key={row.label} className="border-border/50 text-slate-300 hover:bg-transparent">
                      <TableCell className="flex items-center space-x-2 whitespace-nowrap py-3.5">
                        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${row.dot}`} />
                        <span className={row.labelStrong ? "font-medium text-white" : row.labelMuted ? "text-muted-foreground" : ""}>
                          {row.label}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">{row.risque}</TableCell>
                      <TableCell className={`text-right tabular-nums ${row.countClass}`}>{row.count}</TableCell>
                      <TableCell className={`text-right tabular-nums ${row.amountClass}`}>{row.amount}</TableCell>
                      <TableCell className="text-center text-muted-foreground">{row.retard}</TableCell>
                      <TableCell className="text-center">
                        <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-lg border border-white/5 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-slate-300">
                          {row.procedure}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="grid grid-cols-1 gap-4 border-t border-border pt-4 sm:grid-cols-2">
              <div className="space-y-4 rounded-[0.875rem] border border-white/5 bg-secondary/40 p-4">
                <span className="block text-sm font-semibold text-slate-300">Répartition NPL par Segment</span>
                <TwoSliceDonut
                  data={data.nplBySegment}
                  nameKey="segment"
                  valueKey="montant"
                  unit="Mds FCFA"
                  colors={["var(--chart-3)", "var(--chart-1)"]}
                />
                <div className="space-y-2 text-xs">
                  {data.nplBySegment.map((row, index) => (
                    <div key={row.segment} className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-1.5 whitespace-nowrap text-muted-foreground">
                        <span
                          className="h-2 w-2 shrink-0 rounded-full"
                          style={{ backgroundColor: index === 0 ? "var(--chart-3)" : "var(--chart-1)" }}
                        />
                        {row.segment}
                      </span>
                      <span className="tabular-nums text-white">
                        {fmtMds(row.montant)} Mds ({fmtPct((row.montant / data.douteuxMds) * 100)})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4 rounded-[0.875rem] border border-white/5 bg-secondary/40 p-4">
                <span className="block text-sm font-semibold text-slate-300">Couverture par Sûretés</span>
                <TwoSliceDonut
                  data={data.nplByCoverage}
                  nameKey="type"
                  valueKey="montant"
                  unit="Mds FCFA"
                  colors={["var(--chart-1)", "var(--chart-2)"]}
                />
                <div className="space-y-2 text-xs">
                  {data.nplByCoverage.map((row, index) => (
                    <div key={row.type} className="flex items-center justify-between gap-2">
                      <span
                        className={`flex items-center gap-1.5 whitespace-nowrap ${
                          index === 1 ? "text-rose-400" : "text-muted-foreground"
                        }`}
                      >
                        <span
                          className="h-2 w-2 shrink-0 rounded-full"
                          style={{ backgroundColor: index === 0 ? "var(--chart-1)" : "var(--chart-2)" }}
                        />
                        {row.type}
                      </span>
                      <span className="tabular-nums text-white">
                        {fmtMds(row.montant)} Mds ({fmtPct((row.montant / data.douteuxMds) * 100)})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <div className="space-y-6 lg:col-span-5">
            <Card className="space-y-5 rounded-[1.25rem] border-border bg-card p-4 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
                <div>
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    CONFORMITÉ PRUDENTIELLE
                  </span>
                  <h3 className="mt-0.5 text-base font-bold text-white">Ratio de Créances Douteuses (NPL)</h3>
                </div>
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-rose-500/30 bg-secondary/60 px-2.5 py-1 text-[11px] font-bold text-rose-400">
                  <span className="text-rose-500">●</span> {fmtSigned(data.depassementPts)} de dépassement
                </span>
              </div>

              <div className="flex flex-wrap items-baseline justify-between gap-3 pt-1 text-xs">
                <div>
                  <span className="block whitespace-nowrap text-[12px] font-medium text-slate-400">Taux NPL Actuel BIMAO</span>
                  <span className="text-2xl font-bold text-white tabular-nums">{fmtPct(data.nplPct)}</span>
                </div>
                <div className="text-right">
                  <span className="block whitespace-nowrap text-[12px] font-medium text-slate-400">Plafond Règlementaire BCEAO</span>
                  <span className="text-base font-bold text-emerald-400 tabular-nums">{NPL_PLAFOND},0% Max</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="relative w-full">
                  <div className="flex h-6 overflow-hidden rounded-full border border-secondary bg-secondary">
                    <div
                      className="flex h-full items-center justify-end overflow-hidden whitespace-nowrap px-2 pr-2 text-[11px] font-bold text-slate-950"
                      style={{ width: `${plafondWidthPct}%`, backgroundColor: "var(--chart-1)" }}
                    >
                      {NPL_PLAFOND},0%
                    </div>
                    <div
                      className="flex h-full items-center justify-center overflow-hidden whitespace-nowrap px-1 text-[11px] font-bold text-white"
                      style={{ width: `${overshootWidthPct}%`, backgroundColor: "var(--chart-2)" }}
                    >
                      {fmtSigned(data.depassementPts)} Hors-Norme
                    </div>
                  </div>
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"
                    style={{ left: `${plafondWidthPct}%` }}
                  />
                </div>

                <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 pt-1 text-[12px] font-medium text-slate-400">
                  <span className="flex items-center gap-1.5 whitespace-nowrap">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" /> Seuil Toléré (0 - {NPL_PLAFOND},0%)
                  </span>
                  <span className="flex items-center gap-1.5 whitespace-nowrap">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-rose-500" /> Zone de Sur-Risque ({fmtSigned(data.depassementPts)})
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 rounded-[0.875rem] border border-white/5 bg-secondary/40 p-4 text-xs text-slate-300">
                <span className="block font-semibold text-white">Diagnostic Réglementaire :</span>
                <p>
                  Le portefeuille dépasse le plafond réglementaire de {NPL_PLAFOND},0% de{" "}
                  <strong className="text-rose-400">{fmtMds(data.depassementPts)} points de pourcentage</strong> ({fmtMds(data.douteuxMds)} Mds FCFA exposés).
                </p>
                <p className="text-[12px] text-slate-400">
                  • <strong className="text-slate-200">Impact Fonds Propres :</strong> Exigence de provisionnement
                  complémentaire obligatoire sous peine de sanction BCEAO.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
