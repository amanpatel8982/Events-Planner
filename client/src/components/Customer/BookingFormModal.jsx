import {
  AlertCircle,
  CalendarDays,
  Loader2,
  MapPin,
  UsersRound,
  WalletCards,
  X,
} from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

const eventTypes = [
  "Wedding",
  "Engagement",
  "Birthday",
  "Anniversary",
  "Corporate event",
  "Social gathering",
  "Other",
];

const serviceTypes = [
  "Full-service planning",
  "Venue and catering",
  "Decor and styling",
  "Day-of coordination",
  "Planning consultation",
];

const budgetRanges = [
  "Under INR 1 lakh",
  "INR 1 - 3 lakh",
  "INR 3 - 7 lakh",
  "INR 7 - 15 lakh",
  "Above INR 15 lakh",
  "Not decided yet",
];

const initialValues = {
  eventType: "",
  eventDate: "",
  city: "",
  guestCount: "",
  budgetRange: "",
  serviceType: "",
  venuePreference: "",
  notes: "",
};

const getLocalDate = () => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().split("T")[0];
};

const getErrorMessage = (error) => {
  const serverMessage = error.response?.data?.message;
  if (serverMessage) return serverMessage;

  if (error.code === "ECONNABORTED") {
    return "The booking request took too long. Please try again.";
  }

  if (!error.response) {
    return "We cannot reach the booking service right now. Please try again shortly.";
  }

  return "Unable to submit your booking. Please try again.";
};

const validate = (values) => {
  const errors = {};
  const guestCount = Number(values.guestCount);

  if (!values.eventType) errors.eventType = "Select an event type.";
  if (!values.eventDate) {
    errors.eventDate = "Choose an event date.";
  } else if (values.eventDate < getLocalDate()) {
    errors.eventDate = "Event date cannot be in the past.";
  }

  if (!values.city.trim()) {
    errors.city = "Enter the event city.";
  } else if (values.city.trim().length < 2) {
    errors.city = "Enter a valid city name.";
  }

  if (!values.guestCount) {
    errors.guestCount = "Enter the expected guest count.";
  } else if (!Number.isInteger(guestCount) || guestCount < 1) {
    errors.guestCount = "Guest count must be a whole number above zero.";
  } else if (guestCount > 10000) {
    errors.guestCount = "For more than 10,000 guests, contact support.";
  }

  if (!values.budgetRange) errors.budgetRange = "Select a budget range.";
  if (!values.serviceType) errors.serviceType = "Select a service type.";
  if (values.venuePreference.length > 160) {
    errors.venuePreference = "Keep venue preference under 160 characters.";
  }
  if (values.notes.length > 1000) {
    errors.notes = "Keep notes under 1,000 characters.";
  }

  return errors;
};

const FieldError = ({ id, children }) => (
  <p id={id} className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700">
    <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
    {children}
  </p>
);

