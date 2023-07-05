const express = require("express");
const router = express.Router();

const {
  getAllVehicles,
  getVehicleById,
  addVehicle,
  checkoutVehicle,
  deleteVehicle,
  verifyVehicle,
  getCheckedOutVehicles,
} = require("../controllers/vehicleControllers");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getAllVehicles);
router.route("/checkin").post(protect, addVehicle);
// router
//   .route("/:id")
//   .get(protect, getVehicleById)
//   .delete(protect, deleteVehicle);
router.route("/checkout").post(protect, checkoutVehicle);
router.route("/verifyvehicle").post(protect, verifyVehicle);
router.route("/checkedout").get(protect, getCheckedOutVehicles);
module.exports = router;
