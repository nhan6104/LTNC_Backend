const medicalEquipController = require('../controller/medicalEquipController');
const express = require("express");
const authenticate = require('../lib/auth');
const router = express.Router();

router.get("/",medicalEquipController.findMedicalEquip);
router.get("/exp", medicalEquipController.findMedicalEquipExpire);
router.post("/",medicalEquipController.createMedicalEquip);
router.delete("/:id",medicalEquipController.removeMedicalEquip);

module.exports = router;