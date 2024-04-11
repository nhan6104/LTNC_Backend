const patientController = require("../controller/patientController");
const express = require("express");
const authenticate = require("../lib/auth");
const router = express.Router();

router.post("/create_patient", patientController.createPatient);
router.post("/create_records", patientController.createRecords);
router.put("/remove_patient", patientController.removePatient);
router.put("/remove_records", patientController.removeRecords);
router.put("/update_patient", patientController.updatePatientData);
router.post("/find_treatment", patientController.treatmentProcessByID);
router.post("/find_patient", patientController.findPatient);
router.post("/find_patient_all", patientController.findAllPatient);
router.post("/find_records", patientController.findRecords);


module.exports = router;

