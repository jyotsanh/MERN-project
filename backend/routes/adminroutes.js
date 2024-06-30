const express = require("express");
router = express.Router()
const LoginMiddleware = require("../middleware/loginmiddleware")
const RegisterMiddleware = require("../middleware/registermiddleware")

router.post("/login",LoginMiddleware,(request,response)=>{
    return response.send({
        "data":request.body
    })
})


router.post("/register",RegisterMiddleware,(request,response)=>{
    return response.send({
        "data":request.body
    })
})

module.exports = router;