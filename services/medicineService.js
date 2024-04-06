const medicine = require('../database/medicine');

const findMedicines = async () => {
  return await medicine.findMedicines();
};

module.exports = {
    findMedicines
}
