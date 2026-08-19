import {
  FileText,
  LifeBuoy,
  LoaderCircle,
  MailCheck,
  Send,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import api from "../../config/api";
import { useAuth } from "../../context/AuthContext";

const supportTopics = [
  "Event planning question",
  "Booking or schedule question",
  "Profile or account help",
  "Technical issue",
  "Something else",
];

const Support = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    topic: supportTopics[0],
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    const message =
      "Customer support topic: " +
      formData.topic +
      "\n\n" +
      formData.message.trim();

    try {
      const response = await api.post("/public/contactus", {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        message,
      });

      toast.success(
        response.data?.message || "Your support request has been sent",
      );
      setFormData((current) => ({ ...current, message: "" }));
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Unable to send your support request",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[90rem] p-4 sm:p-7 lg:p-10">
      <header className="border-b border-[var(--line)] pb-7">
        <p className="text-sm font-semibold text-[var(--rose)]">
          Direct assistance
        </p>
        <h1 className="mt-2 font-serif text-3xl font-medium text-[var(--ink)] sm:text-4xl">
          Support
        </h1>
        <p className="mt-3 max-w-2xl leading-7 text-[var(--muted)]">
          Send a planning, booking or account question to the team with the
          details they need to respond usefully.
        </p>
      </header>

      <div className="mt-7 grid items-start gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <section
          className="rounded-lg border border-[var(--line)] bg-white p-5 sm:p-7"
          aria-labelledby="support-form-title"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--paper)] text-[var(--rose)]">
              <LifeBuoy className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h2
                id="support-form-title"
                className="text-xl font-semibold text-[var(--ink)]"
              >
                Send a support request
              </h2>
              <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                Your message is added to the same support queue used by the
                planning team.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <label htmlFor="support-topic" className="field-label">
                What can we help with?
              </label>
              <select
                id="support-topic"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                className="field-control"
              >
                {supportTopics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="support-name" className="field-label">
                  Full name
                </label>
                <input
                  id="support-name"
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
                <label htmlFor="support-phone" className="field-label">
                  Phone number
                </label>
                <input
                  id="support-phone"
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
              <label htmlFor="support-email" className="field-label">
                Email address
              </label>
              <input
                id="support-email"
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
              <label htmlFor="support-message" className="field-label">
                How can we help?
              </label>
              <textarea
                id="support-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="field-control min-h-40 resize-y"
                placeholder="Include the event date, location, booking reference or steps that caused the issue when relevant."
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
              {submitting ? "Sending request..." : "Send support request"}
            </button>
          </form>
        </section>

        <aside className="space-y-4" aria-label="Support request guidance">
          <div className="rounded-lg bg-[var(--ink)] p-6 text-white sm:p-7">
            <MailCheck
              className="h-6 w-6 text-[var(--brass)]"
              aria-hidden="true"
            />
            <h2 className="mt-5 text-xl font-semibold">
              What happens after you send
            </h2>
            <p className="mt-3 leading-7 text-white/65">
              The request is saved in the support queue with your contact
              details. The team can review it, update its status and reply to
              the email address provided.
            </p>
          </div>

          <div className="rounded-lg border border-[var(--line)] bg-white p-6">
            <FileText
              className="h-6 w-6 text-[var(--sage)]"
              aria-hidden="true"
            />
            <h2 className="mt-4 font-semibold text-[var(--ink)]">
              Include useful context
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--muted)]">
              <li>Event date and location, if known</li>
              <li>The decision or issue you need help with</li>
              <li>Relevant booking or account details</li>
            </ul>
          </div>

          <div className="flex gap-3 rounded-lg border border-[var(--line)] bg-[var(--paper)] p-4">
            <ShieldCheck
              className="mt-0.5 h-5 w-5 shrink-0 text-[var(--sage)]"
              aria-hidden="true"
            />
            <p className="text-sm leading-6 text-[var(--muted)]">
              Do not include payment card details or account passwords in a
              support message.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Support;
