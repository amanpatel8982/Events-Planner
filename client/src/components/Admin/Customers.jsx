import { Search, Users } from "lucide-react";
import EmptyState from "./EmptyState";

const Customers = () => {
  return (
    <div className="mx-auto max-w-7xl">
      <header>
        <p className="text-xs font-bold uppercase text-[var(--rose)]">Relationships</p>
        <h1 className="mt-2 font-serif text-3xl sm:text-4xl">Customers</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          A central record of client profiles, events, and communication.
        </p>
      </header>

      <section className="surface-panel mt-8 overflow-hidden">
        <div className="border-b border-[var(--line)] p-4">
          <label className="relative block max-w-md">
            <span className="sr-only">Search customers</span>
            <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#929995]" />
            <input
              type="search"
              className="field-control pl-10"
              placeholder="Search by name, email, or phone"
            />
          </label>
        </div>
        <EmptyState
          icon={Users}
          title="No customer profiles"
          description="Registered customers and their linked bookings will be listed here as the workspace grows."
        />
      </section>
    </div>
  );
};

export default Customers;
