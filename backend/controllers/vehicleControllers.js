const asyncHandler = require("express-async-handler");
const Vehicle = require("../models/vehicleModel");
const Fee = require("../models/feeModel");
const Service = require("../models/serviceModel");
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
    inputTime,
    outputTime,
    parkingType,
    serviceCost,
    carWashCost,
    oilType,
    oilChangingCost,
  } = req.body;
  console.log(req.body);
  const fees = await Fee.find({});
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

// @desc    Verify a vehicle
// @route   POST /api/vehicles/verifyvehicle
// @access  Private

const verifyVehicle = asyncHandler(async (req, res) => {
  const { plateNumber, parkingKey } = req.body;
  const VehicleExists = await Vehicle.findOne({ plateNumber, parkingKey });
  console.log(plateNumber);
  if (VehicleExists) {
    res.json({
      plateNumber: VehicleExists.plateNumber,
      vehicleType: VehicleExists.vehicleType,
      vehicleOwner: VehicleExists.vehicleOwner,
      parkingPrice: VehicleExists.parkingPrice,
      inputTime: VehicleExists.inputTime,
      parkingType: VehicleExists.parkingType,
      remainingTime: VehicleExists.remainingTime,
      additionalService: VehicleExists.additionalService,
      totalCost: VehicleExists.totalCost,
    });
  } else {
    res.status(404);
    throw new Error("Invalid parking key");
  }
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

// @desc    Calculate Income of a day
const getDaysInMonth = (month, year) =>
  new Array(31)
    .fill("")
    .map((v, i) => new Date(year, month - 1, i + 1))
    .filter((v) => v.getMonth() === month - 1);

const calculateIncomeDaily = async (date) => {
  const vehicle = await Vehicle.find({ outputTime: { $ne: true } });
  const result = [{}];
  let income = 0;
  for (let i = 0; i < vehicle.length; i++) {
    const date1 = new Date(vehicle[i].outputTime).toLocaleDateString();
    if (date1 === date) {
      result.push(vehicle[i]);
    }
  }
  console.log(result);
  for (let i = 0; i < result.length; i++) {
    income += result[i].totalCost;
  }
  return income;
};
// @desc    Calculate Income of a month
// @route   GET /api/vehicles/income
// @access  Private/Admin

const calculateIncomeMonthly = asyncHandler(async (req, res) => {
  const { month, year } = req.body;
  const daysInMonth = getDaysInMonth(month, year);
  const income = [{}];
  for (let i = 0; i < daysInMonth.length; i++) {
    income.push({
      date: daysInMonth[i].toLocaleDateString(),
      income: await calculateIncomeDaily(daysInMonth[i].toLocaleDateString()),
    });
  }
  res.json(income);
});

module.exports = {
  getAllVehicles,
  getVehicleById,
  addVehicle,
  checkoutVehicle,
  deleteVehicle,
  verifyVehicle,
  calculateIncomeMonthly,
};
