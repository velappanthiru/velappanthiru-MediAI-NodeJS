'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('menus', [
      {
        id: 1,
        key: "chat_bot",
        menu: "Chat bot",
        permission: JSON.stringify(["1", "2", "3", "4", "5"]), // super_admin, admin, user, staff, friends
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        key: "book_list",
        menu: "Book List",
        permission: JSON.stringify(["1", "2"]), // super_admin, admin
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        key: "user",
        menu: "User",
        permission: JSON.stringify(["1", "2"]), // super_admin, admin
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        key: "online_exam",
        menu: "Online Exam",
        permission: JSON.stringify(["1", "2"]), // super_admin, admin
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        key: "lesson_plan",
        menu: "Lesson Plan",
        permission: JSON.stringify(["1", "2"]), // super_admin, admin
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        key: "reports",
        menu: "Reports",
        permission: JSON.stringify(["1", "2"]), // super_admin, admin
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        key: "role_and_permission",
        menu: "Role and Permission",
        permission: JSON.stringify(["1", "2"]), // super_admin, admin
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        key: "patient_360",
        menu: "Patient 360",
        permission: JSON.stringify([1, 2, 3]), // super_admin, admin, user
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Delete specific records by their IDs to ensure clean removal
    await queryInterface.bulkDelete('menus', {
      id: [1, 2, 3, 4, 5, 6, 7, 8]
    }, {});
  }
};
