import {
  BadgeCheck,
  Lightbulb,
  LoaderCircle,
  MessageSquareText,
  Send,
  Star,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import api from "../../config/api";
import { useAuth } from "../../context/AuthContext";

const feedbackCategories = [
  "Planning experience",
  "Communication",
  "Website experience",
  "Support experience",
  "General feedback",
];

const Feedback = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    category: feedbackCategories[0],
    rating: 0,
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.rating) {
      toast.error("Please choose a rating before sending feedback");
      return;
    }

    setSubmitting(true);

    const message =
      "Customer feedback category: " +
      formData.category +
      "\nRating: " +
      formData.rating +
      "/5\n\n" +
      formData.message.trim();

    try {
      const response = await api.post("/public/contactus", {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        message,
      });

      toast.success(response.data?.message || "Thank you for your feedback");
      setFormData((current) => ({
        ...current,
        rating: 0,
        message: "",
      }));
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Unable to send feedback right now",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[90rem] p-4 sm:p-7 lg:p-10">
      <header className="border-b border-[var(--line)] pb-7">
        <p className="text-sm font-semibold text-[var(--rose)]">
          Help us improve
        </p>
        <h1 className="mt-2 font-serif text-3xl font-medium text-[var(--ink)] sm:text-4xl">
          Feedback
        </h1>
        <p className="mt-3 max-w-2xl leading-7 text-[var(--muted)]">
          Share what worked, what felt unclear and what would make the planning
          experience more useful for you.
        </p>
      </header>

      <div className="mt-7 grid items-start gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <section
          className="rounded-lg border border-[var(--line)] bg-white p-5 sm:p-7"
          aria-labelledby="feedback-form-title"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--paper)] text-[var(--rose)]">
              <MessageSquareText className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h2
                id="feedback-form-title"
                className="text-xl font-semibold text-[var(--ink)]"
              >
                Tell us about your experience
              </h2>
              <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                Specific examples help the team understand what should stay
                and what should change.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <fieldset>
              <legend className="field-label">Overall rating</legend>
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label="Choose a rating from one to five"
              >
                {[1, 2, 3, 4, 5].map((rating) => {
                  const isSelected = rating <= formData.rating;

                  return (
                    <button
                      key={rating}
                      type="button"
                      onClick={() =>
                        setFormData((current) => ({
                          ...current,
                          rating,
                        }))
                      }
                      aria-label={rating + " out of 5"}
                      aria-pressed={formData.rating === rating}
                      className={[
                        "flex h-11 w-11 items-center justify-center rounded-lg border transition-colors",
                        isSelected
                          ? "border-[var(--brass)] bg-[var(--brass)] text-white"
                          : "border-[var(--line)] bg-white text-[var(--muted)] hover:border-[var(--brass)] hover:text-[var(--brass)]",
                      ].join(" ")}
                    >
                      <Star
                        className="h-5 w-5"
                        fill={isSelected ? "currentColor" : "none"}
                        aria-hidden="true"
                      />
                    </button>
                  );
                })}
                <span className="self-center pl-2 text-sm text-[var(--muted)]">
                  {formData.rating
                    ? formData.rating + " of 5 selected"
                    : "Choose a rating"}
                </span>
              </div>
            </fieldset>

            <div>
              <label htmlFor="feedback-category" className="field-label">
                Feedback about
              </label>
              <select
                id="feedback-category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="field-control"
              >
                {feedbackCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="feedback-name" className="field-label">
                  Full name
                </label>
                <input
                  id="feedback-name"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="field-control"
                  autoComplete="name"
                  required
                />
              </div>
              <div>
                <label htmlFor="feedback-phone" className="field-label">
                  Phone number
                </label>
                <input
                  id="feedback-phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="field-control"
                  autoComplete="tel"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="feedback-email" className="field-label">
                Email address
              </label>
              <input
                id="feedback-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="field-control"
                autoComplete="email"
                required
              />
            </div>

            <div>
              <label htmlFor="feedback-message" className="field-label">
                Your feedback
              </label>
              <textarea
                id="feedback-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="field-control min-h-40 resize-y"
                placeholder="What worked well, and what would make the experience better?"
                minLength="10"
                maxLength="2000"
                required
              />
              <p className="mt-2 text-right text-xs text-[var(--muted)]">
                {formData.message.length}/2000
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="button-primary inline-flex w-full items-center gap-2 sm:w-auto"
            >
              {submitting ? (
                <LoaderCircle
                  className="h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              ) : (
                <Send className="h-4 w-4" aria-hidden="true" />
              )}
              {submitting ? "Sending feedback..." : "Send feedback"}
            </button>
          </form>
        </section>

        <aside className="space-y-4" aria-label="Feedback guidance">
          <div className="rounded-lg bg-[var(--sage)] p-6 text-white sm:p-7">
            <BadgeCheck
              className="h-6 w-6 text-white"
              aria-hidden="true"
            />
            <h2 className="mt-5 text-xl font-semibold">
              Feedback reaches the team
            </h2>
            <p className="mt-3 leading-7 text-white/75">
              Your response is submitted with the contact details shown in the
              form, so the team can understand the context and follow up when
              needed.
            </p>
          </div>

          <div className="rounded-lg border border-[var(--line)] bg-white p-6">
            <Lightbulb
              className="h-6 w-6 text-[var(--brass)]"
              aria-hidden="true"
            />
            <h2 className="mt-4 font-semibold text-[var(--ink)]">
              Useful feedback is specific
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--muted)]">
              <li>Name the part of the experience you are describing</li>
              <li>Explain what you expected to happen</li>
              <li>Suggest the change that would help most</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Feedback;
