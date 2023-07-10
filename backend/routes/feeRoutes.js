const express = require("express");
const router = express.Router();

const {
  getAllFees,
  updateFee,
  createFee,
} = require("../controllers/feeControllers");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getAllFees).post(protect, createFee);
router.route("/updation").post(protect, updateFee);

module.exports = router;
