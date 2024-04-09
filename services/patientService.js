const patient = require('../database/patient');

const createPatient = async (data, ref) => {
  return await patient.createNewPatient(data, ref);
};

const findPatientByID = async (patientID) => {
  return await patient.findPatientByID(patientID);
}

const checkExistPatient = async (data) => { 
  return await patient.checkExistPatient(data);
}

const checkExistRecords = async (patientID, recordsDate) => { 
  return await patient.checkExistRecords(patientID, recordsDate);
}

const createRecords = async (dataRecords) => {
  return await patient.createNewRecords(dataRecords);
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

const removePatientByPath = async (path) => {
  return await patient.removePatientByPath(path);
}

const removeRecords = async (patientID, recordsDate) => {
  return await patient.removeRecords(patientID, recordsDate);
}

const creatPatientInTotal = async (patientData) => {
  return await patient.createNewPatientInTotal(patientData);
}

const createRecordsInHistory = async (historyData, ref) => {
  return await patient.createNewRecordsInHistory(historyData, ref);
}

const findPatients = async () => {
  return await patient.findPatients();
}

const findHistory = async (ref) => {
  return await patient.findHistory(ref);
}

const updatePatientInTotal = async (patientData) => {
  return await patient.updateNewPatientInTotal();
}

const removeRecordsByPath = async (path) => {
  return await patient.removeRecordsByPath(path);
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
  removeRecords,
  creatPatientInTotal,
  findPatients,
  checkExistRecords,
  updatePatientInTotal,
  removePatientByPath,
  removeRecordsByPath,
  findHistory,
  createRecordsInHistory
}



// createRecords(dataPatient, dataRecords);

// patient.removeRecords('077204456789', '003');

// const func = async ()=>{
//   const checkingPatient = await checkExistPatient('077204456789');
            
//   if (checkingPatient) {
//       console.log("ko tt")
//   }
// }
// func();

// createPatient(dataPatient);

// patient.updatePatient(dataPatient._id, dataPatient);

// console.log(patient.findMedicalHistoryByID('077204456123'));

// createPatient(dataPatient);
// createRecords(dataPatient, dataRecords)