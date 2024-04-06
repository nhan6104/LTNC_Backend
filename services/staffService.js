const staff = require('../database/staff');

const createStaff = async (data) => {
  return await staff.createNewStaff(data);
};

const checkExistStaff = async (data) => { 
  return await staff.checkExistStaff(data);
}
const removeStaff = async (data) => {
  return await staff.removeStaff(data);
}

module.exports = {
  createStaff,
  checkExistStaff,
  removeStaff,
}