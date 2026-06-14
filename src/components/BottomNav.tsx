import { NavLink } from "react-router-dom";
import {
  BudgetIcon,
  ChecklistIcon,
  GuestsIcon,
  HomeIcon,
} from "@/components/TabIcons";

const tabs = [
  { to: "/", label: "Home", end: true, Icon: HomeIcon },
  { to: "/checklist", label: "Checklist", end: false, Icon: ChecklistIcon },
  { to: "/budget", label: "Budget", end: false, Icon: BudgetIcon },
  { to: "/guests", label: "Guests", end: false, Icon: GuestsIcon },
] as const;

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-foreground/10 bg-background shadow-[0_-4px_24px_rgba(0,0,0,0.04)]">
      <div className="mx-auto flex max-w-lg items-stretch justify-center gap-6 px-6 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            aria-label={tab.label}
            className={({ isActive }) =>
              [
                "flex min-h-16 min-w-16 items-center justify-center rounded-2xl p-3 transition active:scale-[0.97]",
                isActive && "bg-foreground/5",
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
