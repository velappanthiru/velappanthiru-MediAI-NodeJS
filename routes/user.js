const express = require("express");
const router = express.Router();

const { authenticateToken, authorizeRole } = require("../middleware/authMiddleware");
const { getAllUsers, loginUser, registerUser, changePassword, getUserProfile, getAllRoles, createRole } = require("../controllers/userController");


// Get All Users (Excluding Admins)
router.get("/users", authenticateToken, authorizeRole(1), getAllUsers);
router.get("/roles", authenticateToken, authorizeRole(1), getAllRoles);
router.post("/roles", authenticateToken, authorizeRole(1), createRole);

// Login Route (POST /login)
router.route("/login").post(loginUser);

// Register Route (POST /register)
router.route("/register").post(authenticateToken, authorizeRole(1), registerUser);

router.route("/change-password").post(authenticateToken, changePassword);

router.route('/userme').get(authenticateToken,getUserProfile);

module.exports = router;

