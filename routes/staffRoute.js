const staffController = require("../controller/staffController");
const authenticatedUser = require("../lib/auth")
const express = require("express");
const { route } = require("./patientRoute");
const router = express.Router();

router.post("/create", staffController.createStaff);
router.post("/detail", staffController.detailStaff);
router.put("/delete", staffController.removeStaff);

module.exports = router;