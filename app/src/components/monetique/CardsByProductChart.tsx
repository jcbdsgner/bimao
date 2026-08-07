import { Pie, PieChart, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
const chartConfig = {
  count: { label: "Cartes" },
  "Visa Classic": { label: "Visa Classic", color: "var(--chart-3)" },
  "GIM Prépayée": { label: "GIM Prépayée", color: "var(--chart-1)" },
  "Visa Gold / Business": { label: "Visa Gold / Business", color: "var(--chart-6)" },
  "Mastercard Standard": { label: "Mastercard Standard", color: "var(--chart-4)" },
} satisfies ChartConfig;

export function CardsByProductChart({
  data,
}: {
  data: { product: string; count: number; fill: string }[];
}) {
  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-auto h-[160px] w-full">
      <PieChart>
        <ChartTooltip
          content={<ChartTooltipContent nameKey="product" formatter={(value) => [`${value} cartes`, ""]} />}
        />
        <Pie
          data={data}
          dataKey="count"
          nameKey="product"
          innerRadius={40}
          outerRadius={64}
          strokeWidth={2}
          stroke="var(--card)"
        >
          {data.map((entry) => (
            <Cell key={entry.product} fill={entry.fill} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
