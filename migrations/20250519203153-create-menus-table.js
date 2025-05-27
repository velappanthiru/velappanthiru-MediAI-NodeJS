'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('menus', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      key: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      menu: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      permission: {
        type: Sequelize.JSON, // Store array of roles
        allowNull: false,
        defaultValue: [],
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('menus');
  },
};
