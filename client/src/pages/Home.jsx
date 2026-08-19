import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  Palette,
  Quote,
  Sparkles,
  UtensilsCrossed,
  UsersRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import back1 from "../assets/back1.jpg";
import back2 from "../assets/back2.jpg";
import back3 from "../assets/back3.jpg";
import entrance from "../assets/entrance.jpg";
import background from "../assets/background.jpg";

const services = [
  {
    icon: CalendarCheck2,
    title: "Planning & production",
    text: "Timelines, budgets, vendors, permissions, and on-ground coordination managed by one accountable team.",
  },
  {
    icon: Palette,
    title: "Design & decor",
    text: "A visual language shaped around your story, from spatial layouts and florals to lighting and stationery.",
  },
  {
    icon: UsersRound,
    title: "Guest experience",
    text: "Invitations, hospitality, travel, and thoughtful touchpoints that make every guest feel considered.",
  },
  {
    icon: UtensilsCrossed,
    title: "Food & entertainment",
    text: "Curated menus, artists, sound, and programming designed to keep the celebration flowing naturally.",
  },
];

const process = [
  {
    number: "01",
    title: "Discover",
    text: "We learn your priorities, people, traditions, style, and non-negotiables.",
  },
  {
    number: "02",
    title: "Design",
    text: "Your creative direction, guest journey, budget, and production plan come together.",
  },
  {
    number: "03",
    title: "Coordinate",
    text: "We align every partner and deadline while keeping decisions clear and manageable.",
  },
  {
    number: "04",
    title: "Celebrate",
    text: "Our team runs the day end to end, so you can be fully present with your people.",
  },
];

