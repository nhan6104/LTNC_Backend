const patient = require('../database/patient');

const createPatient = async (data) => {
  return await patient.createNewPatient(data);
};

const checkExistPatient = async (data) => { 
  return await patient.checkExistPatient(data);
}

module.exports = {
  createPatient,
  checkExistPatient,
}