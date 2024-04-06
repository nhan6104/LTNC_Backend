const medicalEquipController = require('../controller/medicalEquipController');
const express = require("express");
const authenticate = require('../lib/auth');
const router = express.Router();

router.get("/",medicalEquipController.findMedicalEquip);

module.exports = router;