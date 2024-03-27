const patient = require('../database/patient');

const createPatient = async (data) => {
  return await patient.createNewPatient(data);
};

module.exports = {
  createPatient,
}