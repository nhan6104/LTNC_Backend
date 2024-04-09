const dbUtils = require('../lib/dbUtils');

const collectionName = "doctor";
const subcollectionName = "medicalRecords"
const collectiontotal = "staff";


const createNewStaff = async (data) => {
    const documentID = data.cccd;
    
    const result = await dbUtils.insert(data, collectionName, documentID);
    return result;
};


const checkExistStaff = async (data) => {
    const documentID = data;
    // console.log(documentID)
    const result = await dbUtils.findOne(collectionName, documentID);
    return result;
  };
const removeStaff = async (data) => {
    return dbUtils.erase(collectionName, data);
}
const createNewStaffInTotal = async (doctorID) => {
    const result = await dbUtils.insert(doctorID, collectiontotal, collectionName);
    return result;
  };
const detailOfStaff = async (doctorID) => {
  const result = await dbUtils.findOne(collectionName, doctorID);
  return result;
}
const jobOfStaff = async (doctorID) => {
  const result = await dbUtils.findOne(collectionName, doctorID);
  return result.job;
}


module.exports = {
    createNewStaff,
    checkExistStaff,
    removeStaff,
    createNewStaffInTotal,
    detailOfStaff,
    jobOfStaff,
}
