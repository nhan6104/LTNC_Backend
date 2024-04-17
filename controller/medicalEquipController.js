const medicalEquipService = require('../services/medicalEquipService');
const validation = require('../lib/validation');
const medicalValidation = new validation.MedicalEquipmentValidation();

const findMedicalEquip = async (req, res) => {
    const {error} = medicalValidation.validateQueryMedicalEquipByName(req.query);

    console.log(req.body);
    if (error) {
        // console.log(error);
        return res.status(400).json({
            error: true,
            message: error.message,
        });
    }
    try {
        let medicalEquips = await medicalEquipService.findMedicalEquip();

        if (req.query.name) {
            medicalEquips = medicalEquips.filter(medicalEquip => medicalEquip.name.toUpperCase().includes(name.toUpperCase()));
        }
        return res.status(200).json({
            error: false,
            message: "Lấy thành công",
            data: medicalEquips
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: true,
            message: err.message,
        });
    }
};

const findMedicalEquipExpire = async (req, res) => {
    const {error} = medicalValidation.validateQueryMedicalEquipByName(req.query);

    console.log(req.body);
    if (error) {
        // console.log(error);
        return res.status(400).json({
            error: true,
            message: error.message,
        });
    }

    try {
        let medicalEquips = await medicalEquipService.findMedicalEquipExpire();

        if (req.query.name) {
            medicalEquips = medicalEquips.filter(medicalEquip => medicalEquip.name.toUpperCase().includes(name.toUpperCase()));
        }
        return res.status(200).json({
            error: false,
            message: "Lấy thành công",
            data: medicalEquips
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: true,
            message: err.message,
        });
    }
};

const createMedicalEquip = async (req, res) => {
    try {
        const {error} = medicalValidation.validateCreateMedicalEquipment(req.body);

        console.log(req.body);
        if (error) {
            // console.log(error);
            return res.status(400).json({
                error: true,
                message: error.message,
            });
        }

        const medicalEquip = await medicalEquipService.createMedicalEquip(req.body);

        let newMedicalEquip = new Array();

        const medicalEquips = await medicalEquipService.findMedicalEquip();

        if (medicalEquips) {
            console.log(medicalEquips[0]);
            for (const m of medicalEquips) {
                let t = new Object();
                t.id = m.id;
                t.refference = `medicalEquip/${m.id}`;
                t.name = m.name;

                newMedicalEquip.push(t);
            }
        }
        const resultCreatingNewMedicalEquipInTotal = await medicalEquipService.createMedicalEquipInTotal({
            medicalEquip: newMedicalEquip
        });
        return res.status(200).json({
            error: false,
            message: medicalEquip
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: true,
            message: err.message,
        });
    }
};

const removeMedicalEquip = async (req, res) => {
    try {
        const { error } = medicalValidation.validateQueryMedicalEquipment(req.query);
        // console.log(req.query.cccd);
        if (error) {
            console.log(error);
            return res.status(400).json({
                error: true,
                message: error.message,
            });
        }
        let newMedicalEquip = new Array();

        const checkingMedicalEquip = await medicalEquipService.checkExistMedicalEquip(req.query.id);

        if (!checkingMedicalEquip) {
            return res.status(400).json({
                error: true,
                message: "Medical Equipment không tồn tại",
            });
        }

        const medicalEquips = await medicalEquipService.findMedicalEquip();

        const medicalEquipInToTalRemove = medicalEquips.filter(med => med.id != req.query.id);

        if (medicalEquipInToTalRemove) {
            for (const m of medicalEquipInToTalRemove) {
                let t = new Object();
                t.id = m.id;
                t.refference = `medicalEquip/${m.id}`;
                t.name = m.name;

                newMedicalEquip.push(t);
            }
        }

        const resultCreatingNewMedicalEquipInTotal = await medicalEquipService.createMedicalEquipInTotal({
            medicalEquip: newMedicalEquip
        });


        const result = await medicalEquipService.removeMedicalEquip(req.query.id);

        let textResultRemoveMedicalEquip;

        if (!result) {
            textResultRemoveMedicalEquip = `Xóa medicalEquip thất bại.`;
        } else {
            textResultRemoveMedicalEquip = `Xóa medicalEquip thành công.`;
        }

        return res.status(200).json({
            error: false,
            message: `
            Kết quả:\n
            ${textResultRemoveMedicalEquip}\n`,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: true,
            message: err.message,
        });
    }
};

const findMedicalEquipDetail = async (req, res) => {
    try {
        const { error } = medicalValidation.validateQueryMedicalEquipment(req.query);
        // console.log(req.query.cccd);
        if (error) {
            console.log(error);
            return res.status(400).json({
                error: true,
                message: error.message,
            });
        }
        const medicalEquip = await medicalEquipService.detailMedicalEquip(req.query.id);
        return res.status(200).json({
            error: false,
            message: "Lấy thành công",
            data: medicalEquip
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: true,
            message: err.message,
        });
    }
}



module.exports = {
    findMedicalEquip,
    findMedicalEquipExpire,
    createMedicalEquip,
    removeMedicalEquip,
    findMedicalEquipDetail
}