const staffService = require('../services/staffService');
const validation = require('../lib/validation');

const staffValidation = new validation.PatientValidation();


const createStaff = async (req, res) => {
    console.log(req.body)
    try {
            const { error } = staffValidation.validateLoginStaff(req.body);
    
            if (error) {console.log(error);
                return res.status(400).json({
                    error: true,
                    message: error.message,
                });
            }
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
                ${textResultCreatingNewStaff}\n`,
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
const removeStaff = async (req, res , type) => {
    try {
        const checkingStaff = await staffService.checkExistStaff(req.body.cccd);

        if (!checkingStaff.exists) {
            return res.status(400).json({
                error: true,
                message: checkingPostalCode.message,
            });
        }


        const resultRemoveNewStaff = await staffService.removeStaff(req.body , type);
		
        let textResultRemoveNewStaff;
        if (!resultRemoveNewStaff) {
            textResultRemoveNewStaff = `Xóa ${type} thất bại.`;
        }
        else {
            textResultRemoveNewStaff = `Xóa ${type} thành công.`
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





module.exports = {
    createStaff,
    removeStaff,
}