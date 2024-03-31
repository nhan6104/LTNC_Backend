const patientController = require("../controller/patientController");
const express = require("express");
const router = express.Router();

router.post("/create", patientController.ceatePatient);

module.exports = router;
