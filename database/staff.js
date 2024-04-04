const dbUtils = require('../lib/dbUtils');

const collectionName = "staff";


// const doctor = firestore.database().collection('staff').collection('doctor')
const createNewStaff = async (data) => {
    const documentID = data.cccd;
    
    const result = await dbUtils.insert(data, collectionName, documentID);
    return result;
};


const checkExistStaff = async (data) => {
    const documentID = data;
  
    const result = await dbUtils.checkExist(collectionName , documentID);
    return result;
};
const removeStaff = async (data) => {
    const documentID = data;
    staff = "doctor"
    const result = await dbUtils.removeStaff(collectionName , documentID , staff);
    return result;
}

module.exports = {
    createNewStaff,
    checkExistStaff,
    removeStaff,
}

