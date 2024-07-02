
const AppointmentMiddleware  = (request,response,next)=>{
    if (request.body){
        const {name,address,phone,prefered_date,prefered_time,location} = request.body;
        if(!name){
            return response.status(400).send({
                "name":"name key is not provide"
            })
        }
        if(!address){
            return response.status(400).send({
                "address":"address key is not provide"
            })
        }
        if(!phone){
            return response.status(400).send({
                "phone":"phone key is not provide"
            })
        }
        if(!prefered_date){
            return response.status(400).send({
                "prefered_date":"prefered_date key is not provide"
            })
        }
        if(!prefered_time){
            return response.status(400).send({
                "prefered_time":"prefered_time key is not provide"
            })
        }
        
        if(!location){
            return response.status(400).send({
                "location":"location key is not provide"
            })
        }
        if(isNaN(phone)){
            return response.status(400).send({
                "phone":"phone key is not number"
            })
        }
        next();
    }else{
        return response.status(400).send({
            "msg":"request.body error"
        })
    }
}

module.exports = AppointmentMiddleware;