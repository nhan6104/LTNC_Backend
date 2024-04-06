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
const createNewStaffInTotal = async (staff) => {
    const result = await dbUtils.insert(staff, collectiontotal, collectionName);
    return result;
  };

module.exports = {
    createNewStaff,
    checkExistStaff,
    removeStaff,
    createNewStaffInTotal,
}

