const express = require("express");
const router = express.Router();

const {
  getAllFees,
  updateFee,
  createFee,
} = require("../controllers/feeControllers");

router.route("/").get(getAllFees).post(createFee);
router.route("/updatefee").patch(updateFee);

module.exports = router;
