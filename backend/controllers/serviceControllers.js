const asyncHandler = require("express-async-handler");
const Service = require("../models/serviceModel");

// @desc    Fetch all services
// @route   GET /api/services
// @access  Public
const getAllServices = asyncHandler(async (req, res) => {
  const services = await Service.find({});
  res.json(services);
});

module.exports = { getAllServices };
