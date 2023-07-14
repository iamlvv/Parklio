const asyncHandler = require("express-async-handler");
const Service = require("../models/serviceModel");

// @desc    Fetch all services
// @route   GET /api/services
// @access  Public
const getAllServices = asyncHandler(async (req, res) => {
  const services = await Service.find({});
  if (services) {
    res.json(services);
  }
});

//@desc     Add a service
//@route    POST /api/services
//@access   Private
const addNewService = asyncHandler(async (req, res) => {
  const {
    plateNumber,
    vehicleOwner,
    vehicleType,
    carWashCost,
    oilChangingCost,
    oilType,
    inputTime,
  } = req.body;
  const service = new Service({
    plateNumber: plateNumber,
    vehicleOwner: vehicleOwner,
    vehicleType: vehicleType,
    registerTime: inputTime,
    serviceType: carWashCost
      ? "carWash"
      : oilChangingCost
      ? "oilChanging"
      : "none",
    oilType: oilType ? oilType : "none",
    cost: carWashCost ? carWashCost : oilChangingCost ? oilChangingCost : 0,
  });
  const createdService = await service.save();
  res.status(201).json({
    message: "success",
  });
});

// @desc    Return the quantity of each service of the whole system up to now
// @route   GET /api/vehicles/totalservice
// @access  Private/Admin

const getTotalService = asyncHandler(async (req, res) => {
  const totalService = await Service.aggregate([
    {
      $group: {
        _id: null,
        totalServiceIncome: { $sum: "cost" },
        totalCarWashIncome: {
          $sum: {
            $cond: [{ $eq: ["$serviceType", "carWash"] }, "$cost", 0],
          },
        },
        totalOilChangingIncome: {
          $sum: {
            $cond: [{ $eq: ["$serviceType", "oilChanging"] }, "$cost", 0],
          },
        },
        numberOfCarWash: {
          $sum: {
            $cond: [{ $eq: ["$serviceType", "carWash"] }, 1, 0],
          },
        },
        numberOfShellOil: {
          $sum: {
            $cond: [{ $eq: ["$oilType", "shell"] }, 1, 0],
          },
        },
        numberOfPennzoilOil: {
          $sum: {
            $cond: [{ $eq: ["$oilType", "pennzoil"] }, 1, 0],
          },
        },
        numberOfCastrolOil: {
          $sum: {
            $cond: [{ $eq: ["$oilType", "castrol"] }, 1, 0],
          },
        },
        numberOfValvolineOil: {
          $sum: {
            $cond: [{ $eq: ["$oilType", "valvoline"] }, 1, 0],
          },
        },
      },
    },
  ]);
  res.json(totalService);
});

module.exports = { getAllServices, addNewService, getTotalService };
