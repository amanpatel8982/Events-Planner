import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  MapPin,
  MessageCircle,
  Send,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../config/api";
import background from "../assets/background.jpg";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  message: "",
};

const contactHighlights = [
  {
    icon: MapPin,
    title: "Planning across India",
    text: "Local celebrations and destination events, coordinated with the same care.",
  },
  {
    icon: Clock3,
    title: "A prompt first response",
    text: "Expect a reply within one business day with clear next steps.",
  },
  {
    icon: MessageCircle,
    title: "A useful first conversation",
    text: "No sales script. We discuss your priorities, date, scale, and planning needs.",
  },
];

const faqs = [
  {
    question: "How early should we begin planning?",
    answer:
      "For full-service weddings, 8–12 months is ideal. Intimate events and partial-planning engagements can often begin closer to the date, depending on venue and vendor availability.",
  },
  {
    question: "Do you plan destination celebrations?",
    answer:
      "Yes. We coordinate venue sourcing, travel, hospitality, production, and local partners so the guest experience remains consistent from arrival to departure.",
  },
  {
    question: "Can you work with vendors we have already booked?",
    answer:
      "Absolutely. We review existing commitments, bring every partner into one production plan, and fill any remaining gaps with specialists suited to your brief.",
  },
];

const Contact = () => {
  const [contactData, setContactData] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContactData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/public/contactus", contactData);
      toast.success(response.data?.message || "Your inquiry has been received.");
      setContactData(initialForm);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "We could not send your inquiry. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[var(--paper)] pt-[76px]">
      <section className="relative flex min-h-[56vh] items-end overflow-hidden bg-[#18201c] text-white">
        <img
          src={background}
          alt="An evening event setting prepared for guests"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,24,20,0.88),rgba(17,24,20,0.42))]" />
        <div className="page-shell relative py-16 sm:py-20">
          <p className="text-xs font-bold uppercase text-[#e7c28b]">Start a conversation</p>
          <h1 className="display-title mt-4 max-w-3xl text-balance text-white">
            Tell us what you are planning.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
            Share the first details of your event. We will listen, ask the right
            questions, and help you understand the best next step.
          </p>
        </div>
      </section>

      <section className="border-b border-[var(--line)] bg-white">
        <div className="page-shell grid gap-px bg-[var(--line)] md:grid-cols-3">
          {contactHighlights.map((highlight) => {
            const Icon = highlight.icon;
            return (
              <article
                key={highlight.title}
                className="flex gap-4 bg-white px-5 py-7 sm:px-7"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#edf2ee] text-[var(--sage)]">
                  <Icon size={20} />
                </div>
                <div>
                  <h2 className="text-sm font-bold">{highlight.title}</h2>
                  <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                    {highlight.text}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-space">
        <div className="page-shell grid overflow-hidden rounded-lg border border-[var(--line)] bg-white shadow-[0_18px_55px_rgba(24,32,28,0.08)] lg:grid-cols-[0.82fr_1.18fr]">
          <div className="relative min-h-[360px] lg:min-h-full">
            <img
              src="/gallery-5.jpg"
              alt="A styled celebration table"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#18201c]/80 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9">
              <p className="font-serif text-2xl">A considered beginning</p>
              <p className="mt-2 max-w-sm text-sm leading-6 text-white/70">
                The more context you share, the more useful our first
                conversation will be.
              </p>
              <div className="mt-5 grid gap-2 text-xs font-semibold text-white/80">
                {["Preferred date or season", "Estimated guest count", "City or venue ideas"].map(
                  (item) => (
                    <span key={item} className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-[#e7c28b]" /> {item}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-10 lg:p-12">
            <p className="eyebrow">Event inquiry</p>
            <h2 className="mt-3 font-serif text-3xl">Let us plan the next step.</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              All fields are required. Your details are used only to respond to
              this inquiry.
            </p>
            <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="fullName" className="field-label">Full name</label>
                  <input
                    id="fullName"
                    name="fullName"
                    value={contactData.fullName}
                    onChange={handleChange}
                    className="field-control"
                    placeholder="Your name"
                    autoComplete="name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="field-label">Phone number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={contactData.phone}
                    onChange={handleChange}
                    className="field-control"
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="field-label">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={contactData.email}
                  onChange={handleChange}
                  className="field-control"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="field-label">Tell us about the event</label>
                <textarea
                  id="message"
                  name="message"
                  value={contactData.message}
                  onChange={handleChange}
                  className="field-control min-h-36 resize-y"
                  placeholder="Event type, preferred date, city, guest count, and what matters most to you..."
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="button-primary w-full sm:w-fit disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  "Sending inquiry..."
                ) : (
                  <>
                    Send inquiry <Send size={17} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="section-space border-t border-[var(--line)] bg-white">
        <div className="page-shell grid gap-10 lg:grid-cols-[0.65fr_1fr]">
          <div>
            <p className="eyebrow">Before you inquire</p>
            <h2 className="section-title mt-3 text-balance">A few helpful answers.</h2>
            <p className="mt-5 max-w-md leading-7 text-[var(--muted)]">
              Every celebration is different, but these are the questions most
              couples ask at the beginning.
            </p>
          </div>
          <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex list-none items-center justify-between gap-4 font-bold">
                  {faq.question}
                  <ArrowRight
                    size={18}
                    className="shrink-0 transition-transform group-open:rotate-90"
                  />
                </summary>
                <p className="max-w-2xl pt-4 text-sm leading-7 text-[var(--muted)]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
