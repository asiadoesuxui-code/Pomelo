import { type FormEvent, useState } from "react";
import {
  getMonthsBeforeLabel,
  type ChecklistMonth,
} from "@/constants/checklist";
import { useChecklist } from "@/hooks/useChecklist";
import type { ChecklistItem } from "@/types";

export function ChecklistPage() {
  const {
    months,
    toggleItem,
    updateItemText,
    addItem,
    getItemsForMonth,
    currentMonthKey,
  } = useChecklist();

  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(
    () => new Set([currentMonthKey]),
  );
  const [newItemText, setNewItemText] = useState("");

  const toggleMonth = (monthKey: string) => {
    setExpandedMonths((prev) => {
      const next = new Set(prev);
      if (next.has(monthKey)) {
        next.delete(monthKey);
      } else {
        next.add(monthKey);
      }
      return next;
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    addItem(newItemText, currentMonthKey);
    setNewItemText("");
    setExpandedMonths((prev) => new Set(prev).add(currentMonthKey));
  };

  return (
    <div className="flex min-h-full flex-col px-6 pt-12 pb-8">
      <h1 className="font-serif text-4xl tracking-tight text-foreground">
        Checklist
      </h1>

      <div className="mt-10 flex-1 space-y-2">
        {months.map((month) => (
          <MonthSection
            key={month.key}
            month={month}
            items={getItemsForMonth(month.key)}
            isExpanded={expandedMonths.has(month.key)}
            onToggle={() => toggleMonth(month.key)}
            onToggleItem={toggleItem}
            onUpdateItemText={updateItemText}
          />
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 flex gap-3">
        <input
          type="text"
          value={newItemText}
          onChange={(event) => setNewItemText(event.target.value)}
          placeholder="Add a task…"
          className="flex-1 rounded-xl border border-foreground/10 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted focus:border-foreground/25"
        />
        <button
          type="submit"
          className="rounded-xl bg-foreground px-5 py-3 text-sm text-background transition hover:opacity-90"
        >
          Add
        </button>
      </form>
    </div>
  );
}

function MonthSection({
  month,
  items,
  isExpanded,
  onToggle,
  onToggleItem,
  onUpdateItemText,
}: {
  month: ChecklistMonth;
  items: ChecklistItem[];
  isExpanded: boolean;
  onToggle: () => void;
  onToggleItem: (id: string) => void;
  onUpdateItemText: (id: string, text: string) => void;
}) {
  const completedCount = items.filter((item) => item.completed).length;

  return (
    <section className="border-b border-foreground/10">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-4 py-4 text-left"
        aria-expanded={isExpanded}
      >
        <span
          className={`text-sm text-muted transition-transform ${isExpanded ? "rotate-90" : ""}`}
          aria-hidden
        >
          ›
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-serif text-xl text-foreground">{month.label}</p>
          <p className="mt-0.5 text-xs text-muted">
            {getMonthsBeforeLabel(month.monthsBefore)}
          </p>
        </div>
        <span className="shrink-0 text-sm tabular-nums text-muted">
          {completedCount}/{items.length}
        </span>
      </button>

      {isExpanded && (
        <ul className="pb-4 pl-6">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-4 border-b border-foreground/5 py-3 last:border-b-0"
            >
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => onToggleItem(item.id)}
                className="h-4 w-4 shrink-0 rounded border-foreground/30 accent-foreground"
              />
              <input
                type="text"
                value={item.text}
                onChange={(event) =>
                  onUpdateItemText(item.id, event.target.value)
                }
                className={`min-w-0 flex-1 bg-transparent text-base outline-none ${
                  item.completed
                    ? "text-muted line-through"
                    : "text-foreground"
                }`}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
