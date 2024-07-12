
const bcrypt = require("bcrypt")
const AppointmentSchemadb = require("../schema/AppointmentSchemadb");


const AppointmentController = async (req,res)=>{
    try{
    console.log("request body : ",req.body)
    const {name,address,phone,prefered_date,prefered_time,location} = req.body;
    const prescription = `uploads/Prescription/${name}/${req.file.filename}`
    const data = await AppointmentSchemadb.create({name,address,phone,prefered_date,prefered_time,location,prescription});
    
    if (data){
        return res.status(200).send(
            {
                msg:"Data added successfully"
            }
        );
    }else{
        return res.status(400).send({msg:"Data scehema error"});
    }
}catch(error){
    return res.status(400).send({msg:"Server here Error",error:error});
}
}

const Appointments = async (req,res)=>{
    const data = await AppointmentSchemadb.find();
    if (data){
        return res.status(200).send(data);
    }else{
        return res.status(400).send({msg:"Data scehema Not found"});
    }
}

exports.AppointmentController = AppointmentController;
exports.Appointments = Appointments;