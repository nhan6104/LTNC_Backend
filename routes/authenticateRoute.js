const autheticateController = require("../controller/autheticateController");
const express = require("express");
const router = express.Router();
const authenticatedUser = require("../lib/auth")

router.post("/login", autheticateController.login);
router.post("/logout", autheticateController.logout);

module.exports = router;