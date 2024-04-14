const medicineController = require("../controller/medicineController");
const express = require("express");
const authenticate = require("../lib/auth");
const router = express.Router();

router.get("/getData", medicineController.findMedicines);
router.get("/getExp", medicineController.findMedicinesExpire);
router.get("/getDetail", medicineController.findMedicineDetail);
router.post("/create", medicineController.createMedicine);
router.put("/delete", medicineController.removeMedicine);


module.exports = router;