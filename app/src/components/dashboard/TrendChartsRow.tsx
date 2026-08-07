import { Card } from "@/components/ui/card";
import { NplTrendChart } from "@/components/dashboard/charts/NplTrendChart";
import { PortfolioMixChart } from "@/components/dashboard/charts/PortfolioMixChart";
import { NetPositionChart } from "@/components/dashboard/charts/NetPositionChart";
import {
  type Period,
  clientBaseByPeriod,
  creditRisqueByPeriod,
  positionNetteByPeriod,
  fmtMds,
  fmtNum,
  fmtPct,
} from "@/lib/period-data";

function LegendDot({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 whitespace-nowrap">
      <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: color }} />
      <span>{children}</span>
    </div>
  );
}

export function TrendChartsRow({ period = "mois" }: { period?: Period }) {
  const clientBase = clientBaseByPeriod[period];
  const creditRisque = creditRisqueByPeriod[period];
  const positionNette = positionNetteByPeriod[period];

  return (
    <div className="grid grid-cols-1 gap-3 sm:gap-5 lg:grid-cols-3">
      <Card className="rounded-[1.25rem] border-border bg-card p-4 sm:p-5">
        <div className="mb-1 flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Évolution du Taux NPL
          </h3>
          <span className="text-xs font-semibold text-rose-400">{fmtPct(creditRisque.nplPct)}</span>
        </div>
        <NplTrendChart />
        <div className="flex items-center justify-between pt-1 text-[11px] font-medium text-muted-foreground">
          <LegendDot color="var(--chart-2)">Taux NPL</LegendDot>
          <LegendDot color="var(--chart-5)">Plafond BCEAO</LegendDot>
        </div>
      </Card>

      <Card className="rounded-[1.25rem] border-border bg-card p-4 sm:p-5">
        <div className="mb-1 flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Répartition du Portefeuille
          </h3>
          <span className="text-xs font-semibold text-white">{fmtNum(clientBase.total)} clients</span>
        </div>
        <PortfolioMixChart />
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 pt-1 text-[11px] font-medium text-muted-foreground">
          <LegendDot color="var(--chart-3)">Particuliers {fmtPct(clientBase.particuliersPct)}</LegendDot>
          <LegendDot color="var(--chart-1)">Entreprises {fmtPct(clientBase.entreprisesPct)}</LegendDot>
          <LegendDot color="var(--chart-2)">Banques 3,8%</LegendDot>
          <LegendDot color="var(--chart-4)">Associations 0,7%</LegendDot>
          <LegendDot color="var(--chart-5)">Autres 0,2%</LegendDot>
          <LegendDot color="var(--chart-6)">Cotitulaires 0,1%</LegendDot>
        </div>
      </Card>

      <Card className="rounded-[1.25rem] border-border bg-card p-4 sm:p-5">
        <div className="mb-1 flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Position Nette — Flux
          </h3>
          <span className="text-xs font-semibold text-rose-400">{fmtMds(positionNette.solde)} Mds</span>
        </div>
        <NetPositionChart />
        <div className="flex items-center justify-between pt-1 text-[11px] font-medium text-muted-foreground">
          <LegendDot color="var(--chart-3)">Entrants</LegendDot>
          <LegendDot color="var(--chart-2)">Sortants</LegendDot>
        </div>
        <div className="mt-2 flex items-center justify-between border-t border-border pt-2 text-[11px] font-medium text-muted-foreground">
          <span>
            Volume total : <strong className="font-semibold text-white">{fmtMds(positionNette.volumeTotal)} Mds</strong>
          </span>
          <span>
            Virements RTGS : <strong className="font-semibold text-white">{fmtMds(positionNette.virementsRtgs)} Mds</strong>
          </span>
        </div>
      </Card>
    </div>
  );
}
