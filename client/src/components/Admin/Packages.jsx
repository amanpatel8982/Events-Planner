import { Check, Package } from "lucide-react";

const packages = [
  {
    name: "Event-day coordination",
    label: "Focused support",
    description: "For clients who have planned the event and need professional production on the day.",
    features: ["Final vendor alignment", "Master event timeline", "On-site coordination"],
    color: "border-t-[var(--sage)]",
  },
  {
    name: "Partial planning",
    label: "Collaborative",
    description: "For clients with a venue or early plan who need expert structure and vendor support.",
    features: ["Planning roadmap", "Selected vendor sourcing", "Design and production review"],
    color: "border-t-[var(--brass)]",
  },
  {
    name: "Full-service planning",
    label: "End to end",
    description: "Complete creative, commercial, and operational leadership from brief to closeout.",
    features: ["Budget and concept", "Complete vendor management", "Guest and event production"],
    color: "border-t-[var(--rose)]",
  },
];

const Packages = () => {
  return (
    <div className="mx-auto max-w-7xl">
      <header>
        <p className="text-xs font-bold uppercase text-[var(--rose)]">Service architecture</p>
        <h1 className="mt-2 font-serif text-3xl sm:text-4xl">Planning packages</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
          Clear planning formats help the team qualify inquiries and recommend the right level of support.
        </p>
      </header>

      <section className="mt-8 grid gap-4 lg:grid-cols-3">
        {packages.map((item) => (
          <article
            key={item.name}
            className={`surface-panel border-t-4 p-6 ${item.color}`}
          >
            <div className="flex items-start justify-between gap-4">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#f3f5f3] text-[var(--ink)]">
                <Package size={20} />
              </span>
              <span className="rounded-lg bg-[#f3f5f3] px-2.5 py-1 text-[10px] font-bold uppercase text-[var(--muted)]">
                {item.label}
              </span>
            </div>
            <h2 className="mt-6 font-serif text-2xl">{item.name}</h2>
            <p className="mt-3 min-h-18 text-sm leading-6 text-[var(--muted)]">
              {item.description}
            </p>
            <div className="mt-6 grid gap-3 border-t border-[var(--line)] pt-5">
              {item.features.map((feature) => (
                <span key={feature} className="flex items-center gap-2 text-sm font-semibold">
                  <Check size={16} className="text-[var(--sage)]" /> {feature}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>

      <div className="mt-6 rounded-lg border border-dashed border-[#bdc5bf] bg-white p-5 text-sm leading-6 text-[var(--muted)]">
        Package pricing is intentionally set after discovery so scope, guest count,
        city, and production requirements are reflected accurately.
      </div>
    </div>
  );
};

export default Packages;
