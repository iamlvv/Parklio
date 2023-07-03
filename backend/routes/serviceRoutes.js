const express = require("express");
const router = express.Router();

const {
  getAllServices,
  addService,
} = require("../controllers/serviceControllers");

router.route("/").get(getAllServices);
router.route("/addservice").post(addService);
module.exports = router;
