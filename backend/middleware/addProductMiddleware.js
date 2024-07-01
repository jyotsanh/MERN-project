
const AddProductMiddleware   = (request,response,next)=>{
    if (request.body){
        const {name,price,description,category,imageUrl,quantity} = request.body;
        if(!name){
            return response.status(400).send({
                "msg":"name key is not provide"
            })
        }
        if(!price){
            return response.status(400).send({
                "msg":"price key is not provide"
            })
        }
        if(!description){
            return response.status(400).send({
                "msg":"description key is not provide"
            })
        }
        if(!category){
            return response.status(400).send({
                "msg":"category key is not provide"
            })
        }
        if(!quantity){
            return response.status(400).send({
                "msg":"quantity key is not provide"
            })
        }
        next();
    }else{
        return response.status(400).send({
            "msg":"request.body error"
        })
    }
}

module.exports = AddProductMiddleware;