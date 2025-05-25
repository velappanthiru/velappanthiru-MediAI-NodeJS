'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PatientRecord extends Model {
    static associate(models) {
      // Define associations here if needed
      // For example, if you have a Doctor model:
      // PatientRecord.belongsTo(models.Doctor, {
      //   foreignKey: 'doctorId',
      //   as: 'doctor'
      // });
    }
  }

  PatientRecord.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      patientName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      hospitalNo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      mobile: {
        type: DataTypes.STRING,
        allowNull: false
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false
      },
      assignedToDoctor: {
        type: DataTypes.STRING,
        allowNull: true
      },
       records: {
        type: DataTypes.JSON,
        allowNull: true // Allow null for records
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    },
    {
      sequelize,
      modelName: 'PatientRecord',
      tableName: 'patient_records',
      timestamps: true,
      updatedAt: false
    }
  );

  return PatientRecord;
};
