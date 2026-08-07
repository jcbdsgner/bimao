import { Pie, PieChart, Cell } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
const chartConfig = {
  value: { label: "Part des comptes" },
} satisfies ChartConfig;

const COLORS = [
  "var(--chart-3)",
  "var(--chart-1)",
  "var(--chart-4)",
  "var(--chart-6)",
  "var(--chart-2)",
  "var(--chart-5)",
];

export function AccountTypeDonut({
  data,
  total,
}: {
  data: { type: string; total: number; value: number }[];
  total: number;
}) {
  return (
    <div className="relative mx-auto aspect-square w-[180px] shrink-0">
      <ChartContainer config={chartConfig} className="aspect-square h-[180px] w-[180px]">
        <PieChart>
          <ChartTooltip
            content={<ChartTooltipContent nameKey="type" formatter={(value) => [`${Number(value).toFixed(1)}%`, ""]} />}
          />
          <Pie
            data={data}
            dataKey="value"
            nameKey="type"
            innerRadius={58}
            outerRadius={88}
            strokeWidth={2}
            stroke="var(--card)"
          >
            {data.map((entry, index) => (
              <Cell key={entry.type} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-semibold text-white tabular-nums">{total.toLocaleString("fr-FR")}</span>
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground">comptes</span>
      </div>
    </div>
  );
}
