const express = require('express');
const router = express.Router();
const rolePermissionController = require('../controllers/rolePermissionController');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

router.post('/roles/:roleId/permissions', authenticateToken, authorizeRole(1), rolePermissionController.assignPermissionsToRole);
router.get('/roles/:roleId/permissions', authenticateToken, authorizeRole(1), rolePermissionController.getPermissionsByRole);
router.get('/:roleId/permissions', authenticateToken, authorizeRole(1), rolePermissionController.getMenuIdsByRole);
router.delete('/roles/:roleId/permissions/:menuId', authenticateToken, authorizeRole(1), rolePermissionController.removePermission);

module.exports = router;
