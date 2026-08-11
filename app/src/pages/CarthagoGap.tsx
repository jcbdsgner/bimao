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
import { DomainCoverageChart } from "@/components/carthago/DomainCoverageChart";
import { KpiCoverageChart } from "@/components/carthago/KpiCoverageChart";
import {
  carthagoKpis,
  carthagoKpiTotal,
  carthagoAutoCount,
  carthagoManuelCount,
  carthagoAutoPct,
  carthagoManuelPct,
} from "@/lib/mock-data";

const pctFormat = (value: number) => `${value.toLocaleString("fr-FR", { maximumFractionDigits: 1 })}%`;

export function CarthagoGap() {
  return (
    <>
      <Header
      />
      <main className="max-w-[1400px] space-y-6 p-4 sm:space-y-8 sm:p-8">
        <div className="flex flex-col justify-between gap-4 border-b border-border pb-5 sm:flex-row sm:items-center">
          <div>
            <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              GOUVERNANCE SI &amp; MATURITÉ INFORMATIQUE
            </span>
            <h1 className="mt-0.5 text-2xl font-bold tracking-tight text-white">
              Carthago Gap Analysis ({carthagoKpiTotal} KPIs)
            </h1>
          </div>
          <div className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-white/5 bg-white/5 px-4 py-2 text-right text-sm font-bold text-white">
            <span className="mr-2 text-amber-400">●</span>
            <span className="tabular-nums">{pctFormat(carthagoManuelPct)} Manuel (Excel)</span>
          </div>
        </div>

        <div className="space-y-4">
          <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Baromètre de Couverture Système
          </span>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
            <Card className="col-span-2 flex min-h-[130px] flex-col justify-between rounded-[1.25rem] border-border bg-card p-4 sm:col-span-1 sm:p-5">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[12px]">
                Total des KPIs Métier
              </span>
              <div className="mt-2 text-2xl font-semibold tracking-tight text-white tabular-nums sm:text-3xl">
                {carthagoKpiTotal}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Indicateurs de pilotage DG</p>
            </Card>

            <Card className="flex min-h-[130px] flex-col justify-between rounded-[1.25rem] border-border bg-card p-4 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-1">
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[12px]">
                  Automatisé (Carthago)
                </span>
                <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-lg border border-white/5 bg-secondary/60 px-2.5 py-1 text-[11px] font-semibold text-slate-300">
                  <span className="text-emerald-400">●</span> {pctFormat(carthagoAutoPct)}
                </span>
              </div>
              <div className="mt-2 text-2xl font-semibold tracking-tight text-white tabular-nums sm:text-3xl">
                {carthagoAutoCount} <span className="text-sm font-medium text-slate-500">KPIs</span>
              </div>
              <p className="mt-2 text-xs font-medium text-emerald-400">Extraction automatique native</p>
            </Card>

            <Card className="flex min-h-[130px] flex-col justify-between rounded-[1.25rem] border-border bg-card p-4 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-1">
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[12px]">
                  Traitement Manuel (Excel)
                </span>
                <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-lg border border-white/5 bg-secondary/60 px-2.5 py-1 text-[11px] font-semibold text-slate-300">
                  <span className="text-amber-400">●</span> {pctFormat(carthagoManuelPct)}
                </span>
              </div>
              <div className="mt-2 text-2xl font-semibold tracking-tight text-white tabular-nums sm:text-3xl">
                {carthagoManuelCount} <span className="text-sm font-medium text-slate-500">KPIs</span>
              </div>
              <p className="mt-2 text-xs font-medium text-amber-400">Calculs manuels / Risque d'erreur</p>
            </Card>
          </div>

          <Card className="space-y-4 rounded-[1.25rem] border-border bg-card p-4 sm:p-5">
            <div className="flex flex-wrap justify-between gap-x-2 gap-y-1 text-xs font-medium text-muted-foreground">
              <span>Répartition du traitement des {carthagoKpiTotal} KPIs</span>
              <span className="tabular-nums text-slate-300">
                <strong className="text-white">{carthagoAutoCount}</strong> Automatisés vs{" "}
                <strong className="text-white">{carthagoManuelCount}</strong> Manuels
              </span>
            </div>

            <KpiCoverageChart />
          </Card>

          <Card className="space-y-3 rounded-[1.25rem] border-border bg-card p-4 sm:p-5">
            <div className="flex flex-wrap justify-between gap-x-2 gap-y-1 text-xs font-medium text-muted-foreground">
              <span>Couverture d'automatisation par domaine métier</span>
            </div>
            <DomainCoverageChart />
          </Card>
        </div>

        <Card className="space-y-5 rounded-[1.25rem] border-border bg-card p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2">
            <div>
              <h2 className="text-base font-semibold text-slate-300">
                Cartographie complète d'écart (Source : Gap_analyse_KPI.xlsx)
              </h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Détail des méthodes de calcul et sources de données par domaine
              </p>
            </div>
            <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-white/5 bg-white/5 px-2 py-0.5 text-[11px] font-semibold text-slate-300">
              Audit SI Carthago
            </span>
          </div>

          <div className="overflow-x-auto pt-2">
            <Table className="min-w-[720px] text-xs">
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Domaine</TableHead>
                  <TableHead className="text-muted-foreground">Intitulé du KPI</TableHead>
                  <TableHead className="text-center text-muted-foreground">Carthago Native ?</TableHead>
                  <TableHead className="text-muted-foreground">Méthode / Formule de calcul appliquée</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {carthagoKpis.map((row, i) => (
                  <TableRow key={i} className="border-border/50 text-slate-300 hover:bg-transparent">
                    <TableCell className="font-medium text-white">{row.domaine}</TableCell>
                    <TableCell>{row.kpi}</TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-lg border border-white/5 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-slate-300">
                        {row.natif ? (
                          <>
                            <span className="text-emerald-400">●</span> OUI
                          </>
                        ) : (
                          <>
                            <span className="text-slate-400">●</span> NON (Excel)
                          </>
                        )}
                      </span>
                    </TableCell>
                    <TableCell className="font-mono text-muted-foreground">{row.methode}</TableCell>
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
