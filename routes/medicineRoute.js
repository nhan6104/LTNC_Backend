const medicineController = require("../controller/medicineController");
const express = require("express");
const authenticate = require("../lib/auth");
const router = express.Router();

router.get("/getData",authenticate.isAuthenticated, authenticate.isAuthorized(["DOCTOR", "ADMIN"]), medicineController.findMedicines);
router.get("/getExp",authenticate.isAuthenticated, authenticate.isAuthorized(["DOCTOR", "ADMIN"]), medicineController.findMedicinesExpire);
router.get("/getDetail",authenticate.isAuthenticated, authenticate.isAuthorized(["DOCTOR", "ADMIN"]), medicineController.findMedicineDetail);
router.post("/create",authenticate.isAuthenticated, authenticate.isAuthorized(["ADMIN"]), medicineController.createMedicine);
router.put("/update",authenticate.isAuthenticated, authenticate.isAuthorized(["ADMIN"]), medicineController.updateMedicine);
router.put("/delete",authenticate.isAuthenticated, authenticate.isAuthorized(["ADMIN"]), medicineController.removeMedicine);


module.exports = router;