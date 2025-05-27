'use strict';

const { Role } = require('../models'); // Adjust the path if necessary

module.exports = {
  // async create(req, res) {
  //   try {
  //     const { name } = req.body;

  //     if (!name || !Array.isArray(access)) {
  //       return res.status(400).json({ message: 'Invalid input: name and access array are required' });
  //     }

  //     // Create the role record
  //     const newRole = await Role.create({
  //       name,
  //       access
  //     });

  //     return res.status(201).json(newRole);
  //   } catch (error) {
  //     console.error('Error creating role:', error);
  //     return res.status(500).json({ message: 'Internal server error' });
  //   }
  // },

  async get(req, res) {
    try {
      const roles = await Role.findAll();
      return res.status(200).json(roles);
    } catch (error) {
      console.error('Error fetching roles:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  async getById(req, res) {
    try {
      const id = req.params.id;
      const role = await Role.findByPk(id);

      if (!role) {
        return res.status(404).json({ message: 'Role not found' });
      }

      return res.status(200).json(role);
    } catch (error) {
      console.error('Error fetching role:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  async update(req, res) {
    try {
      const id = req.params.id;
      const { name, access } = req.body;

      if (!name && !access) {
        return res.status(400).json({ message: 'At least one of name or access should be provided to update' });
      }

      const role = await Role.findByPk(id);
      if (!role) {
        return res.status(404).json({ message: 'Role not found' });
      }

      if (name) role.name = name;
      if (access) {
        if (!Array.isArray(access)) {
          return res.status(400).json({ message: 'Access must be an array' });
        }
        role.access = access;
      }

      await role.save();

      return res.status(200).json(role);
    } catch (error) {
      console.error('Error updating role:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  async deleteRole(req, res) {
    try {
      const id = req.params.id;
      const role = await Role.findByPk(id);

      if (!role) {
        return res.status(404).json({ message: 'Role not found' });
      }

      await role.destroy();

      return res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error) {
      console.error('Error deleting role:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};
