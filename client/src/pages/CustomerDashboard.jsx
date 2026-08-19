import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BookingFormModal from "../components/Customer/BookingFormModal";
import Bookings from "../components/Customer/Bookings";
import Feedback from "../components/Customer/Feedback";
import Overview from "../components/Customer/Overview";
import Profile from "../components/Customer/Profile";
import Sidebar from "../components/Customer/Sidebar";
import Support from "../components/Customer/Support";
import api from "../config/api";
import { useAuth } from "../context/AuthContext";

const getRequestError = (error, fallback) => {
  const serverMessage = error.response?.data?.message;
  if (serverMessage) return serverMessage;

  if (error.code === "ECONNABORTED") {
    return "The booking request took too long. Please try again.";
  }

  if (!error.response) {
    return "We cannot reach the booking service right now. Please try again shortly.";
  }

  return fallback;
};

const CustomerDashboard = () => {
  const [active, setActive] = useState("overview");
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [bookingsError, setBookingsError] = useState("");
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [cancellingBookingId, setCancellingBookingId] = useState("");
  const navigate = useNavigate();
  const { isLogin, isAdmin } = useAuth();

  const fetchBookings = useCallback(async () => {
    setBookingsLoading(true);
    setBookingsError("");

    try {
      const response = await api.get("/bookings/mine");
      setBookings(Array.isArray(response.data?.data) ? response.data.data : []);
    } catch (error) {
      setBookingsError(
        getRequestError(error, "Unable to load your bookings right now."),
      );
    } finally {
      setBookingsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLogin) {
      navigate("/login", { replace: true });
      return;
    }

    if (isAdmin) {
      navigate("/adminpanel", { replace: true });
      return;
    }

    fetchBookings();
  }, [fetchBookings, isAdmin, isLogin, navigate]);

  const createBooking = useCallback(
    async (bookingDetails) => {
      const response = await api.post("/bookings", bookingDetails);
      const createdBooking = response.data?.data;

      if (createdBooking) {
        setBookings((currentBookings) => [
          createdBooking,
          ...currentBookings.filter(
            (booking) => booking._id !== createdBooking._id,
          ),
        ]);
      } else {
        await fetchBookings();
      }

      setBookingsError("");
      toast.success("Booking request submitted");
      return createdBooking;
    },
    [fetchBookings],
  );

  const cancelBooking = useCallback(async (bookingId) => {
    setCancellingBookingId(bookingId);

    try {
      const response = await api.patch(`/bookings/${bookingId}/cancel`);
      const updatedBooking = response.data?.data;

      if (updatedBooking) {
        setBookings((currentBookings) =>
          currentBookings.map((booking) =>
            booking._id === bookingId ? updatedBooking : booking,
          ),
        );
      } else {
        setBookings((currentBookings) =>
          currentBookings.map((booking) =>
            booking._id === bookingId
              ? { ...booking, status: "Cancelled" }
              : booking,
          ),
        );
      }

      toast.success("Booking cancelled");
      return updatedBooking;
    } finally {
      setCancellingBookingId("");
    }
  }, []);

  const openBookingForm = () => setBookingModalOpen(true);

  const renderActiveView = () => {
    switch (active) {
      case "profile":
        return <Profile />;
      case "bookings":
        return (
          <Bookings
            bookings={bookings}
            loading={bookingsLoading}
            error={bookingsError}
            cancellingBookingId={cancellingBookingId}
            onRefresh={fetchBookings}
            onCreateBooking={openBookingForm}
            onCancelBooking={cancelBooking}
          />
        );
      case "support":
        return <Support />;
      case "feedback":
        return <Feedback />;
      case "overview":
      default:
        return (
          <Overview
            bookings={bookings}
            loading={bookingsLoading}
            error={bookingsError}
            onRefresh={fetchBookings}
            onCreateBooking={openBookingForm}
            onNavigate={setActive}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[var(--paper)] lg:flex">
      <Sidebar active={active} setActive={setActive} />
      <main
        id="customer-workspace-content"
        className="min-w-0 flex-1"
        tabIndex="-1"
      >
        {renderActiveView()}
      </main>

      {bookingModalOpen && (
        <BookingFormModal
          onClose={() => setBookingModalOpen(false)}
          onSubmit={createBooking}
        />
      )}
    </div>
  );
};

export default CustomerDashboard;
