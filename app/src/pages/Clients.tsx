import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { PortfolioMixChart } from "@/components/dashboard/charts/PortfolioMixChart";
import { AccountTypeDonut } from "@/components/clients/charts/AccountTypeDonut";
import { TwoSliceDonut } from "@/components/charts/TwoSliceDonut";
import {
  type Period,
  type Agency,
  PERIOD_COMPARISON_LABEL,
  clientBaseByPeriod,
  comptesByPeriod,
  accountTypeDonutByPeriod,
  portfolioMixByPeriod,
  clientSegmentByPeriod,
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
  const [agency, setAgency] = useState<Agency>("all");

  const clientBase = clientBaseByPeriod[period][agency];
  const comptes = comptesByPeriod[period][agency];
  const accountTypeDonutData = accountTypeDonutByPeriod[period][agency];
  const portfolioMix = portfolioMixByPeriod[period][agency];
  const clientSegment = clientSegmentByPeriod[period][agency];
  const comparisonLabel = PERIOD_COMPARISON_LABEL[period];
  const SEGMENT_COLORS = ["var(--chart-3)", "var(--chart-6)", "var(--chart-1)"];

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

          <a href="/comptes-bancaires" className="block rounded-[1.25rem] transition-opacity hover:opacity-90">
            <KpiCard
              label="Comptes Bancaires Liés"
              pill={<>{comptes.typesDistincts} types</>}
              value={fmtNum(comptes.ouverts)}
              footLeft="Portefeuille consolidé"
              footRight={<span className="font-semibold text-blue-400">Détail →</span>}
            />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <a href="/comptes-bancaires" className="block rounded-[1.25rem] transition-opacity hover:opacity-90">
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

                <span className="self-start text-xs font-semibold text-blue-400">
                  Détail des {comptes.typesDistincts} types de comptes →
                </span>
              </div>
            </Card>
          </a>

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

        <Card className="space-y-5 rounded-[1.25rem] border-border bg-card p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2">
            <div>
              <h2 className="text-base font-semibold text-slate-300">Segmentation Métier de la Clientèle</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Regroupement en 3 grands segments d'activité — Retail / SFD &amp; Institutionnels / Corporate &amp; Pro
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-[220px_1fr] sm:items-center">
            <TwoSliceDonut
              data={clientSegment}
              nameKey="segment"
              valueKey="value"
              unit="%"
              colors={SEGMENT_COLORS}
            />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {clientSegment.map((row, index) => (
                <div key={row.segment} className="rounded-[0.875rem] border border-white/5 bg-secondary/40 p-3">
                  <span className="flex items-center gap-1.5 whitespace-nowrap text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: SEGMENT_COLORS[index % SEGMENT_COLORS.length] }}
                    />
                    {row.segment}
                  </span>
                  <div className="mt-2 text-xl font-semibold text-white tabular-nums">{fmtNum(row.count)}</div>
                  <p className="mt-1 text-xs text-muted-foreground">{fmtPct(row.value)} de la base</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </main>
    </>
  );
}
