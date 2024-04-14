const medicineController = require("../controller/medicineController");
const express = require("express");
const authenticate = require("../lib/auth");
const router = express.Router();

router.get("/getData", medicineController.findMedicines);
router.get("/getExp",medicineController.findMedicinesExpire);
router.get("/getDetail/:id",medicineController.findMedicineDetail);
router.post("/create",medicineController.createMedicine);
router.delete("/delete/:id",medicineController.removeMedicine);


module.exports = router;