import { ArrowRight, CalendarDays, Check } from "lucide-react";
import { Link } from "react-router-dom";
import background from "../assets/back4.jpg";

const Hero = () => {
  return (
    <section className="relative flex min-h-[88svh] items-end overflow-hidden bg-[#18201c] text-white">
      <img
        src={background}
        alt="An elegant wedding celebration designed by EverAfter Events"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,16,13,0.86)_0%,rgba(11,16,13,0.58)_48%,rgba(11,16,13,0.2)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(11,16,13,0.72)_0%,transparent_58%)]" />

      <div className="page-shell relative z-10 pb-14 pt-36 sm:pb-16 lg:pb-20 lg:pt-44">
        <div className="max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-[#e7c28b]" />
            <p className="text-xs font-bold uppercase text-[#f1d9b6]">
              Full-service event planning
            </p>
          </div>
          <h1 className="display-title text-balance text-white">
            Wedding & event planning, tailored to you.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
            From the first moodboard to the final farewell, we bring creative
            direction, precise coordination, and a calm presence to every
            celebration.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/contact" className="button-light">
              <CalendarDays size={18} /> Start planning
            </Link>
            <Link
              to="/gallery"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/35 px-5 text-sm font-bold text-white transition hover:border-white hover:bg-white/10"
            >
              Explore our work <ArrowRight size={17} />
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/20 pt-6">
            {["Planning & production", "Design & decor", "Trusted vendor network"].map(
              (item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-white/72"
                >
                  <Check size={15} className="text-[#e7c28b]" /> {item}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
