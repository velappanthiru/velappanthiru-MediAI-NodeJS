const express = require("express");
const userRoutes = require("./user");
const bookRoutes = require("./book");
const roleRoutes = require("./roles");
const questionRoutes = require("./question");
const patientRecordsRoutes = require("./patientRecords");

const router = express.Router();

// Merge all route files
router.use(userRoutes);
router.use(bookRoutes);
router.use(roleRoutes);
router.use(questionRoutes);
router.use(patientRecordsRoutes);

module.exports = router;
