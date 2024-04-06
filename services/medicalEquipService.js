const medicalEquip = require('../database/medicalEquip');

const findMedicalEquip = async () => {
    return await medicalEquip.findMedicalEquip();
};

module.exports = {
    findMedicalEquip
}