const RegisterMiddleware  = (request,response,next)=>{
    if (request.body){

        let {email,password,password2,username,isAdmin} = request.body;
        if (isAdmin ===undefined) {
            isAdmin = false;
        }
        if(!email){
            return response.send({
                "msg":"email key is not provide"
            })
        }
        if(!password || !password2){
            return response.send({
                "msg":"password key is not provide"
            })
        }


        if(!username){
            return response.send({
                "msg":"username key is not provide"
            })
        }

        if(password !== password2){
            return response.send({
                "msg":" password is not same"
            })
        }
        next();
    }else{
        return response.send({
            "msg":"error occured"
        })
    }
}

module.exports = RegisterMiddleware;