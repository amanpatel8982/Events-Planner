import { useEffect, useState } from "react";
import {
  CalendarDays,
  ChevronRight,
  Menu,
  UserRound,
  X,
} from "lucide-react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";

const navigation = [
  { label: "About", to: "/about" },
  { label: "Services", to: "/service" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, isLogin, isAdmin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isTransparent = pathname === "/" && !scrolled && !isMenuOpen;
  const dashboardPath = isAdmin ? "/adminpanel" : "/dashboard";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${
        isTransparent
          ? "border-transparent bg-transparent text-white"
          : "border-black/5 bg-white/95 text-[var(--ink)] shadow-[0_8px_30px_rgba(24,32,28,0.06)] backdrop-blur-xl"
      }`}
    >
      <div className="page-shell flex h-[76px] items-center justify-between">
        <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="EverAfter Events home">
          <img
            src={logo}
            alt=""
            className="h-11 w-11 shrink-0 rounded-full bg-white object-contain ring-1 ring-black/5"
          />
          <span className="min-w-0">
            <span className="block truncate font-serif text-lg leading-5 sm:text-xl">
              EverAfter Events
            </span>
            <span
              className={`hidden text-[10px] font-bold uppercase sm:block ${
                isTransparent ? "text-white/65" : "text-[var(--muted)]"
              }`}
            >
              Weddings & celebrations
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  isActive
                    ? isTransparent
                      ? "bg-white/12 text-white"
                      : "bg-[#f4ecef] text-[var(--rose)]"
                    : isTransparent
                      ? "text-white/80 hover:bg-white/10 hover:text-white"
                      : "text-[#46504a] hover:bg-black/[0.035] hover:text-[var(--ink)]"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {isLogin ? (
            <button
              type="button"
              onClick={() => navigate(dashboardPath)}
              className={`flex h-11 items-center gap-2 rounded-lg border px-2.5 text-sm font-bold transition ${
                isTransparent
                  ? "border-white/35 bg-white/10 text-white hover:bg-white/20"
                  : "border-[var(--line)] bg-white text-[var(--ink)] hover:border-[var(--sage)]"
              }`}
            >
              {user?.photo ? (
                <img
                  src={user.photo}
                  alt=""
                  className="h-7 w-7 rounded-full object-cover"
                />
              ) : (
                <UserRound size={19} />
              )}
              <span className="max-w-28 truncate">
                {user?.fullName?.split(" ")[0] || "Dashboard"}
              </span>
              <ChevronRight size={16} />
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className={`inline-flex h-11 items-center rounded-lg px-3.5 text-sm font-bold transition ${
                  isTransparent
                    ? "text-white hover:bg-white/10"
                    : "text-[#46504a] hover:bg-black/[0.035]"
                }`}
              >
                Sign in
              </Link>
              <Link
                to="/contact"
                className={`inline-flex h-11 shrink-0 items-center gap-2.5 whitespace-nowrap rounded-lg border px-3.5 text-sm font-bold transition duration-200 ${
                  isTransparent
                    ? "border-white/20 bg-[var(--rose)] text-white shadow-[0_10px_24px_rgba(38,12,21,0.25)] hover:border-[#b48748] hover:bg-[var(--rose-dark)]"
                    : "border-[var(--rose)] bg-[var(--rose)] text-white shadow-[0_8px_18px_rgba(102,24,49,0.16)] hover:border-[var(--rose-dark)] hover:bg-[var(--rose-dark)]"
                }`}
              >
                <span
                  className="grid h-7 w-7 place-items-center rounded-md bg-white/14"
                  aria-hidden="true"
                >
                  <CalendarDays size={16} strokeWidth={2.2} />
                </span>
                <span>Plan your event</span>
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          {isLogin && (
            <button
              type="button"
              onClick={() => navigate(dashboardPath)}
              aria-label="Open dashboard"
              className={`grid h-10 w-10 place-items-center rounded-lg border ${
                isTransparent ? "border-white/30 text-white" : "border-[var(--line)]"
              }`}
            >
              <UserRound size={20} />
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isMenuOpen}
            className={`grid h-10 w-10 place-items-center rounded-lg border ${
              isTransparent ? "border-white/30 text-white" : "border-[var(--line)]"
            }`}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-[var(--line)] bg-white px-3 pb-5 pt-3 text-[var(--ink)] shadow-xl lg:hidden">
          <nav className="page-shell grid gap-1" aria-label="Mobile navigation">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-lg px-3 py-3 text-sm font-bold ${
                    isActive ? "bg-[#f4ecef] text-[var(--rose)]" : "hover:bg-black/[0.035]"
                  }`
                }
              >
                {item.label} <ChevronRight size={17} />
              </NavLink>
            ))}
            {!isLogin && (
              <div className="mt-3 flex flex-col gap-2 border-t border-[var(--line)] pt-4 sm:flex-row sm:justify-end">
                <Link
                  to="/login"
                  className="button-secondary w-full sm:w-auto sm:min-w-28"
                >
                  Sign in
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-lg border border-[var(--rose)] bg-[var(--rose)] px-4 text-sm font-bold text-white shadow-[0_8px_18px_rgba(102,24,49,0.14)] transition hover:border-[var(--rose-dark)] hover:bg-[var(--rose-dark)] sm:w-auto"
                >
                  <span
                    className="grid h-7 w-7 place-items-center rounded-md bg-white/14"
                    aria-hidden="true"
                  >
                    <CalendarDays size={16} strokeWidth={2.2} />
                  </span>
                  <span>Plan your event</span>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
