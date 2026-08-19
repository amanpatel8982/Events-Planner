import {
  AlertCircle,
  ArrowRight,
  CalendarCheck2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Inbox,
  RefreshCw,
} from "lucide-react";
import { createElement } from "react";
import { useAuth } from "../../context/AuthContext";

const statusStyles = {
  Pending: "border-[#ead9aa] bg-[#fbf6e8] text-[#795d1d]",
  Confirmed: "border-[#bcd8c5] bg-[#edf6f0] text-[#356247]",
  Planning: "border-[#cbd6e2] bg-[#eef3f8] text-[#405f7c]",
  Completed: "border-[#c5d5cb] bg-[#edf2ee] text-[var(--sage)]",
  Cancelled: "border-[#e8c4cc] bg-[#faecef] text-[#8b2941]",
};

const formatDate = (value) => {
  const date = new Date(value);
  if (!value || Number.isNaN(date.getTime())) return "Date pending";
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

const StatusBadge = ({ status = "Pending" }) => (
  <span
    className={[
      "inline-flex rounded-full border px-2.5 py-1 text-[11px] font-extrabold",
      statusStyles[status] || statusStyles.Pending,
    ].join(" ")}
  >
    {status}
  </span>
);

const MetricCard = ({ icon, label, value, note, tone, loading }) => (
  <article className="surface-panel p-5">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-semibold text-[var(--muted)]">{label}</p>
        {loading ? (
          <div className="mt-3 h-10 w-16 animate-pulse rounded-lg bg-[#edf0ee]" />
        ) : (
          <p className="mt-3 font-serif text-4xl">{value}</p>
        )}
      </div>
      <span
        className={[
          "grid h-10 w-10 place-items-center rounded-lg",
          tone,
        ].join(" ")}
      >
        {createElement(icon, { size: 20, "aria-hidden": true })}
      </span>
    </div>
    <p className="mt-4 border-t border-[var(--line)] pt-3 text-xs text-[var(--muted)]">
      {note}
    </p>
  </article>
);

const Overview = ({
  setActive,
  bookings = [],
  loading = false,
  error = "",
  refetch,
}) => {
  const { user } = useAuth();
  const pending = bookings.filter((booking) => booking.status === "Pending");
  const active = bookings.filter((booking) =>
    ["Confirmed", "Planning"].includes(booking.status),
  );
  const completed = bookings.filter(
    (booking) => booking.status === "Completed",
  );
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = bookings
    .filter((booking) => {
      const date = new Date(booking.eventDate);
      return (
        !Number.isNaN(date.getTime()) &&
        date >= today &&
        !["Completed", "Cancelled"].includes(booking.status)
      );
    })
    .sort((first, second) => new Date(first.eventDate) - new Date(second.eventDate))
    .slice(0, 4);

  const attentionQueue = [...pending]
    .sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt))
    .slice(0, 4);

  const metrics = [
    {
      label: "Total requests",
      value: bookings.length,
      note: bookings.length
        ? "All customer booking briefs"
        : "Waiting for the first request",
      icon: CalendarDays,
      tone: "bg-[#f5ecef] text-[var(--rose)]",
    },
    {
      label: "Pending review",
      value: pending.length,
      note: pending.length ? "Requires an admin decision" : "Queue is up to date",
      icon: Clock3,
      tone: "bg-[#fbf6e8] text-[#795d1d]",
    },
    {
      label: "Active planning",
      value: active.length,
      note: active.length ? "Confirmed or in planning" : "No active event plans",
      icon: CalendarCheck2,
      tone: "bg-[#eef3f8] text-[#405f7c]",
    },
    {
      label: "Completed",
      value: completed.length,
      note: completed.length
        ? "Events delivered successfully"
        : "Completed events appear here",
      icon: CheckCircle2,
      tone: "bg-[#edf2ee] text-[var(--sage)]",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase text-[var(--rose)]">
            Operations overview
          </p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl">
            Good day, {user?.fullName?.split(" ")[0] || "Admin"}.
          </h1>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            Review incoming requests and keep upcoming events moving forward.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setActive("bookings")}
          className="button-primary self-start sm:self-auto"
        >
          {pending.length
            ? "Review pending (" + pending.length + ")"
            : "Open booking queue"}
          <ArrowRight size={17} />
        </button>
      </header>

      {error && (
        <div
          role="alert"
          className="mt-6 flex flex-col gap-3 rounded-lg border border-[#edcbd2] bg-[#fff7f8] p-4 sm:flex-row sm:items-center"
        >
          <AlertCircle size={20} className="shrink-0 text-[#9b2c46]" />
          <p className="min-w-0 flex-1 text-sm font-semibold text-[#713044]">
            {error}
          </p>
          <button
            type="button"
            onClick={refetch}
            className="inline-flex items-center gap-2 self-start text-sm font-extrabold text-[var(--rose)] hover:underline sm:self-auto"
          >
            <RefreshCw size={15} /> Try again
          </button>
        </div>
      )}

      <section
        className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        aria-label="Booking metrics"
      >
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} loading={loading} />
        ))}
      </section>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="surface-panel overflow-hidden">
          <div className="flex items-start justify-between gap-4 border-b border-[var(--line)] p-5 sm:p-6">
            <div>
              <h2 className="font-serif text-2xl">Upcoming events</h2>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Confirmed dates and open plans in chronological order.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActive("bookings")}
              className="shrink-0 text-xs font-extrabold text-[var(--rose)] hover:underline"
            >
              View all
            </button>
          </div>

          {loading ? (
            <div className="animate-pulse divide-y divide-[var(--line)]">
              {[1, 2, 3].map((row) => (
                <div key={row} className="flex gap-4 p-5">
                  <div className="h-11 w-11 rounded-lg bg-[#edf0ee]" />
                  <div className="flex-1">
                    <div className="h-4 w-1/2 rounded bg-[#edf0ee]" />
                    <div className="mt-2 h-3 w-1/3 rounded bg-[#edf0ee]" />
                  </div>
                </div>
              ))}
            </div>
          ) : upcoming.length ? (
            <div className="divide-y divide-[var(--line)]">
              {upcoming.map((booking) => (
                <div
                  key={booking._id || booking.reference}
                  className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-[#f5ecef] text-[var(--rose)]">
                    <CalendarDays size={20} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate text-sm font-extrabold">
                        {booking.eventType || "Event"}
                      </h3>
                      <StatusBadge status={booking.status} />
                    </div>
                    <p className="mt-1 truncate text-xs text-[var(--muted)]">
                      {booking.customer?.fullName || "Customer"} |{" "}
                      {booking.city || "City pending"}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-sm font-extrabold">
                      {formatDate(booking.eventDate)}
                    </p>
                    <p className="mt-1 text-[11px] font-semibold text-[var(--rose)]">
                      {booking.reference || "Reference pending"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-5 py-12 text-center">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-lg bg-[#edf2ee] text-[var(--sage)]">
                <CalendarCheck2 size={23} />
              </span>
              <h3 className="mt-4 text-base font-extrabold">No upcoming events</h3>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[var(--muted)]">
                Confirmed customer dates will be organized here automatically.
              </p>
            </div>
          )}
        </section>

        <section className="surface-panel overflow-hidden">
          <div className="border-b border-[var(--line)] p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="font-serif text-2xl">Attention queue</h2>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  New requests waiting for review.
                </p>
              </div>
              {pending.length > 0 && (
                <span className="rounded-full bg-[#f5e8ed] px-2.5 py-1 text-xs font-extrabold text-[var(--rose)]">
                  {pending.length}
                </span>
              )}
            </div>
          </div>

          {loading ? (
            <div className="animate-pulse space-y-4 p-5">
              {[1, 2, 3].map((row) => (
                <div key={row} className="h-16 rounded-lg bg-[#edf0ee]" />
              ))}
            </div>
          ) : attentionQueue.length ? (
            <div className="divide-y divide-[var(--line)]">
              {attentionQueue.map((booking) => (
                <button
                  key={booking._id || booking.reference}
                  type="button"
                  onClick={() => setActive("bookings")}
                  className="flex w-full items-center gap-3 p-4 text-left hover:bg-[#fafbfa]"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#fbf6e8] text-[#795d1d]">
                    <Inbox size={17} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-extrabold">
                      {booking.customer?.fullName || "Customer"}
                    </span>
                    <span className="mt-1 block truncate text-xs text-[var(--muted)]">
                      {booking.eventType || "Event"} | {formatDate(booking.eventDate)}
                    </span>
                  </span>
                  <ArrowRight size={16} className="shrink-0 text-[var(--rose)]" />
                </button>
              ))}
            </div>
          ) : (
            <div className="px-5 py-12 text-center">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-lg bg-[#edf2ee] text-[var(--sage)]">
                <CheckCircle2 size={23} />
              </span>
              <h3 className="mt-4 text-base font-extrabold">Queue is clear</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-[var(--muted)]">
                There are no pending booking requests to review.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Overview;
