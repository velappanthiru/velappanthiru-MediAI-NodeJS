'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Exam extends Model {
    static associate(models) {
      // An Exam has many Questions
      Exam.hasMany(models.Question, {
        foreignKey: 'exam_id',
        as: 'questions',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  Exam.init({
    exam_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    book_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_questions: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    marks_per_question: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    total_marks: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Exam',
    tableName: 'exams',
    timestamps: true,
  });

  return Exam;
};
