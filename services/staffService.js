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
const findDoctor = async () => {
  return await staff.findDoctor();
}

const updateDoctorInTotal = async (data) => {
  return await staff.UpdateDoctorInTotal(data)
};

const signupAccount = async (email, password) => {
  return await staff.signupAccount(email, password);
};
const updateStaff = async (newdata, id) => {
  return await staff.updateStaffdatabase(newdata,id);
}

module.exports = {
  createStaff,
  checkExistStaff,
  findDoctor,
  removeStaff,
  createStaffInTotal,
  detailStaff,
  jobDoctor,
  updateDoctorInTotal,
  signupAccount,
  updateStaff,
}