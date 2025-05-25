const catchAsync = require('../middleware/catchAsync');
const { Book } = require("../models");

// book upload api - /api/books
const createBook = catchAsync(async (req, res, next) => {
  try {
    if (req.user.roleId !== 1) {
      return res.status(403).json({ message: "Access Denied. Only admins can upload books." });
    }

    const { bookName, authorName, year, publisher, edition, publishDate, isActive } = req.body;
    const protocol = req.headers["x-forwarded-proto"] === "https" ? "https" : "http";

    const bookFile = req.file ? `${protocol}://${req.get("host")}/uploads/${req.file.filename}` : null;

    if (!bookFile) {
      return res.status(400).json({ message: "Book file is required" });
    }

    const existingBook = await Book.findOne({ where: { bookName } });
    if (existingBook) {
      return res.status(400).json({ message: "This book already exists" });
    }

    // Save to Database
    const book = await Book.create({
      bookName,
      authorName,
      year,
      publisher,
      edition,
      publishDate,
      bookFile,
      isActive: isActive !== undefined ? isActive : true,
    });

    return res.status(201).json({ message: "Book uploaded successfully", book });
  } catch (error) {
    return res.status(500).json({ message: "Error uploading book", error: error.message });
  }
})

// book update api - /api/books/:id
const updateBook = catchAsync(async (req, res, next) => {
  try {
    if (req.user.roleId !== 1) {
      return res.status(403).json({ message: "Access Denied. Only admins can edit books." });
    }

    const { id } = req.params;
    const { bookName, authorName, year, publisher, edition, publishDate, isActive } = req.body;
    const bookFile = req.file ? req.file.path : undefined; // If no new file uploaded, keep old file

    // Find book by ID
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Update only the provided fields
    await book.update({
      bookName: bookName || book.bookName,
      authorName: authorName || book.authorName,
      year: year || book.year,
      publisher: publisher || book.publisher,
      edition: edition || book.edition,
      publishDate: publishDate || book.publishDate,
      bookFile: bookFile || book.bookFile,
      isActive: isActive !== undefined ? isActive : book.isActive,
    });

    return res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error updating book", error: error.message });
  }
})

// get all book api - /api/books
const getAllBooks = catchAsync(async (req, res, next) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const offset = (page - 1) * limit;

    const { count, rows: books } = await Book.findAndCountAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]], // Latest books first
    });

    return res.status(200).json({
      totalBooks: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      books,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books", error: error.message });
  }
})

module.exports = {
  createBook,
  updateBook,
  getAllBooks
}
