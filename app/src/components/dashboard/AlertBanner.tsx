import { Card } from "@/components/ui/card";
import alertBannerBg from "@/assets/alert-banner-bg.jpg";
import { type Period, creditRisqueByPeriod, bankToWalletByPeriod, fmtMds, fmtNum, fmtPct } from "@/lib/period-data";

export function AlertBanner({ period = "mois" }: { period?: Period }) {
  const creditRisque = creditRisqueByPeriod[period];
  const bankToWallet = bankToWalletByPeriod[period];

  return (
    <Card
      className="flex flex-col justify-between gap-6 rounded-[1.25rem] border-border border-l-3 border-l-rose-600 bg-cover bg-[position:left_center] p-6 lg:flex-row lg:items-center"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(2,6,23,0.82) 0%, rgba(2,6,23,0.55) 30%, rgba(2,6,23,0.15) 60%, rgba(2,6,23,0.05) 80%), url(${alertBannerBg})`,
      }}
    >
      <div className="space-y-1.5 min-w-0">
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
          <span className="h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
          <span className="uppercase tracking-wider">Seuils Critiques Dépassés</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">
          Risque Crédit ({fmtPct(creditRisque.nplPct)} NPL) &amp; Rejets Bank-to-Wallet ({fmtPct(bankToWallet.failureRate)})
        </h1>
        <p className="text-xs text-slate-400">
          {fmtMds(creditRisque.douteuxMds)} Mds FCFA exposés sur créances douteuses + {fmtNum(bankToWallet.echecs)} échecs de
          virement mobile (Wave / Orange).
        </p>
      </div>
      <a
        href="/credit-risque"
        className="shrink-0 rounded-xl border border-blue-400/30 bg-primary px-5 py-2.5 text-center text-xs font-semibold text-white shadow-lg shadow-blue-950/40 transition-all hover:bg-primary/85"
      >
        Dossier d'impayés →
      </a>
    </Card>
  );
}
