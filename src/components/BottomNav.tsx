import { NavLink, useLocation } from "react-router-dom";
import { HOME_BG_CLASS, HOME_TEXT_CLASS } from "@/constants/colors";

const tabs = [
  { to: "/", label: "Home", end: true },
  { to: "/checklist", label: "Checklist", end: false },
  { to: "/budget", label: "Budget", end: false },
  { to: null, label: "", end: false },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <nav
      className={`fixed inset-x-0 bottom-0 border-t ${isHome ? `border-[#4F4200]/10 ${HOME_BG_CLASS} ${HOME_TEXT_CLASS}` : "border-foreground/10 bg-background"}`}
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)]">
        {tabs.map((tab, index) =>
          tab.to ? (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.end}
              className={({ isActive }) =>
                `flex flex-1 flex-col items-center justify-center py-4 text-xs tracking-wide transition-opacity ${
                  isHome
                    ? "opacity-100"
                    : isActive
                      ? "text-foreground"
                      : "text-muted hover:text-foreground/70"
                }`
              }
            >
              <span className="font-medium">{tab.label}</span>
            </NavLink>
          ) : (
            <div key={`empty-${index}`} className="flex-1" aria-hidden />
          ),
        )}
      </div>
    </nav>
  );
}
