const dbUtils = require('../lib/dbUtils');

const collectionName = "patient";
const subcollectionName = "medicalRecords"
const collectiontotal = "staff";

const createNewPatient = async (dataPatient) => {
  const documentID = dataPatient.cccd;
  console.log(documentID)
  const result = await dbUtils.insert(dataPatient, collectionName, documentID);
  return result;
};

const createNewPatientInTotal = async (dataPatient) => {
  // console.log(documentID)

  const result = await dbUtils.add(dataPatient, collectiontotal, collectionName);
  return result;
};

const updatePatientData = async (newDataPatient) => {
  const documentID = newDataPatient.cccd;
  // console.log(documentID)
  const result = await dbUtils.update(newDataPatient, collectionName, documentID);
  return result;
}

const findPatientByID = async (patientID) => {
  const result = await dbUtils.findOne(collectionName, patientID);
  return result;
}

const findPatients = async () => {
  const result = await dbUtils.findOne(collectiontotal, collectionName);
  return result;
}

const removePatient = async (patientID) => {
  return dbUtils.erase(collectionName, patientID);
}

const checkExistPatient = async (data) => {
  const documentID = data;
  // console.log(documentID)
  const result = await dbUtils.findOne(collectionName, documentID);
  return result;
};

const createNewRecords = async (dataRecords) => {
  const documentID = dataRecords.cccd;
  const subdocumentID = dataRecords.date;
  // console.log(documentID + " " + subdocumentID);
  result = await dbUtils.insert(dataRecords, collectionName, documentID, subcollectionName, subdocumentID);
  // console.log(result);
  return result;
}

const removeRecords = async (patientID, recordsDate) => {
    return await dbUtils.erase(collectionName, patientID, subcollectionName, recordsDate);
};

const checkExistRecords = async (patientID, recordsDate) => {
  const documentID = patientID;
  const subDocumentID = recordsDate;
  // console.log(documentID)
  const result = await dbUtils.findOne(collectionName, documentID, subcollectionName, subDocumentID);
  return result;
};

const findRecordsByDate = async (patientID, recordsDate) => {
  const result = await dbUtils.findOne(collectionName, patientID, subcollectionName, recordsDate);
  return result;
}

const treatmentProcessByID = async (patientID) => {
  const result = await dbUtils.findOne(collectionName, patientID);
  console.log(result.medicalHistory);
  return result.medicalHistory;
}

module.exports = {
  createNewPatient,
  checkExistPatient,
  createNewRecords,
  updatePatientData,
  removePatient,
  removeRecords,
  findPatientByID,
  findRecordsByDate,
  treatmentProcessByID,
  createNewPatientInTotal,
  findPatients,
  checkExistRecords
}

