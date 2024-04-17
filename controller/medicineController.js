const medicineService = require('../services/medicineService');
const validation = require('../lib/validation');

const medicineValidation = new validation.MedicineValidation();

const findMedicines = async (req, res) => {
    
    const {error} = medicineValidation.validateQueryMedicineByBrand(req.query);

    console.log(req.body);
    if (error) {
        // console.log(error);
        return res.status(400).json({
            error: true,
            message: error.message,
        });
    }
    try {
        let medicines = await medicineService.findMedicines();

        if (req.query.brand) {
            medicines = medicines.filter(medicine => medicine.brand.toUpperCase().includes(brand.toUpperCase()));
        }
        return res.status(200).json({
            error: false,
            message: "Lấy thành công",
            data: medicines
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
        
    const {error} = medicineValidation.validateQueryMedicineByBrand(req.query);

    console.log(req.body);
    if (error) {
        // console.log(error);
        return res.status(400).json({
            error: true,
            message: error.message,
        });
    }
    
    try {
        let medicines = await medicineService.findMedicinesExpire();

        if (req.query.brand) {
            medicines = medicines.filter(medicine => medicine.brand.toUpperCase().includes(brand.toUpperCase()));
        }
        
        return res.status(200).json({
            error: false,
            message: "Lấy thành công",
            data: medicines
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
        const {error} = medicineValidation.validateCreateMedicine(req.body);

        console.log(req.body);
        if (error) {
            // console.log(error);
            return res.status(400).json({
                error: true,
                message: error.message,
            });
        }
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
        const resultCreatingNewMedicineInTotal = await medicineService.createMedicineInTotal({medicine: newMedicine});
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
        const { error } = medicineValidation.validateQueryMedicine(req.query);
        // console.log(req.query.cccd);
        if (error) {
            console.log(error);
            return res.status(400).json({
                error: true,
                message: error.message,
            });
        }
        let newMedicine = new Array();

        const checkingMedicine = await medicineService.checkExistMedicine(req.query.id);

        if (!checkingMedicine) {
            return res.status(400).json({
                error: true,
                message: "Medicine không tồn tại",
            });
        }

        const medicines = await medicineService.findMedicines();

        const medicineInTotalToRemove = medicines.filter(med => med.id != req.query.id);

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


        const result = await medicineService.removeMedicine(req.query.id);

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
        const { error } = medicineValidation.validateFindMedicine(req.query);
        console.log(req.body);
        if (error) {
            // console.log(error);
            return res.status(400).json({
                error: true,
                message: error.message,
            });
        }
        const medicine = await medicineService.detailMedicine(req.query.id);
        return res.status(200).json({
            error: false,
            message: "Lấy thành công",
            data: medicine
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