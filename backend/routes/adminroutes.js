const express = require("express");
router = express.Router()
const LoginMiddleware = require("../middleware/loginmiddleware")
const RegisterMiddleware = require("../middleware/registermiddleware")
const {AdminLogInController,AdminRegisterController} = require("../controllers/adminController");


router.post("/login",LoginMiddleware,AdminLogInController)


router.post("/register",RegisterMiddleware,AdminRegisterController)

module.exports = router;