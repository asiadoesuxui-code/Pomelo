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
