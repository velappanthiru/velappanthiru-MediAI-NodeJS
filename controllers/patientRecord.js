'use strict';

const { PatientRecord } = require('../models'); // Adjust the path if necessary

module.exports = {
  async create(req, res) {
    try {
      const { patientName, hospitalNo, mobile, gender, assignedToDoctor, records } = req.body;

      if (!patientName || !hospitalNo || !mobile || !gender) {
        return res.status(400).json({ message: 'Invalid input: patientName, hospitalNo, mobile, and gender are required' });
      }

      // Create the patient record
      const newPatientRecord = await PatientRecord.create({
        patientName,
        hospitalNo,
        mobile,
        gender,
        assignedToDoctor,
        records // Include records field
      });

      return res.status(201).json(newPatientRecord);
    } catch (error) {
      console.error('Error creating patient record:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  async get(req, res) {
    try {
      const patientRecords = await PatientRecord.findAll();
      return res.status(200).json(patientRecords);
    } catch (error) {
      console.error('Error fetching patient records:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  async getById(req, res) {
    try {
      const id = req.params.id;
      const patientRecord = await PatientRecord.findByPk(id);

      if (!patientRecord) {
        return res.status(404).json({ message: 'Patient record not found' });
      }

      return res.status(200).json(patientRecord);
    } catch (error) {
      console.error('Error fetching patient record:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  async update(req, res) {
    try {
      const id = req.params.id;
      const { patientName, hospitalNo, mobile, gender, assignedToDoctor, records } = req.body;

      const patientRecord = await PatientRecord.findByPk(id);
      if (!patientRecord) {
        return res.status(404).json({ message: 'Patient record not found' });
      }

      if (patientName) patientRecord.patientName = patientName;
      if (hospitalNo) patientRecord.hospitalNo = hospitalNo;
      if (mobile) patientRecord.mobile = mobile;
      if (gender) patientRecord.gender = gender;
      if (assignedToDoctor) patientRecord.assignedToDoctor = assignedToDoctor;
      if (records !== undefined) patientRecord.records = records; // Allow null for records

      await patientRecord.save();

      return res.status(200).json(patientRecord);
    } catch (error) {
      console.error('Error updating patient record:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  async deleteRecord(req, res) {
    try {
      const id = req.params.id;
      const patientRecord = await PatientRecord.findByPk(id);

      if (!patientRecord) {
        return res.status(404).json({ message: 'Patient record not found' });
      }

      await patientRecord.destroy();

      return res.status(200).json({ message: 'Patient record deleted successfully' });
    } catch (error) {
      console.error('Error deleting patient record:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};
