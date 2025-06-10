'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('menus', [
      {
        title: 'Dashboard',
        path: '/dashboard',
        icon: 'MdOutlineDashboard',
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Chat Bot',
        path: '/chatbot',
        icon: 'IoChatboxEllipsesOutline',
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Book List',
        path: '/book-list',
        icon: 'LuBookUp',
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Users',
        path: '/user',
        icon: 'PiUsers', // SVG based, so use a custom identifier
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Patient 360',
        path: '/patient-details',
        icon: 'MdMedicalServices',
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Exam Questions',
        path: '/questions',
        icon: 'PiExam',
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Lesson Plan',
        path: '/lesson-plan',
        icon: 'MdOutlineLibraryBooks',
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Reports',
        path: '/reports',
        icon: 'MdReportGmailerrorred',
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Role and Permission',
        path: '/role-and-permission',
        icon: 'MdSecurity',
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('menus', null, {});
  },
};
