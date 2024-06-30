const { request, response } = require("express");

const LoginMiddleware   = (request,response,next)=>{
    if (request.body){

        const {email} = request.body;
        const {password} = request.body;
        
        if(!email){
            return response.send({
                "msg":"email key is not provide"
            })
        }
        if(!password){
            return response.send({
                "msg":"password key is not provide"
            })
        }
        next();
    }else{
        return response.send({
            "msg":"error occured"
        })
    }
}

module.exports = LoginMiddleware