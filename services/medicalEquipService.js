const medicalEquip = require('../database/medicalEquip');

const findMedicalEquip = async () => {
    return await medicalEquip.findMedicalEquip();
};

const findMedicalEquipExpire = async () => {
    return await medicalEquip.findMedicalEquipExpire();
};

const createMedicalEquip = async (data) => {
    return await medicalEquip.createMedicalEquip(data);
};

const removeMedicalEquip = async (data) => {
    return await medicalEquip.removeMedicalEquip(data);
};

const checkExistMedicalEquip = async (data) =>{
    return await medicalEquip.checkExistMedicalEquip(data);
}


module.exports = {
    findMedicalEquip,
    findMedicalEquipExpire,
    createMedicalEquip,
    removeMedicalEquip,
    checkExistMedicalEquip
}