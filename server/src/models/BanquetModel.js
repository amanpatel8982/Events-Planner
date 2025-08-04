import mongoose from "mongoose";

const BanquetSchema =  mongoose.Schema(
  {
    hallName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
     
    },
    capacity: {
      type: String,
      required: true,
    },
    managerName: {
      type: String,
      required: true,
    },
    photos: {
      type: [String],
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    rent: {
      type: String,
      required: true,
    },
    minBookingAmount: {
      type: String,
      required: true,
    },
    featureDescription: {
      type: String,
      required: true,
    },
  },
  { timeStamps: true }
);

const Banquet = mongoose.model("Banquet", BanquetSchema);

export default Banquet;