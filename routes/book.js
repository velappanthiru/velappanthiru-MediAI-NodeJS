const express = require("express");
const multer = require("multer");
const path = require("path");
const { Book } = require("../models");
const { authenticateToken, authorizeRole } = require("../middleware/authMiddleware");
const { createBook, updateBook, getAllBooks } = require("../controllers/bookController");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();


// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: uploadDir, // Save files in a safe, consistent location
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage
});

/**
 * @route POST /books
 * @desc Create a new book
 * @access Private (Only Admins)
 */
router.route("/books").post(authenticateToken, authorizeRole(1), upload.single("bookFile"), createBook);

/**
 * @route PUT /books/:id
 * @desc Edit book details (Admins only)
 * @access Private (Only Admins)
 */
router.route("/books/:id").put(authenticateToken, authorizeRole(1), upload.single("bookFile"), updateBook);

/**
 * @route GET /books
 * @desc Get a list of books with pagination
 * @access Private (Authenticated Users)
 */
router.route("/books").get(authenticateToken, getAllBooks);

module.exports = router;
