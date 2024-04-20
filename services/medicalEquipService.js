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

const createMedicalEquipInTotal = async (medicalEquipData) => {
    return await medicalEquip.createMedicalEquipInTotal(medicalEquipData);
};


const removeMedicalEquip = async (medicalEquipID) => {
    return await medicalEquip.removeMedicalEquip(medicalEquipID);
};
  
const checkExistMedicalEquip = async (data) => { 
    return await medicalEquip.checkExistMedicalEquip(data);
};

const detailMedicalEquip = async (medicalEquipID) => {
    const medicalEquips = await medicalEquip.findMedicalEquip();
    const medicalEquipDetail = medicalEquips.filter(t => t.id === medicalEquipID);
    return medicalEquipDetail;
};

const updateMedicalEquip = async (data, medicineID) => {
    return await medicalEquip.updateMedicalEquip(data, medicineID);
};

const findMedicalEquipToTal = async() => {
    return await medicalEquip.findMedicalEquipToTal();
};

const removeMedicalEquipByPath = async (path) => {
    return await medicalEquip.removeMedicalEquipByPath(path);
};



module.exports = {
    findMedicalEquip,
    findMedicalEquipExpire,
    createMedicalEquip,
    createMedicalEquipInTotal,
    removeMedicalEquip,
    checkExistMedicalEquip,
    detailMedicalEquip,
    updateMedicalEquip,
    findMedicalEquipToTal,
    removeMedicalEquipByPath
}