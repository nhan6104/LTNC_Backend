const medicineService = require('../services/medicineService');
const validation = require('../lib/validation');
const dbUtils = require('../lib/dbUtils');


const findMedicines = async (req, res) => {
    try {
            const medicines = await medicineService.findMedicines();
            return res.status(200).json({
                error: false,
                message: medicines
            });

    }
    catch (err) {
        console.log(err);
		return res.status(500).json({
			error: true,
			message: err.message,
		});
    }
}


const findMedicinesExpire = async (req, res) => {
    try {
            const medicines = await medicineService.findMedicinesExpire();
            return res.status(200).json({
                error: false,
                message: medicines
            });

    }
    catch (err) {
        console.log(err);
		return res.status(500).json({
			error: true,
			message: err.message,
		});
    }
}

const createMedicine = async (req, res) => {
    try {
            const medicine = await medicineService.createMedicine(req.body);
            return res.status(201).json({
                error: false,
                message: medicine
            });

    }
    catch (err) {
        console.log(err);
		return res.status(500).json({
			error: true,
			message: err.message,
		});
    }
}

const removeMedicine = async (req, res) => {
    try{
        // const { error } = patientValidation.validateRemovePatient(req.body);
        // if (error) {
        //     // console.log(error);
        //     return res.status(400).json({
        //         error: true,
        //         message: error.message,
        //     });
        // }

        const checkingMedicine = await medicineService.checkExistMedicine(req.params.id)
        console.log(checkingMedicine);

        if (!checkingMedicine) {
            return res.status(400).json({
                error: true,
                message: "Medicine không tồn tại",
            });
        }

        const result = await medicineService.removeMedicine(req.params.id);
    
        let textResultRemoveMedicine;

        if (!result) {
            textResultRemoveMedicine = `Xóa medicine thất bại.`;
        }
        else {
            textResultRemoveMedicine = `Xóa medicine thành công.`;
        }

        return res.status(200).json({
            error: false,
            message: `
            Kết quả:\n
            ${textResultRemoveMedicine}\n`,
        });
    }
    catch (err) {
        console.log(err);
		return res.status(500).json({
			error: true,
			message: err.message,
		});
    }
}

module.exports = {
    findMedicines,
    findMedicinesExpire,
    createMedicine,
    removeMedicine
}

