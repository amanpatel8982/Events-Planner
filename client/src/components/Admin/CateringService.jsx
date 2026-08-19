import { ChefHat, Search } from "lucide-react";
import EmptyState from "./EmptyState";

const CateringService = () => {
  return (
    <div className="mx-auto max-w-7xl">
      <header>
        <p className="text-xs font-bold uppercase text-[var(--rose)]">Partner network</p>
        <h1 className="mt-2 font-serif text-3xl sm:text-4xl">Catering partners</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Organize cuisine strengths, capacity, service formats, and commercial details.
        </p>
      </header>
      <section className="surface-panel mt-8 overflow-hidden">
        <div className="border-b border-[var(--line)] p-4">
          <label className="relative block max-w-md">
            <span className="sr-only">Search catering partners</span>
            <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#929995]" />
            <input
              type="search"
              className="field-control pl-10"
              placeholder="Search caterer or cuisine"
            />
          </label>
        </div>
        <EmptyState
          icon={ChefHat}
          title="No catering partners yet"
          description="Approved caterers will appear here with cuisine, capacity, service style, and contact details."
        />
      </section>
    </div>
  );
};

export default CateringService;
