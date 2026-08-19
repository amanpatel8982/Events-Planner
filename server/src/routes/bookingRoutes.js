import express from "express";
import {
  cancelMyBooking,
  createBooking,
  getAdminBookings,
  getMyBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js";
import { isAdmin, Protect } from "../middlewares/authmiddleware.js";

const router = express.Router();

router.post("/", Protect, createBooking);
router.get("/mine", Protect, getMyBookings);
router.patch("/:bookingId/cancel", Protect, cancelMyBooking);
router.get("/admin", Protect, isAdmin, getAdminBookings);
router.patch("/:bookingId/status", Protect, isAdmin, updateBookingStatus);

export default router;
