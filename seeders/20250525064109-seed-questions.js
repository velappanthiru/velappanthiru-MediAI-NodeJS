'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('questions', [
      {
        id: 1,
        exam_id: 1,
        question_text: 'What is 2 + 2?',
        ai_option: '4',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        exam_id: 1,
        question_text: 'What is the capital of France?',
        ai_option: 'Paris',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('questions', { exam_id: 1 });
  },
};
