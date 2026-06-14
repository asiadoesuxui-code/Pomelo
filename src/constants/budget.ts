import type { BudgetState, Expense } from "@/types";

const DEFAULT_EXPENSES: Omit<Expense, "id">[] = [
  { category: "Venue", name: "Venue deposit", amount: 5000 },
  { category: "Venue", name: "Ceremony fee", amount: 2500 },
  { category: "Catering", name: "Tasting", amount: 350 },
  { category: "Catering", name: "Service deposit", amount: 4200 },
  { category: "Photography", name: "Booking fee", amount: 1800 },
  { category: "Photography", name: "Engagement shoot", amount: 600 },
  { category: "Flowers", name: "Bouquets", amount: 850 },
  { category: "Flowers", name: "Centerpieces", amount: 1200 },
  { category: "Attire", name: "Wedding dress", amount: 2400 },
  { category: "Attire", name: "Alterations", amount: 450 },
  { category: "Music", name: "DJ deposit", amount: 750 },
  { category: "Invitations", name: "Save the dates", amount: 320 },
  { category: "Invitations", name: "Invitations & postage", amount: 680 },
  { category: "Hair & Makeup", name: "Trial", amount: 200 },
  { category: "Hair & Makeup", name: "Wedding day", amount: 550 },
];

export function getDefaultBudgetState(): BudgetState {
  return {
    totalBudget: 35000,
    expenses: DEFAULT_EXPENSES.map((expense, index) => ({
      ...expense,
      id: `default-${index}`,
    })),
  };
}

const LEGACY_BUDGET_KEYS = ["pomelo-budget"];

export function clearLegacyBudgetStorage() {
  for (const key of LEGACY_BUDGET_KEYS) {
    localStorage.removeItem(key);
  }
}

export function groupExpensesByCategory(expenses: Expense[]) {
  const groups = new Map<string, Expense[]>();

  for (const expense of expenses) {
    const existing = groups.get(expense.category) ?? [];
    existing.push(expense);
    groups.set(expense.category, existing);
  }

  return Array.from(groups.entries()).map(([category, items]) => ({
    category,
    items,
    total: items.reduce((sum, item) => sum + item.amount, 0),
  }));
}
