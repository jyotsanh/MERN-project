const express = require("express");
router = express.Router()

const LoginMiddleware = require("../middleware/loginmiddleware")
const RegisterMiddleware = require("../middleware/registermiddleware")
const {UserLogInController,UserRegisterController} = require("../controllers/userContoller");

router.post("/user-login",LoginMiddleware,UserLogInController)
router.post("/user-register",RegisterMiddleware,UserRegisterController)

module.exports = router;