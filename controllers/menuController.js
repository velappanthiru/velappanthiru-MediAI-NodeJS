const catchAsync = require('../middleware/catchAsync');
const { Menu } = require("../models");
const { Op } = require('sequelize');


// Get all menus - /api/menus
const getAllMenus = catchAsync(async (req, res, next) => {
  try {
    const menus = await Menu.findAll();
    res.json(menus);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch menus" });
  }
});


// Update menu permissions
const updateMenuAccess = async (req, res) => {
  try {
    const { menuId, roleName, hasAccess } = req.body;

    // Validate required fields
    if (!menuId || !roleName || hasAccess === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Menu ID, role name, and access status are required'
      });
    }

    // Find the menu by ID
    const menu = await Menu.findByPk(menuId);
    console.log("🚀 ~ updateMenuAccess ~ menu:", menu)
    if (!menu) {
      return res.status(404).json({
        success: false,
        message: 'Menu not found'
      });
    }

    // Get current permissions
    let currentPermissions = menu.permission || [];
    // Handle case where permission might be stored as string
    if (typeof currentPermissions === 'string') {
      try {
        currentPermissions = JSON.parse(currentPermissions);
      } catch (error) {
        console.log('Error parsing permissions JSON:', error);
        currentPermissions = [];
      }
    }

    // Ensure it's an array
    if (!Array.isArray(currentPermissions)) {
      currentPermissions = [];
    }

    if (hasAccess) {
      // Add role to permissions if not already present
      if (!currentPermissions.includes(roleName)) {
        currentPermissions.push(roleName);
      }
    } else {
      // Remove role from permissions
      currentPermissions = currentPermissions.filter(role => String(role) !== String(roleName));
    }
    console.log("🚀 ~ updateMenuAccess ~ currentPermissions:", currentPermissions)

    // Update the menu with new permissions
    await menu.update({
      permission: currentPermissions
    });

    res.status(200).json({
      success: true,
      message: 'Menu access updated successfully',
      data: {
        menuId: menu.id,
        menu: menu.menu,
        permission: currentPermissions
      }
    });

  } catch (error) {
    console.error('Error updating menu access:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};


// Get menus accessible by a specific role
const getMenusByRole = async (req, res) => {
  try {
    const { roleName } = req.params;

    if (!roleName) {
      return res.status(400).json({
        success: false,
        message: 'Role name is required'
      });
    }

    // // Find all menus where the role is in the permission array
    // const menus = await Menu.findAll({
    //   where: {
    //     permission: {
    //       [Op.contains]: [roleName] // For PostgreSQL JSON contains
    //       // For MySQL/MariaDB, you might need to use JSON_CONTAINS
    //       // [Op.and]: sequelize.literal(`JSON_CONTAINS(permission, '"${roleName}"')`)
    //     }
    //   },
    //   attributes: ['id', 'key', 'menu', 'permission'],
    //   order: [['menu', 'ASC']]
    // });

    // Alternative query for databases that don't support Op.contains
    const menus = await Menu.findAll({
      attributes: ['id', 'key', 'menu', 'permission'],
      order: [['menu', 'ASC']]
    });

    // Filter in JavaScript
    const filteredMenus = menus.filter(menu => {
      let permissions = [];

      try {
        permissions = JSON.parse(menu.permission || '[]');
      } catch (err) {
        console.error('Invalid JSON in permission:', menu.permission);
        return false;
      }

      // Convert everything to string for consistent comparison
      return permissions.map(p => p.toString()).includes(roleName.toString());
    });
    console.log("🚀 ~ getMenusByRole ~ filteredMenus:", filteredMenus)



    res.status(200).json({
      success: true,
      message: `Menus accessible by role: ${roleName}`,
      data: filteredMenus,
      count: filteredMenus.length
    });

  } catch (error) {
    console.error('Error fetching menus by role:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

module.exports = {
  getAllMenus,
  updateMenuAccess,
  getMenusByRole
}
