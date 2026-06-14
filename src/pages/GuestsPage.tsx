import { type FormEvent, useState } from "react";
import { useGuests } from "@/hooks/useGuests";
import type { GuestSide, PlusOne, RsvpStatus } from "@/types";

const selectClassName =
  "w-full rounded-xl border border-foreground/10 bg-transparent px-3 py-3 text-sm outline-none focus:border-foreground/25";

const inputClassName =
  "w-full rounded-xl border border-foreground/10 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted focus:border-foreground/25";

function formatSide(side: GuestSide) {
  return side === "mine" ? "Mine" : "Partner's";
}

function formatRsvp(status: RsvpStatus) {
  if (status === "yes") return "Yes";
  if (status === "no") return "No";
  return "Pending";
}

function formatPlusOne(plusOne: PlusOne) {
  return plusOne === "yes" ? "Yes" : "No";
}

export function GuestsPage() {
  const { guests, summary, addGuest, updateGuest, removeGuest } = useGuests();

  const [name, setName] = useState("");
  const [side, setSide] = useState<GuestSide>("mine");
  const [rsvpStatus, setRsvpStatus] = useState<RsvpStatus>("pending");
  const [plusOne, setPlusOne] = useState<PlusOne>("no");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    addGuest(name, side, rsvpStatus, plusOne);
    setName("");
    setSide("mine");
    setRsvpStatus("pending");
    setPlusOne("no");
  };

  return (
    <div className="flex min-h-full flex-col px-6 pt-12 pb-8">
      <h1 className="font-serif text-4xl tracking-tight text-foreground">
        Guests
      </h1>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <SummaryStat label="Total invited" value={summary.totalInvited} />
        <SummaryStat label="Confirmed" value={summary.confirmed} />
        <SummaryStat label="Declined" value={summary.declined} />
        <SummaryStat label="Pending" value={summary.pending} />
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-3">
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Guest name"
          className={inputClassName}
        />
        <div className="grid grid-cols-3 gap-3">
          <label className="block">
            <span className="mb-1 block text-xs uppercase tracking-widest text-muted">
              Side
            </span>
            <select
              value={side}
              onChange={(event) => setSide(event.target.value as GuestSide)}
              className={selectClassName}
            >
              <option value="mine">Mine</option>
              <option value="partner">Partner&apos;s</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs uppercase tracking-widest text-muted">
              RSVP
            </span>
            <select
              value={rsvpStatus}
              onChange={(event) =>
                setRsvpStatus(event.target.value as RsvpStatus)
              }
              className={selectClassName}
            >
              <option value="pending">Pending</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs uppercase tracking-widest text-muted">
              Plus one
            </span>
            <select
              value={plusOne}
              onChange={(event) => setPlusOne(event.target.value as PlusOne)}
              className={selectClassName}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </label>
        </div>
        <button
          type="submit"
          className="w-full rounded-xl bg-foreground px-5 py-3 text-sm text-background transition hover:opacity-90"
        >
          Add guest
        </button>
      </form>

      <div className="mt-10 flex-1 overflow-x-auto">
        {guests.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted">No guests yet</p>
        ) : (
          <table className="w-full min-w-[32rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-foreground/10 text-left">
                <th className="pb-3 pr-4 text-xs font-normal uppercase tracking-widest text-muted">
                  Name
                </th>
                <th className="pb-3 pr-4 text-xs font-normal uppercase tracking-widest text-muted">
                  Side
                </th>
                <th className="pb-3 pr-4 text-xs font-normal uppercase tracking-widest text-muted">
                  RSVP
                </th>
                <th className="pb-3 pr-4 text-xs font-normal uppercase tracking-widest text-muted">
                  Plus one
                </th>
                <th className="pb-3 text-xs font-normal uppercase tracking-widest text-muted">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {guests.map((guest) => (
                <tr
                  key={guest.id}
                  className="border-b border-foreground/5 last:border-b-0"
                >
                  <td className="py-3 pr-4 text-foreground">{guest.name}</td>
                  <td className="py-3 pr-4">
                    <select
                      value={guest.side}
                      onChange={(event) =>
                        updateGuest(guest.id, {
                          side: event.target.value as GuestSide,
                        })
                      }
                      aria-label={`Side for ${guest.name}`}
                      className="bg-transparent text-foreground outline-none"
                    >
                      <option value="mine">{formatSide("mine")}</option>
                      <option value="partner">{formatSide("partner")}</option>
                    </select>
                  </td>
                  <td className="py-3 pr-4">
                    <select
                      value={guest.rsvpStatus}
                      onChange={(event) =>
                        updateGuest(guest.id, {
                          rsvpStatus: event.target.value as RsvpStatus,
                        })
                      }
                      aria-label={`RSVP for ${guest.name}`}
                      className="bg-transparent text-foreground outline-none"
                    >
                      <option value="pending">
                        {formatRsvp("pending")}
                      </option>
                      <option value="yes">{formatRsvp("yes")}</option>
                      <option value="no">{formatRsvp("no")}</option>
                    </select>
                  </td>
                  <td className="py-3 pr-4">
                    <select
                      value={guest.plusOne}
                      onChange={(event) =>
                        updateGuest(guest.id, {
                          plusOne: event.target.value as PlusOne,
                        })
                      }
                      aria-label={`Plus one for ${guest.name}`}
                      className="bg-transparent text-foreground outline-none"
                    >
                      <option value="no">{formatPlusOne("no")}</option>
                      <option value="yes">{formatPlusOne("yes")}</option>
                    </select>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      type="button"
                      onClick={() => removeGuest(guest.id)}
                      className="text-sm text-muted transition hover:text-foreground"
                      aria-label={`Delete ${guest.name}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function SummaryStat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-muted">{label}</p>
      <p className="mt-1 font-serif text-2xl text-foreground tabular-nums">
        {value}
      </p>
    </div>
  );
}
