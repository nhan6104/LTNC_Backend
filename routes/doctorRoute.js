const autheticateController = require("../controller/autheticateController");
const express = require("express");
const router = express.Router();
const authenticate = require("../lib/auth");

router.post("/login", autheticateController.login);

module.exports = router;