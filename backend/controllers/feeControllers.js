const asyncHandler = require("express-async-handler");
const Fee = require("../models/feeModel");

// @desc    Fetch all fees
// @route   GET /api/fees
// @access  Public
const getAllFees = asyncHandler(async (req, res) => {
  const fees = await Fee.find({});
  res.json(fees);
});

// @desc    Update fee
// @route   PATCH /api/fees/
// @access  Private

const updateFee = asyncHandler(async (req, res) => {
  const { fourSeatCar, sevenSeatCar, truck, carWash, oilChange } = req.body;
  const fee = await Fee.findOne({});
  fee.fourSeatCar.price = fourSeatCar;
  fee.sevenSeatCar.price = sevenSeatCar;
  fee.truck.price = truck;
  fee.carWash.price = carWash;
  fee.oilChange.price = oilChange;
  const updatedFee = await fee.save();
  res.json({
    message: "success",
  });
});

// @desc    Create new fee
// @route   POST /api/fees
// @access  Private/Admin

const createFee = asyncHandler(async (req, res) => {
  const { fourSeatCar, sevenSeatCar, truck, carWash, oilChange } = req.body;
  const fee = new Fee({
    fourSeatCar,
    sevenSeatCar,
    truck,
    carWash,
    oilChange,
  });
  const createdFee = await fee.save();
  res.status(201).json({
    message: "success",
  });
});
module.exports = { getAllFees, updateFee, createFee };
