const medicineController = require("../controller/medicineController");
const express = require("express");
const authenticate = require("../lib/auth");
const router = express.Router();

router.get("/", medicineController.findMedicines);

module.exports = router;

