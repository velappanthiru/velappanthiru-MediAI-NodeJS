'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    static associate(models) {
      // Define associations here if needed
      // For example, if Menu belongs to Role or other models
    }
  }

  Menu.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      menu: {
        type: DataTypes.STRING,
        allowNull: false
      },
      permission: {
        type: DataTypes.TEXT, // Store JSON array as string
        allowNull: false,
        get() {
          const raw = this.getDataValue('permission');
          try {
            return raw ? JSON.parse(raw) : [];
          } catch {
            return [];
          }
        },
        set(value) {
          this.setDataValue('permission', JSON.stringify(value));
        }
      },
    },
    {
      sequelize,
      modelName: 'Menu',
      tableName: 'menus',
      timestamps: true
    }
  );

  return Menu;
};
