import { type FormEvent, useState } from "react";
import { useVendors } from "@/hooks/useVendors";
import type { Vendor, VendorStatus } from "@/types";

const STATUS_LABELS: Record<VendorStatus, string> = {
  researching: "Researching",
  booked: "Booked",
  paid: "Paid",
};

const inputClassName =
  "w-full rounded-xl border border-foreground/10 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted focus:border-foreground/25";

export function VendorsPage() {
  const { vendors, addVendor, removeVendor, cycleVendorStatus } = useVendors();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    addVendor(name, category, contactPerson, phone, email, notes);
    setName("");
    setCategory("");
    setContactPerson("");
    setPhone("");
    setEmail("");
    setNotes("");
  };

  return (
    <div className="flex min-h-full flex-col px-6 pt-12 pb-8">
      <h1 className="font-serif text-4xl tracking-tight text-foreground">
        Vendors
      </h1>

      <div className="mt-10 flex-1 space-y-6">
        {vendors.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted">No vendors yet</p>
        ) : (
          <ul className="space-y-6">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                onCycleStatus={() => cycleVendorStatus(vendor.id)}
                onRemove={() => removeVendor(vendor.id)}
              />
            ))}
          </ul>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Vendor name"
          className={inputClassName}
        />
        <input
          type="text"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          placeholder="Category (photographer, florist, caterer…)"
          className={inputClassName}
        />
        <input
          type="text"
          value={contactPerson}
          onChange={(event) => setContactPerson(event.target.value)}
          placeholder="Contact person"
          className={inputClassName}
        />
        <input
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="Phone"
          className={inputClassName}
        />
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          className={inputClassName}
        />
        <input
          type="text"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Notes"
          className={inputClassName}
        />
        <button
          type="submit"
          className="w-full rounded-xl bg-foreground px-5 py-3 text-sm text-background transition hover:opacity-90"
        >
          Add
        </button>
      </form>
    </div>
  );
}

function VendorCard({
  vendor,
  onCycleStatus,
  onRemove,
}: {
  vendor: Vendor;
  onCycleStatus: () => void;
  onRemove: () => void;
}) {
  return (
    <li className="border-b border-foreground/10 pb-6 last:border-b-0">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h2 className="font-serif text-xl text-foreground">{vendor.name}</h2>
          <p className="mt-1 text-xs uppercase tracking-widest text-muted">
            {vendor.category}
          </p>
        </div>
        <button
          type="button"
          onClick={onCycleStatus}
          className="shrink-0 rounded-full border border-foreground/10 px-3 py-1 text-xs uppercase tracking-widest text-foreground transition hover:border-foreground/25"
          aria-label={`Status: ${STATUS_LABELS[vendor.status]}. Tap to change.`}
        >
          {STATUS_LABELS[vendor.status]}
        </button>
      </div>

      <dl className="mt-4 space-y-2 text-sm">
        {vendor.contactPerson && (
          <VendorDetail label="Contact" value={vendor.contactPerson} />
        )}
        {vendor.phone && <VendorDetail label="Phone" value={vendor.phone} />}
        {vendor.email && <VendorDetail label="Email" value={vendor.email} />}
        {vendor.notes && <VendorDetail label="Notes" value={vendor.notes} />}
      </dl>

      <button
        type="button"
        onClick={onRemove}
        className="mt-4 text-sm text-muted transition hover:text-foreground"
        aria-label={`Delete ${vendor.name}`}
      >
        Delete
      </button>
    </li>
  );
}

function VendorDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <dt className="w-16 shrink-0 text-muted">{label}</dt>
      <dd className="text-foreground">{value}</dd>
    </div>
  );
}
