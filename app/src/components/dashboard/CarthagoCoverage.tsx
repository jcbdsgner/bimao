import { Card } from "@/components/ui/card";
import {
  carthagoKpiTotal,
  carthagoAutoCount,
  carthagoManuelCount,
  carthagoAutoPct,
  carthagoManuelPct,
} from "@/lib/mock-data";

const pctFormat = (value: number) => `${value.toLocaleString("fr-FR", { maximumFractionDigits: 1 })}%`;

export function CarthagoCoverage() {
  return (
    <Card className="space-y-5 rounded-[1.25rem] border-border bg-card p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
        <h3 className="text-base font-semibold text-slate-300">Couverture Carthago</h3>
        <a
          href="/carthago-gap"
          className="whitespace-nowrap text-xs font-semibold text-blue-400 transition-colors hover:text-white"
        >
          Audit {carthagoKpiTotal} KPIs →
        </a>
      </div>

      <div className="space-y-3 text-xs font-medium">
        <div className="flex flex-wrap justify-between gap-x-2 gap-y-1">
          <span className="whitespace-nowrap text-muted-foreground">Automatisé (Système) :</span>
          <span className="tabular-nums text-white">
            {carthagoAutoCount} / {carthagoKpiTotal} ({pctFormat(carthagoAutoPct)})
          </span>
        </div>
        <div className="flex flex-wrap justify-between gap-x-2 gap-y-1">
          <span className="whitespace-nowrap text-muted-foreground">Manuel (Excel) :</span>
          <span className="tabular-nums text-white">
            {carthagoManuelCount} / {carthagoKpiTotal} ({pctFormat(carthagoManuelPct)})
          </span>
        </div>
      </div>

      <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div className="h-full bg-blue-400" style={{ width: `${carthagoAutoPct}%` }} />
        <div className="h-full bg-slate-600" style={{ width: `${carthagoManuelPct}%` }} />
      </div>
    </Card>
  );
}
