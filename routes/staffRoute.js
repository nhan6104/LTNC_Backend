const staffController = require("../controller/staffController");
const authenticatedUser = require("../lib/auth")
const express = require("express");
const { route } = require("./patientRoute");
const router = express.Router();

router.post("/create", authenticatedUser.isAuthenticated, authenticatedUser.isAuthorized(["ADMIN"]), staffController.createStaff);
router.post("/detail", authenticatedUser.isAuthenticated, authenticatedUser.isAuthorizedFinding(["ADMIN", "DOCTOR", "NURSE"]), staffController.detailStaff);
router.put("/delete", authenticatedUser.isAuthenticated, authenticatedUser.isAuthorized(["ADMIN"]), staffController.removeStaff);
router.put("/update", authenticatedUser.isAuthenticated, authenticatedUser.isAuthorized(["ADMIN"]), staffController.updateStaff);
router.get("/getalldoctor",staffController.getAlldoctor)

module.exports = router;