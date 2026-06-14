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

export type VendorStatus = "researching" | "booked" | "paid";

export interface Vendor {
  id: string;
  name: string;
  category: string;
  contactPerson: string;
  phone: string;
  email: string;
  notes: string;
  status: VendorStatus;
}

export interface VendorsState {
  vendors: Vendor[];
}
export type GuestSide = "mine" | "partner";
export type RsvpStatus = "pending" | "yes" | "no";
export type PlusOne = "yes" | "no";

export interface Guest {
  id: string;
  name: string;
  side: GuestSide;
  rsvpStatus: RsvpStatus;
  plusOne: PlusOne;
}

export interface GuestsState {
  guests: Guest[];
}
