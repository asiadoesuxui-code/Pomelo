import { useCallback, useEffect, useState } from "react";
import { getDefaultVendorsState } from "@/constants/vendors";
import type { Vendor, VendorStatus, VendorsState } from "@/types";

const STORAGE_KEY = "pomelo-vendors-v1";

function isValidVendor(vendor: unknown): vendor is Vendor {
  if (!vendor || typeof vendor !== "object") return false;
  const v = vendor as Vendor;
  return (
    typeof v.id === "string" &&
    typeof v.name === "string" &&
    typeof v.category === "string" &&
    typeof v.contactPerson === "string" &&
    typeof v.phone === "string" &&
    typeof v.email === "string" &&
    typeof v.notes === "string" &&
    (v.status === "researching" ||
      v.status === "booked" ||
      v.status === "paid")
  );
}

function readVendorsFromStorage(): VendorsState {
  const defaults = getDefaultVendorsState();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;

    const stored = JSON.parse(raw) as VendorsState;
    if (
      !stored ||
      !Array.isArray(stored.vendors) ||
      stored.vendors.length === 0 ||
      stored.vendors.some((vendor) => !isValidVendor(vendor))
    ) {
      return defaults;
    }

    return stored;
  } catch {
    return defaults;
  }
}

export function useVendors() {
  const [state, setState] = useState<VendorsState>(readVendorsFromStorage);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore write errors
    }
  }, [state]);

  const addVendor = useCallback(
    (
      name: string,
      category: string,
      contactPerson: string,
      phone: string,
      email: string,
      notes: string,
    ) => {
      const trimmedName = name.trim();
      const trimmedCategory = category.trim();
      if (!trimmedName || !trimmedCategory) return;

      const vendor: Vendor = {
        id: crypto.randomUUID(),
        name: trimmedName,
        category: trimmedCategory,
        contactPerson: contactPerson.trim(),
        phone: phone.trim(),
        email: email.trim(),
        notes: notes.trim(),
        status: "researching",
      };

      setState((prev) => ({
        ...prev,
        vendors: [...prev.vendors, vendor],
      }));
    },
    [],
  );

  const removeVendor = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      vendors: prev.vendors.filter((vendor) => vendor.id !== id),
    }));
  }, []);

  const cycleVendorStatus = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      vendors: prev.vendors.map((vendor) => {
        if (vendor.id !== id) return vendor;
        const statuses: VendorStatus[] = ["researching", "booked", "paid"];
        const index = statuses.indexOf(vendor.status);
        return {
          ...vendor,
          status: statuses[(index + 1) % statuses.length],
        };
      }),
    }));
  }, []);

  const bookedCount = state.vendors.filter(
    (vendor) => vendor.status === "booked" || vendor.status === "paid",
  ).length;

  const totalCount = state.vendors.length;

  return {
    vendors: state.vendors,
    bookedCount,
    totalCount,
    addVendor,
    removeVendor,
    cycleVendorStatus,
  };
}
