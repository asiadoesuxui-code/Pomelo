import { NavLink, useLocation } from "react-router-dom";
import { HOME_BG_CLASS } from "@/constants/colors";
import { BudgetIcon, ChecklistIcon, HomeIcon } from "@/components/TabIcons";

const tabs = [
  { to: "/", label: "Home", end: true, Icon: HomeIcon },
  { to: "/checklist", label: "Checklist", end: false, Icon: ChecklistIcon },
  { to: "/budget", label: "Budget", end: false, Icon: BudgetIcon },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <nav
      className={`fixed inset-x-0 bottom-0 z-50 border-t shadow-[0_-4px_24px_rgba(0,0,0,0.04)] ${
        isHome
          ? `border-[#4F4200]/10 ${HOME_BG_CLASS}`
          : "border-foreground/10 bg-background"
      }`}
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-center gap-10 px-6 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            aria-label={tab.label}
            className={({ isActive }) =>
              [
                "flex min-h-16 min-w-16 items-center justify-center rounded-2xl p-3 transition active:scale-[0.97]",
                isHome && isActive && "bg-[#4F4200]/8",
              ]
                .filter(Boolean)
                .join(" ")
            }
          >
            {({ isActive }) => (
              <tab.Icon
                className={`h-10 w-10 shrink-0 object-contain transition-opacity ${
                  isActive ? "opacity-100" : "opacity-45"
                }`}
              />
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
