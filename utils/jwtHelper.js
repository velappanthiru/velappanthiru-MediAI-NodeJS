const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env; // Use your secret key

const EXPIRATION_TIME = "1y"; // Token valid for 1 hour

// Function to generate JWT token
const createJwtToken = (username) => {
  return jwt.sign({ username }, JWT_SECRET, { expiresIn: EXPIRATION_TIME });
};

module.exports = { createJwtToken };
