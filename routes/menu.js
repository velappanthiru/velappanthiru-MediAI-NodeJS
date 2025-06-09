const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const { authenticateToken, authorizeRole } = require("../middleware/authMiddleware");

router.post('/menus', authenticateToken, authorizeRole(1), menuController.createMenu);
router.get('/menus', authenticateToken, menuController.getAllMenus);
router.get('/menus/:id', authenticateToken, menuController.getMenuById);
router.put('/menus/:id', authenticateToken, authorizeRole(1), menuController.updateMenu);
router.delete('/menus/:id', authenticateToken, authorizeRole(1), menuController.deleteMenu);

module.exports = router;
