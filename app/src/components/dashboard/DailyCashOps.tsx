import { Card } from "@/components/ui/card";
import { type Agency, dailyCashOpsByAgency, fmtMds, fmtNum, fmtPct } from "@/lib/period-data";

export function DailyCashOps({ agency = "all" }: { agency?: Agency }) {
  const { date, depots, retraits, soldeNetM } = dailyCashOpsByAgency[agency];

  return (
    <Card className="space-y-5 rounded-[1.25rem] border-border bg-card p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
        <div>
          <h3 className="text-base font-semibold text-slate-300">Dépôts &amp; Retraits — Guichet</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">Opérations espèces du {date}</p>
        </div>
        <span
          className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-white/5 bg-white/5 px-2 py-0.5 text-[11px] font-semibold ${
            soldeNetM >= 0 ? "text-emerald-400" : "text-rose-400"
          }`}
        >
          {soldeNetM >= 0 ? "↑" : "↓"} Solde net {soldeNetM >= 0 ? "+" : ""}
          {fmtMds(soldeNetM)} M FCFA
        </span>
      </div>

      <div className="space-y-4 text-xs font-medium">
        <div>
          <div className="mb-2 flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
            <span className="whitespace-nowrap text-muted-foreground">Dépôts ({fmtPct(depots.sharePct)})</span>
            <span className="tabular-nums text-white">
              {fmtNum(depots.count)} opérations / {fmtMds(depots.montantM)} M FCFA
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <div className="h-full bg-emerald-500" style={{ width: `${depots.sharePct}%` }} />
          </div>
        </div>

        <div>
          <div className="mb-2 flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
            <span className="whitespace-nowrap text-muted-foreground">Retraits ({fmtPct(retraits.sharePct)})</span>
            <span className="tabular-nums text-white">
              {fmtNum(retraits.count)} opérations / {fmtMds(retraits.montantM)} M FCFA
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <div className="h-full bg-blue-400" style={{ width: `${retraits.sharePct}%` }} />
          </div>
        </div>
      </div>
    </Card>
  );
}
