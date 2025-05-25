'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('options', [
      { question_id: 1, text: '3', is_correct: false, createdAt: new Date(), updatedAt: new Date() },
      { question_id: 1, text: '4', is_correct: true, createdAt: new Date(), updatedAt: new Date() },
      { question_id: 1, text: '5', is_correct: false, createdAt: new Date(), updatedAt: new Date() },

      { question_id: 2, text: 'London', is_correct: false, createdAt: new Date(), updatedAt: new Date() },
      { question_id: 2, text: 'Berlin', is_correct: false, createdAt: new Date(), updatedAt: new Date() },
      { question_id: 2, text: 'Paris', is_correct: true, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('options', {
      question_id: [1, 2],
    });
  },
};
