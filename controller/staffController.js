const staffService = require('../services/staffService');
const validation = require('../lib/validation');

const staffValidation = new validation.PatientValidation();


const createStaff = async (req, res) => {
    try {
            const { error } = staffValidation.validateLoginStaff(req.body);
    
            if (error) {console.log(error);
                return res.status(400).json({
                    error: true,
                    message: error.message,
                });
            }
    
            const checkingStaff = await staffService.checkExistStaff(req.body.cccd);
        
            if (!checkingStaff.exists) {
                return res.status(400).json({
                    error: true,
                    message: checkingPostalCode.message,
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
    catch (err) {
        console.log(error);
		return res.status(500).json({
			error: true,
			message: error.message,
		});
    }
}
const removeStaff = async (req, res) => {
    try {
        
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