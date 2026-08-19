import { useCallback, useMemo, useState } from "react";
import {
  AlertCircle,
  CalendarDays,
  ChevronRight,
  Filter,
  Inbox,
  MapPin,
  RefreshCw,
  Search,
  Users,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../../config/api";
import BookingDetailModal from "./BookingDetailModal";

const STATUSES = ["Pending", "Confirmed", "Planning", "Completed", "Cancelled"];

const statusStyles = {
  Pending: "border-[#ead9aa] bg-[#fbf6e8] text-[#795d1d]",
  Confirmed: "border-[#bcd8c5] bg-[#edf6f0] text-[#356247]",
  Planning: "border-[#cbd6e2] bg-[#eef3f8] text-[#405f7c]",
  Completed: "border-[#c5d5cb] bg-[#edf2ee] text-[var(--sage)]",
  Cancelled: "border-[#e8c4cc] bg-[#faecef] text-[#8b2941]",
};

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

const getInitials = (name = "Customer") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const getUpdateError = (error) =>
  error.response?.data?.message ||
  (error.code === "ECONNABORTED"
    ? "The update timed out. Please try again."
    : "The booking could not be updated. Check the connection and try again.");

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

const CustomerIdentity = ({ customer = {} }) => {
  const name = customer.fullName || "Customer";

  return (
    <div className="flex min-w-0 items-center gap-3">
      {customer.photo ? (
        <img
          src={customer.photo}
          alt=""
          className="h-10 w-10 shrink-0 rounded-full object-cover"
        />
      ) : (
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--sage)] text-xs font-extrabold text-white">
          {getInitials(name) || "C"}
        </span>
      )}
      <div className="min-w-0">
        <p className="truncate text-sm font-bold">{name}</p>
        <p className="truncate text-xs text-[var(--muted)]">
          {customer.email || customer.phone || "Contact not provided"}
        </p>
      </div>
    </div>
  );
};

const BookingSkeleton = () => (
  <div className="animate-pulse divide-y divide-[var(--line)]" role="status">
    <span className="sr-only">Loading bookings</span>
    {[1, 2, 3, 4].map((row) => (
      <div key={row} className="grid gap-4 p-5 lg:grid-cols-[1.2fr_1fr_0.8fr_0.7fr_0.6fr]">
        <div className="h-10 rounded-lg bg-[#edf0ee]" />
        <div className="h-10 rounded-lg bg-[#edf0ee]" />
        <div className="h-10 rounded-lg bg-[#edf0ee]" />
        <div className="h-10 rounded-lg bg-[#edf0ee]" />
        <div className="h-10 rounded-lg bg-[#edf0ee]" />
      </div>
    ))}
  </div>
);

