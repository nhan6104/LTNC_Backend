const dbUtils = require('../lib/dbUtils');

const collectionName = "MedicalEquipment";

const findMedicalEquip = async () => {
    const result = await dbUtils.findAll(collectionName);
    return result;
}

module.exports = {
    findMedicalEquip
}
