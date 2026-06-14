import { useNavigate } from "react-router-dom";
import { HOME_BG_CLASS, HOME_TEXT_CLASS } from "@/constants/colors";
import { WEDDING_DATE } from "@/constants/wedding";
import { useBudget } from "@/hooks/useBudget";
import { useChecklist } from "@/hooks/useChecklist";
import { useCountdown } from "@/hooks/useCountdown";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function HomePage() {
  const navigate = useNavigate();
  const countdown = useCountdown(WEDDING_DATE);
  const { completedCount, totalCount } = useChecklist();
  const { totalSpent, totalBudget } = useBudget();

  return (
    <div className={`flex flex-1 ${HOME_BG_CLASS} ${HOME_TEXT_CLASS} px-6`}>
      <div className="flex w-full flex-col items-center justify-center text-center">
        <h1 className="font-serif text-[48px] tracking-tight">
          Our wedding
        </h1>

        <p className="mt-6 text-sm">{formatDate(WEDDING_DATE)}</p>

        <div className="mt-8 flex justify-center gap-6">
          <CountdownUnit value={countdown.days} label="days" />
          <CountdownUnit value={countdown.hours} label="hours" />
          <CountdownUnit value={countdown.minutes} label="minutes" />
        </div>

        <div className="mt-14 grid w-full max-w-sm grid-cols-2 gap-4">
          <SummaryCard
            label="Tasks"
            value={`${completedCount} / ${totalCount}`}
            subtitle="complete"
            onClick={() => navigate("/checklist")}
          />
          <SummaryCard
            label="Budget"
            value={formatCurrency(totalSpent)}
            subtitle={`of ${formatCurrency(totalBudget)}`}
            onClick={() => navigate("/budget")}
          />
        </div>
      </div>
    </div>
  );
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <p className="font-serif text-3xl tabular-nums">
        {value}
      </p>
      <p className="mt-1 text-xs uppercase tracking-widest">
        {label}
      </p>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  subtitle,
  onClick,
}: {
  label: string;
  value: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-2xl border border-[#4F4200]/10 bg-transparent px-5 py-6 text-center transition hover:border-[#4F4200]/20"
    >
      <p className="text-xs uppercase tracking-widest">{label}</p>
      <p className="mt-3 font-serif text-2xl">{value}</p>
      <p className="mt-1 text-sm">{subtitle}</p>
    </button>
  );
}
