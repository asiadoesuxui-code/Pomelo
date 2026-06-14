import { Outlet, useLocation } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import { HOME_BG_CLASS } from "@/constants/colors";

export function AppLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div
      className={`mx-auto flex min-h-dvh max-w-lg flex-col ${isHome ? HOME_BG_CLASS : "bg-background"}`}
    >
      <main className="flex flex-1 flex-col overflow-y-auto pb-[calc(6.75rem+env(safe-area-inset-bottom))]">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
