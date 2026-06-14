import type { Guest, GuestsState } from "@/types";

const DEFAULT_GUESTS: Omit<Guest, "id">[] = [
  {
    name: "Alex Morgan",
    side: "mine",
    rsvpStatus: "yes",
    plusOne: "yes",
  },
  {
    name: "Jamie Rivera",
    side: "partner",
    rsvpStatus: "pending",
    plusOne: "no",
  },
  {
    name: "Taylor Brooks",
    side: "mine",
    rsvpStatus: "no",
    plusOne: "no",
  },
];

export function getDefaultGuestsState(): GuestsState {
  return {
    guests: DEFAULT_GUESTS.map((guest, index) => ({
      ...guest,
      id: `default-${index}`,
    })),
  };
}

const LEGACY_GUESTS_KEYS: string[] = [];

export function clearLegacyGuestsStorage() {
  for (const key of LEGACY_GUESTS_KEYS) {
    localStorage.removeItem(key);
  }
}

export function guestHeadcount(guest: Guest) {
  return guest.plusOne === "yes" ? 2 : 1;
}

export function summarizeGuests(guests: Guest[]) {
  return guests.reduce(
    (summary, guest) => {
      const count = guestHeadcount(guest);
      summary.totalInvited += count;

      if (guest.rsvpStatus === "yes") {
        summary.confirmed += count;
      } else if (guest.rsvpStatus === "no") {
        summary.declined += count;
      } else {
        summary.pending += count;
      }

      return summary;
    },
    { totalInvited: 0, confirmed: 0, declined: 0, pending: 0 },
  );
}
