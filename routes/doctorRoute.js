const autheticateController = require("../controller/authController");
const express = require("express");
const router = express.Router();
const authenticate = require("../lib/auth");

router.post("/login", autheticateController.login);

module.exports = router;