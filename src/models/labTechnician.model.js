const mongoose = require("mongoose");

const labTechnicianSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      unique: true
    },

    mobile: {
      type: String
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      default: "LabTechnician"
    },

    franchiseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Franchise",
      required: true
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("LabTechnician", labTechnicianSchema);
