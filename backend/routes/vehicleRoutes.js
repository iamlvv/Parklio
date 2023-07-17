const express = require("express");
const router = express.Router();

const {
  getAllVehicles,
  addNewVehicle,
  checkoutVehicle,
  getCheckedOutVehicles,
  getAllDistinctVehicles,
  getTotalInputTime,
  getTotalOutputTime,
} = require("../controllers/vehicleControllers");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getAllVehicles);
router.route("/registration").post(protect, addNewVehicle);
// router
//   .route("/:id")
//   .get(protect, getVehicleById)
//   .delete(protect, deleteVehicle);
router.route("/checkout").post(protect, checkoutVehicle);
router.route("/checkedout").get(protect, getCheckedOutVehicles);
router.route("/distinctvehicles").get(protect, getAllDistinctVehicles);
router.route("/totalinputtime").get(protect, getTotalInputTime);
router.route("/totaloutputtime").get(protect, getTotalOutputTime);
module.exports = router;
