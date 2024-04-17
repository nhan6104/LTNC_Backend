const patientController = require("../controller/patientController");
const express = require("express");
const router = express.Router();
const authenticatedUser = require("../lib/auth")


router.post("/create_patient",authenticatedUser.isAuthenticated, authenticatedUser.isAuthorized(["ADMIN"]), patientController.createPatient);
router.post("/create_records",authenticatedUser.isAuthenticated, authenticatedUser.isAuthorized(["DOCTOR", "ADMIN"]), patientController.createRecords);
router.put("/remove_patient", authenticatedUser.isAuthenticated, authenticatedUser.isAuthorized(["DOCTOR", "ADMIN"]),patientController.removePatient);
router.put("/remove_records", authenticatedUser.isAuthenticated, authenticatedUser.isAuthorized(["DOCTOR", "ADMIN"]),patientController.removeRecords);
router.put("/update_patient", authenticatedUser.isAuthenticated, authenticatedUser.isAuthorized(["DOCTOR", "ADMIN"]),patientController.updatePatientData);
router.get("/find_treatment",patientController.treatmentProcessByID);
router.get("/find_patient" ,patientController.findPatient);
router.get("/find_patient_all" ,patientController.findAllPatient);
router.get("/find_records", patientController.findRecords);


module.exports = router;

