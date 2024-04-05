const patientController = require("../controller/patientController");
const express = require("express");
const authenticate = require("../lib/auth");
const router = express.Router();

router.post("/create", patientController.createPatient);



module.exports = router;

