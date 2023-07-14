const express = require("express");
const router = express.Router();

const {
  getAllServices,
  addNewService,
  getTotalService,
} = require("../controllers/serviceControllers");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getAllServices);
router.route("/registration").post(protect, addNewService);
router.route("/totalservice").get(protect, getTotalService);
module.exports = router;
