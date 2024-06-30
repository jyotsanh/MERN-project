const express = require("express");
router = express.Router()
const LoginMiddleware = require("../middleware/loginmiddleware")
const RegisterMiddleware = require("../middleware/registermiddleware")
const {AdminLogInController,AdminRegisterController} = require("../controllers/adminController");


router.post("/admin-login",LoginMiddleware,AdminLogInController)
router.post("/admin-register",RegisterMiddleware,AdminRegisterController)

module.exports = router;