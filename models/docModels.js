const mongoose = require("mongoose");

const docSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    name: {
      type: String,
      required: [true, "first name is required"],
    },
    phone: {
      type: String,
      required: [true, "phone no is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    specialization: {
      type: String,
      required: [true, "specialization is require"],
    },
    experience: {
      type: String,
      required: [true, "experience is required"],
    },
    feesPerConsultation: {
      type: Number,
      required: [true, "fee is required"],
    },
    status: {
      type: String,
      default: "pending",
    },
    timings: {
      type: {
        startTime: String, // The start time of working hours (e.g., "09:00")
        endTime: String,   // The end time of working hours (e.g., "17:00")
        days: [String],    // An array of working days (e.g., ["monday", "tuesday"])
      },
      required: [true, "work timing is required"],
    },
  },
  { timestamps: true }
);

const docModels = mongoose.model("doctors", docSchema);
module.exports = docModels;