'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.hasMany(models.User, {
        foreignKey: 'roleId',
        as: 'users'
      });
    }
  }

  Role.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
      // ⛔ Remove createdAt — Sequelize will add it
    },
    {
      sequelize,
      modelName: 'Role',
      tableName: 'roles', // ✅ Matches your migration
      timestamps: true,   // ✅ Enables createdAt & updatedAt automatically
    }
  );

  return Role;
};
