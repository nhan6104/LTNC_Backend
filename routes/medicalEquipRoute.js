const medicalEquipController = require('../controller/medicalEquipController');
const express = require("express");
const authenticate = require('../lib/auth');
const router = express.Router();

router.get("/getData",medicalEquipController.findMedicalEquip);
router.get("/getExp",medicalEquipController.findMedicalEquipExpire);
router.get("/getDetail/:id",medicalEquipController.findMedicalEquipDetail);
router.post("/create",medicalEquipController.createMedicalEquip);
router.delete("/delete/:id",medicalEquipController.removeMedicalEquip);


module.exports = router;