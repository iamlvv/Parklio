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
const addService = asyncHandler(async (req, res) => {
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
module.exports = { getAllServices, addService };
