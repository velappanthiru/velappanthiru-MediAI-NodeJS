const express = require("express");
const { getAllMenus, updateMenuAccess, getMenusByRole } = require("../controllers/menuController");
const { authenticateToken, authorizeRole } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/menus", authenticateToken, authorizeRole(1), getAllMenus);
router.get("/role/:roleName", authenticateToken, getMenusByRole);
router.put("/update", authenticateToken, authorizeRole(1), updateMenuAccess);

module.exports = router;
