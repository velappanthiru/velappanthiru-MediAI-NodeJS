'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    static associate(models) {
      // Self-referencing parent-child relationship
      Menu.hasMany(models.Menu, {
        foreignKey: 'parentId',
        as: 'children',
      });

      Menu.belongsTo(models.Menu, {
        foreignKey: 'parentId',
        as: 'parent',
      });
    }
  }

  Menu.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      icon: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Menu',
      tableName: 'menus',
      timestamps: true,
    }
  );

  return Menu;
};
