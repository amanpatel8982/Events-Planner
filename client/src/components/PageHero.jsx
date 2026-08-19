import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const PageHero = ({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  primaryAction,
  secondaryAction,
}) => {
  return (
    <section
      className="relative isolate min-h-[38rem] overflow-hidden bg-[var(--ink)] md:min-h-[42rem]"
      aria-labelledby="page-hero-title"
    >
      <img
        src={image}
        alt={imageAlt}
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

      <div className="page-shell relative z-10 flex min-h-[38rem] items-end pb-14 pt-36 md:min-h-[42rem] md:pb-20">
        <div className="w-full min-w-0 max-w-3xl">
          <div className="mb-5 flex items-center gap-3">
            <span
              className="h-px w-10 shrink-0 bg-[var(--brass)]"
              aria-hidden="true"
            />
            <p className="eyebrow text-white/80">{eyebrow}</p>
          </div>

          <h1
            id="page-hero-title"
            className="display-title max-w-3xl text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl"
            style={{ color: "white" }}
          >
            {title}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
            {description}
          </p>

          {(primaryAction || secondaryAction) && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {primaryAction && (
                <Link
                  to={primaryAction.to}
                  className="button-primary w-full sm:w-auto"
                >
                  {primaryAction.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}

              {secondaryAction && (
                <Link
                  to={secondaryAction.to}
                  className="button-secondary w-full border-white/50 text-white hover:bg-white hover:text-[var(--ink)] sm:w-auto"
                >
                  {secondaryAction.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
