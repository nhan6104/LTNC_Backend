const express = require('express')
const router = express.Router()  // router là app
const controller_home = require("../../controller/admin/dashboard.controller")


router.get("/",controller_home.index)   // import function



module.exports = router  
