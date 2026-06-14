import { NavLink, useLocation } from "react-router-dom";
import { HOME_BG_CLASS, HOME_TEXT_CLASS } from "@/constants/colors";
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
          ? `border-[#4F4200]/10 ${HOME_BG_CLASS} ${HOME_TEXT_CLASS}`
          : "border-foreground/10 bg-background"
      }`}
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-center gap-10 px-6 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            className={({ isActive }) => {
              const activeOnHome = isHome && isActive;
              const activeDefault = !isHome && isActive;
              const inactiveOnHome = isHome && !isActive;
              const inactiveDefault = !isHome && !isActive;

              return [
                "flex min-h-14 w-20 flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 transition-colors active:scale-[0.97]",
                activeOnHome && "bg-[#4F4200]/8",
                activeDefault && "text-foreground",
                inactiveOnHome && "text-[#4F4200]/45",
                inactiveDefault && "text-muted",
              ]
                .filter(Boolean)
                .join(" ");
            }}
          >
            {({ isActive }) => (
              <>
                <tab.Icon
                  className={`h-6 w-6 shrink-0 ${isActive ? "stroke-[2.25]" : ""}`}
                />
                <span
                  className={`text-[11px] leading-none ${isActive ? "font-semibold" : "font-medium"}`}
                >
                  {tab.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
