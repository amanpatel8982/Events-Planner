import {
  ArrowLeft,
  CalendarCheck2,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const AuthLayout = ({
  image,
  imageAlt,
  eyebrow,
  title,
  description,
  children,
  footer,
}) => {
  return (
    <main className="min-h-screen bg-[#f7f8f6]">
      <div className="grid min-h-screen lg:grid-cols-[minmax(0,0.92fr)_minmax(34rem,1.08fr)]">
        <section className="relative min-h-60 overflow-hidden bg-[#18201c] sm:min-h-72 lg:sticky lg:top-0 lg:h-screen">
          <img
            src={image}
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,24,20,0.22),rgba(17,24,20,0.9))]" />

          <Link
            to="/"
            className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-lg border border-white/30 bg-black/20 px-3 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-black/35 sm:left-8 sm:top-8 lg:left-12 lg:top-10"
          >
            <ArrowLeft size={17} />
            Back to website
          </Link>

          <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-8 lg:p-12 xl:p-16">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase text-[#f1cf9a]">
                <CalendarCheck2 size={16} />
                Thoughtful planning, clearly managed
              </span>
              <p className="mt-4 max-w-[18ch] font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
                Every celebration deserves a calm, confident plan.
              </p>
              <div className="mt-7 hidden gap-3 text-sm text-white/80 sm:grid">
                {[
                  "Keep every detail in one place",
                  "Work directly with your planning team",
                  "Track decisions and next steps clearly",
                ].map((item) => (
                  <span key={item} className="flex items-center gap-3">
                    <CheckCircle2
                      size={17}
                      className="shrink-0 text-[#f1cf9a]"
                    />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="flex min-h-full items-center justify-center px-5 py-10 sm:px-10 sm:py-14 lg:px-14 xl:px-20">
          <div className="w-full max-w-[31rem]">
            <Link to="/" className="mb-9 inline-flex items-center gap-3">
              <img
                src={logo}
                alt=""
                className="h-11 w-11 rounded-full object-contain"
              />
              <span>
                <span className="block font-serif text-xl leading-none text-[var(--ink)]">
                  EverAfter Events
                </span>
                <span className="mt-1 block text-xs font-semibold text-[var(--muted)]">
                  Planning workspace
                </span>
              </span>
            </Link>
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="mt-3 max-w-[15ch] font-serif text-4xl leading-tight text-[var(--ink)] sm:text-[2.65rem]">
              {title}
            </h1>
            <p className="mt-3 max-w-lg text-sm leading-6 text-[var(--muted)]">
              {description}
            </p>
            <div className="mt-7">{children}</div>
            <div className="mt-7 border-t border-[var(--line)] pt-6 text-center text-sm text-[var(--muted)]">
              {footer}
            </div>
            <p className="mt-5 flex items-center justify-center gap-2 text-xs text-[#737b77]">
              <ShieldCheck size={15} />
              Secure account access
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AuthLayout;
