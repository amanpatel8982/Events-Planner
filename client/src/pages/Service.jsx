import {
  ArrowRight,
  CalendarCheck,
  Check,
  Compass,
  HeartHandshake,
  Palette,
} from "lucide-react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import heroImage from "../assets/back1.jpg";
import processImage from "../assets/background.jpg";

const serviceGroups = [
  {
    icon: Compass,
    title: "Planning and direction",
    description:
      "The commercial and operational framework that keeps every decision connected.",
    items: [
      {
        name: "Scope and budget roadmap",
        detail: "Priorities, allocations and decision dates defined early.",
      },
      {
        name: "Venue search and walkthroughs",
        detail: "Space, access, service flow and guest experience assessed.",
      },
      {
        name: "Vendor curation",
        detail: "The right creative and production partners for the brief.",
      },
      {
        name: "Master planning timeline",
        detail: "Approvals, dependencies and ownership visible to everyone.",
      },
    ],
  },
  {
    icon: Palette,
    title: "Design and production",
    description:
      "A visual direction that works beautifully in the room and in the production plan.",
    items: [
      {
        name: "Creative concept and moodboard",
        detail: "A focused design language shaped around the occasion.",
      },
      {
        name: "Floor plans and guest flow",
        detail: "Layouts designed for comfort, service and clear movement.",
      },
      {
        name: "Floral, decor and staging",
        detail: "Materials and focal moments developed as one composition.",
      },
      {
        name: "Lighting and technical production",
        detail: "Sound, lighting and build requirements fully coordinated.",
      },
    ],
  },
  {
    icon: HeartHandshake,
    title: "Guests and hospitality",
    description:
      "Every touchpoint planned so guests feel informed, welcomed and cared for.",
    items: [
      {
        name: "Invitations and RSVP planning",
        detail: "Clear guest communication and an accurate working list.",
      },
      {
        name: "Accommodation and transport",
        detail: "Arrival, transfers and stay details brought into one plan.",
      },
      {
        name: "Catering and service flow",
        detail: "Menus, dietary needs and service timing aligned to the event.",
      },
      {
        name: "Entertainment and hosting",
        detail: "Performances and program moments paced for the room.",
      },
    ],
  },
];

const processSteps = [
  {
    number: "01",
    title: "Brief and priorities",
    description:
      "We clarify the occasion, the non-negotiables, the guest profile and the decisions already made.",
  },
  {
    number: "02",
    title: "Scope and direction",
    description:
      "You receive a planning framework that connects budget, venue, design and delivery.",
  },
  {
    number: "03",
    title: "Development and approvals",
    description:
      "Vendors are briefed, options are compared and every approval is recorded against the timeline.",
  },
  {
    number: "04",
    title: "Production and event day",
    description:
      "We manage setup, supplier calls, guest flow, program timing and the final handover.",
  },
];

const planningFormats = [
  {
    title: "Event-day coordination",
    bestFor:
      "For clients who have booked the essentials and need one team to bring every moving part together.",
    items: [
      "Planning takeover consultation",
      "Final vendor confirmations",
      "Detailed production run sheet",
      "Rehearsal and event-day management",
    ],
    featured: false,
  },
  {
    title: "Full-service planning",
    bestFor:
      "For clients who want one partner to shape the event from its earliest decisions through final delivery.",
    items: [
      "Scope, priorities and budget framework",
      "Venue and vendor management",
      "Creative direction and guest planning",
      "End-to-end production oversight",
    ],
    featured: true,
  },
  {
    title: "Design and production",
    bestFor:
      "For clients with logistics in place who need a cohesive visual concept and a team to produce it.",
    items: [
      "Concept, palette and material direction",
      "Floor plan and decor development",
      "Creative vendor briefs",
      "Installation and final styling",
    ],
    featured: false,
  },
];

