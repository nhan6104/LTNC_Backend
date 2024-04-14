const medicineService = require('../services/medicineService');
const validation = require('../lib/validation');
const dbUtils = require('../lib/dbUtils');


const findMedicines = async (req, res) => {
    const brand = req.query.brand;
    try {
        let medicines = await medicineService.findMedicines();

        if (brand) {
            medicines = medicines.filter(medicine => medicine.brand.toUpperCase().includes(brand.toUpperCase()));
        }
        return res.status(200).json({
            error: false,
            message: medicines
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: true,
            message: err.message,
        });
    }
};

const findMedicinesExpire = async (req, res) => {
    const brand = req.query.brand;
    try {
        let medicines = await medicineService.findMedicinesExpire();

        if (brand) {
            medicines = medicines.filter(medicine => medicine.brand.toUpperCase().includes(brand.toUpperCase()));
        }
        return res.status(200).json({
            error: false,
            message: medicines
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: true,
            message: err.message,
        });
    }
};

const createMedicine = async (req, res) => {
    try {
        const medicine = await medicineService.createMedicine(req.body);

        let newMedicine = new Array();

        const medicines = await medicineService.findMedicines();

        if (medicines) {
            console.log(medicines[0]);
            for (const m of medicines) {
                let t = new Object();
                t.id = m.id;
                t.refference = `medicine/${m.id}`;
                t.brand = m.brand;

                newMedicine.push(t);
            }
        }
        const resultCreatingNewMedicineInTotal = await medicineService.createMedicineInTotal({
            medicine: newMedicine
        });
        return res.status(200).json({
            error: false,
            message: medicine
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: true,
            message: err.message,
        });
    }
};

const removeMedicine = async (req, res) => {
    try {
        let newMedicine = new Array();

        const checkingMedicine = await medicineService.checkExistMedicine(req.params.id);

        if (!checkingMedicine) {
            return res.status(400).json({
                error: true,
                message: "Medicine không tồn tại",
            });
        }

        const medicines = await medicineService.findMedicines();

        const medicineInTotalToRemove = medicines.filter(med => med.id != req.params.id);

        if (medicineInTotalToRemove) {
            for (const m of medicineInTotalToRemove) {
                let t = new Object();
                t.id = m.id;
                t.refference = `medicine/${m.id}`;
                t.brand = m.brand;

                newMedicine.push(t);
            }
        }

        const resultCreatingNewMedicineInTotal = await medicineService.createMedicineInTotal({
            medicine: newMedicine
        });


        const result = await medicineService.removeMedicine(req.params.id);

        let textResultRemoveMedicine;

        if (!result) {
            textResultRemoveMedicine = `Xóa medicine thất bại.`;
        } else {
            textResultRemoveMedicine = `Xóa medicine thành công.`;
        }

        return res.status(200).json({
            error: false,
            message: `
            Kết quả:\n
            ${textResultRemoveMedicine}\n`,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: true,
            message: err.message,
        });
    }
};

const findMedicineDetail = async (req, res) => {
    try {
        const medicine = await medicineService.detailMedicine(req.params.id);
        return res.status(200).json({
            error: false,
            message: medicine
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: true,
            message: err.message,
        });
    }
};


module.exports = {
    findMedicines,
    findMedicinesExpire,
    createMedicine,
    removeMedicine,
    findMedicineDetail
}