const patientController = require("../controller/patientController");
const express = require("express");
const router = express.Router();
const authenticatedUser = require("../lib/auth")


router.post("/create_patient",authenticatedUser.isAuthenticated, authenticatedUser.isAuthorized(["ADMIN"]), patientController.createPatient);
router.post("/create_records",authenticatedUser.isAuthenticated, authenticatedUser.isAuthorized(["DOCTOR", "ADMIN"]), patientController.createRecords);
router.post("/register_patient",authenticatedUser.isAuthenticated, authenticatedUser.isAuthorized(["DOCTOR", "ADMIN"]), patientController.registerPatient);
router.put("/remove_patient", authenticatedUser.isAuthenticated, authenticatedUser.isAuthorized(["DOCTOR", "ADMIN"]),patientController.removePatient);
router.put("/remove_records", authenticatedUser.isAuthenticated, authenticatedUser.isAuthorized(["DOCTOR", "ADMIN"]),patientController.removeRecords);
router.put("/update_patient", authenticatedUser.isAuthenticated, authenticatedUser.isAuthorized(["DOCTOR", "ADMIN"]),patientController.updatePatientData);
router.put("/update_status",authenticatedUser.isAuthenticated, authenticatedUser.isAuthorized(["DOCTOR", "ADMIN"]), patientController.updateStatusPatient);
router.put("/complete_healing",authenticatedUser.isAuthenticated, authenticatedUser.isAuthorized(["DOCTOR", "ADMIN"]), patientController.completeHealing);
router.get("/find_treatment", authenticatedUser.isAuthenticated, authenticatedUser.isAuthorized(["DOCTOR", "ADMIN"]),patientController.treatmentProcessByID);
router.get("/find_patient", authenticatedUser.isAuthenticated, authenticatedUser.isAuthorized(["DOCTOR", "ADMIN"]),patientController.findPatient);
router.get("/find_patient_all", authenticatedUser.isAuthenticated, authenticatedUser.isAuthorized(["DOCTOR", "ADMIN"]),patientController.findAllPatient);
router.get("/find_records", authenticatedUser.isAuthenticated, authenticatedUser.isAuthorized(["DOCTOR", "ADMIN"]), patientController.findRecords);
router.get("/find_patient_in_queue",authenticatedUser.isAuthenticated, authenticatedUser.isAuthorized(["DOCTOR", "ADMIN"]), patientController.findPatientsInQueue);

module.exports = router;

