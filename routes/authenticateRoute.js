const autheticateController = require("../controller/autheticateController");
const express = require("express");
const router = express.Router();

router.post("/login", autheticateController.login);

module.exports = router;