import {
  CalendarDays,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Menu,
  MessageSquareText,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../../config/api";
import { useAuth } from "../../context/AuthContext";

const navigationItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "profile", label: "Profile", icon: UserRound },
  { id: "bookings", label: "Bookings", icon: CalendarDays },
  { id: "support", label: "Support", icon: LifeBuoy },
  { id: "feedback", label: "Feedback", icon: MessageSquareText },
];

const getInitials = (name) => {
  if (!name) return "EP";

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
};

const UserIdentity = ({ user }) => (
  <div className="flex items-center gap-3 border-t border-white/10 pt-5">
    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white/10 text-sm font-bold text-white">
      <span>{getInitials(user?.fullName)}</span>
      {user?.photo && (
        <img
          src={user.photo}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      )}
    </div>
    <div className="min-w-0">
      <p className="truncate text-sm font-semibold text-white">
        {user?.fullName || "Event client"}
      </p>
      <p className="truncate text-xs text-white/55">
        {user?.email || "Customer workspace"}
      </p>
    </div>
  </div>
);

const SidebarContent = ({
  active,
  onNavigate,
  onLogout,
  logoutLoading,
  user,
}) => (
  <>
    <div>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--rose)] text-white">
          <Sparkles className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs font-semibold text-[var(--brass)]">
            Event Planner
          </p>
          <p className="font-semibold text-white">Customer workspace</p>
        </div>
      </div>

      <nav className="mt-9" aria-label="Customer workspace">
        <p className="mb-3 px-3 text-xs font-semibold text-white/45">
          Workspace
        </p>
        <ul className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;

            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
                    isActive
                      ? "bg-white text-[var(--ink)]"
                      : "text-white/70 hover:bg-white/10 hover:text-white",
                  ].join(" ")}
                >
                  <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>

    <div>
      <button
        type="button"
        onClick={onLogout}
        disabled={logoutLoading}
        className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-white/20 px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:border-red-200 hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <LogOut className="h-4 w-4" aria-hidden="true" />
        {logoutLoading ? "Signing out..." : "Sign out"}
      </button>
      <UserIdentity user={user} />
    </div>
  </>
);

const Sidebar = ({ active, setActive }) => {
  const { setUser, setIsLogin, setIsAdmin, user } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const closeButtonRef = useRef(null);

  const handleNavigation = (destination) => {
    setActive(destination);
    setMobileOpen(false);
  };

  const handleLogout = async () => {
    setLogoutLoading(true);

    try {
      const response = await api.get("/auth/logout");
      setUser("");
      sessionStorage.removeItem("EventUser");
      setIsLogin(false);
      setIsAdmin(false);
      toast.success(response.data?.message || "Signed out successfully");
      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Unable to sign out right now",
      );
    } finally {
      setLogoutLoading(false);
    }
  };

  useEffect(() => {
    if (!mobileOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  return (
    <>
      <aside className="hidden h-screen w-72 shrink-0 flex-col justify-between bg-[var(--ink)] p-6 lg:sticky lg:top-0 lg:flex">
        <SidebarContent
          active={active}
          onNavigate={handleNavigation}
          onLogout={handleLogout}
          logoutLoading={logoutLoading}
          user={user}
        />
      </aside>

      <header className="sticky top-0 z-40 flex min-h-16 items-center justify-between border-b border-[var(--line)] bg-white px-4 lg:hidden">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--rose)] text-white">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[var(--rose)]">
              Event Planner
            </p>
            <p className="text-sm font-semibold text-[var(--ink)]">
              Customer workspace
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--line)] text-[var(--ink)] hover:bg-[var(--paper)]"
          aria-label="Open workspace navigation"
          aria-expanded={mobileOpen}
          aria-controls="customer-mobile-navigation"
          title="Open navigation"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[90] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 h-full w-full bg-black/60"
            onClick={() => setMobileOpen(false)}
            aria-label="Close workspace navigation"
          />
          <aside
            id="customer-mobile-navigation"
            className="relative flex h-full w-[min(20rem,88vw)] flex-col justify-between bg-[var(--ink)] p-6 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Customer workspace navigation"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setMobileOpen(false)}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-white hover:bg-white/10"
              aria-label="Close navigation"
              title="Close navigation"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <SidebarContent
              active={active}
              onNavigate={handleNavigation}
              onLogout={handleLogout}
              logoutLoading={logoutLoading}
              user={user}
            />
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;
