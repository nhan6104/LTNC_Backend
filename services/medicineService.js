const medicine = require('../database/medicine');

const findMedicines = async () => {
    return await medicine.findMedicines();
};

const findMedicinesExpire = async () => {
    return await medicine.findMedicinesExpire();
};

const createMedicine = async (data) => {
    return await medicine.createMedicine(data);
};

const createMedicineInTotal = async (medicineData) => {
    return await medicine.createMedicineInTotal(medicineData);
};

const removeMedicine = async (medicineID) => {
    return await medicine.removeMedicine(medicineID);
};
  
const checkExistMedicine = async (data) => { 
    return await medicine.checkExistMedicine(data);
};

const detailMedicine = async (medicineID) => {
    const medicines = await medicine.findMedicines();
  
    const medicineDetail = medicines.filter(t => t.id === medicineID);
    return medicineDetail;
};






module.exports = {
    findMedicines,
    findMedicinesExpire,
    createMedicine,
    createMedicineInTotal,
    removeMedicine,
    checkExistMedicine,
    detailMedicine
}