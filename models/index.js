"use strict";

require("dotenv").config(); // Load environment variables
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, "../config/config.js"))[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// ✅ Check and create database if it doesn't exist
async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");

    // Create the database if it does not exist
    await sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${config.database}\`;`);
    console.log(`✅ Database "${config.database}" is ready.`);
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    process.exit(1); // Stop execution on error
  }
}

// ✅ Load models dynamically
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

console.log("✅ Loaded models:", Object.keys(db)); // Debugging log

// ✅ Apply model associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// ✅ Initialize and check database
initializeDatabase();

module.exports = db;
