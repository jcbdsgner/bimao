import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { PortfolioMixChart } from "@/components/dashboard/charts/PortfolioMixChart";
import { AccountTypeDonut } from "@/components/clients/charts/AccountTypeDonut";
import {
  type Period,
  PERIOD_COMPARISON_LABEL,
  clientBaseByPeriod,
  comptesByPeriod,
  accountTypeDonutByPeriod,
  portfolioMixByPeriod,
  fmtNum,
  fmtPct,
  fmtSigned,
} from "@/lib/period-data";

const DONUT_COLORS = [
  "var(--chart-3)",
  "var(--chart-1)",
  "var(--chart-4)",
  "var(--chart-6)",
  "var(--chart-2)",
  "var(--chart-5)",
];

const PORTFOLIO_COLORS = [
  "var(--chart-3)",
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
];

export function Clients() {
  const [period, setPeriod] = useState<Period>("mois");

  const clientBase = clientBaseByPeriod[period];
  const comptes = comptesByPeriod[period];
  const accountTypeDonutData = accountTypeDonutByPeriod[period];
  const portfolioMix = portfolioMixByPeriod[period];
  const comparisonLabel = PERIOD_COMPARISON_LABEL[period];

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
              MODULE SPÉCIALISÉ — BASE CLIENTÈLE
            </span>
            <h1 className="mt-0.5 text-2xl font-bold tracking-tight text-white">
              Analyse Détaillée du Portefeuille Clients
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
          <KpiCard
            label="Base Clientèle Totale"
            pill={
              <>
                <span className="text-emerald-400">↑</span> {fmtSigned(clientBase.growthPct)} vs {comparisonLabel}
              </>
            }
            value={fmtNum(clientBase.total)}
            footLeft={
              <>
                Particuliers: <strong className="font-semibold text-slate-300">{fmtPct(clientBase.particuliersPct)}</strong>
              </>
            }
            footRight={
              <>
                Entreprises: <strong className="font-semibold text-slate-300">{fmtPct(clientBase.entreprisesPct)}</strong>
              </>
            }
          />

          <KpiCard
            label="Comptes Bancaires Liés"
            pill={<>{comptes.typesDistincts} types</>}
            value={fmtNum(comptes.ouverts)}
            footLeft="Portefeuille consolidé"
            footRight={
              <a href="/comptes-bancaires" className="font-semibold text-blue-400 hover:text-blue-300">
                Détail →
              </a>
            }
          />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Card className="space-y-5 rounded-[1.25rem] border-border bg-card p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2">
              <div>
                <h2 className="text-base font-semibold text-slate-300">Répartition par Type de Compte</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {fmtNum(comptes.ouverts)} comptes, {comptes.typesDistincts} types référencés
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 pt-1">
              <AccountTypeDonut data={accountTypeDonutData} total={comptes.ouverts} />

              <div className="w-full space-y-2 text-xs">
                {accountTypeDonutData.map((row, index) => (
                  <div key={row.type} className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 whitespace-nowrap">
                      <span
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: DONUT_COLORS[index % DONUT_COLORS.length] }}
                      />
                      <strong className="font-semibold text-white">{row.type}</strong>
                    </span>
                    <span className="tabular-nums text-muted-foreground">
                      {fmtNum(row.total)} ({fmtPct(row.value)})
                    </span>
                  </div>
                ))}
              </div>

              <a
                href="/comptes-bancaires"
                className="self-start text-xs font-semibold text-blue-400 hover:text-blue-300"
              >
                Détail des {comptes.typesDistincts} types de comptes →
              </a>
            </div>
          </Card>

          <Card className="space-y-4 rounded-[1.25rem] border-border bg-card p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-1">
              <h2 className="text-base font-semibold text-slate-300">Répartition par Segment Client</h2>
            </div>

            <PortfolioMixChart data={portfolioMix} />

            <div className="space-y-2 pt-1 text-xs font-medium">
              {portfolioMix.map((row, index) => (
                <div key={row.segment} className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 whitespace-nowrap text-muted-foreground">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: PORTFOLIO_COLORS[index % PORTFOLIO_COLORS.length] }}
                    />
                    {row.segment}
                  </span>
                  <span className="tabular-nums text-white">
                    {fmtNum(row.count)} ({fmtPct(row.value)})
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
