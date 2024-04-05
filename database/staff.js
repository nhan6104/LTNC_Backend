const dbUtils = require('../lib/dbUtils');

const collectionName = "staff";


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
const removeStaff = async (data , type) => {
    const documentID = data;
    type = "";
    const result = await dbUtils.removeStaff(collectionName , documentID , type);
    return result;
}


module.exports = {
    createNewStaff,
    checkExistStaff,
    removeStaff,
}

