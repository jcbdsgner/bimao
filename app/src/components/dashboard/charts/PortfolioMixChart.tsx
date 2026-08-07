import { Pie, PieChart, Cell } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { portfolioMix } from "@/lib/mock-data";

const chartConfig = {
  value: { label: "Part du portefeuille" },
  particuliers: { label: "Particuliers", color: "var(--chart-3)" },
  entreprises: { label: "Entreprises", color: "var(--chart-1)" },
  banques: { label: "Banques", color: "var(--chart-2)" },
  associations: { label: "Associations", color: "var(--chart-4)" },
  autres: { label: "Autres", color: "var(--chart-5)" },
  cotitulaires: { label: "Cotitulaires", color: "var(--chart-6)" },
} satisfies ChartConfig;

const COLORS = [
  "var(--chart-3)",
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
];

export function PortfolioMixChart({ data = portfolioMix }: { data?: { segment: string; value: number }[] }) {
  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-auto h-[180px] w-full">
      <PieChart>
        <ChartTooltip
          content={<ChartTooltipContent nameKey="segment" formatter={(value) => [`${value}%`, ""]} />}
        />
        <Pie
          data={data}
          dataKey="value"
          nameKey="segment"
          innerRadius={44}
          outerRadius={70}
          strokeWidth={2}
          stroke="var(--card)"
        >
          {data.map((entry, index) => (
            <Cell key={entry.segment} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