const Bookings = ({
  bookings = [],
  loading = false,
  error = "",
  refetch = () => Promise.resolve(),
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const filteredBookings = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return bookings.filter((booking) => {
      const customer = booking.customer || {};
      const searchable = [
        booking.reference,
        booking.eventType,
        booking.city,
        booking.serviceType,
        customer.fullName,
        customer.email,
        customer.phone,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const matchesSearch = !query || searchable.includes(query);
      const matchesStatus =
        statusFilter === "all" || booking.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, searchTerm, statusFilter]);

  const hasFilters = Boolean(searchTerm.trim()) || statusFilter !== "all";

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };

  const closeDetails = useCallback(() => {
    setSelectedBooking(null);
  }, []);

  const handleSave = async (update) => {
    if (!selectedBooking?._id) {
      throw new Error("This booking is missing its identifier.");
    }

    setIsSaving(true);
    try {
      await api.patch(
        "/bookings/" + selectedBooking._id + "/status",
        update,
      );
      toast.success("Booking updated");
      await refetch();
      setSelectedBooking(null);
    } catch (requestError) {
      throw new Error(getUpdateError(requestError));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase text-[var(--rose)]">
            Event operations
          </p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl">Booking queue</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
            Review new event briefs, confirm availability, and keep every request
            moving through planning.
          </p>
        </div>
        <button
          type="button"
          onClick={refetch}
          disabled={loading}
          className="button-secondary self-start disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto"
        >
          <RefreshCw
            size={17}
            className={loading ? "animate-spin" : ""}
            aria-hidden="true"
          />
          Refresh
        </button>
      </header>

      <section className="surface-panel mt-7 overflow-hidden" aria-label="Booking management">
        <div className="border-b border-[var(--line)] p-4 sm:p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">Search bookings</span>
              <Search
                size={17}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#929995]"
              />
              <input
                type="search"
                className="field-control pl-10"
                placeholder="Search reference, event, customer, or city"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </label>
            <label className="relative md:w-48">
              <span className="sr-only">Filter booking status</span>
              <Filter
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#929995]"
              />
              <select
                className="field-control pl-9"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option value="all">All statuses</option>
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-3 text-sm font-bold text-[var(--rose)] hover:bg-[#f8eaee]"
              >
                <X size={16} /> Clear
              </button>
            )}
          </div>
          {!loading && !error && (
            <p className="mt-3 text-xs font-semibold text-[var(--muted)]" aria-live="polite">
              Showing {filteredBookings.length} of {bookings.length} bookings
            </p>
          )}
        </div>

        {loading ? (
          <BookingSkeleton />
        ) : error ? (
          <div className="px-5 py-16 text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-lg bg-[#faecef] text-[#9b2c46]">
              <AlertCircle size={23} />
            </span>
            <h2 className="mt-4 text-lg font-extrabold">Bookings are unavailable</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--muted)]">
              {error}
            </p>
            <button type="button" onClick={refetch} className="button-secondary mt-5">
              <RefreshCw size={17} /> Try again
            </button>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-lg bg-[#edf2ee] text-[var(--sage)]">
              <Inbox size={26} />
            </span>
            <h2 className="mt-4 text-lg font-extrabold">
              {hasFilters ? "No matching bookings" : "No booking requests yet"}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--muted)]">
              {hasFilters
                ? "Adjust the search or status filter to see more requests."
                : "New customer bookings will appear here as soon as they are submitted."}
            </p>
            {hasFilters && (
              <button type="button" onClick={clearFilters} className="button-secondary mt-5">
                <X size={16} /> Clear filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[860px]">
                <thead className="border-b border-[var(--line)] bg-[#f7f8f7]">
                  <tr>
                    {["Customer", "Event", "Event date", "Guests", "Status", ""].map(
                      (heading) => (
                        <th
                          key={heading || "actions"}
                          scope="col"
                          className="px-5 py-3 text-left text-[11px] font-extrabold uppercase text-[var(--muted)]"
                        >
                          {heading}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--line)]">
                  {filteredBookings.map((booking) => (
                    <tr key={booking._id || booking.reference} className="hover:bg-[#fafbfa]">
                      <td className="px-5 py-4">
                        <CustomerIdentity customer={booking.customer} />
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm font-bold">
                          {booking.eventType || "Event"}
                        </p>
                        <p className="mt-1 flex items-center gap-1 text-xs text-[var(--muted)]">
                          <MapPin size={12} /> {booking.city || "City pending"}
                        </p>
                        <p className="mt-1 text-[11px] font-semibold text-[var(--rose)]">
                          {booking.reference || "Reference pending"}
                        </p>
                      </td>
                      <td className="px-5 py-4 text-sm font-semibold">
                        {formatDate(booking.eventDate)}
                      </td>
                      <td className="px-5 py-4 text-sm font-semibold">
                        {booking.guestCount || "Not set"}
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={booking.status} />
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedBooking(booking)}
                          className="inline-flex min-h-10 items-center gap-1 rounded-lg px-3 text-sm font-bold text-[var(--rose)] hover:bg-[#f8eaee]"
                        >
                          Review <ChevronRight size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-[var(--line)] lg:hidden">
              {filteredBookings.map((booking) => (
                <article key={booking._id || booking.reference} className="p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <CustomerIdentity customer={booking.customer} />
                    <StatusBadge status={booking.status} />
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 rounded-lg bg-[#f7f8f7] p-3">
                    <div className="min-w-0">
                      <p className="text-[10px] font-extrabold uppercase text-[var(--muted)]">
                        Event
                      </p>
                      <p className="mt-1 truncate text-sm font-bold">
                        {booking.eventType || "Event"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-extrabold uppercase text-[var(--muted)]">
                        Guests
                      </p>
                      <p className="mt-1 flex items-center gap-1.5 text-sm font-bold">
                        <Users size={14} /> {booking.guestCount || "Not set"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-extrabold uppercase text-[var(--muted)]">
                        Event date
                      </p>
                      <p className="mt-1 flex items-center gap-1.5 text-sm font-bold">
                        <CalendarDays size={14} /> {formatDate(booking.eventDate)}
                      </p>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-extrabold uppercase text-[var(--muted)]">
                        City
                      </p>
                      <p className="mt-1 flex items-center gap-1.5 truncate text-sm font-bold">
                        <MapPin size={14} /> {booking.city || "Pending"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <p className="truncate text-xs font-semibold text-[var(--rose)]">
                      {booking.reference || "Reference pending"}
                    </p>
                    <button
                      type="button"
                      onClick={() => setSelectedBooking(booking)}
                      className="inline-flex min-h-10 shrink-0 items-center gap-1 rounded-lg px-3 text-sm font-bold text-[var(--rose)] hover:bg-[#f8eaee]"
                    >
                      Review <ChevronRight size={16} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>

      <BookingDetailModal
        booking={selectedBooking}
        isSaving={isSaving}
        onClose={closeDetails}
        onSave={handleSave}
      />
    </div>
  );
};

export default Bookings;
