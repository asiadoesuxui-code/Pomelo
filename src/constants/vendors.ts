import type { Vendor, VendorsState } from "@/types";

const DEFAULT_VENDORS: Omit<Vendor, "id">[] = [
  {
    name: "The Grand Estate",
    category: "Venue",
    contactPerson: "Sarah Mitchell",
    phone: "(555) 234-8901",
    email: "sarah@grandestate.com",
    notes: "Site visit scheduled for next month",
    status: "booked",
  },
  {
    name: "Bloom & Vine Florals",
    category: "Florist",
    contactPerson: "Elena Ruiz",
    phone: "(555) 345-9012",
    email: "elena@bloomandvine.com",
    notes: "Loves garden roses and eucalyptus",
    status: "researching",
  },
  {
    name: "Golden Hour Photography",
    category: "Photographer",
    contactPerson: "James Chen",
    phone: "(555) 456-0123",
    email: "james@goldenhour.co",
    notes: "Engagement shoot completed",
    status: "paid",
  },
  {
    name: "Harvest Table Catering",
    category: "Caterer",
    contactPerson: "Marcus Webb",
    phone: "(555) 567-1234",
    email: "marcus@harvesttable.com",
    notes: "Tasting menu: farm-to-table options",
    status: "booked",
  },
  {
    name: "Spin & Sound DJs",
    category: "DJ",
    contactPerson: "Tyler Brooks",
    phone: "(555) 678-2345",
    email: "tyler@spinandsound.com",
    notes: "",
    status: "researching",
  },
];

export function getDefaultVendorsState(): VendorsState {
  return {
    vendors: DEFAULT_VENDORS.map((vendor, index) => ({
      ...vendor,
      id: `default-${index}`,
    })),
  };
}

const LEGACY_VENDOR_KEYS = ["pomelo-vendors"];

export function clearLegacyVendorsStorage() {
  for (const key of LEGACY_VENDOR_KEYS) {
    localStorage.removeItem(key);
  }
}

export const VENDOR_STATUSES = ["researching", "booked", "paid"] as const;

export function getNextVendorStatus(
  status: Vendor["status"],
): Vendor["status"] {
  const index = VENDOR_STATUSES.indexOf(status);
  return VENDOR_STATUSES[(index + 1) % VENDOR_STATUSES.length];
}
