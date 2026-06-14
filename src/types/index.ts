export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  monthKey: string;
}

export interface Expense {
  id: string;
  category: string;
  name: string;
  amount: number;
}

export interface ChecklistState {
  items: ChecklistItem[];
}

export interface BudgetState {
  totalBudget: number;
  expenses: Expense[];
}
