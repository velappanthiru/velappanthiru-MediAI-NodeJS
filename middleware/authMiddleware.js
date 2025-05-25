const jwt = require("jsonwebtoken");
const { User } = require("../models");
const ErrorHandler = require("../utils/errorHandler");
const { JWT_SECRET } = process.env; // Use your secret key

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1]; // Get token from headers
    if (!token) {
      return res.status(401).json({ statusCode: 401, data: { message: "Please log in to access this resource." } });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ where: { username: decoded.username } });

    if (!user) {
      return res.status(401).json({ statusCode: 401, data: { message: "Invalid token" } });
    }

    req.user = user; // Attach user data to request
    next(); // Proceed to next middleware
  } catch (error) {
    return res.status(401).json({ statusCode: 401, data: { message: "Token verification failed" } });
  }
};

const authorizeRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.roleId)) {
    return next(new ErrorHandler('This route is restricted to admins only.', 403));
  }
  next();
};


module.exports = {
  authenticateToken,
  authorizeRole
};
