import {
  ArrowRight,
  CheckCircle2,
  Compass,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import heroImage from "../assets/back3.jpg";
import storyImage from "../assets/background.jpg";
import standardsImage from "../assets/entrance.jpg";

const statistics = [
  {
    value: "01",
    label: "Dedicated planning lead",
    detail: "One clear point of contact from brief to event day.",
  },
  {
    value: "04",
    label: "Planning phases",
    detail: "A visible process with decisions made at the right time.",
  },
  {
    value: "360",
    label: "Event oversight",
    detail: "Venue, vendors, design and guests considered together.",
  },
  {
    value: "1",
    label: "Shared working plan",
    detail: "Every supplier and stakeholder follows the same timeline.",
  },
];

const values = [
  {
    icon: Compass,
    title: "Clarity before decoration",
    description:
      "We define priorities, responsibilities and decision dates before creative choices begin. That structure keeps the experience calm.",
  },
  {
    icon: HeartHandshake,
    title: "Hospitality in every detail",
    description:
      "Guest arrival, comfort, movement and farewell matter as much as the stage. We plan the full experience, not only the photographs.",
  },
  {
    icon: ShieldCheck,
    title: "Design with purpose",
    description:
      "Every visual element has a role in the story, the space or the guest journey. Beauty and function are planned together.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Listen",
    description:
      "We understand the occasion, your priorities, the guest profile and the feeling you want the day to carry.",
  },
  {
    number: "02",
    title: "Build the framework",
    description:
      "We turn the brief into a practical scope, budget direction, venue plan and decision calendar.",
  },
  {
    number: "03",
    title: "Refine together",
    description:
      "Design, vendors and logistics are developed in clear rounds so every choice stays connected to the original intent.",
  },
  {
    number: "04",
    title: "Deliver with control",
    description:
      "The production schedule, supplier team and guest flow come together under one event-day command plan.",
  },
];

const standards = [
  "Defined scope, responsibilities and approval dates",
  "Vendor briefs connected to one production schedule",
  "Floor plans shaped around guest comfort and service flow",
  "Contingency planning for timing, weather and supplier changes",
  "A detailed run sheet for setup, celebration and handover",
];

const About = () => {
  return (
    <main>
      <PageHero
        eyebrow="About our studio"
        title="Planning that feels personal, clear and considered."
        description="We bring creative direction and disciplined coordination into one calm process, so your celebration feels effortless without ever feeling generic."
        image={heroImage}
        imageAlt="An event planner reviewing floral details at a worktable"
        primaryAction={{ label: "Start a conversation", to: "/contact" }}
        secondaryAction={{ label: "Explore our services", to: "/service" }}
      />

      <section className="section-space bg-[var(--paper)]">
        <div className="page-shell grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
          <figure>
            <div className="aspect-[5/4] overflow-hidden rounded-lg bg-[var(--surface)]">
              <img
                src={storyImage}
                alt="A traditional wedding ceremony staged beneath a bright architectural canopy"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="mt-3 text-sm leading-6 text-[var(--muted)]">
              A strong celebration begins with a clear story, then earns its
              beauty through thoughtful execution.
            </figcaption>
          </figure>

          <div>
            <SectionHeading
              eyebrow="Our approach"
              title="One clear plan behind every beautiful moment."
              description="An event feels effortless only when hundreds of decisions have been made deliberately."
            />

            <div className="mt-7 space-y-5 text-base leading-8 text-[var(--muted)]">
              <p>
                We bring venue, design, vendors, guest movement, budgets and
                timelines into a single working plan. That shared view gives
                every creative choice a practical path to delivery.
              </p>
              <p>
                From the first brief to final handover, each decision is tied
                to the feeling you want guests to remember. The result is not a
                template. It is a celebration with a clear point of view and a
                team that always knows what happens next.
              </p>
            </div>

            <Link
              to="/service"
              className="mt-8 inline-flex items-center gap-2 font-semibold text-[var(--rose)] hover:text-[var(--rose-dark)]"
            >
              See how we plan
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section
        className="border-y border-[var(--line)] bg-[var(--surface)]"
        aria-label="Our planning model"
      >
        <div className="page-shell grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {statistics.map((stat, index) => (
            <article
              key={stat.label}
              className={[
                "py-8 sm:px-6 lg:py-10",
                index > 0 ? "border-t border-[var(--line)] sm:border-t-0" : "",
                index % 2 !== 0
                  ? "sm:border-l sm:border-[var(--line)]"
                  : "",
                index > 1
                  ? "sm:border-t sm:border-[var(--line)] lg:border-t-0"
                  : "",
                index > 0 ? "lg:border-l lg:border-[var(--line)]" : "",
              ].join(" ")}
            >
              <p className="display-title text-4xl text-[var(--rose)]">
                {stat.value}
              </p>
              <h2 className="mt-3 text-base font-semibold text-[var(--ink)]">
                {stat.label}
              </h2>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                {stat.detail}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-space bg-[var(--paper)]">
        <div className="page-shell">
          <SectionHeading
            eyebrow="What guides us"
            title="A celebration should be beautiful to experience, not only to see."
            description="These principles shape the choices we make with clients, creative partners and production teams."
            align="center"
          />

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.title}
                  className="rounded-lg border border-[var(--line)] bg-white p-7 lg:p-8"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[color-mix(in_srgb,var(--sage)_12%,white)] text-[var(--sage)]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-[var(--ink)]">
                    {value.title}
                  </h3>
                  <p className="mt-3 leading-7 text-[var(--muted)]">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-space bg-[var(--surface)]">
        <div className="page-shell">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <SectionHeading
              eyebrow="Our process"
              title="Structure creates room for better ideas."
              description="A visible four-part process keeps decisions moving while leaving space for the celebration to become distinctly yours."
            />

            <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
              {processSteps.map((step) => (
                <li
                  key={step.number}
                  className="border-t border-[var(--line)] pt-5"
                >
                  <p className="text-sm font-semibold text-[var(--rose)]">
                    {step.number}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-[var(--ink)]">
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-7 text-[var(--muted)]">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section-space bg-[var(--paper)]">
        <div className="page-shell grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Execution standards"
              title="The details guests never see are the details that make the day work."
              description="Good production removes uncertainty before it reaches the room. We give every contributor the information they need to deliver well."
            />

            <ul className="mt-8 space-y-4">
              {standards.map((standard) => (
                <li
                  key={standard}
                  className="flex items-start gap-3 text-[var(--ink)]"
                >
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-[var(--sage)]"
                    aria-hidden="true"
                  />
                  <span className="leading-7">{standard}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="aspect-[4/3] overflow-hidden rounded-lg bg-[var(--surface)] lg:order-first">
            <img
              src={standardsImage}
              alt="An ivory event stage with floral arrangements and symmetrical seating"
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <section className="section-space bg-[var(--ink)]">
        <div className="page-shell flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Your event, thoughtfully handled"
            title="Bring us the occasion. We will help give it shape."
            description="Tell us what you are celebrating, where you are in the process and what matters most. We will map the clearest next step."
            invert
          />
          <Link
            to="/contact"
            className="button-primary inline-flex shrink-0 items-center justify-center gap-2"
          >
            Plan your event
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default About;
