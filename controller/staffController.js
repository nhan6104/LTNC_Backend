const doctorService = require('../services/staffService');
const validation = require('../lib/validation');

const doctorValidation = new validation.DoctorValidation();

const createStaff = async (req, res) => {
    try {
            const { error } = doctorValidation.validateCreateDoctor(req.body);
    
            if (error) {
                console.log(error);
                return res.status(400).json({
                    error: true,
                    message: error.message,
                });
            }

            const doctors = await doctorService.findDoctor();

            if (doctors.doctor) {
                for (let doctor of doctors.doctor) {
                    if (doctor.cccd === req.body.cccd || doctor.email === req.body.email) {
                        return res.status(400).json({
                            error: true,
                            message: "Người dùng đã tồn tại",
                        });
                    }   
                }
            }

            const resultSignUp = await doctorService.signupAccount(req.body.email, req.body.cccd);
            
            let newStaff = new Array();
            let tempStaff = new Object();           
            const  ref = `doctor/${req.body.cccd}` 
            tempStaff = {
                cccd: req.body.cccd,
                refference: ref,
                fullname: req.body.name,
                userUid: resultSignUp.user.uid
            }

            newStaff.push(tempStaff)
            if (doctors.doctors) 
            {
                for (const staff of doctors.doctors)  
                {
                    newStaff.push(staff);
                }
            }

            const resultCreatingNewStaffInTotal = await doctorService.createStaffInTotal({doctors: newStaff});
            // console.log(resultCreatingNewStaffInTotal)
            let textResultCreatingNewStaffInTotal;
            if (!resultCreatingNewStaffInTotal) {
                textResultCreatingNewStaffInTotal = `Tạo nhân viên trong bảng tổng thất bại.`;
            }
            else {
                textResultCreatingNewStaffInTotal = `Tạo nhân viên trong bảng tổng thành công.`
            }

            //!
            const resultCreatingNewStaff = await doctorService.createStaff(req.body);
            

            let textResultCreatingNewStaff;
            if (!resultCreatingNewStaff) {
                textResultCreatingNewStaff = `Tạo nhân viên thất bại.`;
            }
            else {
                textResultCreatingNewStaff = `Tạo nhân viên thành công.`
            }

            return res.status(200).json({
                error: false,
                message: `
                Kết quả:\n
                ${textResultCreatingNewStaff}\n
                ${textResultCreatingNewStaffInTotal}\n`,
            });

    }
    catch (error) {
        // console.log(err);
		return res.status(500).json({
			error: true,
			message: error.message,
		});
    }
    
}

const removeStaff = async (req, res) => {
    try {
        const { error } = doctorValidation.validateQueryDoctor(req.query);
    
        if (error) {
            console.log(error);
            return res.status(400).json({
                error: true,
                message: error.message,
            });
        }

        const doctors = await doctorService.findDoctor();

        if ( !doctors || !doctors.doctors) {
            return res.status(400).json({
                error: true,
                message: "Người dùng không tồn tại",
            });
        }

        const doctor =  doctors.doctors.filter(item => item.cccd == req.query.cccd);

        if (!doctor) {
            return res.status(400).json({
                error: true,
                message: "Người dùng không tồn tại",
            });
        }

        const newDoctors =  doctors.doctors.filter(item => item.cccd != req.query.cccd)

        const resultRemoveDoctorInTotal = await doctorService.updateDoctorInTotal({doctors:newDoctors});

        let textResultRemoveDoctorIntotal;

        if (!resultRemoveDoctorInTotal) {
            textResultRemoveDoctorIntotal = `Xóa nhân viên trong bảng tổng thất bại.`;
        }
        else {
            textResultRemoveDoctorIntotal = `Xóa nhân viên bảng tổng thành công.`
        }

        console.log(doctor);

        const resultRemoveNewStaff = await doctorService.removeStaff(doctor[0].refference);
		
        let textResultRemoveNewDoctor;
        if (!resultRemoveNewStaff) {
            textResultRemoveNewDoctor = `Xóa nhân viên thất bại.`;
        }
        else {
            textResultRemoveNewDoctor = `Xóa nhân viên thành công.`
        }

        return res.status(200).json({
            error: false,
            message: `
            Kết quả:\n
            ${textResultRemoveNewDoctor}\n
            ${textResultRemoveDoctorIntotal}\n`,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: true,
            message: error.message,
        }); 
    }
}

const detailStaff = async (req, res) => {
    try {
        const { error } = doctorValidation.validateQueryDoctor(req.query);
    
        if (error) {
            console.log(error);
            return res.status(400).json({
                error: true,
                message: error.message,
            });
        }

        const doctors = await doctorService.findDoctor();

        if ( !doctors || !doctors.doctors) {
            return res.status(400).json({
                error: true,
                message: "Người dùng không tồn tại",
            });
        }

        const doctor =  doctors.doctors.filter(item => item.cccd == req.query.cccd);

        if (!doctor) {
            return res.status(400).json({
                error: true,
                message: "Người dùng không tồn tại",
            });
        }

        const detail = await doctorService.detailStaff(doctor[0].refference)

        return res.status(200).json({
            error: true,
            message: detail
        });
    }
    catch (error) {
        // console.log(err);
		return res.status(500).json({
			error: true,
			message: error.message,
		});
    }
}

const illnessToDoctor = async (req , res) => {
    try {
        const job = await staffService.jobDoctor(req.body.Infor.cccd)
        let textResult;
        if (!job) {
            textResult = `Lấy thông tin thất bại.`;
        }
        else {
            textResult = `Lấy thông tin thành công.`;
        }
        if (detail) {
            return res.status(400).json({
                error: true,
                message: "Thông tin công việc của bác sĩ",
                job : job
            });
        }
    }
    catch (error) {
        // console.log(err);
		return res.status(500).json({
			error: true,
			message: error.message,
		});
    }
}

module.exports = {
    createStaff,
    removeStaff,
    detailStaff,
    illnessToDoctor
}