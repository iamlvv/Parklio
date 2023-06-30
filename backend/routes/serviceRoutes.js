const express = require("express");
const router = express.Router();

const { getAllServices } = require("../controllers/serviceControllers");

router.route("/").get(getAllServices);

module.exports = router;
