import mongoose from "mongoose";

export const BOOKING_STATUSES = [
  "Pending",
  "Confirmed",
  "Planning",
  "Completed",
  "Cancelled",
];

const statusHistorySchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: BOOKING_STATUSES,
      required: true,
    },
    note: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },
    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    changedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
);

const bookingSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    reference: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    eventType: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    eventDate: {
      type: Date,
      required: true,
      index: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    guestCount: {
      type: Number,
      required: true,
      min: 1,
      max: 10000,
    },
    budgetRange: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    serviceType: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    venuePreference: {
      type: String,
      trim: true,
      maxlength: 160,
      default: "",
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },
    status: {
      type: String,
      enum: BOOKING_STATUSES,
      default: "Pending",
      index: true,
    },
    adminNote: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },
    statusHistory: {
      type: [statusHistorySchema],
      default: [],
    },
  },
  { timestamps: true },
);

bookingSchema.index({ customer: 1, createdAt: -1 });
bookingSchema.index({ status: 1, eventDate: 1 });

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
