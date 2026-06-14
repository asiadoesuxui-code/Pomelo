type TabIconProps = {
  className?: string;
};

export function HomeIcon({ className }: TabIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M4 10.25 12 4l8 6.25V19a1 1 0 0 1-1 1h-5v-5.5H10V20H5a1 1 0 0 1-1-1v-8.75Z" />
    </svg>
  );
}

export function ChecklistIcon({ className }: TabIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M9 6h12M9 12h12M9 18h12" />
      <path d="m4.5 6 1 1 2-2M4.5 12l1 1 2-2M4.5 18l1 1 2-2" />
    </svg>
  );
}

export function BudgetIcon({ className }: TabIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18" />
      <path d="M7 15h.01" />
      <path d="M11 15h4" />
    </svg>
  );
}

export function PlaceholderIcon({ className }: TabIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="12" r="7" strokeDasharray="3 3" />
    </svg>
  );
}
