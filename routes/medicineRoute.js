const medicineController = require("../controller/medicineController");
const express = require("express");
const authenticate = require("../lib/auth");
const router = express.Router();

router.get("/", medicineController.findMedicines);
router.get("/exp", medicineController.findMedicinesExpire);
router.post("/", medicineController.createMedicine);
router.delete("/:id", medicineController.removeMedicine);

module.exports = router;

