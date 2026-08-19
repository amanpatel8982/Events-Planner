import { ArrowUpRight, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const navigation = [
  { label: "About", to: "/about" },
  { label: "Services", to: "/service" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#18201c] text-white">
      <div className="page-shell grid gap-12 py-14 lg:grid-cols-[1.25fr_0.75fr_0.9fr]">
        <div className="max-w-md">
          <Link
            to="/"
            className="inline-flex items-center gap-3"
            aria-label="EverAfter Events home"
          >
            <img
              src={logo}
              alt=""
              className="h-11 w-11 rounded-full bg-white object-contain"
            />
            <span>
              <span className="block font-serif text-xl">EverAfter Events</span>
              <span className="block text-xs font-semibold uppercase text-white/55">
                Weddings & celebrations
              </span>
            </span>
          </Link>
          <p className="mt-5 text-sm leading-7 text-white/65">
            Thoughtful planning, trusted partners, and beautifully considered
            details for celebrations that feel unmistakably yours.
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase text-white/45">Explore</p>
          <nav className="mt-5 grid gap-3" aria-label="Footer navigation">
            {navigation.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="w-fit text-sm text-white/75 transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-xs font-bold uppercase text-white/45">
            Start planning
          </p>
          <p className="mt-5 text-sm leading-6 text-white/70">
            Tell us your date, vision, and guest count. We will help shape the
            next steps.
          </p>
          <Link
            to="/contact"
            className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#e7c28b] hover:text-white"
          >
            Book a consultation <ArrowUpRight size={17} />
          </Link>
          <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-white/55">
            <CalendarDays size={16} className="text-[#e7c28b]" />
            Consultations by appointment
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="page-shell flex flex-col gap-2 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} EverAfter Events. Crafted for meaningful
            celebrations.
          </p>
          <p>Serving weddings and events across India.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