const Home = () => {
  return (
    <main>
      <Hero />

      <section className="border-b border-[var(--line)] bg-white">
        <div className="page-shell grid grid-cols-2 gap-px bg-[var(--line)] md:grid-cols-4">
          {[
            ["250+", "Celebrations planned"],
            ["60+", "Trusted partners"],
            ["4.9/5", "Client experience"],
            ["8", "Cities served"],
          ].map(([value, label]) => (
            <div key={label} className="bg-white px-4 py-6 text-center sm:py-7">
              <p className="font-serif text-2xl text-[var(--ink)] sm:text-3xl">{value}</p>
              <p className="mt-1 text-xs font-semibold text-[var(--muted)]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-space bg-[var(--paper)]">
        <div className="page-shell">
          <div className="grid items-end gap-6 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <p className="eyebrow">What we bring together</p>
              <h2 className="section-title mt-3 max-w-2xl text-balance">
                One team for every moving part.
              </h2>
            </div>
            <p className="max-w-xl leading-7 text-[var(--muted)] lg:justify-self-end">
              Creative ambition and operational detail belong in the same room.
              Our planners make both feel effortless, with a process you can
              trust from day one.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.title}
                  className="surface-panel flex min-h-64 flex-col p-6 transition hover:-translate-y-1 hover:border-[#c8d2cb]"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-[#edf2ee] text-[var(--sage)]">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-6 font-serif text-xl">{service.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                    {service.text}
                  </p>
                  <Link
                    to="/service"
                    className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-[var(--rose)]"
                  >
                    View services <ArrowRight size={16} />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="page-shell grid items-stretch lg:grid-cols-2">
          <div className="relative min-h-[420px] overflow-hidden lg:min-h-[620px]">
            <img
              src={back1}
              alt="Wedding ceremony details prepared by the planning team"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute bottom-5 left-5 max-w-xs rounded-lg bg-white/95 p-4 shadow-xl backdrop-blur">
              <div className="flex items-center gap-2 text-sm font-bold text-[var(--sage)]">
                <CheckCircle2 size={18} /> Calm, accountable planning
              </div>
              <p className="mt-2 text-xs leading-5 text-[var(--muted)]">
                One clear plan, one dedicated lead, and no last-minute guesswork.
              </p>
            </div>
          </div>
          <div className="flex items-center px-5 py-16 sm:px-10 lg:px-16">
            <div className="max-w-xl">
              <p className="eyebrow">Designed around your story</p>
              <h2 className="section-title mt-3 text-balance">
                Personal in feeling. Precise in execution.
              </h2>
              <p className="mt-6 leading-8 text-[var(--muted)]">
                We do not begin with a template. We begin with how you want the
                day to feel. That intention guides every decision, from the
                venue flow and visual details to the pace of each moment.
              </p>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {[
                  "A realistic, transparent budget",
                  "Curated partners matched to your brief",
                  "Weekly milestones and decision support",
                  "Complete event-day production",
                ].map((item) => (
                  <div key={item} className="flex gap-3 text-sm font-semibold text-[#38423c]">
                    <Sparkles size={17} className="mt-0.5 shrink-0 text-[var(--brass)]" />
                    {item}
                  </div>
                ))}
              </div>
              <Link to="/about" className="button-secondary mt-9">
                Meet our approach <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space bg-[#23362c] text-white">
        <div className="page-shell">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase text-[#d9bd91]">How it works</p>
            <h2 className="section-title mt-3 text-balance text-white">
              A clear path from first idea to final toast.
            </h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {process.map((step) => (
              <article key={step.number} className="border-t border-white/20 pt-5">
                <p className="font-serif text-2xl text-[#d9bd91]">{step.number}</p>
                <h3 className="mt-5 text-lg font-bold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/65">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="page-shell">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Selected celebrations</p>
              <h2 className="section-title mt-3">Made to be remembered.</h2>
            </div>
            <Link to="/gallery" className="button-secondary">
              View the gallery <ArrowRight size={17} />
            </Link>
          </div>

          <div className="mt-10 grid auto-rows-[190px] gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[230px]">
            <figure className="relative row-span-2 overflow-hidden rounded-lg sm:col-span-1">
              <img src={back2} alt="Elegant wedding portrait setting" className="h-full w-full object-cover" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-5 pt-16 text-sm font-bold text-white">
                Intimate wedding · Jaipur
              </figcaption>
            </figure>
            <figure className="relative overflow-hidden rounded-lg lg:col-span-2">
              <img src={entrance} alt="Floral entrance decor" className="h-full w-full object-cover" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-5 pt-16 text-sm font-bold text-white">
                Floral arrival experience
              </figcaption>
            </figure>
            <figure className="relative overflow-hidden rounded-lg">
              <img src={back3} alt="Wedding design and decor" className="h-full w-full object-cover" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-5 pt-16 text-sm font-bold text-white">
                Contemporary reception
              </figcaption>
            </figure>
            <figure className="relative overflow-hidden rounded-lg">
              <img src={background} alt="Celebration venue prepared for guests" className="h-full w-full object-cover" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-5 pt-16 text-sm font-bold text-white">
                Evening celebration
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[#f1f3ef]">
        <div className="page-shell grid gap-10 py-16 lg:grid-cols-[0.45fr_1fr] lg:items-center">
          <div>
            <Quote size={42} className="text-[var(--brass)]" />
            <p className="mt-4 text-xs font-bold uppercase text-[var(--sage)]">
              A note from our couples
            </p>
          </div>
          <blockquote>
            <p className="font-serif text-2xl leading-relaxed text-[var(--ink)] sm:text-3xl">
              “Every detail felt like us, and the entire weekend moved with such
              ease. We could actually enjoy our wedding instead of managing it.”
            </p>
            <footer className="mt-6 text-sm font-bold text-[var(--muted)]">
              Priya & Arjun · Delhi
            </footer>
          </blockquote>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#18201c] text-white">
        <img
          src={background}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-[#18201c]/70" />
        <div className="page-shell relative py-20 text-center sm:py-24">
          <p className="text-xs font-bold uppercase text-[#e7c28b]">
            Your celebration starts here
          </p>
          <h2 className="section-title mx-auto mt-4 max-w-3xl text-balance text-white">
            Bring us the vision. We will build the plan.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-white/70">
            Share your date, guest count, and what matters most. Your first
            consultation is a relaxed conversation, not a commitment.
          </p>
          <Link to="/contact" className="button-light mt-8">
            Plan a consultation <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
