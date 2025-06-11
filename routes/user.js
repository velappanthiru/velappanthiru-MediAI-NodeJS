const express = require("express");
const router = express.Router();

const { authenticateToken, authorizeRole } = require("../middleware/authMiddleware");
const { getAllUsers, loginUser, registerUser, changePassword, getUserProfile, getAllRoles, createRole } = require("../controllers/userController");


// Get All Users (Excluding Admins)
router.get("/users", authenticateToken, getAllUsers);
router.get("/roles", authenticateToken, getAllRoles);
router.post("/roles", authenticateToken, createRole);

// Login Route (POST /login)
router.route("/login").post(loginUser);

// Register Route (POST /register)
router.route("/register").post(authenticateToken, registerUser);

router.route("/change-password").post(authenticateToken, changePassword);

router.route('/userme').get(authenticateToken,getUserProfile);

module.exports = router;

