'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('exams', [
      {
        exam_name: 'Math Final',
        book_name: 'Grade 10 Math',
        date: new Date('2025-06-01'),
        duration: '90 mins',
        total_questions: '20',
        marks_per_question: '5',
        total_marks: '100',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('exams', null, {});
  }
};
