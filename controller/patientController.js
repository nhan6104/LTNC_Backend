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
            
            if (checkingPatient.exists) {
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

const removePatient = async (req, res) => {
    try{
        const { error } = patientValidation.validateRemovePatient(req.body);
        console.log(req.body);
        if (error) {
            // console.log(error);
            return res.status(400).json({
                error: true,
                message: error.message,
            });
        }

        const checkingPatient = await patientService.checkExistPatient(req.body.cccd);
            
        if (checkingPatient) {
            return res.status(400).json({
                error: true,
                message: "Người dùng không tồn tại",
            });
        }

        const resultRemovePatient = await patientService.removePatient(req.body);
    
        let textResultRemovePatient;

        if (!resultRemovePatient) {
            textResultRemovePatient = `Xóa bệnh nhân thất bại.`;
        }
        else {
            textResultRemovePatient = `Xóa bệnh nhân thành công.`;
        }

        return res.status(200).json({
            error: false,
            message: `
            Kết quả:\n
            ${textResultRemovePatient}\n`,
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

const createRecords = async (req, res) => {
    try {
        const { error } = patientValidation.validateCreateRecords(req.body);
        console.log(req.body);
        if (error) {
            // console.log(error);
            return res.status(400).json({
                error: true,
                message: error.message,
            });
        }

        const resultCreatingNewRecords = await patientService.createRecords(req.body);
    
        let textResultCreatingNewRecords;
        if (!resultCreatingNewRecords) {
            textResultCreatingNewRecords = `Tạo bệnh án thất bại.`;
        }
        else {
            textResultCreatingNewRecords = `Tạo bệnh án thành công.`
        }

        return res.status(200).json({
            error: false,
            message: `
            Kết quả:\n
            ${textResultCreatingNewRecords}\n`,
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

const removeRecords = async (req, res) => {
    try{
        const { error } = patientValidation.validateRemoveRecords(req.body);
        console.log(req.body);
        if (error) {
            // console.log(error);
            return res.status(400).json({
                error: true,
                message: error.message,
            });
        }

        const resultRemoveRecords = await patientService.removeRecords(req.body);
    
        let textResultRemoveRecords;

        if (!resultRemoveRecords) {
            textResultRemoveRecords = `Xóa bệnh án thất bại.`;
        }
        else {
            textResultRemoveRecords = `Xóa bệnh án thành công.`;
        }

        return res.status(200).json({
            error: false,
            message: `
            Kết quả:\n
            ${textResultRemoveRecords}\n`,
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


const treatmentProcessByID = async (req, res) => {
    try{
        const { error } = patientValidation.validateTreatmentProcessByID(req.body);
        console.log(req.body);
        if (error) {
            // console.log(error);
            return res.status(400).json({
                error: true,
                message: error.message,
            });
        }

        const checkingPatient = await patientService.checkExistPatient(req.body.cccd);
            
        if (checkingPatient) {
            return res.status(400).json({
                error: true,
                message: "Người dùng không tồn tại",
            });
        }

        const result = await patientService.treatmentProcessByID(req.body);
    
        let textResult;

        if (!result) {
            textResult = `Lấy quá trình chữa bệnh thất bại.`;
        }
        else {
            textResult = `Lấy quá trình chữa bệnh thành công.`;
        }

        return res.status(200).json({
            error: false,
            message: `
            Kết quả:\n
            ${textResult}\n`,
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

const updatePatientData = async (req, res) => {
    try{
        const { error } = patientValidation.validateUpdatePatient(req.body);
        console.log(req.body);
        if (error) {
            // console.log(error);
            return res.status(400).json({
                error: true,
                message: error.message,
            });
        }

        const checkingPatient = await patientService.checkExistPatient(req.body.cccd);
            
        if (checkingPatient) {
            return res.status(400).json({
                error: true,
                message: "Người dùng không tồn tại",
            });
        }

        const result = await patientService.updatePatientData(req.body);
    
        let textResult;

        if (!result) {
            textResult = `Cập nhật thông tin bệnh nhân thất bại.`;
        }
        else {
            textResult = `Cập nhật thông tin bệnh nhân thành công.`;
        }

        return res.status(200).json({
            error: false,
            message: `
            Kết quả:\n
            ${textResult}\n`,
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
    removePatient,
    createRecords,
    removeRecords,
    treatmentProcessByID,
    updatePatientData
}

