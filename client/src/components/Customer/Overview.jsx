import {
  ArrowRight,
  CalendarClock,
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  ClipboardList,
  Headphones,
  Plus,
  RefreshCw,
  UserRound,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const profileFields = [
  "fullName",
  "email",
  "phone",
  "gender",
  "occupation",
  "address",
  "city",
  "state",
];

const terminalStatuses = new Set(["completed", "cancelled"]);

const statusStyles = {
  pending: "border-amber-200 bg-amber-50 text-amber-800",
  confirmed: "border-emerald-200 bg-emerald-50 text-emerald-800",
  planning: "border-sky-200 bg-sky-50 text-sky-800",
  completed: "border-slate-200 bg-slate-50 text-slate-700",
  cancelled: "border-red-200 bg-red-50 text-red-700",
};

const hasUsefulValue = (value) => {
  if (!value) return false;
  const normalized = String(value).trim().toLowerCase();
  return normalized !== "n/a" && normalized !== "not provided";
};

const normalizeStatus = (status) => String(status || "Pending").toLowerCase();

const formatDate = (value, options = {}) => {
  if (!value) return "Date pending";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date pending";

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: options.compact ? undefined : "numeric",
  }).format(date);
};

const getBookingReference = (booking) =>
  booking.reference ||
  (booking._id ? `BK-${booking._id.slice(-6).toUpperCase()}` : "New request");

const getDaysUntil = (value) => {
  if (!value) return "Schedule pending";
  const eventDate = new Date(value);
  if (Number.isNaN(eventDate.getTime())) return "Schedule pending";

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  eventDate.setHours(0, 0, 0, 0);
  const difference = Math.round((eventDate - today) / 86400000);

  if (difference === 0) return "Event is today";
  if (difference === 1) return "Event is tomorrow";
  if (difference > 1) return `${difference} days to go`;
  return "Event date passed";
};

