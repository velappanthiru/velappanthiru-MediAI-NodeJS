const express = require('express');
const router = express.Router();
const rolePermissionController = require('../controllers/rolePermissionController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/roles/:roleId/permissions', authenticateToken, rolePermissionController.assignPermissionsToRole);
router.get('/roles/:roleId/permissions', authenticateToken, rolePermissionController.getPermissionsByRole);
router.get('/:roleId/permissions', authenticateToken, rolePermissionController.getMenuIdsByRole);
router.delete('/roles/:roleId/permissions/:menuId', authenticateToken, rolePermissionController.removePermission);

module.exports = router;
