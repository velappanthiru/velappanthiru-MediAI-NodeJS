'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('patient_records', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      patientName: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      hospitalNo: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
      },
      mobile: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      gender: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      assignedToDoctor: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      records: {
        type: Sequelize.JSON,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('patient_records');
  }
};
