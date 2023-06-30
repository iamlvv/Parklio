const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema(
  {
    fourSeatCar: {
      price: {
        type: Number,
        default: 5,
      },
    },
    sevenSeatCar: {
      price: {
        type: Number,
        default: 7,
      },
    },
    truck: {
      price: {
        type: Number,
        default: 9,
      },
    },
    carWash: {
      price: {
        type: Number,
        default: 10,
      },
    },
    oilChange: {
      price: {
        type: Number,
        default: 20,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Fee = mongoose.model("Fee", feeSchema);
module.exports = Fee;
