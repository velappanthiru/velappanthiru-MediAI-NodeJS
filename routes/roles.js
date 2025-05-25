const express = require("express");
const router = express.Router();

const { authenticateToken, authorizeRole } = require("../middleware/authMiddleware")
const { create, get, getById, update, deleteRole } = require("../controllers/roleController")

router.post("/createRole", authenticateToken, create);
router.get("/getRole", authenticateToken, get);
router.get("/getRoleById/:id", authenticateToken, getById);
router.put("/updateRole/:id", authenticateToken, update);
router.delete("/deleteRole/:id", authenticateToken, deleteRole);

module.exports = router;
