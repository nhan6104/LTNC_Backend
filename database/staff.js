const dbUtils = require('../lib/dbUtils');

const collectionName = "doctor";
// const subcollectionName = "medicalRecords"
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

const removeStaff = async (path) => {
    return await dbUtils.erasePath(path);
};

const createNewStaffInTotal = async (doctorID) => {
    const result = await dbUtils.insert(doctorID, collectiontotal, collectionName);
    return result;
};

const detailOfStaff = async (path) => {
  const result = await dbUtils.findOnePath(path);
  return result;
}

const jobOfStaff = async (doctorID) => {
  const result = await dbUtils.findOne(collectionName, doctorID);
  return result.job;
}

const findDoctor = async () => {
  const result = await dbUtils.findOne(collectiontotal, collectionName);
  return result;
}

const UpdateDoctorInTotal = async (dataDoctor) => {
  // console.log(documentID)
  const result = await dbUtils.insert(dataDoctor, collectiontotal, collectionName);
  return result;
};


module.exports = {
    createNewStaff,
    checkExistStaff,
    findDoctor,
    removeStaff,
    createNewStaffInTotal,
    detailOfStaff,
    jobOfStaff,
    UpdateDoctorInTotal,
}
