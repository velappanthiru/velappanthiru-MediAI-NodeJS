require("dotenv").config(); // Load environment variables

const requiredEnvVars = [
  "DB_USERNAME",
  "DB_PASSWORD",
  "DB_NAME",
  "DB_HOST",
  "DB_PORT",
  "DB_DIALECT",
];

// ✅ Check if required environment variables are missing
// requiredEnvVars.forEach((varName) => {
//   if (!process.env[varName]) {
//     console.error(`❌ Missing environment variable: ${varName}`);
//     process.exit(1); // Exit the process if a required variable is missing
//   }
// });

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || "database_development",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306, // Ensure default MySQL port
    dialect: process.env.DB_DIALECT || "mysql",
    dialectOptions: {
      connectTimeout: 60000, // 60 seconds timeout
    },
    logging: console.log, // Enable query logging for debugging
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD || null,
    database: "database_test",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_DIALECT || "mysql",
    dialectOptions: {
      connectTimeout: 60000,
    },
    logging: false, // Disable logging in tests
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || "database_production",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_DIALECT || "mysql",
    dialectOptions: {
      connectTimeout: 60000,
    },
    logging: false, // Disable logging for performance
  },
};