const StatusBadge = ({ status }) => {
  const normalized = normalizeStatus(status);

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-semibold ${
        statusStyles[normalized] || statusStyles.pending
      }`}
    >
      {status || "Pending"}
    </span>
  );
};

const OverviewSkeleton = () => (
  <div className="overflow-hidden rounded-lg border border-[var(--line)] bg-white">
    {[0, 1, 2].map((item) => (
      <div
        key={item}
        className="grid gap-3 border-b border-[var(--line)] p-4 last:border-b-0 sm:grid-cols-[1.2fr_0.8fr_auto] sm:items-center"
      >
        <div className="space-y-2">
          <div className="h-4 w-36 animate-pulse rounded bg-slate-200" />
          <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />
        </div>
        <div className="h-4 w-28 animate-pulse rounded bg-slate-100" />
        <div className="h-7 w-20 animate-pulse rounded bg-slate-100" />
      </div>
    ))}
  </div>
);

const Overview = ({
  bookings = [],
  loading = false,
  error = "",
  onRefresh,
  onCreateBooking,
  onNavigate,
}) => {
  const { user } = useAuth();
  const firstName = user?.fullName?.trim().split(" ")[0] || "there";
  const completedFields = profileFields.filter((field) =>
    hasUsefulValue(user?.[field]),
  ).length;
  const completeness = Math.round(
    (completedFields / profileFields.length) * 100,
  );

  const sortedBookings = [...bookings].sort(
    (first, second) =>
      new Date(second.createdAt || 0) - new Date(first.createdAt || 0),
  );
  const activeBookings = sortedBookings.filter(
    (booking) => !terminalStatuses.has(normalizeStatus(booking.status)),
  );
  const completedBookings = sortedBookings.filter(
    (booking) => normalizeStatus(booking.status) === "completed",
  );
  const upcomingBooking = activeBookings
    .filter((booking) => {
      const eventDate = new Date(booking.eventDate);
      return !Number.isNaN(eventDate.getTime()) && eventDate >= new Date();
    })
    .sort(
      (first, second) =>
        new Date(first.eventDate) - new Date(second.eventDate),
    )[0];

  const summaryItems = [
    {
      icon: ClipboardList,
      label: "Active bookings",
      value: loading ? "--" : activeBookings.length,
      detail: activeBookings.length === 1 ? "Request in progress" : "Requests in progress",
    },
    {
      icon: CalendarClock,
      label: "Next event",
      value: loading ? "--" : formatDate(upcomingBooking?.eventDate, { compact: true }),
      detail: upcomingBooking?.eventType || "No upcoming event",
    },
    {
      icon: CheckCircle2,
      label: "Completed",
      value: loading ? "--" : completedBookings.length,
      detail: "Events delivered",
    },
    {
      icon: UserRound,
      label: "Profile readiness",
      value: `${completeness}%`,
      detail: completeness === 100 ? "Details complete" : "Keep details current",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[90rem] p-4 sm:p-7 lg:p-9">
      <header className="flex flex-col justify-between gap-5 border-b border-[var(--line)] pb-6 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-semibold text-[var(--rose)]">
            Customer workspace
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
            Welcome back, {firstName}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)] sm:text-base">
            Review event requests, track planning progress and keep your next
            celebration moving.
          </p>
        </div>
        <button
          type="button"
          onClick={onCreateBooking}
          className="button-primary shrink-0 self-start"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          New booking
        </button>
      </header>

      {error && (
        <div
          role="alert"
          className="mt-5 flex flex-col justify-between gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 sm:flex-row sm:items-center"
        >
          <div className="flex items-start gap-2.5">
            <CircleAlert
              className="mt-0.5 h-4 w-4 shrink-0"
              aria-hidden="true"
            />
            <span>{error}</span>
          </div>
          <button
            type="button"
            onClick={onRefresh}
            className="inline-flex items-center gap-2 self-start font-semibold hover:text-red-950"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Retry
          </button>
        </div>
      )}

      <section className="mt-5" aria-labelledby="workspace-summary-title">
        <h2 id="workspace-summary-title" className="sr-only">
          Workspace summary
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {summaryItems.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.label}
                className="rounded-lg border border-[var(--line)] bg-white p-4 sm:p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-[var(--muted)]">
                      {item.label}
                    </p>
                    <p className="mt-1 text-2xl font-semibold text-[var(--ink)]">
                      {item.value}
                    </p>
                  </div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--paper)] text-[var(--sage)]">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
                <p className="mt-3 truncate text-xs text-[var(--muted)]">
                  {item.detail}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(18rem,0.8fr)]">
        <section aria-labelledby="recent-bookings-title">
          <div className="mb-3 flex items-center justify-between gap-4">
            <div>
              <h2
                id="recent-bookings-title"
                className="text-lg font-semibold text-[var(--ink)]"
              >
                Recent bookings
              </h2>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Latest requests and planning updates
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate("bookings")}
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[var(--rose)] hover:text-[var(--rose-dark)]"
            >
              View all
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div aria-live="polite" aria-busy={loading}>
            {loading ? (
              <OverviewSkeleton />
            ) : sortedBookings.length === 0 ? (
              <div className="rounded-lg border border-dashed border-[var(--line)] bg-white px-5 py-9 text-center">
                <CalendarDays
                  className="mx-auto h-7 w-7 text-[var(--rose)]"
                  aria-hidden="true"
                />
                <h3 className="mt-3 font-semibold text-[var(--ink)]">
                  No booking requests yet
                </h3>
                <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-[var(--muted)]">
                  Create a request with your date, city and planning needs.
                </p>
                <button
                  type="button"
                  onClick={onCreateBooking}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--rose)] hover:text-[var(--rose-dark)]"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  Create booking
                </button>
              </div>
            ) : (
              <div className="overflow-hidden rounded-lg border border-[var(--line)] bg-white">
                {sortedBookings.slice(0, 4).map((booking) => (
                  <article
                    key={booking._id || booking.reference}
                    className="grid gap-3 border-b border-[var(--line)] p-4 last:border-b-0 sm:grid-cols-[1.2fr_0.8fr_auto] sm:items-center"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate font-semibold text-[var(--ink)]">
                          {booking.eventType || "Event planning"}
                        </h3>
                        <span className="text-xs text-[var(--muted)]">
                          {getBookingReference(booking)}
                        </span>
                      </div>
                      <p className="mt-1 truncate text-sm text-[var(--muted)]">
                        {booking.serviceType || "Planning service"}
                      </p>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium text-[var(--ink)]">
                        {formatDate(booking.eventDate)}
                      </p>
                      <p className="mt-1 text-xs text-[var(--muted)]">
                        {booking.city || "City pending"}
                      </p>
                    </div>
                    <div className="sm:justify-self-end">
                      <StatusBadge status={booking.status} />
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <aside className="space-y-6" aria-label="Planning shortcuts">
          <section aria-labelledby="next-event-title">
            <div className="rounded-lg bg-[var(--ink)] p-5 text-white">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-[var(--brass)]">
                    Next event
                  </p>
                  <h2 id="next-event-title" className="mt-2 text-xl font-semibold">
                    {upcomingBooking?.eventType || "Ready when you are"}
                  </h2>
                </div>
                <CalendarClock
                  className="h-5 w-5 shrink-0 text-[var(--brass)]"
                  aria-hidden="true"
                />
              </div>

              {upcomingBooking ? (
                <>
                  <dl className="mt-5 grid grid-cols-2 gap-4 border-y border-white/10 py-4 text-sm">
                    <div>
                      <dt className="text-xs text-white/55">Date</dt>
                      <dd className="mt-1 font-semibold">
                        {formatDate(upcomingBooking.eventDate)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-white/55">Location</dt>
                      <dd className="mt-1 truncate font-semibold">
                        {upcomingBooking.city || "Pending"}
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <p className="text-sm text-white/70">
                      {getDaysUntil(upcomingBooking.eventDate)}
                    </p>
                    <button
                      type="button"
                      onClick={() => onNavigate("bookings")}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-[var(--brass)]"
                    >
                      Details
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="mt-3 text-sm leading-6 text-white/65">
                    Add an event request to begin planning with the team.
                  </p>
                  <button
                    type="button"
                    onClick={onCreateBooking}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[var(--brass)]"
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                    New booking
                  </button>
                </>
              )}
            </div>
          </section>

          <section aria-labelledby="quick-actions-title">
            <h2
              id="quick-actions-title"
              className="text-lg font-semibold text-[var(--ink)]"
            >
              Quick actions
            </h2>
            <div className="mt-2 divide-y divide-[var(--line)] border-y border-[var(--line)]">
              <button
                type="button"
                onClick={() => onNavigate("profile")}
                className="group flex w-full items-center gap-3 py-3 text-left"
              >
                <UserRound
                  className="h-4 w-4 shrink-0 text-[var(--sage)]"
                  aria-hidden="true"
                />
                <span className="flex-1 text-sm font-semibold text-[var(--ink)]">
                  Update profile
                </span>
                <ArrowRight
                  className="h-4 w-4 text-[var(--muted)] group-hover:text-[var(--rose)]"
                  aria-hidden="true"
                />
              </button>
              <button
                type="button"
                onClick={() => onNavigate("support")}
                className="group flex w-full items-center gap-3 py-3 text-left"
              >
                <Headphones
                  className="h-4 w-4 shrink-0 text-[var(--sage)]"
                  aria-hidden="true"
                />
                <span className="flex-1 text-sm font-semibold text-[var(--ink)]">
                  Contact support
                </span>
                <ArrowRight
                  className="h-4 w-4 text-[var(--muted)] group-hover:text-[var(--rose)]"
                  aria-hidden="true"
                />
              </button>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default Overview;
