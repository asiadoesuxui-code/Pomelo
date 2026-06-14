import { WEDDING_DATE } from "./wedding";

export interface ChecklistMonth {
  key: string;
  label: string;
  monthsBefore: number;
}

function monthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export function getChecklistMonths(): ChecklistMonth[] {
  const months: ChecklistMonth[] = [];

  for (let monthsBefore = 12; monthsBefore >= 0; monthsBefore -= 1) {
    const date = new Date(WEDDING_DATE);
    date.setMonth(date.getMonth() - monthsBefore);

    months.push({
      key: monthKey(date),
      label: date.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      monthsBefore,
    });
  }

  return months;
}

export const CHECKLIST_MONTHS = getChecklistMonths();

const DEFAULT_TASKS_BY_MONTH: Record<string, string[]> = {
  "2025-08": [
    "Set wedding date and budget",
    "Draft guest list",
    "Research venues",
    "Create mood board",
  ],
  "2025-09": [
    "Tour venues",
    "Book venue",
    "Research photographers",
  ],
  "2025-10": [
    "Book photographer",
    "Book caterer",
    "Choose wedding party",
  ],
  "2025-11": [
    "Book DJ or band",
    "Order save-the-dates",
    "Start dress and suit shopping",
  ],
  "2025-12": [
    "Send save-the-dates",
    "Book florist",
    "Plan honeymoon",
  ],
  "2026-01": [
    "Order wedding dress",
    "Book officiant",
    "Reserve hotel room blocks",
  ],
  "2026-02": [
    "Choose bridesmaid dresses",
    "Plan rehearsal dinner",
    "Schedule cake tasting",
  ],
  "2026-03": [
    "Send invitations",
    "Finalize menu with caterer",
    "Book hair and makeup",
  ],
  "2026-04": [
    "First dress fitting",
    "Plan ceremony details",
    "Order wedding rings",
  ],
  "2026-05": [
    "Final headcount to caterer",
    "Write vows",
    "Confirm all vendors",
  ],
  "2026-06": [
    "Cake testing",
    "Create seating chart",
    "Arrange transportation",
  ],
  "2026-07": [
    "Final dress fitting",
    "Confirm day-of timeline",
    "Pack for honeymoon",
  ],
  "2026-08": [
    "Rehearsal dinner",
    "Final vendor payments",
    "Wedding day",
  ],
};

export const CURRENT_PLANNING_MONTH = "2026-06";

export function isMonthBeforeCurrentPlanningMonth(monthKey: string): boolean {
  return monthKey < CURRENT_PLANNING_MONTH;
}

export function getDefaultChecklistItems() {
  return CHECKLIST_MONTHS.flatMap((month) =>
    (DEFAULT_TASKS_BY_MONTH[month.key] ?? []).map((text, index) => ({
      id: `${month.key}-${index}`,
      text,
      completed: isMonthBeforeCurrentPlanningMonth(month.key),
      monthKey: month.key,
    })),
  );
}

export function getCurrentMonthKey(): string {
  return monthKey(new Date());
}

export function getMonthsBeforeLabel(monthsBefore: number): string {
  if (monthsBefore === 0) return "Wedding month";
  if (monthsBefore === 1) return "1 month before";
  return `${monthsBefore} months before`;
}

const LEGACY_CHECKLIST_KEYS = [
  "pomelo-checklist",
  "pomelo-checklist-v2",
  "pomelo-checklist-v3",
];

export function clearLegacyChecklistStorage() {
  for (const key of LEGACY_CHECKLIST_KEYS) {
    localStorage.removeItem(key);
  }
}
