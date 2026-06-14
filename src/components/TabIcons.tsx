type TabIconProps = {
  className?: string;
};

export function HomeIcon({ className }: TabIconProps) {
  return (
    <img
      src="/icons/home.png"
      alt=""
      aria-hidden
      draggable={false}
      className={className}
    />
  );
}

export function ChecklistIcon({ className }: TabIconProps) {
  return (
    <img
      src="/icons/checklist.png"
      alt=""
      aria-hidden
      draggable={false}
      className={className}
    />
  );
}

export function BudgetIcon({ className }: TabIconProps) {
  return (
    <img
      src="/icons/budget.png"
      alt=""
      aria-hidden
      draggable={false}
      className={className}
    />
  );
}

export function GuestsIcon({ className }: TabIconProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={`text-foreground ${className ?? ""}`}
    >
      <circle cx="16" cy="14" r="5" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M7 31c0-4.97 4.03-9 9-9s9 4.03 9 9"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <circle cx="27" cy="15" r="4" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M22 30c.9-2.76 3.14-4.75 6-4.75"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}
