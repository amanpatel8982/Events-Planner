import { createElement, useEffect, useId, useRef, useState } from "react";
import {
  CalendarDays,
  Check,
  CircleDollarSign,
  Mail,
  MapPin,
  Phone,
  Users,
  X,
} from "lucide-react";

const STATUSES = ["Pending", "Confirmed", "Planning", "Completed", "Cancelled"];

const statusStyles = {
  Pending: "border-[#ead9aa] bg-[#fbf6e8] text-[#795d1d]",
  Confirmed: "border-[#bcd8c5] bg-[#edf6f0] text-[#356247]",
  Planning: "border-[#cbd6e2] bg-[#eef3f8] text-[#405f7c]",
  Completed: "border-[#c5d5cb] bg-[#edf2ee] text-[var(--sage)]",
  Cancelled: "border-[#e8c4cc] bg-[#faecef] text-[#8b2941]",
};

const formatDate = (value, options = {}) => {
  if (!value) return "Not provided";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not provided";

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...options,
  }).format(date);
};

const DetailItem = ({ icon, label, value }) => (
  <div className="flex gap-3 rounded-lg border border-[var(--line)] p-3.5">
    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#f1f4f2] text-[var(--sage)]">
      {createElement(icon, { size: 17, "aria-hidden": true })}
    </span>
    <div className="min-w-0">
      <p className="text-[11px] font-bold uppercase text-[var(--muted)]">{label}</p>
      <p className="mt-1 break-words text-sm font-semibold text-[var(--ink)]">
        {value || "Not provided"}
      </p>
    </div>
  </div>
);

const BookingDetailModal = ({ booking, isSaving, onClose, onSave }) => {
  const [status, setStatus] = useState("Pending");
  const [adminNote, setAdminNote] = useState("");
  const [saveError, setSaveError] = useState("");
  const titleId = useId();
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!booking) return;
    setStatus(booking.status || "Pending");
    setAdminNote(booking.adminNote || "");
    setSaveError("");
  }, [booking]);

  useEffect(() => {
    if (!booking) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [booking, onClose]);

  if (!booking) return null;

  const customer = booking.customer || {};
  const customerName = customer.fullName || "Customer";
  const initials = customerName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaveError("");

    try {
      await onSave({ status, adminNote: adminNote.trim() });
    } catch (error) {
      setSaveError(error.message || "The booking could not be updated.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 p-0 sm:items-center sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSaving) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="max-h-[94vh] w-full overflow-y-auto rounded-t-lg bg-white shadow-2xl sm:max-w-3xl sm:rounded-lg"
      >
        <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[var(--line)] bg-white px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xs font-bold uppercase text-[var(--rose)]">
                {booking.reference || "Booking request"}
              </p>
              <span
                className={[
                  "rounded-full border px-2.5 py-1 text-[11px] font-bold",
                  statusStyles[booking.status] || statusStyles.Pending,
                ].join(" ")}
              >
                {booking.status || "Pending"}
              </span>
            </div>
            <h2 id={titleId} className="mt-2 font-serif text-2xl sm:text-3xl">
              {booking.eventType || "Event details"}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-[var(--line)] text-[var(--muted)] hover:bg-[#f3f5f3] disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Close booking details"
          >
            <X size={19} />
          </button>
        </header>

        <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <section aria-labelledby="customer-heading">
              <h3 id="customer-heading" className="text-sm font-extrabold">
                Customer
              </h3>
              <div className="mt-3 flex items-center gap-3 rounded-lg border border-[var(--line)] bg-[#f8f9f8] p-4">
                {customer.photo ? (
                  <img
                    src={customer.photo}
                    alt=""
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[var(--sage)] text-sm font-extrabold text-white">
                    {initials || "C"}
                  </span>
                )}
                <div className="min-w-0">
                  <p className="truncate text-sm font-extrabold">{customerName}</p>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--muted)]">
                    {customer.email && (
                      <a
                        className="inline-flex items-center gap-1.5 hover:text-[var(--rose)]"
                        href={"mailto:" + customer.email}
                      >
                        <Mail size={13} /> {customer.email}
                      </a>
                    )}
                    {customer.phone && (
                      <a
                        className="inline-flex items-center gap-1.5 hover:text-[var(--rose)]"
                        href={"tel:" + customer.phone}
                      >
                        <Phone size={13} /> {customer.phone}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-6" aria-labelledby="event-heading">
              <h3 id="event-heading" className="text-sm font-extrabold">
                Event brief
              </h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <DetailItem
                  icon={CalendarDays}
                  label="Event date"
                  value={formatDate(booking.eventDate, { weekday: "short" })}
                />
                <DetailItem icon={MapPin} label="City" value={booking.city} />
                <DetailItem
                  icon={Users}
                  label="Guests"
                  value={
                    booking.guestCount
                      ? String(booking.guestCount) + " guests"
                      : "Not provided"
                  }
                />
                <DetailItem
                  icon={CircleDollarSign}
                  label="Budget"
                  value={booking.budgetRange}
                />
              </div>
              <dl className="mt-3 divide-y divide-[var(--line)] rounded-lg border border-[var(--line)] px-4">
                {[
                  ["Service", booking.serviceType],
                  ["Venue preference", booking.venuePreference],
                  [
                    "Submitted",
                    formatDate(booking.createdAt, {
                      hour: "numeric",
                      minute: "2-digit",
                    }),
                  ],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr]"
                  >
                    <dt className="text-xs font-bold text-[var(--muted)]">
                      {label}
                    </dt>
                    <dd className="text-sm font-semibold">
                      {value || "Not provided"}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="mt-6" aria-labelledby="notes-heading">
              <h3 id="notes-heading" className="text-sm font-extrabold">
                Customer notes
              </h3>
              <p className="mt-3 whitespace-pre-wrap rounded-lg border border-[var(--line)] bg-[#f8f9f8] p-4 text-sm leading-6 text-[#4f5953]">
                {booking.notes || "No additional notes were provided."}
              </p>
            </section>
          </div>

          <form
            onSubmit={handleSubmit}
            className="h-fit rounded-lg border border-[var(--line)] bg-[#f8f9f8] p-4 sm:p-5"
          >
            <h3 className="text-base font-extrabold">Manage booking</h3>
            <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
              Keep the customer request aligned with the current planning stage.
            </p>

            <label className="mt-5 block">
              <span className="field-label">Booking status</span>
              <select
                className="field-control"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                disabled={isSaving}
              >
                {STATUSES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="mt-4 block">
              <span className="field-label">Internal note</span>
              <textarea
                className="field-control min-h-32 resize-y"
                value={adminNote}
                onChange={(event) => setAdminNote(event.target.value)}
                maxLength={1000}
                placeholder="Add ownership, follow-up, or planning context"
                disabled={isSaving}
              />
              <span className="mt-1 block text-right text-[11px] text-[var(--muted)]">
                {adminNote.length}/1000
              </span>
            </label>

            {saveError && (
              <p
                role="alert"
                className="mt-3 rounded-lg border border-[#edcbd2] bg-[#fff3f5] p-3 text-xs font-semibold text-[#8b2941]"
              >
                {saveError}
              </p>
            )}

            <button
              type="submit"
              className="button-primary mt-4 w-full disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSaving}
            >
              <Check size={17} /> {isSaving ? "Saving..." : "Save update"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default BookingDetailModal;
