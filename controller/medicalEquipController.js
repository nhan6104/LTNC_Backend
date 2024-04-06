const medicalEquipService = require('../services/medicalEquipService');
const validation = require('../lib/validation');

const findMedicalEquip = async (req,res) => {
    try {
        const medicalEquip = await medicalEquipService.findMedicalEquip();
            return res.status(200).json({
                error: false,
                message: medicalEquip
        });
    }
    catch(err){
        console.log(err);
            return res.status(500).json({
                error:true,
                message:err.message,
        });
    }
}

module.exports = {
    findMedicalEquip
}