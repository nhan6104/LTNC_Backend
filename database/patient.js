const dbUtils = require('../lib/dbUtils');

const collectionName = "patient";

const createNewPatient = async (data) => {
    const documentID = data.cccd;
    console.log(documentID)
    const result = await dbUtils.insert(data, collectionName, documentID);
    return result;
};

const checkExistPatient = async () => {
    const documentID = data;
    console.log(documentID)
    const result = await dbUtils.findOne(collectionName , documentID);
    return result;
};

module.exports = {
  createNewPatient,
  checkExistPatient,
}

