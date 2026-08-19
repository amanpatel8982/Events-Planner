import { MessageSquareHeart, Star } from "lucide-react";
import EmptyState from "./EmptyState";

const CustomerFeedback = () => {
  return (
    <div className="mx-auto max-w-7xl">
      <header>
        <p className="text-xs font-bold uppercase text-[var(--rose)]">Experience quality</p>
        <h1 className="mt-2 font-serif text-3xl sm:text-4xl">Customer feedback</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Review sentiment and turn event learnings into better operating standards.
        </p>
      </header>
      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          ["Average rating", "—", Star],
          ["Responses", "0", MessageSquareHeart],
          ["Would recommend", "—", Star],
        ].map(([label, value, icon]) => {
          const Icon = icon;
          return (
            <article key={label} className="surface-panel p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-[var(--muted)]">{label}</p>
                <Icon size={19} className="text-[var(--brass)]" />
              </div>
              <p className="mt-4 font-serif text-3xl">{value}</p>
            </article>
          );
        })}
      </section>
      <section className="surface-panel mt-6">
        <EmptyState
          icon={MessageSquareHeart}
          title="No feedback received"
          description="Customer ratings and comments will be collected here after completed events."
        />
      </section>
    </div>
  );
};

export default CustomerFeedback;
