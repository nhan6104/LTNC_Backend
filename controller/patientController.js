const patientService = require('../services/patientService');
const validation = require('../lib/validation');

const patientValidation = new validation.PatientValidation();

const ceatePatient = async (req, res) => {
    try {
            const { error } = patientValidation.validateCreatePatient(req.body);
            console.log(req.body);
            if (error) {
                // console.log(error);
                return res.status(400).json({
                    error: true,
                    message: error.message,
                });
            }
    
            const checkingPatient = await patientService.checkExistPatient(req.body.cccd);
            
            if (!checkingPatient.exists) {
                return res.status(400).json({
                    error: true,
                    message: "Người dùng đã tồn tại",
                });
            }

            const resultCreatingNewPatient = await patientService.createPatient(req.body);
		
            let textResultCreatingNewPatient;
            if (!resultCreatingNewPatient) {
                textResultCreatingNewPatient = `Tạo bệnh nhân thất bại.`;
            }
            else {
                textResultCreatingNewPatient = `Tạo bệnh nhân thành công.`
            }

            return res.status(200).json({
                error: false,
                message: `
                Kết quả:\n
                ${textResultCreatingNewPatient}\n`,
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
    ceatePatient,
}