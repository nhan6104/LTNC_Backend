const dbUtils = require('../lib/dbUtils');

const collectionName = "Medicines";

const findMedicines = async () => {
  const result = await dbUtils.findAll(collectionName);
  return result;
}

module.exports = {
  findMedicines
}

