const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    plateNumber: {
      type: String,
      required: true,
    },
    parkingKey: {
      type: String,
      required: true,
    },
    vehicleType: {
      type: String,
      required: true,
    },
    vehicleOwner: {
      type: String,
      required: true,
    },
    parkingPrice: {
      type: Number,
      required: true,
    },
    inputTime: {
      type: String,
      required: true,
    },
    outputTime: {
      type: String,
    },
    parkingType: {
      type: String,
      required: true,
    },
    remainingTime: {
      type: Number,
      default: 1,
    },
    additionalService: {
      carWashing: {
        registerDate: {
          type: String,
        },
        cost: {
          type: Number,
          default: 0,
        },
      },
      oilChanging: {
        registerDate: {
          type: String,
        },
        oilType: {
          type: String,
        },
        oilPrice: {
          type: Number,
        },
        cost: {
          type: Number,
          default: 0,
        },
      },
      latestCost: {
        type: Number,
        default: 0,
      },
    },
    totalCost: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
module.exports = Vehicle;
