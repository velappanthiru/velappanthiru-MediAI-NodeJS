'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate(models) {
      Question.belongsTo(models.Exam, {
        foreignKey: 'exam_id',
        as: 'exam',
      });
      Question.hasMany(models.Option, {
        foreignKey: 'question_id',
        as: 'options',
        onDelete: 'CASCADE',
      });
    }
  }

  Question.init({
    exam_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'exams',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    question_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ai_option: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'Question',
    tableName: 'questions',
    timestamps: true,
  });

  return Question;
};
