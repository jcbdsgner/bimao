import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNavProvider } from "@/components/layout/MobileNavContext";
import { MobileNavDrawer } from "@/components/layout/MobileNavDrawer";

export function AppShell() {
  return (
    <MobileNavProvider>
      <div className="relative z-0 flex min-h-screen bg-background text-foreground">
        <div
          className="pointer-events-none fixed left-[-10%] top-[-10%] z-0 h-[50vh] w-[50vw]"
          style={{
            background:
              "radial-gradient(circle, rgba(0,0,123,0.15) 0%, rgba(2,6,23,0) 70%)",
          }}
        />
        <div
          className="pointer-events-none fixed bottom-[-10%] right-[-10%] z-0 h-[40vh] w-[40vw]"
          style={{
            background:
              "radial-gradient(circle, rgba(255,121,0,0.04) 0%, rgba(2,6,23,0) 70%)",
          }}
        />

        <div className="hidden md:block h-screen w-[72px] shrink-0" aria-hidden="true" />
        <Sidebar />
        <MobileNavDrawer />

        <div className="relative z-10 flex min-w-0 flex-1 flex-col">
          <Outlet />
        </div>
      </div>
    </MobileNavProvider>
  );
}
