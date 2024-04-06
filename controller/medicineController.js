const medicineService = require('../services/medicineService');
const validation = require('../lib/validation');

// const patientValidation = new validation.PatientValidation();

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

module.exports = {
    findMedicines
}

