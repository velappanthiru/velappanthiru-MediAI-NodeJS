const { Menu } = require('../models'); // Adjust path as needed

// Create a new menu
const createMenu = async (req, res) => {
  try {
    const { title, path, icon, parentId } = req.body;

    const newMenu = await Menu.create({ title, path, icon, parentId: parentId || null });
    res.status(201).json({ statusCode: 201, data: newMenu });
  } catch (error) {
    console.error('Error creating menu:', error);
    res.status(500).json({ statusCode: 500, error: 'Internal Server Error' });
  }
};

// Get all menus with nested children (1 level)
const getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.findAll({
      where: { parentId: null },
      include: [{ model: Menu, as: 'children' }],
      order: [['id', 'ASC']]
    });

    res.status(200).json({ statusCode: 200, data: menus });
  } catch (error) {
    console.error('Error fetching menus:', error);
    res.status(500).json({ statusCode: 500, error: 'Internal Server Error' });
  }
};

// Get single menu by id with its children
const getMenuById = async (req, res) => {
  try {
    const { id } = req.params;

    const menu = await Menu.findByPk(id, {
      include: [{ model: Menu, as: 'children' }]
    });

    if (!menu) {
      return res.status(404).json({ statusCode: 404, error: 'Menu not found' });
    }

    res.status(200).json({ statusCode: 200, data: menu });
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({ statusCode: 500, error: 'Internal Server Error' });
  }
};

// Update menu by id
const updateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, path, icon, parentId } = req.body;

    const menu = await Menu.findByPk(id);
    if (!menu) {
      return res.status(404).json({ statusCode: 404, error: 'Menu not found' });
    }

    await menu.update({ title, path, icon, parentId });
    res.status(200).json({ statusCode: 200, data: menu });
  } catch (error) {
    console.error('Error updating menu:', error);
    res.status(500).json({ statusCode: 500, error: 'Internal Server Error' });
  }
};

// Delete menu by id
const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;

    const menu = await Menu.findByPk(id);
    if (!menu) {
      return res.status(404).json({ statusCode: 404, error: 'Menu not found' });
    }

    await menu.destroy();
    res.status(200).json({ statusCode: 200, message: 'Menu deleted successfully' });
  } catch (error) {
    console.error('Error deleting menu:', error);
    res.status(500).json({ statusCode: 500, error: 'Internal Server Error' });
  }
};

module.exports = {
  createMenu,
  getAllMenus,
  getMenuById,
  updateMenu,
  deleteMenu,
};
