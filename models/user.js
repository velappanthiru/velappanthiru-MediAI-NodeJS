'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     */
    static associate(models) {
      // User belongs to Role
      User.belongsTo(models.Role, {
        foreignKey: 'roleId', // Foreign key in User table
        as: 'role' // Alias for association
      });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      mobilenum: {
        type: DataTypes.STRING,
        allowNull: true
      },
      emailid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true // Ensures valid email format
        }
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'role', // Corrected table name (previously was 'roles')
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      isPasswordSet: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'user', // Explicit table name should match the migration
      timestamps: true // Enable createdAt and updatedAt fields
    }
  );

  return User;
};
