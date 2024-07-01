
const AddProductMiddleware   = (request,response,next)=>{
    if (request.body){
        const {name,price,description,category,quantity} = request.body;
        if(!name){
            return response.status(400).send({
                "name":"name key is not provide"
            })
        }
        if(!price){
            return response.status(400).send({
                "price":"price key is not provide"
            })
        }
        if(!description){
            return response.status(400).send({
                "description":"description key is not provide"
            })
        }
        if(!category){
            return response.status(400).send({
                "category":"category key is not provide"
            })
        }
        if(!quantity){
            return response.status(400).send({
                "quantity":"quantity key is not provide"
            })
        }
        if(isNaN(price)){
            return response.status(400).send({
                "price":"price key is not number"
            })
        }
        if(isNaN(quantity)){
            return response.status(400).send({
                "quantity":"price key is not number"
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