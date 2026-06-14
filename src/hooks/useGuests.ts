import { useCallback, useEffect, useState } from "react";
import { getDefaultGuestsState, summarizeGuests } from "@/constants/guests";
import type {
  Guest,
  GuestSide,
  GuestsState,
  PlusOne,
  RsvpStatus,
} from "@/types";

const STORAGE_KEY = "pomelo-guests-v1";

function readGuestsFromStorage(): GuestsState {
  const defaults = getDefaultGuestsState();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;

    const stored = JSON.parse(raw) as GuestsState;
    if (
      !stored ||
      !Array.isArray(stored.guests) ||
      stored.guests.length === 0 ||
      stored.guests.some((guest) => !guest.name)
    ) {
      return defaults;
    }

    return stored;
  } catch {
    return defaults;
  }
}

export function useGuests() {
  const [state, setState] = useState<GuestsState>(readGuestsFromStorage);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore write errors
    }
  }, [state]);

  const addGuest = useCallback(
    (
      name: string,
      side: GuestSide,
      rsvpStatus: RsvpStatus,
      plusOne: PlusOne,
    ) => {
      const trimmedName = name.trim();
      if (!trimmedName) return;

      const guest: Guest = {
        id: crypto.randomUUID(),
        name: trimmedName,
        side,
        rsvpStatus,
        plusOne,
      };

      setState((prev) => ({
        ...prev,
        guests: [...prev.guests, guest],
      }));
    },
    [],
  );

  const updateGuest = useCallback(
    (id: string, updates: Partial<Omit<Guest, "id">>) => {
      setState((prev) => ({
        ...prev,
        guests: prev.guests.map((guest) =>
          guest.id === id ? { ...guest, ...updates } : guest,
        ),
      }));
    },
    [],
  );

  const removeGuest = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      guests: prev.guests.filter((guest) => guest.id !== id),
    }));
  }, []);

  const summary = summarizeGuests(state.guests);

  return {
    guests: state.guests,
    summary,
    addGuest,
    updateGuest,
    removeGuest,
  };
}
