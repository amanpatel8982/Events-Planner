import { useCallback, useEffect, useMemo, useState } from "react";
import { Building2, Plus, Search } from "lucide-react";
import api from "../../config/api";
import AddBanquetHall from "./modals/AddBanquetHallmodel";
import EmptyState from "./EmptyState";

const BanquetHall = () => {
  const [banquetHalls, setBanquetHalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);

  const loadVenues = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get("/hall/hall");
      setBanquetHalls(Array.isArray(response.data?.data) ? response.data.data : []);
    } catch {
      setBanquetHalls([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVenues();
  }, [loadVenues]);

  const visibleVenues = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return banquetHalls;
    return banquetHalls.filter((hall) =>
      [hall.hallName, hall.managerName, hall.contactNumber]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term)),
    );
  }, [banquetHalls, search]);

  return (
    <div className="mx-auto max-w-7xl">
      <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase text-[var(--rose)]">Partner network</p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl">Venue directory</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Keep capacity, commercial, and venue contact details easy to compare.
          </p>
        </div>
        <button type="button" onClick={() => setIsAddOpen(true)} className="button-primary">
          <Plus size={18} /> Add venue
        </button>
      </header>

      <section className="surface-panel mt-8 overflow-hidden">
        <div className="border-b border-[var(--line)] p-4">
          <label className="relative block max-w-md">
            <span className="sr-only">Search venues</span>
            <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#929995]" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="field-control pl-10"
              placeholder="Search venue, manager, or phone"
            />
          </label>
        </div>

        {loading ? (
          <div className="grid min-h-64 place-items-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--line)] border-t-[var(--rose)]" />
          </div>
        ) : visibleVenues.length === 0 ? (
          <EmptyState
            icon={Building2}
            title={search ? "No matching venues" : "No venues added yet"}
            description={
              search
                ? "Try a different venue name, manager, or phone number."
                : "Add your first venue partner to begin building the event sourcing directory."
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-190 text-left text-sm">
              <thead className="bg-[#f5f7f5] text-xs font-bold uppercase text-[var(--muted)]">
                <tr>
                  <th className="px-5 py-4">Venue</th>
                  <th className="px-5 py-4">Manager</th>
                  <th className="px-5 py-4">Contact</th>
                  <th className="px-5 py-4">Capacity</th>
                  <th className="px-5 py-4">Rent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--line)]">
                {visibleVenues.map((hall) => (
                  <tr key={hall._id || hall.hallName} className="hover:bg-[#fafbfa]">
                    <td className="px-5 py-4 font-bold">{hall.hallName}</td>
                    <td className="px-5 py-4 text-[var(--muted)]">{hall.managerName || "—"}</td>
                    <td className="px-5 py-4 text-[var(--muted)]">{hall.contactNumber || "—"}</td>
                    <td className="px-5 py-4 text-[var(--muted)]">{hall.capacity || "—"}</td>
                    <td className="px-5 py-4 font-semibold">
                      {hall.rent ? `₹${Number(hall.rent).toLocaleString("en-IN")}` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <AddBanquetHall
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onCreated={loadVenues}
      />
    </div>
  );
};

export default BanquetHall;
