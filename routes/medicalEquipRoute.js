const medicalEquipController = require('../controller/medicalEquipController');
const express = require("express");
const authenticate = require('../lib/auth');
const router = express.Router();

router.get("/getData",authenticate.isAuthenticated, authenticate.isAuthorized(["ADMIN"]), medicalEquipController.findMedicalEquip);
router.get("/getExp",authenticate.isAuthenticated, authenticate.isAuthorized(["ADMIN"]), medicalEquipController.findMedicalEquipExpire);
router.get("/getDetail",authenticate.isAuthenticated, authenticate.isAuthorized(["ADMIN"]), medicalEquipController.findMedicalEquipDetail);
router.post("/create",authenticate.isAuthenticated, authenticate.isAuthorized(["ADMIN"]), medicalEquipController.createMedicalEquip);
router.put("/delete",authenticate.isAuthenticated, authenticate.isAuthorized(["ADMIN"]), medicalEquipController.removeMedicalEquip);


module.exports = router;