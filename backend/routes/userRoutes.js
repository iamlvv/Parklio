const express = require("express");
const router = express.Router();

const {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userControllers");

const { protect } = require("../middleware/authMiddleware");

router.route("/login").post(authUser);
router.route("/signup").post(registerUser);
router.route("/profile").get(getUserProfile).post(protect, updateUserProfile);

module.exports = router;
