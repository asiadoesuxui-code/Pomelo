import { useCallback, useEffect, useState } from "react";
import {
  CHECKLIST_MONTHS,
  getCurrentMonthKey,
  getDefaultChecklistItems,
} from "@/constants/checklist";
import type { ChecklistItem } from "@/types";

const STORAGE_KEY = "pomelo-checklist-v4";

function readChecklistFromStorage(): ChecklistItem[] {
  const defaults = getDefaultChecklistItems();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;

    const stored = JSON.parse(raw) as ChecklistItem[];
    if (!Array.isArray(stored) || stored.length === 0) return defaults;
    if (stored.some((item) => !item.monthKey)) return defaults;

    return stored;
  } catch {
    return defaults;
  }
}

export function useChecklist() {
  const [items, setItems] = useState<ChecklistItem[]>(readChecklistFromStorage);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore write errors
    }
  }, [items]);

  const toggleItem = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  }, []);

  const updateItemText = useCallback((id: string, text: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, text } : item)),
    );
  }, []);

  const addItem = useCallback((text: string, monthKey: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setItems((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text: trimmed,
        completed: false,
        monthKey,
      },
    ]);
  }, []);

  const getItemsForMonth = useCallback(
    (monthKey: string) => items.filter((item) => item.monthKey === monthKey),
    [items],
  );

  const completedCount = items.filter((item) => item.completed).length;

  return {
    items,
    months: CHECKLIST_MONTHS,
    completedCount,
    totalCount: items.length,
    toggleItem,
    updateItemText,
    addItem,
    getItemsForMonth,
    currentMonthKey: getCurrentMonthKey(),
  };
}
