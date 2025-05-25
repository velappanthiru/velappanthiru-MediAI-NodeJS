'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('medi@super', 10); // Hash the password

    return queryInterface.bulkInsert('user', [ // Fixed table name
      {
        id: 1, // Ensure this ID does not conflict with existing records
        username: 'super@example.com',
        emailid: 'super@example.com',
        password: hashedPassword, // Store hashed password
        mobilenum: '1234567890',
        roleId: 1, // Assuming roleId 1 is for Super Admin
        isPasswordSet: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('user', { username: 'admin' }, {}); // Fixed table name
  }
};
