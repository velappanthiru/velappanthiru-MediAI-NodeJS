"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("book", { // Change table name to `book`
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      bookName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // Ensuring book name is unique
      },
      authorName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      publisher: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      edition: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      publishDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      bookFile: {
        type: Sequelize.STRING, // Storing file path
        allowNull: false,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true, // Set default value to true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("book"); // Drop `book` table if rollback happens
  },
};
