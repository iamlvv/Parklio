const express = require("express");
const router = express.Router();

const {
  getAllServices,
  addService,
} = require("../controllers/serviceControllers");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getAllServices);
router.route("/addservice").post(protect, addService);
module.exports = router;
