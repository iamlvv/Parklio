const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    plateNumber: {
      type: String,
      required: true,
    },
    vehicleOwner: {
      type: String,
      required: true,
    },
    vehicleType: {
      type: String,
      required: true,
    },
    registerTime: {
      type: Date,
      required: true,
    },
    serviceType: {
      type: String,
      required: true,
    },
    oilType: {
      type: String,
      default: "none",
    },
    cost: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
