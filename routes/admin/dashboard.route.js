const express = require('express')
const router = express.Router()  // router là app
const controller= require("../../controllers/admin/dashboard.controllers.js")


router.get("/",controller.index)   // import function



module.exports = router  // exports ra thì ở những file khác mới dùng được nó