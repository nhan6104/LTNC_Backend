const patient = require('../database/patient');

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

const creatPatientInTotal = async (patientData) => {
  return await patient.createNewPatientInTotal(patientData);
}

const findPatiens = async () => {
  return await patient.findPatients();
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
  findPatiens
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