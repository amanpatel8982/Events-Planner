import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../config/api";
import Sidebar from "../components/Admin/Sidebar";
import Overview from "../components/Admin/Overview";
import Customers from "../components/Admin/Customers";
import Bookings from "../components/Admin/Bookings";
import CustomerQueries from "../components/Admin/CustomerQueries";
import CustomerFeedback from "../components/Admin/CustomerFeedback";
import Packages from "../components/Admin/Packages";
import BanquetHall from "../components/Admin/BanquetHall";
import CateringService from "../components/Admin/CateringService";

const getRequestError = (error) =>
  error.response?.data?.message ||
  (error.code === "ECONNABORTED"
    ? "The booking request timed out. Please try again."
    : "Bookings could not be loaded. Check the server connection and try again.");

const AdminPanel = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("overview");
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [bookingsError, setBookingsError] = useState("");
  const { isLogin, isAdmin } = useAuth();

  const fetchBookings = useCallback(async () => {
    setBookingsLoading(true);
    setBookingsError("");

    try {
      const response = await api.get("/bookings/admin");
      setBookings(Array.isArray(response.data?.data) ? response.data.data : []);
    } catch (error) {
      setBookingsError(getRequestError(error));
    } finally {
      setBookingsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLogin) {
      navigate("/login", { replace: true });
      return;
    }

    if (!isAdmin) {
      navigate("/dashboard", { replace: true });
      return;
    }

    fetchBookings();
  }, [isLogin, isAdmin, navigate, fetchBookings]);

  const pendingCount = useMemo(
    () => bookings.filter((booking) => booking.status === "Pending").length,
    [bookings],
  );

  const views = {
    overview: (
      <Overview
        setActive={setActive}
        bookings={bookings}
        loading={bookingsLoading}
        error={bookingsError}
        refetch={fetchBookings}
      />
    ),
    packages: <Packages />,
    customers: <Customers />,
    bookings: (
      <Bookings
        bookings={bookings}
        loading={bookingsLoading}
        error={bookingsError}
        refetch={fetchBookings}
      />
    ),
    cusQueries: <CustomerQueries />,
    cusFeedback: <CustomerFeedback />,
    banquetHall: <BanquetHall />,
    cateringService: <CateringService />,
  };

  return (
    <div className="min-h-screen bg-[#f3f5f3] lg:flex">
      <Sidebar
        active={active}
        setActive={setActive}
        pendingCount={pendingCount}
      />
      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        {views[active] || views.overview}
      </main>
    </div>
  );
};

export default AdminPanel;
