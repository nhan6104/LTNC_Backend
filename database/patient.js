const dbUtils = require('../lib/dbUtils');
const collectionName = "patient";
const subcollectionName = "medicalRecords"
const collectiontotal = "staff";


const createNewPatient = async (dataPatient, ref) => {
  // const documentID = dataPatient.cccd;
  // console.log(documentID)
  const result = await dbUtils.insertPath(dataPatient, ref);
  return result;
};

const createNewPatientInTotal = async (dataPatient) => {
  // console.log(documentID)

  const result = await dbUtils.add(dataPatient, collectiontotal, collectionName);
  return result;
};

const createNewRecordsInHistory = async (data, ref) => {
  const result = await dbUtils.add(data, collectionName, ref);
  return result;
}

const updateNewPatientInTotal = async (dataPatient) => {
  // console.log(documentID)

  const result = await dbUtils.update(dataPatient, collectiontotal, collectionName);
  return result;
};

const updatePatientData = async (newDataPatient, patientID) => {
  const documentID = patientID;
  // console.log(documentID)
  const result = await dbUtils.update(newDataPatient, collectionName, documentID);
  return result;
}

const findPatientByID = async (patientID) => {
  const result = await dbUtils.findOne(collectionName, patientID);
  return result;
}

const findPatientByPath = async (path) => {
  const result = await dbUtils.findOnePath(path);
  return result;
}

const findPatients = async () => {
  const result = await dbUtils.findOne(collectiontotal, collectionName);
  return result;
}

const findHistory = async (ref) => {
  const history = await dbUtils.findOne(collectionName, ref);
  return history;
}

const removePatient = async (patientID) => {
  return await dbUtils.erase(collectionName, patientID);
}

const removePatientByPath = async (ref) => {
  return dbUtils.erasePath(ref);
}

const removeRecordsByPath = async (ref) => {
  return dbUtils.erasePath(ref);
}

const checkExistPatient = async (data) => {
  const documentID = data;
  // console.log(documentID)
  const result = await dbUtils.findOne(collectionName, documentID);
  return result;
};

const createNewRecords = async (dataRecords, patientID) => {
  const documentID = patientID;
  const subdocumentID = dataRecords.date.replace(/-/g, '');
  // console.log(documentID + " " + subdocumentID);
  const result = await dbUtils.insert(dataRecords, collectionName, documentID, subcollectionName, subdocumentID);
  console.log(result);
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

const createPatientInRealtimeDb = async (info) => {
    const ref = `Faculty/${info.faculty}/${info.DBIdBytime}`;
    await dbUtils.setRealtimeDb(ref, info);
};

const getAllPatientInRealtimeDb = async (info) => {
  const ref = `Faculty/${info.faculty}`;
  const result = await dbUtils.getRealtimeDb(ref);
  return result;
};

const removePatientInRealtimeDb = async (info) => {
  const ref = `Faculty/${info.faculty}/${info.DBIdBytime}`;
  await dbUtils.removeRealtimeDb(ref);
};

module.exports = {
  createNewPatient,
  updateNewPatientInTotal,
  checkExistPatient,
  createNewRecords,
  updatePatientData,
  removePatient,
  removePatientByPath,
  removeRecords,
  findPatientByID,
  findRecordsByDate,
  treatmentProcessByID,
  createNewPatientInTotal,
  findPatients,
  checkExistRecords,
  findHistory,
  createNewRecordsInHistory,
  removeRecordsByPath,
  findPatientByPath,
  createPatientInRealtimeDb,
  getAllPatientInRealtimeDb,
  removePatientInRealtimeDb
}

