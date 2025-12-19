const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    mobile: {
      type: String,
      required: true,
      index: true
    },

    age:{type: Number} ,

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"]
    },

    address:  {
      type: String
    },

    franchiseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Franchise",
      required: true
    },

    lastOtpSentAt:{type: Date},

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);
