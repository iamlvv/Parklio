const express = require("express");
const router = express.Router();

const {
  getAllServices,
  addNewService,
} = require("../controllers/serviceControllers");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getAllServices);
router.route("/registration").post(protect, addNewService);
module.exports = router;