const BookingFormModal = ({ onClose, onSubmit }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const titleId = useId();
  const descriptionId = useId();
  const formErrorId = useId();
  const dialogRef = useRef(null);
  const firstInputRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const submittingRef = useRef(submitting);

  onCloseRef.current = onClose;
  submittingRef.current = submitting;

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstInputRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !submittingRef.current) {
        onCloseRef.current();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = dialogRef.current?.querySelectorAll(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
      );

      if (!focusableElements?.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === lastElement
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, []);

  const updateValue = (event) => {
    const { name, value } = event.target;
    setValues((currentValues) => ({ ...currentValues, [name]: value }));

    if (errors[name]) {
      setErrors((currentErrors) => ({ ...currentErrors, [name]: "" }));
    }
    if (submitError) setSubmitError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate(values);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstInvalidField = Object.keys(nextErrors)[0];
      dialogRef.current
        ?.querySelector(`[name="${firstInvalidField}"]`)
        ?.focus();
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      await onSubmit({
        eventType: values.eventType,
        eventDate: values.eventDate,
        city: values.city.trim(),
        guestCount: Number(values.guestCount),
        budgetRange: values.budgetRange,
        serviceType: values.serviceType,
        venuePreference: values.venuePreference.trim(),
        notes: values.notes.trim(),
      });
      onClose();
    } catch (error) {
      setSubmitError(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  const fieldDescription = (name, hintId) => {
    const ids = [];
    if (hintId) ids.push(hintId);
    if (errors[name]) ids.push(`${name}-error`);
    return ids.length ? ids.join(" ") : undefined;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-5">
      <button
        type="button"
        className="absolute inset-0 h-full w-full bg-black/65"
        onClick={() => !submitting && onClose()}
        aria-label="Close booking form"
        tabIndex="-1"
      />

      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="relative flex max-h-[95vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-lg bg-white shadow-2xl sm:max-h-[90vh] sm:rounded-lg"
      >
        <header className="flex items-start justify-between gap-5 border-b border-[var(--line)] px-5 py-4 sm:px-7 sm:py-5">
          <div>
            <p className="text-xs font-semibold text-[var(--rose)]">
              New booking request
            </p>
            <h2
              id={titleId}
              className="mt-1 text-xl font-semibold text-[var(--ink)] sm:text-2xl"
            >
              Plan your event
            </h2>
            <p
              id={descriptionId}
              className="mt-1 max-w-xl text-sm leading-5 text-[var(--muted)]"
            >
              Add the event basics so the planning team can review your request.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--line)] text-[var(--muted)] hover:bg-[var(--paper)] hover:text-[var(--ink)] disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Close booking form"
            title="Close"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        <form
          id="customer-booking-form"
          className="overflow-y-auto"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="space-y-6 px-5 py-5 sm:px-7 sm:py-6">
            {submitError && (
              <div
                id={formErrorId}
                role="alert"
                className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800"
              >
                <AlertCircle
                  className="mt-0.5 h-4 w-4 shrink-0"
                  aria-hidden="true"
                />
                <span>{submitError}</span>
              </div>
            )}

            <fieldset>
              <legend className="flex items-center gap-2 text-sm font-semibold text-[var(--ink)]">
                <CalendarDays
                  className="h-4 w-4 text-[var(--rose)]"
                  aria-hidden="true"
                />
                Event details
              </legend>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="field-label" htmlFor="eventType">
                    Event type <span aria-hidden="true">*</span>
                  </label>
                  <select
                    ref={firstInputRef}
                    id="eventType"
                    name="eventType"
                    value={values.eventType}
                    onChange={updateValue}
                    className="field-control"
                    aria-invalid={Boolean(errors.eventType)}
                    aria-describedby={fieldDescription("eventType")}
                  >
                    <option value="">Select event type</option>
                    {eventTypes.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.eventType && (
                    <FieldError id="eventType-error">
                      {errors.eventType}
                    </FieldError>
                  )}
                </div>

                <div>
                  <label className="field-label" htmlFor="eventDate">
                    Event date <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="eventDate"
                    name="eventDate"
                    type="date"
                    min={getLocalDate()}
                    value={values.eventDate}
                    onChange={updateValue}
                    className="field-control"
                    aria-invalid={Boolean(errors.eventDate)}
                    aria-describedby={fieldDescription("eventDate")}
                  />
                  {errors.eventDate && (
                    <FieldError id="eventDate-error">
                      {errors.eventDate}
                    </FieldError>
                  )}
                </div>

                <div>
                  <label className="field-label" htmlFor="city">
                    Event city <span aria-hidden="true">*</span>
                  </label>
                  <div className="relative">
                    <MapPin
                      className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-[var(--muted)]"
                      aria-hidden="true"
                    />
                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={values.city}
                      onChange={updateValue}
                      className="field-control pl-10"
                      placeholder="e.g. Indore"
                      autoComplete="address-level2"
                      maxLength="100"
                      aria-invalid={Boolean(errors.city)}
                      aria-describedby={fieldDescription("city")}
                    />
                  </div>
                  {errors.city && (
                    <FieldError id="city-error">{errors.city}</FieldError>
                  )}
                </div>

                <div>
                  <label className="field-label" htmlFor="guestCount">
                    Expected guests <span aria-hidden="true">*</span>
                  </label>
                  <div className="relative">
                    <UsersRound
                      className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-[var(--muted)]"
                      aria-hidden="true"
                    />
                    <input
                      id="guestCount"
                      name="guestCount"
                      type="number"
                      min="1"
                      max="10000"
                      step="1"
                      inputMode="numeric"
                      value={values.guestCount}
                      onChange={updateValue}
                      className="field-control pl-10"
                      placeholder="e.g. 250"
                      aria-invalid={Boolean(errors.guestCount)}
                      aria-describedby={fieldDescription("guestCount")}
                    />
                  </div>
                  {errors.guestCount && (
                    <FieldError id="guestCount-error">
                      {errors.guestCount}
                    </FieldError>
                  )}
                </div>
              </div>
            </fieldset>

            <fieldset className="border-t border-[var(--line)] pt-5">
              <legend className="flex items-center gap-2 pr-3 text-sm font-semibold text-[var(--ink)]">
                <WalletCards
                  className="h-4 w-4 text-[var(--rose)]"
                  aria-hidden="true"
                />
                Planning scope
              </legend>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="field-label" htmlFor="serviceType">
                    Service needed <span aria-hidden="true">*</span>
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={values.serviceType}
                    onChange={updateValue}
                    className="field-control"
                    aria-invalid={Boolean(errors.serviceType)}
                    aria-describedby={fieldDescription("serviceType")}
                  >
                    <option value="">Select a service</option>
                    {serviceTypes.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.serviceType && (
                    <FieldError id="serviceType-error">
                      {errors.serviceType}
                    </FieldError>
                  )}
                </div>

                <div>
                  <label className="field-label" htmlFor="budgetRange">
                    Budget range <span aria-hidden="true">*</span>
                  </label>
                  <select
                    id="budgetRange"
                    name="budgetRange"
                    value={values.budgetRange}
                    onChange={updateValue}
                    className="field-control"
                    aria-invalid={Boolean(errors.budgetRange)}
                    aria-describedby={fieldDescription("budgetRange")}
                  >
                    <option value="">Select a budget</option>
                    {budgetRanges.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.budgetRange && (
                    <FieldError id="budgetRange-error">
                      {errors.budgetRange}
                    </FieldError>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="field-label" htmlFor="venuePreference">
                    Venue preference
                  </label>
                  <input
                    id="venuePreference"
                    name="venuePreference"
                    type="text"
                    value={values.venuePreference}
                    onChange={updateValue}
                    className="field-control"
                    placeholder="Venue name, area, indoor or outdoor preference"
                    maxLength="160"
                    aria-invalid={Boolean(errors.venuePreference)}
                    aria-describedby={fieldDescription(
                      "venuePreference",
                      "venuePreference-hint",
                    )}
                  />
                  <div
                    id="venuePreference-hint"
                    className="mt-1.5 text-right text-xs text-[var(--muted)]"
                  >
                    {values.venuePreference.length}/160
                  </div>
                  {errors.venuePreference && (
                    <FieldError id="venuePreference-error">
                      {errors.venuePreference}
                    </FieldError>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="field-label" htmlFor="notes">
                    Notes for the planning team
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows="4"
                    value={values.notes}
                    onChange={updateValue}
                    className="field-control resize-y"
                    placeholder="Priorities, preferred style, special requirements or questions"
                    maxLength="1000"
                    aria-invalid={Boolean(errors.notes)}
                    aria-describedby={fieldDescription("notes", "notes-hint")}
                  />
                  <div
                    id="notes-hint"
                    className="mt-1.5 text-right text-xs text-[var(--muted)]"
                  >
                    {values.notes.length}/1000
                  </div>
                  {errors.notes && (
                    <FieldError id="notes-error">{errors.notes}</FieldError>
                  )}
                </div>
              </div>
            </fieldset>
          </div>

          <footer className="sticky bottom-0 flex flex-col-reverse gap-3 border-t border-[var(--line)] bg-white px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="button-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              aria-describedby={submitError ? formErrorId : undefined}
              className="button-primary min-w-40 disabled:cursor-not-allowed disabled:opacity-65"
            >
              {submitting ? (
                <>
                  <Loader2
                    className="h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                  Submitting...
                </>
              ) : (
                "Submit booking"
              )}
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
};

export default BookingFormModal;
