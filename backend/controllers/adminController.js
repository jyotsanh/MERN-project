const AdminSchema = require("../schema/adminSchema");
const AdminLogInController = async (request,response) => {
    return response.send({
        "msg":request.body
    })
}

const AdminRegisterController =async (request,response)=>{
    return response.send({
        "msg":request.body
    })
}

exports.AdminLogInController = AdminLogInController;
exports.AdminRegisterController = AdminRegisterController;