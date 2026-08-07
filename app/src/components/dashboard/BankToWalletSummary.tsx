import { Card } from "@/components/ui/card";
import { type Period, bankToWalletByPeriod, fmtMds, fmtNum, fmtPct } from "@/lib/period-data";

export function BankToWalletSummary({ period = "mois" }: { period?: Period }) {
  const data = bankToWalletByPeriod[period];

  return (
    <Card className="space-y-5 rounded-[1.25rem] border-border bg-card p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
        <h3 className="text-base font-semibold text-slate-300">Synthèse Bank-To-Wallet</h3>
        <a
          href="/digital-flux"
          className="whitespace-nowrap text-xs font-semibold text-blue-400 transition-colors hover:text-white"
        >
          Détail des flux →
        </a>
      </div>

      <div className="space-y-4 text-xs font-medium">
        <div>
          <div className="mb-2 flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
            <span className="whitespace-nowrap text-muted-foreground">Succès ({fmtPct(data.successRate)})</span>
            <span className="tabular-nums text-white">
              {fmtNum(data.succes)} tx / {fmtMds(data.volumeSuccesM)} M FCFA
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <div className="h-full bg-emerald-500" style={{ width: `${data.successRate}%` }} />
          </div>
        </div>

        <div>
          <div className="mb-2 flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
            <span className="whitespace-nowrap text-muted-foreground">Rejets / Échecs ({fmtPct(data.failureRate)})</span>
            <span className="tabular-nums text-white">
              {fmtNum(data.echecs)} tx / {fmtMds(data.volumeEchecM)} M FCFA
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <div className="h-full bg-rose-500" style={{ width: `${data.failureRate}%` }} />
          </div>
        </div>
      </div>
    </Card>
  );
}
