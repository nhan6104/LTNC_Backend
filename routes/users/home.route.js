const express = require('express')
const router = express.Router()  // router là app
const controller_home = require("../../controllers/users/home.controllers.js")


router.get("/",controller_home.index)   // import function



module.exports = router  // exports ra thì ở những file khác mới dùng được nó