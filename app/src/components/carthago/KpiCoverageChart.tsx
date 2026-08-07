import { Cell, Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { carthagoAutoCount, carthagoManuelCount, carthagoAutoPct, carthagoManuelPct } from "@/lib/mock-data";

const chartConfig = {
  auto: { label: "Nativement géré par Carthago", color: "var(--chart-3)" },
  manuel: { label: "Chantiers d'automatisation prioritaires", color: "var(--chart-5)" },
} satisfies ChartConfig;

const pctFormat = (value: number) => `${value.toLocaleString("fr-FR", { maximumFractionDigits: 1 })}%`;

const kpiSplitData = [
  { key: "auto", label: "Nativement géré par Carthago", value: carthagoAutoCount, pct: pctFormat(carthagoAutoPct) },
  {
    key: "manuel",
    label: "Chantiers d'automatisation prioritaires",
    value: carthagoManuelCount,
    pct: pctFormat(carthagoManuelPct),
  },
];

export function KpiCoverageChart() {
  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
      <ChartContainer config={chartConfig} className="aspect-square h-[176px] shrink-0">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent nameKey="key" hideLabel className="min-w-64" />} />
          <Pie
            data={kpiSplitData}
            dataKey="value"
            nameKey="key"
            innerRadius={54}
            outerRadius={80}
            strokeWidth={3}
            stroke="var(--card)"
          >
            {kpiSplitData.map((entry) => (
              <Cell key={entry.key} fill={`var(--color-${entry.key})`} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>

      <div className="flex w-full flex-col gap-3">
        {kpiSplitData.map((entry) => (
          <div
            key={entry.key}
            className="flex items-center justify-between gap-3 rounded-lg border border-white/5 bg-secondary/40 px-3 py-2.5"
          >
            <div className="flex items-center gap-2 text-[12px] font-medium text-muted-foreground">
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: `var(--color-${entry.key})` }}
              />
              {entry.label}
            </div>
            <div className="flex items-baseline gap-1.5 whitespace-nowrap">
              <span className="text-sm font-semibold text-white tabular-nums">{entry.value}</span>
              <span className="text-[11px] text-muted-foreground">KPIs</span>
              <span className="text-[11px] font-semibold text-slate-300 tabular-nums">{entry.pct}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
