const patientController = require("../controller/patientController");
const express = require("express");
const router = express.Router();
const authenticatedUser = require("../lib/auth")


router.post("/create_patient",authenticatedUser.isAuthenticated, authenticatedUser.isAuthorized(["DOCTOR"]), patientController.createPatient);
router.post("/create_records",authenticatedUser.isAuthenticated, authenticatedUser.isAuthorized(["DOCTOR"]), patientController.createRecords);
router.put("/remove_patient", authenticatedUser.isAuthenticated, authenticatedUser.isAuthorized(["DOCTOR"]),patientController.removePatient);
router.put("/remove_records", authenticatedUser.isAuthenticated, authenticatedUser.isAuthorized(["DOCTOR"]),patientController.removeRecords);
router.put("/update_patient", authenticatedUser.isAuthenticated, authenticatedUser.isAuthorized(["DOCTOR"]),patientController.updatePatientData);
router.get("/find_treatment", authenticatedUser.isAuthenticated, authenticatedUser.isAuthorized(["DOCTOR"]),patientController.treatmentProcessByID);
router.get("/find_patient", authenticatedUser.isAuthenticated, authenticatedUser.isAuthorized(["DOCTOR"]),patientController.findPatient);
router.get("/find_patient_all", authenticatedUser.isAuthenticated, authenticatedUser.isAuthorized(["DOCTOR"]),patientController.findAllPatient);
router.get("/find_records", authenticatedUser.isAuthenticated, authenticatedUser.isAuthorized(["DOCTOR"]), patientController.findRecords);


module.exports = router;

