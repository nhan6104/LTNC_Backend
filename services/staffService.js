const staff = require('../database/staff');

const createStaff = async (doctorID) => {
  return await staff.createNewStaff(doctorID);
};

const checkExistStaff = async (doctorID) => { 
  return await staff.checkExistStaff(doctorID);
}
const removeStaff = async (doctorID) => {
  return await staff.removeStaff(doctorID);
}
const createStaffInTotal = async (doctorID) => {
  return await staff.createNewStaffInTotal(doctorID);
}
const detailStaff = async (doctorID) => {
  return await staff.detailOfStaff(doctorID);
}
const jobDoctor = async (doctorID) => {
  return await staff.jobOfStaff(doctorID);
}
const findPatiens = async () => {
  return await staff.findPatients();
}
module.exports = {
  createStaff,
  checkExistStaff,
  findPatiens,
  removeStaff,
  createStaffInTotal,
  detailStaff,
  jobDoctor,
}