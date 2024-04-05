const { x } = require('joi');
const patient = require('../database/patient');
const dbUtils = require('../lib/dbUtils')

const createPatient = async (data) => {
  return await patient.createNewPatient(data);
};

const findPatientByID = async (patientID) => {
  return await patient.findPatientByID(patientID);
}

const checkExistPatient = async (data) => { 
  return await patient.checkExistPatient(data);
}

const createRecords = async (dataPatient, dataRecords) => {
  return await patient.createNewRecords(dataPatient, dataRecords);
};

const findRecordsByDate = async (patientID, recordsDate) => {
  return await patient.findRecordsByDate(patientID, recordsDate);
}

const treatmentProcessByID = async (patientID) => {
  return await patient.treatmentProcessByID(patientID);
}

const updatePatientData = async (newDataPatient) => {
  return await patient.updatePatientData(newDataPatient);
}

const removePatient = async (patientID) => {
  return await patient.removePatient(patientID);
}

const removeRecords = async (patientID, recordsDate) => {
  return await patient.removeRecords(patientID, recordsDate);
}

module.exports = {
  createPatient,
  checkExistPatient,
  createRecords,
  findPatientByID,
  findRecordsByDate,
  treatmentProcessByID,
  updatePatientData,
  removePatient,
  removeRecords
}

const dataPatient = {
  gender: 'Male',
  name: 'Tan Phat',
  date_of_birth: '2004-1-1',
  phoneNumber: '0987654321',
  medicalHistory: [
    { name: 'cough', process: 'completed' },
    { name : 'cancer', process: 'being treated' }
],
  address: { province: 'def', city: 'xyz', street: 'abc' }, // Corrected 'adress' to 'address'
  cccd: '077204456123'
};

const dataRecords = 
{
  date: '2024-07-04',
  description: 'description',
  prescription: [
    { dosage: { morning : 2, noon : 1, night : 2}, quantity: 25, medicine: 'Medicine 3' },
    { dosage: { morning : 2, noon : 2, night: 2 }, quantity: 30, medicine: 'Medicine 4' }
  ],
  testResult: [
    { result: 'Normal', testName: 'Test 3' },
    { result: 'Positive', testName: 'Test 4' }
  ],
  diagnosis: 'Sick 1',
}




// createRecords(dataPatient, dataRecords);

// patient.removeRecords('077204456789', '003');

const func = async ()=>{
  const checkingPatient = await checkExistPatient('077204456789');
            
  if (checkingPatient) {
      console.log("ko tt")
  }
}
func();

// createPatient(dataPatient);

// patient.updatePatient(dataPatient._id, dataPatient);

// console.log(patient.findMedicalHistoryByID('077204456123'));

// createPatient(dataPatient);
// createRecords(dataPatient, dataRecords)