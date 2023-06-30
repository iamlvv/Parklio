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
      type: Object,
      required: true,
    },
    outputTime: {
      type: Object,
    },
    parkingType: {
      type: String,
      required: true,
    },
    remainingTime: {
      type: Number,
    },
    additionalService: {
      carWashing: {
        history: [
          {
            registerDate: {
              type: Object,
            },
          },
        ],
        upToNowCost: {
          type: Number,
          default: 0,
        },
      },
      oilChanging: {
        history: [
          {
            registerDate: {
              type: Object,
            },
            oilType: {
              type: String,
            },
            oilPrice: {
              type: Number,
            },
          },
        ],
        upToNowCost: {
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
