const patientService = require('../services/patientService');
const validation = require('../lib/validation');

const patientValidation = new validation.PatientValidation();

const createPatient = async (req, res) => {
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
            if (checkingPatient) {
                return res.status(400).json({
                    error: true,
                    message: "Người dùng đã tồn tại",
                });
            }

            let newPatient = new Array();
            let tempPatient = new Object();
            let  ref = `patient/${req.body.cccd}` 
            
            tempPatient.cccd = req.body.cccd;
            tempPatient.refference = ref;
            tempPatient.fullname = req.body.name;

            const patients = await patientService.findPatiens();


            newPatient.push(tempPatient);

            if (patients.patient) 
            {
                console.log(patients.patient[0]);
                for (const patient of patients.patient)  
                {
                    newPatient.push(patient);
                }
            }

            const resultCreatingNewPatientInTotal = await patientService.creatPatientInTotal({patient: newPatient});
            
            const resultCreatingNewPatient = await patientService.createPatient(req.body);
		
            let textResultCreatingNewPatient;
            if (!resultCreatingNewPatient) {
                textResultCreatingNewPatient = `Tạo bệnh nhân thất bại.`;
            }
            else {
                textResultCreatingNewPatient = `Tạo bệnh nhân thành công.`
            }

            let textResultCreatingNewPatientInTotal;
            if (!resultCreatingNewPatientInTotal) {
                textResultCreatingNewPatientInTotal = `Tạo bệnh nhân trong bảng tổng thất bại.`;
            }
            else {
                textResultCreatingNewPatientInTotal = `Tạo bệnh nhân trong bảng tổng thành công.`
            }


            return res.status(200).json({
                error: false,
                message: `
                Kết quả:\n
                ${textResultCreatingNewPatient}\n
                ${textResultCreatingNewPatientInTotal}`,
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
            
        if (!checkingPatient) {
            return res.status(400).json({
                error: true,
                message: "Người dùng không tồn tại",
            });
        }

        const resultRemovePatient = await patientService.removePatient(req.body.cccd);
    
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
        
        const checkingPatient = await patientService.checkExistRecords(req.body.cccd, req.body.date);
        if (!checkingPatient) {
            return res.status(400).json({
                error: true,
                message: "Bệnh án không tồn tại",
            });
        }
        
        const resultRemoveRecords = await patientService.removeRecords(req.body.cccd, req.body.date);
    
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
            
        if (!checkingPatient) {
            return res.status(400).json({
                error: true,
                message: "Người dùng không tồn tại",
            });
        }

        const result = await patientService.treatmentProcessByID(req.body.cccd);
    
        let textResult;

        if (!result) {
            textResult = `Lấy quá trình chữa bệnh thất bại.`;
        }
        else {
            textResult = `Lấy quá trình chữa bệnh thành công.`;
        }

        return res.status(200).json({
            error: false,
            message: `Kết quả: ${textResult}\n`,
            medicalHistory: result,
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
            
        if (!checkingPatient) {
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

const findPatient = async (req, res) => {
    try{
        const { error } = patientValidation.validateFindPatient(req.body);
        console.log(req.body);
        if (error) {
            // console.log(error);
            return res.status(400).json({
                error: true,
                message: error.message,
            });
        }

        const checkingPatient = await patientService.checkExistPatient(req.body.cccd);
            
        if (!checkingPatient) {
            return res.status(400).json({
                error: true,
                message: "Người dùng không tồn tại",
            });
        }

        const resultFindPatient = await patientService.findPatientByID(req.body.cccd);
    
        let textResultFindPatient;

        if (!resultFindPatient) {
            textResultFindPatient = `Tìm kiếm bệnh nhân thất bại.`;
        }
        else {
            textResultFindPatient = `Tìm kiếm bệnh nhân thành công.`;
        }

        return res.status(200).json({
            error: false,
            message: `
            Kết quả:\n
            ${textResultFindPatient}\n`,
            data: resultFindPatient,
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

const findRecords = async (req, res) => {
    try{
        const { error } = patientValidation.validateFindRecords(req.body);
        console.log(req.body);
        if (error) {
            // console.log(error);
            return res.status(400).json({
                error: true,
                message: error.message,
            });
        }
        
        const checkingPatient = await patientService.checkExistRecords(req.body.cccd, req.body.date);
        if (!checkingPatient) {
            return res.status(400).json({
                error: true,
                message: "Bệnh án không tồn tại",
            });
        }
        
        const resultFindRecords = await patientService.findRecordsByDate(req.body.cccd, req.body.date);
    
        let textResultFindRecords;

        if (!resultFindRecords) {
            textResultFindRecords = `Xóa bệnh án thất bại.`;
        }
        else {
            textResultFindRecords = `Xóa bệnh án thành công.`;
        }

        return res.status(200).json({
            error: false,
            message: `
            Kết quả:\n
            ${textResultFindRecords}\n`,
            data: resultFindRecords,
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
    createPatient,
    removePatient,
    createRecords,
    removeRecords,
    treatmentProcessByID,
    updatePatientData,
    findPatient,
    findRecords
}

