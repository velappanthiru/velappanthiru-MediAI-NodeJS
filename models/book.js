"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      // Define associations if needed
    }
  }

  Book.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      bookName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure book name is unique
      },
      authorName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      publisher: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      edition: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      publishDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      bookFile: {
        type: DataTypes.STRING, // Storing file path
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true, // Set default value to true
      },
    },
    {
      sequelize,
      modelName: "Book", // Model name remains `Book`
      tableName: "book",  // Explicitly set table name to `book`
      timestamps: true,
    }
  );

  return Book;
};
