import {
  Building2,
  CalendarDays,
  ChefHat,
  LayoutDashboard,
  LogOut,
  MessageSquareText,
  Package,
  Star,
  Users,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../config/api";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.png";

const navigation = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "bookings", label: "Bookings", icon: CalendarDays },
  { id: "customers", label: "Customers", icon: Users },
  { id: "banquetHall", label: "Venues", icon: Building2 },
  { id: "cateringService", label: "Catering", icon: ChefHat },
  { id: "packages", label: "Packages", icon: Package },
  { id: "cusQueries", label: "Inquiries", icon: MessageSquareText },
  { id: "cusFeedback", label: "Feedback", icon: Star },
];

const Sidebar = ({ active, setActive, pendingCount = 0 }) => {
  const { setUser, setIsLogin, setIsAdmin, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.get("/auth/logout");
    } catch {
      toast.error("Session closed locally. The server could not be reached.");
    } finally {
      setUser("");
      sessionStorage.removeItem("EventUser");
      setIsLogin(false);
      setIsAdmin(false);
      navigate("/");
    }
  };

  const renderNavigation = (mobile = false) =>
    navigation.map((item) => {
      const Icon = item.icon;
      const isActive = active === item.id;
      const showPending = item.id === "bookings" && pendingCount > 0;

      return (
        <button
          key={item.id}
          type="button"
          onClick={() => setActive(item.id)}
          className={`flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-bold transition ${
            isActive
              ? "bg-[var(--rose)] text-white"
              : mobile
                ? "border border-[var(--line)] bg-white text-[#4f5953]"
                : "text-[#59635d] hover:bg-black/[0.04] hover:text-[var(--ink)]"
          }`}
          aria-current={isActive ? "page" : undefined}
          aria-label={
            showPending ? `${item.label}, ${pendingCount} pending` : item.label
          }
        >
          <Icon size={18} aria-hidden="true" />
          <span>{item.label}</span>
          {showPending && (
            <span
              className={`ml-auto min-w-5 rounded-full px-1.5 py-0.5 text-center text-[10px] font-extrabold leading-4 ${
                isActive
                  ? "bg-white text-[var(--rose)]"
                  : "bg-[#f5e8ed] text-[var(--rose)]"
              }`}
              aria-hidden="true"
            >
              {pendingCount > 99 ? "99+" : pendingCount}
            </span>
          )}
        </button>
      );
    });

  return (
    <>
      <aside className="hidden h-screen w-68 shrink-0 flex-col border-r border-[var(--line)] bg-white p-4 lg:sticky lg:top-0 lg:flex">
        <Link to="/" className="flex items-center gap-3 px-2 py-2">
          <img src={logo} alt="" className="h-10 w-10 rounded-full object-contain" />
          <span>
            <span className="block font-serif text-lg leading-5">EverAfter</span>
            <span className="block text-[10px] font-bold uppercase text-[var(--muted)]">
              Admin workspace
            </span>
          </span>
        </Link>
        <nav className="mt-7 grid gap-1.5 overflow-y-auto" aria-label="Admin sections">
          {renderNavigation()}
        </nav>
        <div className="mt-auto border-t border-[var(--line)] pt-4">
          <div className="mb-3 px-3">
            <p className="truncate text-sm font-bold">{user?.fullName || "Administrator"}</p>
            <p className="text-xs text-[var(--muted)]">Workspace administrator</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold text-[#a22742] hover:bg-[#f8eaee]"
          >
            <LogOut size={18} /> Sign out
          </button>
        </div>
      </aside>

      <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-white lg:hidden">
        <div className="flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="" className="h-9 w-9 rounded-full object-contain" />
            <span className="font-serif text-lg">Admin workspace</span>
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--line)] text-[#a22742]"
            aria-label="Sign out"
          >
            <LogOut size={18} />
          </button>
        </div>
        <nav
          className="flex gap-2 overflow-x-auto border-t border-[var(--line)] px-4 py-2"
          aria-label="Admin sections"
        >
          {renderNavigation(true)}
        </nav>
      </header>
    </>
  );
};

export default Sidebar;
