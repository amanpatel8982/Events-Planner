import mongoose from "mongoose";
import Booking, { BOOKING_STATUSES } from "../models/bookingModel.js";

const createHttpError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const normalizeText = (value) =>
  typeof value === "string" ? value.trim() : "";

const validateBookingId = (bookingId) => {
  if (!mongoose.isValidObjectId(bookingId)) {
    throw createHttpError("Invalid booking reference.", 400);
  }
};

export const createBooking = async (req, res, next) => {
  try {
    const eventType = normalizeText(req.body.eventType);
    const city = normalizeText(req.body.city);
    const budgetRange = normalizeText(req.body.budgetRange);
    const serviceType = normalizeText(req.body.serviceType);
    const venuePreference = normalizeText(req.body.venuePreference);
    const notes = normalizeText(req.body.notes);
    const guestCount = Number(req.body.guestCount);
    const eventDate = new Date(req.body.eventDate);

    if (!eventType || !city || !budgetRange || !serviceType || !req.body.eventDate) {
      throw createHttpError("Please complete all required booking fields.", 400);
    }

    if (Number.isNaN(eventDate.getTime())) {
      throw createHttpError("Choose a valid event date.", 400);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (eventDate < today) {
      throw createHttpError("Event date cannot be in the past.", 400);
    }

    if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 10000) {
      throw createHttpError("Guest count must be between 1 and 10,000.", 400);
    }

    if (city.length > 100 || eventType.length > 80) {
      throw createHttpError("Event details are too long.", 400);
    }

    if (venuePreference.length > 160 || notes.length > 1000) {
      throw createHttpError("Booking notes exceed the allowed length.", 400);
    }

    const booking = new Booking({
      customer: req.user._id,
      reference: "EA-" + new mongoose.Types.ObjectId().toString().slice(-8).toUpperCase(),
      eventType,
      eventDate,
      city,
      guestCount,
      budgetRange,
      serviceType,
      venuePreference,
      notes,
      statusHistory: [
        {
          status: "Pending",
          note: "Booking request submitted",
          changedBy: req.user._id,
        },
      ],
    });

    await booking.save();

    res.status(201).json({
      message: "Booking request submitted successfully.",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ customer: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      message: "Your bookings were fetched successfully.",
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

export const cancelMyBooking = async (req, res, next) => {
  try {
    validateBookingId(req.params.bookingId);

    const booking = await Booking.findOne({
      _id: req.params.bookingId,
      customer: req.user._id,
    });

    if (!booking) {
      throw createHttpError("Booking not found.", 404);
    }

    if (booking.status === "Completed") {
      throw createHttpError("A completed booking cannot be cancelled.", 409);
    }

    if (booking.status === "Cancelled") {
      return res.status(200).json({
        message: "Booking is already cancelled.",
        data: booking,
      });
    }

    booking.status = "Cancelled";
    booking.statusHistory.push({
      status: "Cancelled",
      note: "Cancelled by customer",
      changedBy: req.user._id,
    });
    await booking.save();

    res.status(200).json({
      message: "Booking cancelled successfully.",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminBookings = async (_req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate("customer", "fullName email phone photo status")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "All bookings were fetched successfully.",
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBookingStatus = async (req, res, next) => {
  try {
    validateBookingId(req.params.bookingId);

    const status = normalizeText(req.body.status);
    const adminNote = normalizeText(req.body.adminNote);

    if (!BOOKING_STATUSES.includes(status)) {
      throw createHttpError("Choose a valid booking status.", 400);
    }

    if (adminNote.length > 1000) {
      throw createHttpError("Admin note must be under 1,000 characters.", 400);
    }

    const booking = await Booking.findById(req.params.bookingId);
    if (!booking) {
      throw createHttpError("Booking not found.", 404);
    }

    const statusChanged = booking.status !== status;
    booking.status = status;
    booking.adminNote = adminNote;

    if (statusChanged) {
      booking.statusHistory.push({
        status,
        note: adminNote,
        changedBy: req.user._id,
      });
    }

    await booking.save();
    await booking.populate("customer", "fullName email phone photo status");

    res.status(200).json({
      message: "Booking updated successfully.",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};
