import { LayoutGrid, Users, Landmark, AlertTriangle, Smartphone, CreditCard, LifeBuoy, BarChart3, LogOut } from "lucide-react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { logout } from "@/lib/auth";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Dashboard", icon: LayoutGrid },
  { href: "/clients", label: "Clients", icon: Users },
  { href: "/comptes-bancaires", label: "Comptes Bancaires", icon: Landmark },
  { href: "/credit-risque", label: "Crédit & Risque", icon: AlertTriangle },
  { href: "/digital-flux", label: "Digital & Flux", icon: Smartphone },
  { href: "/monetique-cartes", label: "Monétique", icon: CreditCard },
  { href: "/it-support", label: "IT & Support", icon: LifeBuoy },
  { href: "/carthago-gap", label: "Carthago Gap", icon: BarChart3 },
];

export function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-screen z-50 w-[72px] hover:w-64 flex-col justify-between overflow-hidden border-r border-white/5 bg-card/75 p-3.5 backdrop-blur-xl transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-black/40 group">
      <div className="space-y-8">
        <a href="/" className="flex items-center space-x-3.5 px-1">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white p-1.5 shadow-lg shadow-primary/40">
            <img src="/logo.png" alt="BIMAO" className="h-full w-full object-contain" />
          </div>
          <div className="whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <span className="block text-base font-bold tracking-tight text-white">BIMAO</span>
          </div>
        </a>

        <nav className="space-y-2">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = href === pathname;
            return (
              <a
                key={href}
                href={href}
                className={cn(
                  "flex items-center space-x-3.5 rounded-xl px-3 py-3 font-medium text-slate-400 transition-all hover:bg-white/5 hover:text-white",
                  active && "bg-primary font-semibold text-white shadow-lg shadow-primary/40"
                )}
              >
                <Icon className={cn("h-5 w-5 shrink-0 text-slate-500", active && "text-white")} />
                <span className="whitespace-nowrap text-sm font-medium opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  {label}
                </span>
              </a>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto space-y-4 border-t border-white/5 pt-6">
        <div className="flex items-center space-x-3 px-0.5 pt-1">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/5 bg-white/10 text-xs font-bold text-slate-300">
            DG
          </div>
          <div className="overflow-hidden whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <span className="block text-xs font-bold text-white">Direction Générale</span>
            <span className="block text-[12px] font-medium text-slate-400">BIMAO Senegal</span>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex w-full items-center space-x-3.5 rounded-xl px-3 py-2.5 font-medium text-slate-400 transition-all hover:bg-rose-500/10 hover:text-rose-400"
        >
          <LogOut className="h-5 w-5 shrink-0 text-slate-500" />
          <span className="whitespace-nowrap text-sm font-medium opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            Déconnexion
          </span>
        </button>
      </div>
    </aside>
  );
}
