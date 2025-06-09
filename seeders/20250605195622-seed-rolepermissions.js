'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Get the menu entries inserted via the menu seed
    const [menus] = await queryInterface.sequelize.query(
      `SELECT id, path FROM menus WHERE path IN (
        '/dashboard', '/chatbot', '/book-list', '/user', '/patient-details',
        '/questions', '/lesson-plan', '/reports', '/role-and-permission'
      )`
    );

    const roleId = 1; // You can dynamically fetch role ID if needed
    const rolePermissions = menus.map(menu => ({
      roleId,
      menuId: menu.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('rolepermissions', rolePermissions, {});
  },

  async down(queryInterface, Sequelize) {
    const roleId = 1;

    // Clean up only entries for this role ID and matching paths
    await queryInterface.sequelize.query(`
      DELETE rp FROM rolepermissions rp
      INNER JOIN menus m ON rp.menuId = m.id
      WHERE rp.roleId = ${roleId} AND m.path IN (
        '/dashboard', '/chatbot', '/book-list', '/user', '/patient-details',
        '/questions', '/lesson-plan', '/reports', '/role-and-permission'
      )
    `);
  },
};
