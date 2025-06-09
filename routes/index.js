const express = require("express");
const userRoutes = require("./user");
const bookRoutes = require("./book");
const roleRoutes = require("./roles");
const mennuoutes = require("./menu");
const questionRoutes = require("./question");
const patientRecordsRoutes = require("./patientRecords");
const rolePermission = require("./rolePermission");

const router = express.Router();

// Merge all route files
router.use(userRoutes);
router.use(bookRoutes);
router.use(roleRoutes);
router.use(mennuoutes);
router.use(questionRoutes);
router.use(patientRecordsRoutes);
router.use(rolePermission);

module.exports = router;
