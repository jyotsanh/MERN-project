const express = require("express");
router = express.Router()
const LoginMiddleware = require("../middleware/loginmiddleware")
const RegisterMiddleware = require("../middleware/registermiddleware")
const {AdminRegisterController,LoginAdmin} = require("../controllers/adminController");


router.post("/admin-login",LoginMiddleware,LoginAdmin)
router.post("/admin-register",RegisterMiddleware,AdminRegisterController)

module.exports = router;