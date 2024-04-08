const staffController = require("../controller/staffController");
const express = require("express");
const router = express.Router();

router.post("/create", staffController.createStaff);

module.exports = router;