const asyncHandler = require("express-async-handler");
const Vehicle = require("../models/vehicleModel");
const Fee = require("../models/feeModel");
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
    res.status(404).json({ message: "Vehicle not found" });
    throw new Error("Vehicle not found");
  }
});

// @desc    Add a vehicle
// @route   POST /api/vehicles
// @access  Private

const addNewVehicle = asyncHandler(async (req, res) => {
  const {
    plateNumber,
    vehicleType,
    vehicleOwner,
    inputTime,
    outputTime,
    parkingType,
    serviceCost,
    carWashCost,
    oilType,
    oilChangingCost,
  } = req.body;
  console.log(req.body);
  const vehicleNotCheckedOut = await Vehicle.findOne({ plateNumber }); // Check if the vehicle is already checked in
  if (
    vehicleNotCheckedOut &&
    vehicleNotCheckedOut.parkingKey !== "checked out"
  ) {
    res.status(400).json({ message: "Vehicle already checked in" });
    throw new Error("Vehicle already checked in");
  }
  const fees = await Fee.find({}); // Get the latest fees
  const vehicle = new Vehicle({
    plateNumber: plateNumber,
    vehicleType: vehicleType,
    vehicleOwner: vehicleOwner,
    parkingPrice:
      vehicleType === "4seatcar"
        ? fees[0].fourSeatCar.price
        : vehicleType === "7seatcar"
        ? fees[0].sevenSeatCar.price
        : fees[0].truck.price,
    inputTime: inputTime,
    outputTime,
    parkingType: parkingType,
    remainingTime: 1,
    additionalService: {
      carWashing:
        carWashCost !== 0
          ? {
              registerDate: inputTime,
              cost: carWashCost,
            }
          : {
              registerDate: "",
              cost: 0,
            },
      oilChanging:
        oilChangingCost !== 0
          ? {
              registerDate: inputTime,
              oilType: oilType,
              oilPrice: oilChangingCost,
              cost: oilChangingCost,
            }
          : {
              registerDate: "",
              oilType: "",
              oilPrice: 0,
              cost: 0,
            },
      latestCost: carWashCost + oilChangingCost,
    },
    totalCost: serviceCost,
    parkingKey: Math.floor(Math.random() * 1000000),
  });
  const createdVehicle = await vehicle.save();
  res.status(201).json({
    parkingKey: createdVehicle.parkingKey,
  });
});

// @desc    Checkout a vehicle
// @route   PUT /api/vehicles/checkout
// @access  Private

const checkoutVehicle = asyncHandler(async (req, res) => {
  const { plateNumber, parkingKey } = req.body;
  console.log(plateNumber, parkingKey);
  const vehicle = await Vehicle.findOne({ plateNumber, parkingKey });
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
    vehicle.parkingKey = "checked out";
    vehicle.outputTime = new Date(vehicle.outputTime).toLocaleString();
    vehicle.outputMonth = new Date(vehicle.outputTime).getUTCMonth() + 1;
    vehicle.outputYear = new Date(vehicle.outputTime).getUTCFullYear();
    vehicle.outputDate = new Date(vehicle.outputTime).getUTCDate();
    vehicle.outputHour = new Date(vehicle.outputTime).getHours();
    const updatedVehicle = await vehicle.save();
    res.json({
      plateNumber: updatedVehicle.plateNumber,
      vehicleType: updatedVehicle.vehicleType,
      vehicleOwner: updatedVehicle.vehicleOwner,
      parkingPrice: updatedVehicle.parkingPrice,
      inputTime: updatedVehicle.inputTime,
      outputTime: updatedVehicle.outputTime,
      parkingType: updatedVehicle.parkingType,
      remainingTime: updatedVehicle.remainingTime,
      additionalService: updatedVehicle.additionalService,
      totalCost: updatedVehicle.totalCost,
    });
  } else {
    res.status(404).json({ message: "Invalid parking key or plate number" });
    throw new Error("Invalid parking key or plate number");
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

// @desc    Return all distinct vehicles
// @route   GET /api/vehicles/distinctvehicles
// @access  Private/Admin

const getAllDistinctVehicles = asyncHandler(async (req, res) => {
  const distinctVehicles = await Vehicle.aggregate([
    {
      $group: {
        _id: "$plateNumber",
        vehicleType: { $first: "$vehicleType" },
        vehicleOwner: { $first: "$vehicleOwner" },
        inputTime: { $sum: 1 },
        totalCost: { $sum: "$totalCost" },
      },
    },
  ]);
  res.json(distinctVehicles);
});

// @desc    Return the quantity of input time of the whole system up to now
// @route   GET /api/vehicles/totalinputtime
// @access  Private/Admin

const getTotalInputTime = asyncHandler(async (req, res) => {
  const totalInputTime = await Vehicle.aggregate([
    {
      $group: {
        _id: null,
        inputTime: { $sum: 1 },
      },
    },
  ]);
  res.json(totalInputTime);
});

// @desc    Return the quantity of output time of the whole system up to now
// @route   GET /api/vehicles/totaloutputtime
// @access  Private/Admin

const getTotalOutputTime = asyncHandler(async (req, res) => {
  const totalOutputTime = await Vehicle.aggregate([
    {
      $match: {
        parkingKey: "checked out",
      },
    },
    {
      $group: {
        _id: null,
        outputTime: { $sum: 1 },
        totalParkingIncome: { $sum: "$parkingPrice" },
      },
    },
  ]);
  res.json(totalOutputTime);
});

// @desc    Return checked out vehicles
// @route   GET /api/vehicles/checkedout
// @access  Private/Admin

const getCheckedOutVehicles = asyncHandler(async (req, res) => {
  const vehicles = await Vehicle.find({ parkingKey: "checked out" });
  res.json(vehicles);
});

module.exports = {
  getAllVehicles,
  getVehicleById,
  addNewVehicle,
  checkoutVehicle,
  deleteVehicle,
  getCheckedOutVehicles,
  getAllDistinctVehicles,
  getTotalInputTime,
  getTotalOutputTime,
};
