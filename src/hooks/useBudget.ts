import { useCallback, useEffect, useState } from "react";
import {
  getDefaultBudgetState,
  groupExpensesByCategory,
} from "@/constants/budget";
import type { BudgetState, Expense } from "@/types";

const STORAGE_KEY = "pomelo-budget-v2";

function readBudgetFromStorage(): BudgetState {
  const defaults = getDefaultBudgetState();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;

    const stored = JSON.parse(raw) as BudgetState;
    if (
      !stored ||
      !Array.isArray(stored.expenses) ||
      stored.expenses.length === 0 ||
      stored.expenses.some((expense) => !expense.name)
    ) {
      return defaults;
    }

    return stored;
  } catch {
    return defaults;
  }
}

export function useBudget() {
  const [state, setState] = useState<BudgetState>(readBudgetFromStorage);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore write errors
    }
  }, [state]);

  const setTotalBudget = useCallback((totalBudget: number) => {
    setState((prev) => ({ ...prev, totalBudget }));
  }, []);

  const addExpense = useCallback((category: string, name: string, amount: number) => {
    const trimmedCategory = category.trim();
    const trimmedName = name.trim();
    if (!trimmedCategory || !trimmedName || amount <= 0) return;

    const expense: Expense = {
      id: crypto.randomUUID(),
      category: trimmedCategory,
      name: trimmedName,
      amount,
    };

    setState((prev) => ({
      ...prev,
      expenses: [...prev.expenses, expense],
    }));
  }, []);

  const removeExpense = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      expenses: prev.expenses.filter((expense) => expense.id !== id),
    }));
  }, []);

  const totalSpent = state.expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );

  const remaining = state.totalBudget - totalSpent;
  const categories = groupExpensesByCategory(state.expenses);

  return {
    totalBudget: state.totalBudget,
    expenses: state.expenses,
    categories,
    totalSpent,
    remaining,
    setTotalBudget,
    addExpense,
    removeExpense,
  };
}
