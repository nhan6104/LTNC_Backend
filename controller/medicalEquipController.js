const medicalEquipService = require('../services/medicalEquipService');
const validation = require('../lib/validation');
const dbUtils = require('../lib/dbUtils');

const findMedicalEquip = async (req,res) => {
    try {
        const medicalEquip = await medicalEquipService.findMedicalEquip();
            return res.status(200).json({
                error: false,
                message: medicalEquip
        });
    }
    catch(err){
            return res.status(500).json({
                error:true,
                message:err.message,
        });
    }
}

const findMedicalEquipExpire = async (req,res) => {
    try{
        const medicalEquip = await medicalEquipService.findMedicalEquipExpire();
        return res.status(200).json({
            error: false,
            message: medicalEquip
        });
    }
    catch(err){
            return res.status(500).json({
                error: true,
                message: err.message
            });
    }
}

const createMedicalEquip = async (req,res) => {
    try{
        const medicalEquip = await medicalEquipService.createMedicalEquip(req.body);
        return res.status(201).json({
            error:false,
            message: medicalEquip
        });
    }
    catch(err){
        console.log(err);
            return res.status(500).json({
                error: true,
                message: err.message,
        });
    }
}

const removeMedicalEquip = async(req , res) => {
    try{
        const checkingMedicalEquip = await medicalEquipService.checkExistMedicalEquip(req.params.id);
        console.log(checkingMedicalEquip);
        
        if(!checkingMedicalEquip){
            return res.status(400).json({
                error: true,
                message:"Medical Equipment không tồn tại",
            });
        }
        const result = await medicalEquipService.removeMedicalEquip(req.params.id);

        let textResultRemoveMedicalEquip;

        if(!result){
            textResultRemoveMedicalEquip = 'Xóa medical equip thất bại.';
        }
        else{
            textResultRemoveMedicalEquip = 'Xóa medical equip thành công.';
        }
        return res.status(200).json({
            error: false,
            message: `${textResultRemoveMedicalEquip}`
        }); 
    }
    catch(err) {
        console.log(err);
            return res.status(500).json({
                error:true,
                message: err.message,
        });
    }
} 

module.exports = {
    findMedicalEquip,
    findMedicalEquipExpire,
    createMedicalEquip,
    removeMedicalEquip
}