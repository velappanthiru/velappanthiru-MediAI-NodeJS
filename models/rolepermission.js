'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RolePermission extends Model {
    static associate(models) {
      RolePermission.belongsTo(models.Role, { foreignKey: 'roleId' });
      RolePermission.belongsTo(models.Menu, { foreignKey: 'menuId' });
    }
  }
  RolePermission.init(
    {
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      menuId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'RolePermission',
      tableName: 'rolepermissions',
    }
  );
  return RolePermission;
};
