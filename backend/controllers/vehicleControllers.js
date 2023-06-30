const asyncHandler = require("express-async-handler");
const Vehicle = require("../models/vehicleModel");
// @desc    Fetch all vehicles
// @route   GET /api/vehicles
// @access  Public
const getAllVehicles = asyncHandler(async (req, res) => {
  const vehicles = await Vehicle.find({});
  res.json(vehicles);
});

// @desc    Fetch single vehicle
// @route   GET /api/vehicles/:id
// @access  Public

const getVehicleById = asyncHandler(async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);
  if (vehicle) {
    res.json(vehicle);
  } else {
    res.status(404);
    throw new Error("Vehicle not found");
  }
});

// @desc    Add a vehicle
// @route   POST /api/vehicles
// @access  Private

const addVehicle = asyncHandler(async (req, res) => {
  const {
    plateNumber,
    vehicleType,
    vehicleOwner,
    parkingPrice,
    inputTime,
    outputTime,
    parkingType,
    remainingTime,
    additionalService,
    totalCost,
  } = req.body;

  const vehicle = new Vehicle({
    plateNumber,
    vehicleType,
    vehicleOwner,
    parkingPrice,
    inputTime,
    outputTime,
    parkingType,
    remainingTime,
    additionalService,
    totalCost,
    parkingKey: Math.floor(Math.random() * 1000000),
  });
  const createdVehicle = await vehicle.save();
  res.status(201).json({
    parkingKey: createdVehicle.parkingKey,
  });
});

// @desc    Verify a vehicle
// @route   GET /api/vehicles
// @access  Private

const verifyVehicle = asyncHandler(async (req, res) => {
  const { plateNumber, parkingKey } = req.body;
  const VehicleExists = await Vehicle.findOne({ parkingKey });
});

// @desc    Checkout a vehicle
// @route   PUT /api/vehicles/:id
// @access  Private

const checkoutVehicle = asyncHandler(async (req, res) => {
  const { plateNumber, parkingKey } = req.body;
  const vehicle = await Vehicle.findOne({ parkingKey });
  if (vehicle) {
    vehicle.outputTime = new Date();
    vehicle.remainingTime =
      (vehicle.outputTime - vehicle.inputTime) / (1000 * 60 * 60 * 24);
    if (vehicle.remainingTime < 1) {
      vehicle.remainingTime = 1;
    } else vehicle.remainingTime = Math.ceil(vehicle.remainingTime);
    vehicle.totalCost =
      vehicle.remainingTime * vehicle.parkingPrice +
      vehicle.additionalService.latestCost;
    vehicle.parkingKey = null;
    const updatedVehicle = await vehicle.save();
    res.json({
      message: "success",
    });
  } else {
    res.status(404);
    throw new Error("Invalid parking key");
  }
});

// @desc    Delete a vehicle
// @route   DELETE /api/vehicles/:id
// @access  Private/Admin

const deleteVehicle = asyncHandler(async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);
  if (vehicle) {
    await vehicle.remove();
    res.json({ message: "Vehicle removed" });
  } else {
    res.status(404);
    throw new Error("Vehicle not found");
  }
});

module.exports = {
  getAllVehicles,
  getVehicleById,
  addVehicle,
  checkoutVehicle,
  deleteVehicle,
};
