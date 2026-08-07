import { useEffect } from "react";
import { X, LogOut } from "lucide-react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/components/layout/Sidebar";
import { useMobileNav } from "@/components/layout/MobileNavContext";
import { logout } from "@/lib/auth";

export function MobileNavDrawer() {
  const { isOpen, close } = useMobileNav();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isOpen) return;
    document.body.classList.add("overflow-hidden");
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("overflow-hidden");
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close]);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={close}
        aria-hidden="true"
      />

      <aside
        className={cn(
          "fixed left-0 top-0 z-[70] flex h-screen w-72 max-w-[80vw] flex-col justify-between border-r border-white/10 bg-[#0b1224] p-4 transition-transform duration-300 ease-in-out md:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between px-1">
            <a href="/" className="flex items-center space-x-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white p-1.5 shadow-lg shadow-primary/40">
                <img src="/logo.png" alt="BIMAO" className="h-full w-full object-contain" />
              </div>
              <span className="text-base font-bold tracking-tight text-white">BIMAO</span>
            </a>
            <button
              aria-label="Fermer le menu"
              onClick={close}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-white/5 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="space-y-2">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
              const active = href === pathname;
              return (
                <a
                  key={href}
                  href={href}
                  onClick={close}
                  className={cn(
                    "flex items-center space-x-3.5 rounded-xl px-3 py-3 font-medium text-slate-400 transition-all hover:bg-white/5 hover:text-white",
                    active && "bg-primary font-semibold text-white shadow-lg shadow-primary/40"
                  )}
                >
                  <Icon className={cn("h-5 w-5 shrink-0 text-slate-500", active && "text-white")} />
                  <span className="whitespace-nowrap text-sm font-medium">{label}</span>
                </a>
              );
            })}
          </nav>
        </div>

        <div className="space-y-4 border-t border-white/5 pt-6">
          <div className="flex items-center space-x-3 px-0.5 pt-1">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/5 bg-white/10 text-xs font-bold text-slate-300">
              DG
            </div>
            <div className="min-w-0">
              <span className="block text-xs font-bold text-white">Direction Générale</span>
              <span className="block text-[12px] font-medium text-slate-400">BIMAO Senegal</span>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex w-full items-center space-x-3.5 rounded-xl px-3 py-2.5 font-medium text-slate-400 transition-all hover:bg-rose-500/10 hover:text-rose-400"
          >
            <LogOut className="h-5 w-5 shrink-0 text-slate-500" />
            <span className="text-sm font-medium">Déconnexion</span>
          </button>
        </div>
      </aside>
    </>
  );
}