const Service = () => {
  return (
    <main>
      <PageHero
        eyebrow="Our services"
        title="Full-service event planning, built around your occasion."
        description="From the first venue question to the final guest departure, we connect creative ideas, reliable partners and precise production in one working plan."
        image={heroImage}
        imageAlt="An elegant reception table set with candles and warm floral arrangements"
        primaryAction={{ label: "Discuss your event", to: "/contact" }}
        secondaryAction={{ label: "View the gallery", to: "/gallery" }}
      />

      <section className="section-space bg-[var(--paper)]">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Connected expertise"
            title="One planning team. Every part of the experience."
            description="Choose end-to-end support or bring us into the stage where you need the most clarity. Each service group is designed to work independently and even better together."
          />

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {serviceGroups.map((group) => {
              const Icon = group.icon;

              return (
                <article
                  key={group.title}
                  className="rounded-lg border border-[var(--line)] bg-white p-6 sm:p-8"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[var(--surface)] text-[var(--rose)]">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h2 className="mt-6 text-2xl font-semibold text-[var(--ink)]">
                    {group.title}
                  </h2>
                  <p className="mt-3 min-h-[5.25rem] leading-7 text-[var(--muted)]">
                    {group.description}
                  </p>

                  <ul className="mt-7 border-t border-[var(--line)] pt-2">
                    {group.items.map((item) => (
                      <li
                        key={item.name}
                        className="flex gap-3 border-b border-[var(--line)] py-4 last:border-b-0"
                      >
                        <Check
                          className="mt-1 h-4 w-4 shrink-0 text-[var(--sage)]"
                          aria-hidden="true"
                        />
                        <div>
                          <h3 className="font-semibold text-[var(--ink)]">
                            {item.name}
                          </h3>
                          <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                            {item.detail}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-space bg-[var(--surface)]">
        <div className="page-shell grid items-start gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20">
          <figure className="lg:sticky lg:top-28">
            <div className="aspect-[4/5] overflow-hidden rounded-lg bg-white">
              <img
                src={processImage}
                alt="A ceremony stage prepared beneath a bright vaulted canopy"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="mt-3 text-sm leading-6 text-[var(--muted)]">
              Creative direction is only successful when the production plan
              can deliver it precisely.
            </figcaption>
          </figure>

          <div>
            <SectionHeading
              eyebrow="How the work moves"
              title="A clear path from possibility to production."
              description="The process is structured enough to protect timing and budget, while remaining flexible enough for better ideas to emerge."
            />

            <ol className="mt-10">
              {processSteps.map((step, index) => (
                <li
                  key={step.number}
                  className={[
                    "grid gap-3 py-6 sm:grid-cols-[4rem_1fr]",
                    index === 0
                      ? "border-y border-[var(--line)]"
                      : "border-b border-[var(--line)]",
                  ].join(" ")}
                >
                  <p className="text-sm font-semibold text-[var(--rose)]">
                    {step.number}
                  </p>
                  <div>
                    <h3 className="text-xl font-semibold text-[var(--ink)]">
                      {step.title}
                    </h3>
                    <p className="mt-2 leading-7 text-[var(--muted)]">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section-space bg-[var(--paper)]">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Ways to work together"
            title="Choose the level of support that fits your plan."
            description="No two briefs arrive at the same stage. These formats make it easier to begin the right conversation without forcing the event into a fixed package."
            align="center"
          />

          <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-3">
            {planningFormats.map((format) => (
              <article
                key={format.title}
                className={[
                  "flex rounded-lg border p-7 sm:p-8",
                  "flex-col",
                  format.featured
                    ? "border-[var(--ink)] bg-[var(--ink)] text-white"
                    : "border-[var(--line)] bg-white",
                ].join(" ")}
              >
                <div className="flex items-center justify-between gap-4">
                  <CalendarCheck
                    className={[
                      "h-6 w-6",
                      format.featured
                        ? "text-[var(--brass)]"
                        : "text-[var(--rose)]",
                    ].join(" ")}
                    aria-hidden="true"
                  />
                  {format.featured && (
                    <span className="rounded-md border border-white/25 px-3 py-1 text-xs font-semibold text-white/80">
                      Most comprehensive
                    </span>
                  )}
                </div>

                <h3
                  className={[
                    "mt-6 text-2xl font-semibold",
                    format.featured ? "text-white" : "text-[var(--ink)]",
                  ].join(" ")}
                >
                  {format.title}
                </h3>
                <p
                  className={[
                    "mt-4 min-h-[7rem] leading-7",
                    format.featured ? "text-white/70" : "text-[var(--muted)]",
                  ].join(" ")}
                >
                  {format.bestFor}
                </p>

                <ul
                  className={[
                    "mt-6 space-y-3 border-t pt-6",
                    format.featured
                      ? "border-white/15"
                      : "border-[var(--line)]",
                  ].join(" ")}
                >
                  {format.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check
                        className={[
                          "mt-1 h-4 w-4 shrink-0",
                          format.featured
                            ? "text-[var(--brass)]"
                            : "text-[var(--sage)]",
                        ].join(" ")}
                        aria-hidden="true"
                      />
                      <span
                        className={[
                          "leading-6",
                          format.featured
                            ? "text-white/85"
                            : "text-[var(--ink)]",
                        ].join(" ")}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className={[
                    "mt-8 inline-flex items-center gap-2 font-semibold",
                    format.featured
                      ? "text-white hover:text-[var(--brass)]"
                      : "text-[var(--rose)] hover:text-[var(--rose-dark)]",
                  ].join(" ")}
                >
                  Discuss this format
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-[var(--sage)]">
        <div className="page-shell flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="A useful first conversation"
            title="Tell us what is decided, what is uncertain and what matters most."
            description="We will help identify the right scope, the immediate priorities and the next decisions your event needs."
            invert
          />
          <Link
            to="/contact"
            className="button-secondary inline-flex shrink-0 items-center justify-center gap-2 border-white bg-white text-[var(--ink)] hover:bg-transparent hover:text-white"
          >
            Share your brief
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Service;
