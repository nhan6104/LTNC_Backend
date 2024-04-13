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

const removeMedicine = async (medicineID) => {
  return await medicine.removeMedicine(medicineID);
}

const checkExistMedicine = async (data) => { 
  return await medicine.checkExistMedicine(data);
}

const creatMedicineInTotal = async (medicineData) => {
  return await medicine.createNewMedicineInTotal(medicineData);
}

const detailMedicine = async (medicineID) => {
  const medicines = await medicine.findMedicines();

  const medicineDetail = medicines.filter(t => t.id === medicineID);
  return medicineDetail;
}

module.exports = {
    findMedicines,
    findMedicinesExpire,
    createMedicine,
    removeMedicine,
    checkExistMedicine,
    creatMedicineInTotal,
    detailMedicine
}
