import { type FormEvent, useState } from "react";
import { useBudget } from "@/hooks/useBudget";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function BudgetPage() {
  const {
    totalBudget,
    categories,
    totalSpent,
    remaining,
    setTotalBudget,
    addExpense,
    removeExpense,
  } = useBudget();

  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const parsed = parseFloat(amount);
    if (Number.isNaN(parsed)) return;
    addExpense(category, name, parsed);
    setCategory("");
    setName("");
    setAmount("");
  };

  return (
    <div className="flex min-h-full flex-col px-6 pt-12 pb-8">
      <h1 className="font-serif text-4xl tracking-tight text-foreground">
        Budget
      </h1>

      <div className="mt-8 flex items-baseline justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted">Spent</p>
          <p className="mt-1 font-serif text-2xl text-foreground">
            {formatCurrency(totalSpent)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-widest text-muted">
            Remaining
          </p>
          <p
            className={`mt-1 font-serif text-2xl ${
              remaining < 0 ? "text-red-700" : "text-foreground"
            }`}
          >
            {formatCurrency(remaining)}
          </p>
        </div>
      </div>

      <label className="mt-10 block">
        <span className="text-xs uppercase tracking-widest text-muted">
          Total budget
        </span>
        <div className="relative mt-2">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted">
            $
          </span>
          <input
            type="number"
            min="0"
            step="100"
            value={totalBudget || ""}
            onChange={(event) =>
              setTotalBudget(parseFloat(event.target.value) || 0)
            }
            className="w-full rounded-xl border border-foreground/10 bg-transparent py-3 pl-8 pr-4 text-base outline-none focus:border-foreground/25"
          />
        </div>
      </label>

      <div className="mt-10 flex-1 space-y-6">
        {categories.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted">No expenses yet</p>
        ) : (
          categories.map((group) => (
            <section key={group.category}>
              <div className="flex items-baseline justify-between gap-4 border-b border-foreground/10 pb-2">
                <h2 className="font-serif text-xl text-foreground">
                  {group.category}
                </h2>
                <span className="text-sm tabular-nums text-muted">
                  {formatCurrency(group.total)}
                </span>
              </div>
              <ul>
                {group.items.map((expense) => (
                  <li
                    key={expense.id}
                    className="flex items-center justify-between gap-4 border-b border-foreground/5 py-3 last:border-b-0"
                  >
                    <span className="text-sm text-foreground">
                      {expense.name}
                    </span>
                    <div className="flex items-center gap-4">
                      <span className="tabular-nums text-foreground">
                        {formatCurrency(expense.amount)}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeExpense(expense.id)}
                        className="text-sm text-muted transition hover:text-foreground"
                        aria-label={`Delete ${expense.name}`}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <input
          type="text"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          placeholder="Category"
          className="w-full rounded-xl border border-foreground/10 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted focus:border-foreground/25"
        />
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Expense name"
          className="w-full rounded-xl border border-foreground/10 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted focus:border-foreground/25"
        />
        <div className="flex gap-3">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted">
              $
            </span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="Amount"
              className="w-full rounded-xl border border-foreground/10 bg-transparent py-3 pl-8 pr-4 text-sm outline-none placeholder:text-muted focus:border-foreground/25"
            />
          </div>
          <button
            type="submit"
            className="rounded-xl bg-foreground px-5 py-3 text-sm text-background transition hover:opacity-90"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
