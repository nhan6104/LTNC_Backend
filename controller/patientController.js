const patientService = require('../services/patientService');
const validation = require('../lib/validation');
const { updateNewPatientInTotal } = require('../database/patient');

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

            const patients = await patientService.findPatients();

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
            
            const resultCreatingNewPatient = await patientService.createPatient(req.body, ref);
		
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
        const { error } = patientValidation.validateRemovePatient(req.query);
        // console.log(req.query.cccd);
        if (error) {
            console.log(error);
            return res.status(400).json({
                error: true,
                message: error.message,
            });
        }
        
        const patients = await patientService.findPatients();

        let textResultRemovePatient;
        for (let el of patients.patient)
        {
            if (el.cccd === req.query.cccd){
                const ref = `patient/${req.query.cccd}` 
                const history = await patientService.findHistory(req.query.cccd);
                for (hist of history.medicalHistory)
                {
                    await patientService.removeRecords(req.query.cccd, hist.date);
                }
                await patientService.removePatientByPath(ref);

                let newPatient = new Array();
                newPatient = patients.patient.filter(item => item.cccd !== req.query.cccd);

                await patientService.creatPatientInTotal({patient : newPatient});
                
                textResultRemovePatient = `Xóa bệnh nhân thành công.`;
                return res.status(200).json({
                    error: false,
                    message: `
                    Kết quả:\n
                    ${textResultRemovePatient}\n`,
                    data: el,
                });
            }
        }
        
        return res.status(400).json({
            error: true,
            message: "Người dùng không tồn tại",
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
        const { error } = patientValidation.validateFindPatient(req.query) && 
                            patientValidation.validateCreateRecords(req.body);
        console.log(req.body);
        if (error) {
            // console.log(error);
            return res.status(400).json({
                error: true,
                message: error.message,
            });
        }

        const patients = await patientService.findPatients();
        let ref;
        for (const el of patients.patient)
        {
            if (el.cccd === req.query.cccd){
                ref = el.refference;
                break;
            }
        }
        if (!ref) {
            return res.status(400).json({
                error: true,
                message: "Người dùng không tồn tại",
            });
        }

        const history = await patientService.findHistory(req.query.cccd);
        
        for (const el of history.medicalHistory){
            if (el.date === req.body.date && el.name  === req.body.diagnosis){
                return res.status(400).json({
                    error: true,
                    message: "Bệnh án trùng.",
                });
            }
        }

        const resultCreatingNewRecords = await patientService.createRecords(req.body, req.query.cccd);

        let newRecords = new Array();
        let tempRecords = new Object();
        
        tempRecords.name = req.body.diagnosis;
        tempRecords.date = req.body.date;

        newRecords.push(tempRecords);


        if (history.medicalHistory) 
        {
            console.log(history.medicalHistory[0]);
            for (const el of history.medicalHistory)  
            {
                newRecords.push(el);
            }
        }

        await patientService.createRecordsInHistory({medicalHistory: newRecords}, req.query.cccd);
        
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
        const { error } = patientValidation.validateFindPatient(req.query) && 
                            patientValidation.validateRemoveRecords(req.body);
        console.log(req.body);
        if (error) {
            // console.log(error);
            return res.status(400).json({
                error: true,
                message: error.message,
            });
        }
        
        const patients = await patientService.findPatients();
        let ref;
        for (const el of patients.patient)
        {
            if (el.cccd === req.query.cccd){
                ref = el.refference;
                break;
            }
        }
        if (!ref) {
            return res.status(400).json({
                error: true,
                message: "Người dùng không tồn tại",
            });
        }

        const history = await patientService.findHistory(req.query.cccd);

        let textResultRemoveRecords;
        for (const el of history.medicalHistory)
        {
            if (el.date === req.body.date){
                textResultRemoveRecords = `Xóa bệnh án thành công.`;
                const ref = `patient/${req.query.cccd}/medicalRecords/${req.body.date}`;
                await patientService.removeRecordsByPath(ref);

                let newRecords = new Array();
                newRecords = history.medicalHistory.filter(item => item.date !== req.body.date);

                console.log(newRecords);

                await patientService.createRecordsInHistory({medicalHistory : newRecords}, req.query.cccd);
                
                return res.status(200).json({
                    error: false,
                    message: `
                    Kết quả:\n
                    ${textResultRemoveRecords}\n`,
                    data: el,
                });
            }
        }
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
        const { error } = patientValidation.validateTreatmentProcessByID(req.query);
        console.log(req.body);
        if (error) {
            // console.log(error);
            return res.status(400).json({
                error: true,
                message: error.message,
            });
        }

        const checkingPatient = await patientService.checkExistPatient(req.query.cccd);
            
        if (!checkingPatient) {
            return res.status(400).json({
                error: true,
                message: "Người dùng không tồn tại",
            });
        }

        const result = await patientService.treatmentProcessByID(req.query.cccd);
    
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
        const { error } = patientValidation.validateFindPatient(req.query) &&
                            patientValidation.validateUpdatePatient(req.body);
        console.log(req.body);
        if (error) {
            // console.log(error);
            return res.status(400).json({
                error: true,
                message: error.message,
            });
        }

        const checkingPatient = await patientService.checkExistPatient(req.query.cccd);
            
        if (!checkingPatient) {
            return res.status(400).json({
                error: true,
                message: "Người dùng không tồn tại",
            });
        }

        const result = await patientService.updatePatientData(req.body, req.query.cccd);
    
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
        const { error } = patientValidation.validateFindPatient(req.query);
        console.log(req.body);
        if (error) {
            // console.log(error);
            return res.status(400).json({
                error: true,
                message: error.message,
            });
        }

        const patients = await patientService.findPatients();

        let textResultFindPatient;
        for (const el of patients.patient)
        {
            if (el.cccd === req.query.cccd){
                textResultFindPatient = `Tìm kiếm bệnh nhân thành công.`;
                
                return res.status(200).json({
                    error: false,
                    message: `
                    Kết quả:\n
                    ${textResultFindPatient}\n`,
                    data: el,
                });
            }
        }

        return res.status(400).json({
                    error: true,
                    message: `Tìm kiếm bệnh nhân thất bại.`,
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
        const { error } = patientValidation.validateFindPatient(req.query) &&
                            patientValidation.validateFindRecords(req.body);
        console.log(req.body);
        if (error) {
            // console.log(error);
            return res.status(400).json({
                error: true,
                message: error.message,
            });
        }
        
        const checkingPatient = await patientService.checkExistRecords(req.query.cccd, req.body.date);
        if (!checkingPatient) {
            return res.status(400).json({
                error: true,
                message: "Bệnh án không tồn tại",
            });
        }
        
        const resultFindRecords = await patientService.findRecordsByDate(req.query.cccd, req.body.date);
    
        let textResultFindRecords;

        if (!resultFindRecords) {
            textResultFindRecords = `Tìm kiếm bệnh án thất bại.`;
        }
        else {
            textResultFindRecords = `Tìm kiếm bệnh án thành công.`;
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

const findAllPatient = async (req, res) => {
    try {
        const patients = await patientService.findPatients();
        if (!patients.patient)
        {
            return res.status(400).json({
                error: true,
                message: `Không có bệnh nhân.`,
            });
        }
        let dataArray = new Array();
        for (let el of patients.patient)
        {
            let dataObject = new Object();
            dataObject.cccd = el.cccd;
            dataObject.fullname = el.fullname;

            dataArray.push(dataObject);
        }
        return res.status(200).json({
            error: false,
            data: dataArray,
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
    findRecords,
    findAllPatient
}

