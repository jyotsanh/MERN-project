const LoginMiddleware   = (request,response,next)=>{
    if (request.body){

        const {email} = request.body;
        const {password} = request.body;
        
        if(!email){
            return response.status(400).send({
                "msg":"email key is not provide"
            })
        }
        if(!password){
            return response.status(400).send({
                "msg":"password key is not provide"
            })
        }
        if (Number.isInteger(password)) { // checks if the password is Integer , true : changes to string , else:next()
            request.body.password = password.toString();
        }
        next();
    }else{
        return response.status(400).send({
            "msg":"request.body error"
        })
    }
}

module.exports = LoginMiddleware;