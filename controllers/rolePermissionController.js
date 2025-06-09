const { RolePermission, Role, Menu } = require('../models');

// Assign permissions (menus) to a role
// Expects { menuIds: [1,2,3] } in req.body
const assignPermissionsToRole = async (req, res) => {
  try {
    const { roleId } = req.params;
    const { menuIds } = req.body;

    if (!Array.isArray(menuIds) || menuIds.length === 0) {
      return res.status(400).json({ error: 'menuIds must be a non-empty array' });
    }

    // Check role exists
    const role = await Role.findByPk(roleId);
    if (!role) return res.status(404).json({ error: 'Role not found' });

    // Delete existing permissions for this role
    await RolePermission.destroy({ where: { roleId } });

    // Create new permissions
    const rolePermissions = menuIds.map(menuId => ({
      roleId,
      menuId,
    }));
    await RolePermission.bulkCreate(rolePermissions);

    res.json({ message: 'Permissions assigned successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get menus assigned to a role
const getPermissionsByRole = async (req, res) => {
  try {
    const { roleId } = req.params;
    console.log("🚀 ~ getPermissionsByRole ~ roleId:", roleId)

    // Check role exists
    const role = await Role.findByPk(roleId);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }

    // Fetch RolePermissions with Menu and its children
    const permissions = await RolePermission.findAll({
      where: { roleId },
      include: [
        {
          model: Menu,
          attributes: ['id', 'title', 'path', 'icon', 'parentId'],
          include: [
            {
              model: Menu,
              as: 'children',
              attributes: ['id', 'title', 'path', 'icon', 'parentId'],
            },
          ],
        },
      ],
    });

    // Extract menus
    let menus = permissions.map(rp => rp.Menu);

    // Remove duplicates (if RolePermission has duplicate Menu entries)
    menus = menus.filter(
      (menu, index, self) =>
        index === self.findIndex(m => m.id === menu.id)
    );

    // Sort top-level menus by id
    menus.sort((a, b) => a.id - b.id);

    // Sort children menus (if any)
    for (const menu of menus) {
      if (menu.children && menu.children.length > 0) {
        menu.children.sort((a, b) => a.id - b.id);
      }
    }

    res.json({ role: role.name, menus });
  } catch (err) {
    console.error('Error fetching permissions:', err);
    res.status(500).json({ error: 'Server error' });
  }
};


const getMenuIdsByRole = async (req, res) => {
  try {
    const { roleId } = req.params;

    const rolePermissions = await RolePermission.findAll({
      where: { roleId },
      attributes: ['menuId'],
    });

    const menuIds = rolePermissions.map(rp => rp.menuId);

    res.json({ roleId: parseInt(roleId), menuIds });
  } catch (err) {
    console.error('Error fetching menu IDs:', err);
    res.status(500).json({ error: 'Server error' });
  }
};


// Remove a specific permission from a role (optional)
const removePermission = async (req, res) => {
  try {
    const { roleId, menuId } = req.params;

    const deleted = await RolePermission.destroy({
      where: { roleId, menuId },
    });

    if (!deleted) return res.status(404).json({ error: 'Permission not found' });

    res.json({ message: 'Permission removed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  assignPermissionsToRole,
  getPermissionsByRole,
  getMenuIdsByRole,
  removePermission,
};
