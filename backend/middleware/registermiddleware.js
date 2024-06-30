const RegisterMiddleware  = (request,response,next)=>{
    if (request.body){

        const {email,password,password2,username} = request.body;
        
        if(!email){
            return response.status(400).send({
                "email":"email key is not provide"
            })
        }
        if(!password || !password2){
            return response.status(400).send({
                "password":"password key is not provide"
            })
        }


        if(!username){
            return response.status(400).send({
                "username":"username key is not provide"
            })
        }

        if(password !== password2){
            return response.status(400).send({
                "password":" password is not same"
            })
        }
        next();
    }else{
        return response.status(400).send({
            "msg":"request.body error"
        })
    }
}

module.exports = RegisterMiddleware;