const staffController = require("../controller/staffController");
const express = require("express");
const { route } = require("./patientRoute");
const router = express.Router();

router.post("/create", staffController.createStaff);
router.get("/detail", staffController.detailStaff);


module.exports = router;