import {
  AlertCircle,
  CalendarDays,
  CalendarPlus,
  Check,
  Clock3,
  Loader2,
  MapPin,
  Plus,
  RefreshCw,
  Search,
  UsersRound,
  WalletCards,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";

const bookingStages = ["Pending", "Confirmed", "Planning", "Completed"];
const filters = [
  "All",
  "Pending",
  "Confirmed",
  "Planning",
  "Completed",
  "Cancelled",
];

const statusStyles = {
  pending: "border-amber-200 bg-amber-50 text-amber-800",
  confirmed: "border-emerald-200 bg-emerald-50 text-emerald-800",
  planning: "border-sky-200 bg-sky-50 text-sky-800",
  completed: "border-slate-200 bg-slate-50 text-slate-700",
  cancelled: "border-red-200 bg-red-50 text-red-700",
};

const statusDescriptions = {
  pending: "Awaiting review from the planning team",
  confirmed: "Accepted and ready for detailed planning",
  planning: "Your event plan is currently in progress",
  completed: "Event planning has been completed",
  cancelled: "This booking request has been cancelled",
};

const normalizeStatus = (status) => String(status || "Pending").toLowerCase();

const formatDate = (value) => {
  if (!value) return "Date pending";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date pending";

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

const getReference = (booking) =>
  booking.reference ||
  (booking._id ? `BK-${booking._id.slice(-6).toUpperCase()}` : "New request");

const getErrorMessage = (error) =>
  error.response?.data?.message ||
  error.message ||
  "Unable to cancel this booking right now.";

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

const BookingProgress = ({ status }) => {
  const currentStage = bookingStages.findIndex(
    (stage) => stage.toLowerCase() === normalizeStatus(status),
  );

  if (normalizeStatus(status) === "cancelled") {
    return (
      <div className="flex items-center gap-2 border-t border-[var(--line)] pt-4 text-sm text-red-700">
        <XCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
        This request is closed and will not move to planning.
      </div>
    );
  }

  return (
    <ol
      className="grid grid-cols-4 border-t border-[var(--line)] pt-4"
      aria-label={`Booking stage: ${status || "Pending"}`}
    >
      {bookingStages.map((stage, index) => {
        const reached = index <= currentStage;
        const current = index === currentStage;

        return (
          <li
            key={stage}
            className="relative flex min-w-0 flex-col items-center text-center"
            aria-current={current ? "step" : undefined}
          >
            {index > 0 && (
              <span
                className={`absolute right-1/2 top-2 h-px w-full ${
                  reached ? "bg-[var(--sage)]" : "bg-[var(--line)]"
                }`}
                aria-hidden="true"
              />
            )}
            <span
              className={`relative z-10 flex h-4 w-4 items-center justify-center rounded-full border ${
                reached
                  ? "border-[var(--sage)] bg-[var(--sage)] text-white"
                  : "border-[var(--line)] bg-white"
              }`}
              aria-hidden="true"
            >
              {reached && <Check className="h-2.5 w-2.5" />}
            </span>
            <span
              className={`mt-2 w-full truncate px-1 text-[11px] font-semibold sm:text-xs ${
                reached ? "text-[var(--ink)]" : "text-[var(--muted)]"
              }`}
            >
              {stage}
            </span>
          </li>
        );
      })}
    </ol>
  );
};

const BookingSkeleton = () => (
  <div className="space-y-3">
    {[0, 1, 2].map((item) => (
      <div
        key={item}
        className="rounded-lg border border-[var(--line)] bg-white p-5"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="h-5 w-40 animate-pulse rounded bg-slate-200" />
            <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />
          </div>
          <div className="h-7 w-20 animate-pulse rounded bg-slate-100" />
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[0, 1, 2, 3].map((cell) => (
            <div key={cell} className="h-12 animate-pulse rounded bg-slate-50" />
          ))}
        </div>
      </div>
    ))}
  </div>
);

const Bookings = ({
  bookings = [],
  loading = false,
  error = "",
  cancellingBookingId = "",
  onRefresh,
  onCreateBooking,
  onCancelBooking,
}) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmCancelId, setConfirmCancelId] = useState("");
  const [cancelError, setCancelError] = useState("");

  const sortedBookings = useMemo(
    () =>
      [...bookings].sort(
        (first, second) =>
          new Date(second.createdAt || 0) - new Date(first.createdAt || 0),
      ),
    [bookings],
  );

  const filteredBookings = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return sortedBookings.filter((booking) => {
      const matchesFilter =
        activeFilter === "All" ||
        normalizeStatus(booking.status) === activeFilter.toLowerCase();
      const searchableText = [
        booking.eventType,
        booking.city,
        booking.serviceType,
        booking.reference,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return (
        matchesFilter &&
        (!normalizedSearch || searchableText.includes(normalizedSearch))
      );
    });
  }, [activeFilter, searchTerm, sortedBookings]);

  const getFilterCount = (filter) => {
    if (filter === "All") return bookings.length;
    return bookings.filter(
      (booking) => normalizeStatus(booking.status) === filter.toLowerCase(),
    ).length;
  };

  const handleCancel = async (bookingId) => {
    setCancelError("");

    try {
      await onCancelBooking(bookingId);
      setConfirmCancelId("");
    } catch (requestError) {
      setCancelError(getErrorMessage(requestError));
    }
  };

  const resetFilters = () => {
    setActiveFilter("All");
    setSearchTerm("");
  };

  return (
    <div className="mx-auto w-full max-w-[90rem] p-4 sm:p-7 lg:p-9">
      <header className="flex flex-col justify-between gap-5 border-b border-[var(--line)] pb-6 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-semibold text-[var(--rose)]">
            Event planning
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
            My bookings
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)] sm:text-base">
            Create event requests and follow each booking from review through
            completion.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start">
          <button
            type="button"
            onClick={onRefresh}
            disabled={loading}
            className="flex h-12 w-12 items-center justify-center rounded-lg border border-[var(--line)] bg-white text-[var(--muted)] hover:border-[var(--sage)] hover:text-[var(--sage)] disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Refresh bookings"
            title="Refresh bookings"
          >
            <RefreshCw
              className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
              aria-hidden="true"
            />
          </button>
          <button
            type="button"
            onClick={onCreateBooking}
            className="button-primary"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            New booking
          </button>
        </div>
      </header>

      {(error || cancelError) && (
        <div
          role="alert"
          className="mt-5 flex flex-col justify-between gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 sm:flex-row sm:items-center"
        >
          <div className="flex items-start gap-2.5">
            <AlertCircle
              className="mt-0.5 h-4 w-4 shrink-0"
              aria-hidden="true"
            />
            <span>{cancelError || error}</span>
          </div>
          {error && (
            <button
              type="button"
              onClick={onRefresh}
              className="inline-flex items-center gap-2 self-start font-semibold hover:text-red-950"
            >
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Retry
            </button>
          )}
        </div>
      )}

      <section className="mt-5" aria-label="Booking controls">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div
            className="flex max-w-full gap-1 overflow-x-auto rounded-lg border border-[var(--line)] bg-white p-1"
            aria-label="Filter bookings by status"
          >
            {filters.map((filter) => {
              const selected = activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  aria-pressed={selected}
                  className={`flex min-h-9 shrink-0 items-center gap-1.5 rounded-md px-3 text-xs font-semibold transition-colors ${
                    selected
                      ? "bg-[var(--ink)] text-white"
                      : "text-[var(--muted)] hover:bg-[var(--paper)] hover:text-[var(--ink)]"
                  }`}
                >
                  {filter}
                  <span
                    className={selected ? "text-white/65" : "text-[var(--muted)]"}
                  >
                    {getFilterCount(filter)}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-72">
            <label htmlFor="booking-search" className="sr-only">
              Search bookings
            </label>
            <Search
              className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-[var(--muted)]"
              aria-hidden="true"
            />
            <input
              id="booking-search"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="field-control min-h-10 py-2 pl-9 text-sm"
              placeholder="Search event, city or reference"
            />
          </div>
        </div>
      </section>

      <section
        className="mt-5"
        aria-labelledby="booking-list-title"
        aria-live="polite"
        aria-busy={loading}
      >
        <div className="mb-3 flex items-center justify-between gap-4">
          <h2
            id="booking-list-title"
            className="text-lg font-semibold text-[var(--ink)]"
          >
            Booking requests
          </h2>
          {!loading && bookings.length > 0 && (
            <p className="text-xs font-medium text-[var(--muted)]">
              {filteredBookings.length} of {bookings.length}
            </p>
          )}
        </div>

        {loading ? (
          <BookingSkeleton />
        ) : bookings.length === 0 ? (
          <div className="rounded-lg border border-dashed border-[var(--line)] bg-white px-5 py-10 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--paper)] text-[var(--rose)]">
              <CalendarPlus className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-[var(--ink)]">
              Start your first booking
            </h3>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[var(--muted)]">
              Send the event date, city, guest count and service needs directly
              to the planning team.
            </p>
            <button
              type="button"
              onClick={onCreateBooking}
              className="button-primary mt-5"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Create booking
            </button>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="rounded-lg border border-dashed border-[var(--line)] bg-white px-5 py-9 text-center">
            <Search
              className="mx-auto h-6 w-6 text-[var(--muted)]"
              aria-hidden="true"
            />
            <h3 className="mt-3 font-semibold text-[var(--ink)]">
              No matching bookings
            </h3>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Try another status or search term.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 text-sm font-semibold text-[var(--rose)] hover:text-[var(--rose-dark)]"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredBookings.map((booking) => {
              const bookingId = booking._id || booking.id;
              const normalizedStatus = normalizeStatus(booking.status);
              const canCancel = !["completed", "cancelled"].includes(
                normalizedStatus,
              );
              const isCancelling = cancellingBookingId === bookingId;
              const confirmingCancellation = confirmCancelId === bookingId;

              return (
                <article
                  key={bookingId || booking.reference}
                  className="rounded-lg border border-[var(--line)] bg-white p-4 sm:p-5"
                >
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="text-lg font-semibold text-[var(--ink)]">
                          {booking.eventType || "Event planning"}
                        </h3>
                        <StatusBadge status={booking.status} />
                      </div>
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--muted)]">
                        <span className="font-semibold text-[var(--sage)]">
                          {getReference(booking)}
                        </span>
                        <span>
                          Requested {formatDate(booking.createdAt)}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs font-medium text-[var(--muted)] sm:text-right">
                      {statusDescriptions[normalizedStatus] ||
                        statusDescriptions.pending}
                    </p>
                  </div>

                  <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 border-y border-[var(--line)] py-4 md:grid-cols-4">
                    <div className="min-w-0">
                      <dt className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
                        <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                        Event date
                      </dt>
                      <dd className="mt-1 truncate text-sm font-semibold text-[var(--ink)]">
                        {formatDate(booking.eventDate)}
                      </dd>
                    </div>
                    <div className="min-w-0">
                      <dt className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
                        <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                        City
                      </dt>
                      <dd className="mt-1 truncate text-sm font-semibold text-[var(--ink)]">
                        {booking.city || "Pending"}
                      </dd>
                    </div>
                    <div className="min-w-0">
                      <dt className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
                        <UsersRound className="h-3.5 w-3.5" aria-hidden="true" />
                        Guests
                      </dt>
                      <dd className="mt-1 truncate text-sm font-semibold text-[var(--ink)]">
                        {booking.guestCount || "Pending"}
                      </dd>
                    </div>
                    <div className="min-w-0">
                      <dt className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
                        <WalletCards className="h-3.5 w-3.5" aria-hidden="true" />
                        Budget
                      </dt>
                      <dd className="mt-1 truncate text-sm font-semibold text-[var(--ink)]">
                        {booking.budgetRange || "Pending"}
                      </dd>
                    </div>
                  </dl>

                  <div className="grid gap-4 py-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs text-[var(--muted)]">Service</p>
                      <p className="mt-1 text-sm font-medium text-[var(--ink)]">
                        {booking.serviceType || "Planning service"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--muted)]">Venue preference</p>
                      <p className="mt-1 text-sm font-medium text-[var(--ink)]">
                        {booking.venuePreference || "Open to recommendations"}
                      </p>
                    </div>
                  </div>

                  {booking.notes && (
                    <div className="mb-4 border-l-2 border-[var(--brass)] pl-3">
                      <p className="text-xs text-[var(--muted)]">Planning notes</p>
                      <p className="mt-1 whitespace-pre-line text-sm leading-6 text-[var(--ink)]">
                        {booking.notes}
                      </p>
                    </div>
                  )}

                  <BookingProgress status={booking.status} />

                  {canCancel && (
                    <div className="mt-4 flex min-h-9 items-center justify-end border-t border-[var(--line)] pt-4">
                      {confirmingCancellation ? (
                        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                          <p className="flex-1 text-sm text-[var(--muted)] sm:text-right">
                            Cancel this booking request?
                          </p>
                          <button
                            type="button"
                            onClick={() => setConfirmCancelId("")}
                            disabled={isCancelling}
                            className="button-secondary min-h-9 px-3 py-2 text-xs"
                          >
                            Keep booking
                          </button>
                          <button
                            type="button"
                            onClick={() => handleCancel(bookingId)}
                            disabled={isCancelling}
                            className="inline-flex min-h-9 items-center justify-center gap-2 rounded-lg border border-red-700 bg-red-700 px-3 py-2 text-xs font-semibold text-white hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {isCancelling ? (
                              <Loader2
                                className="h-3.5 w-3.5 animate-spin"
                                aria-hidden="true"
                              />
                            ) : (
                              <XCircle className="h-3.5 w-3.5" aria-hidden="true" />
                            )}
                            {isCancelling ? "Cancelling..." : "Confirm cancel"}
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setCancelError("");
                            setConfirmCancelId(bookingId);
                          }}
                          className="inline-flex items-center gap-2 text-xs font-semibold text-red-700 hover:text-red-900"
                        >
                          <XCircle className="h-3.5 w-3.5" aria-hidden="true" />
                          Cancel booking
                        </button>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Bookings;
