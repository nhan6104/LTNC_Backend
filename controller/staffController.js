const staffService = require('../services/staffService');
const validation = require('../lib/validation');

const staffValidation = new validation.PatientValidation();


const createStaff = async (req, res) => {
    //console.log(req.body)
    try {
            const { error } = staffValidation.validateLoginStaff(req.body);
    
            if (error) {console.log(error);
                return res.status(400).json({
                    error: true,
                    message: error.message,
                });
            }
            //!
            const checkingStaff = await staffService.checkExistStaff(req.body.infor.cccd);
            //console.log(checkingStaff);
            if (checkingStaff) {
                return res.status(400).json({
                    error: true,
                    message: "Người dùng đã tồn tại",
                });
            }
            //console.log(req.body.infor.cccd)
            const  ref = `doctor/${req.body.infor.cccd}` 
            const newStaff = {
                cccd: req.body.infor.cccd,
                refference: ref,
                fullname: req.body.infor.name
            }
            console.log(newStaff)
            const resultCreatingNewStaffInTotal = await staffService.createStaffInTotal(newStaff);
            // console.log(resultCreatingNewStaffInTotal)
            let textResultCreatingNewStaffInTotal;
            if (!resultCreatingNewStaffInTotal) {
                textResultCreatingNewStaffInTotal = `Tạo nhân viên trong bảng tổng thất bại.`;
            }
            else {
                textResultCreatingNewStaffInTotal = `Tạo nhân viên trong bảng tổng thành công.`
            }

            //!
            const resultCreatingNewStaff = await staffService.createStaff(req.body);
		
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
        const checkingStaff = await staffService.checkExistStaff(req.body.cccd);

        if (!checkingStaff.exists) {
            return res.status(400).json({
                error: true,
                message: checkingPostalCode.message,
            });
        }


        const resultRemoveNewStaff = await staffService.removeStaff(req.body);
		
        let textResultRemoveNewStaff;
        if (!resultRemoveNewStaff) {
            textResultRemoveNewStaff = `Xóa nhân viên thất bại.`;
        }
        else {
            textResultRemoveNewStaff = `Xóa nhân viên thành công.`
        }

        return res.status(200).json({
            error: false,
            message: `
            Kết quả:\n
            ${textResultRemoveNewStaff}\n`,
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
        const detail = req.body
        // console.log(work)
        // res.render("index.jade" ,{
        //     title : "Schedule",
        //     work : work,
        // })
        console.log(detail)
        if (detail) {
            return res.status(400).json({
                error: true,
                message: "Lịch làm việc của nhân viên",
                detail : detail
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
    detailStaff
}