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

        const medicals = await medicalEquipService.findMedicalEquipToTal();

        let textResultRemoveMedicalEquip;
        for (let el of medicals.medicalEquip) {
            if (el.id === req.query.id) {
                const ref = el.refference;
                
                await medicalEquipService.removeMedicalEquipByPath(ref);

                let newMedicalEquip = new Array();
                newMedicalEquip = medicals.medicalEquip.filter(item => item.id !== req.query.id);

                await medicalEquipService.createMedicalEquipInTotal({ medicalEquip: newMedicalEquip });

                textResultRemoveMedicalEquip = `Xóa Thiết bị thành công.`;
                return res.status(200).json({
                    error: false,
                    message: `
                    Kết quả:\n
                    ${textResultRemoveMedicalEquip}\n`,
                    data: el,
                });
            }
        }

        return res.status(400).json({
            error: true,
            message: "Thiết bị không tồn tại",
        });
    }
    catch (err) {
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

const updateMedicalEquip = async (req, res) => {
    try {
        const { error } = medicalValidation.validateFindMedicalEquip(req.query) &&
            medicalValidation.validateUpdateMedicalEquip(req.body);
        console.log(req.body);
        if (error) {
            // console.log(error);
            return res.status(400).json({
                error: true,
                message: error.message,
            });
        }

        const checkingMedicalEquip = await medicalEquipService.checkExistMedicalEquip(req.query.id);

        if (!checkingMedicalEquip) {
            return res.status(400).json({
                error: true,
                message: "Thiết bị không tồn tại",
            });
        }

        const result = await medicalEquipService.updateMedicalEquip(req.body, req.query.id);

        let textResult;

        if (!result) {
            textResult = `Cập nhật thông tin thiết bị thất bại.`;
        }
        else {
            textResult = `Cập nhật thông tin thiết bị thành công.`;
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
};





module.exports = {
    findMedicalEquip,
    findMedicalEquipExpire,
    createMedicalEquip,
    removeMedicalEquip,
    findMedicalEquipDetail,
    updateMedicalEquip
}