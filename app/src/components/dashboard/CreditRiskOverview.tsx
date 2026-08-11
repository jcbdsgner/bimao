import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type Period, type Agency, creditRisqueByPeriod, fmtMds, fmtPct } from "@/lib/period-data";

export function CreditRiskOverview({ period = "mois", agency = "all" }: { period?: Period; agency?: Agency }) {
  const data = creditRisqueByPeriod[period][agency];
  const restructuresPct = round1(100 - data.sainsPct - data.nplPct);

  const rows = [
    {
      dot: "bg-rose-500",
      label: "Douteux / Contentieux",
      strongLabel: true,
      count: `${data.impayesDouteux.count} (${fmtPct((data.impayesDouteux.count / data.impayesTotalCount) * 100)})`,
      amount: `${fmtMds(data.impayesDouteux.montant)} Mds FCFA`,
      amountStrong: true,
    },
    {
      dot: "bg-slate-500",
      label: "Sains (En retard)",
      strongLabel: false,
      count: `${data.impayesSains.count} (${fmtPct((data.impayesSains.count / data.impayesTotalCount) * 100)})`,
      amount: `${fmtMds(data.impayesSains.montant)} Md FCFA`,
      amountStrong: false,
    },
  ];

  return (
    <Card className="space-y-6 rounded-[1.25rem] border-border bg-card p-4 sm:p-6 lg:col-span-7">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
        <h3 className="text-base font-semibold text-slate-300">
          Aperçu Synthétique Crédits &amp; Impayés
        </h3>
        <a
          href="/credit-risque"
          className="whitespace-nowrap text-xs font-semibold text-blue-400 transition-colors hover:text-blue-300"
        >
          Analyse approfondie →
        </a>
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap justify-between gap-x-2 gap-y-1 text-xs font-medium text-muted-foreground">
          <span>Niveau de risque global</span>
          <span className="tabular-nums">Taux NPL: {fmtPct(data.nplPct)} (Plafond BCEAO &lt; 15%)</span>
        </div>

        <div className="flex h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div className="h-full bg-emerald-500" style={{ width: `${data.sainsPct}%` }} />
          <div className="h-full bg-rose-500" style={{ width: `${data.nplPct}%` }} />
          <div className="h-full bg-slate-500" style={{ width: `${restructuresPct}%` }} />
        </div>

        <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 pt-1 text-xs font-medium text-muted-foreground">
          <div className="flex items-center space-x-2 whitespace-nowrap">
            <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
            <span>
              Sains : <strong className="text-white">{fmtMds(data.sainsMds)} Mds ({fmtPct(data.sainsPct)})</strong>
            </span>
          </div>
          <div className="flex items-center space-x-2 whitespace-nowrap">
            <span className="h-2 w-2 shrink-0 rounded-full bg-rose-500" />
            <span>
              NPL : <strong className="text-white">{fmtMds(data.douteuxMds)} Mds ({fmtPct(data.nplPct)})</strong>
            </span>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <span className="mb-3 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Synthèse des impayés ({data.impayesTotalCount} dossiers)
        </span>
        <div className="overflow-x-auto">
          <Table className="min-w-[420px] text-xs">
            <TableHeader>
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-muted-foreground">Statut Dossier</TableHead>
                <TableHead className="text-right text-muted-foreground">Dossiers</TableHead>
                <TableHead className="text-right text-muted-foreground">Montant Impayé</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.label} className="border-white/5 text-slate-300 hover:bg-transparent">
                  <TableCell className="flex items-center space-x-2 whitespace-nowrap py-3">
                    <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${row.dot}`} />
                    <span className={row.strongLabel ? "font-medium text-white" : ""}>{row.label}</span>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{row.count}</TableCell>
                  <TableCell
                    className={`text-right tabular-nums ${row.amountStrong ? "font-semibold text-white" : "text-white"}`}
                  >
                    {row.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
}

function round1(value: number) {
  return Math.round(value * 10) / 10;
}
