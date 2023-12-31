const express = require("express");
const router = express.Router();

const {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userControllers");

const { protect } = require("../middleware/authMiddleware");

router.route("/authentication").post(authUser);
router.route("/registration").post(registerUser);
router
  .route("/profile/:id")
  .get(protect, getUserProfile)
  .post(protect, updateUserProfile);
module.exports = router;
