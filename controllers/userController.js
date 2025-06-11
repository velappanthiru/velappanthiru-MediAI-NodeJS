const catchAsync = require('../middleware/catchAsync');
const { User, Role } = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { createJwtToken } = require('../utils/jwtHelper');
const generatePassword = require('../utils/commonFunctions');


// Get all roles - /api/roles
const getAllRoles = catchAsync(async (req, res, next) => {
  const roles = await Role.findAll();

  res.status(200).json({
    statusCode: 200,
    data: roles,
  });
});

const createRole = async (req, res) => {
  try {
    const { name } = req.body;

    // Validate input
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({
        statusCode: 400,
        error: 'Role name is required and must be a non-empty string',
      });
    }

    // Check if role already exists
    const existingRole = await Role.findOne({ where: { name: name.trim() } });

    if (existingRole) {
      return res.status(409).json({
        statusCode: 409,
        error: 'Role already exists',
      });
    }

    // Create new role
    const role = await Role.create({ name: name.trim() });

    return res.status(201).json({
      statusCode: 201,
      message: 'Role created successfully',
      data: role,
    });
  } catch (err) {
    console.error('Error creating role:', err);
    return res.status(500).json({
      statusCode: 500,
      error: 'Internal Server Error',
    });
  }
};


// Get all users - /api/users
const getAllUsers = catchAsync(async (req, res, next) => {
  try {
    const users = await User.findAll({
      where: { roleId: { [Op.ne]: 1 } }, // Exclude Admins
      attributes: { exclude: ["password"] } // Hide passwords
    });

    res.status(200).json({
      statusCode: 200,
      data: users
    });

  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      statusCode: 500,
      error: "Internal server error"
    });
  }
})


// login api - /api/login
const loginUser = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  // Check if user exists by email
  const user = await User.findOne({
    where: { emailid: username }, // Only check by emailid
  });

  if (!user) {
    return res.status(400).json({
      statusCode: 400,
      data: { message: "Invalid email address" }, // Adjusted message
    });
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(500).json({
      statusCode: 500,
      data: { message: "Invalid password" },
    });
  }

  // Generate JWT token
  const token = createJwtToken(user.username);

  // Send response with required details in the desired format
  return res.json({
    statusCode: 200,
    data: {
      username: user.username,
      email: user.emailid,
      mobileNumber: user.mobilenum,
      isPasswordSet: user.isPasswordSet,
      role: user.roleId,
      token,
    },
  });
});

const registerUser = catchAsync(async (req, res, next) => {
  const { name, emailid, mobilenum, role } = req.body;

  // Validate required fields
  if (!name || !emailid || !mobilenum || !role) {
    return res.status(400).json({
      statusCode: 400,
      data: { message: "All fields (name, email, mobile number, role) are required." }
    });
  }

  try {
    // Generate username and password
    const username = name;
    const password = generatePassword(emailid);
    const hashedPassword = await bcrypt.hash(password, 10);

    // Find roleId by matching role name
    const roleData = await Role.findOne({ where: { name: role } });
    if (!roleData) {
      return res.status(400).json({
        statusCode: 400,
        data: { message: "Invalid role" }
      });
    }

    // Create new user entry
    const newUser = await User.create({
      username,
      password: hashedPassword,
      emailid,
      mobilenum,
      roleId: roleData.id,
      isPasswordSet: false
    });

    // Return success response
    return res.status(201).json({
      statusCode: 201,
      data: {
        userId: newUser.id,
        username: newUser.username,
        email: newUser.emailid,
        mobileNumber: newUser.mobilenum,
        role: roleData.name,
        isPasswordSet: newUser.isPasswordSet
      }
    });
  } catch (error) {
    console.error("Registration error:", error);  // Log the error details for debugging

    // Check if the error is a unique constraint violation (duplicate email)
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        statusCode: 400,
        data: { message: `Email address ${emailid} or ${name} is already taken.` }
      });
    }

    // Handle other unexpected errors
    return res.status(500).json({
      status: "error",
      message: "Something went wrong. Please try again later."
    });
  }
});

const changePassword = catchAsync(async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = req.user; // Retrieved from middleware


    // Validate input
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ statusCode: 400, message: "Old and new passwords are required." });
    }

    // Compare old password with stored hash
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(500).json({ statusCode: 500, message: "Incorrect old password." });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password in DB
    await user.update({ password: hashedPassword, isPasswordSet: true });

    return res.json({ statusCode: 200, message: "Password changed successfully." });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ statusCode: 500, message: "Internal server error." });
  }
});

// Get User Profile - /api/userme
const getUserProfile = catchAsync(async (req,res,next) => {
 try {
  const { id } = req.user;
  const user = await User.findOne({ where: { id } });
  if (!user) {
    return next(new ErrorHandler('Something went wrong, Please try again later.'), 500);
  }

  res.status(200).json({
    success: true,
    data: user
  })
 } catch (error) {
  console.log(error);
 }
})

module.exports = {
  getAllRoles,
  createRole,
  getAllUsers,
  loginUser,
  registerUser,
  changePassword,
  getUserProfile
}
