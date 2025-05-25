const express = require("express");
const router = express.Router();

const { authenticateToken, authorizeRole } = require("../middleware/authMiddleware")
const { create, get, getById, update, deleteRecord } = require("../controllers/patientRecord")

const { handleImageUpload } = require("../controllers/patientDetails");

router.post("/createRecord", authenticateToken, create);
router.get("/getPatientRecord", authenticateToken, get);
router.get("/getPatientRecordById/:id", authenticateToken, getById);
router.put("/updatePatientRecord/:id", authenticateToken, update);
router.delete("/deletePatientRecord/:id", authenticateToken, deleteRecord);

router.post("/imageToText", authenticateToken, handleImageUpload);

module.exports = router;
