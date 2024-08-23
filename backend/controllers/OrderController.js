const bcrypt = require("bcrypt")
const OrderSchemadb = require("../schema/orderSchema");
const OrderDataSchemadb = require("../schema/OrderDataSchemadb");

const AddOrderController = async (req,res) => {
    try{
        console.log(`Here is the OrderSchemadb ${req.body}`);
        const order_data = await OrderSchemadb.create(req.body);
        if(order_data){
            return res.send({
                "Order":order_data
            })
        }else{
            return res.send({
                "msg":"no data in db"
            })
        }
    }catch(err){
        return res.status(500).send({
            msg:"server error",
            error:err
        })
    }
}

const CompletedOrderController = async (req,res) => {
    const order_data = await OrderScheOrderDataSchemadbmadb.find();
    if(order_data){
        return res.send({
            "Order":order_data
        })
    }else{
        return res.send({
            "msg":"no data in db"
        })
    }
}

exports.AddOrderController = AddOrderController;
exports.CompletedOrderController = CompletedOrderController;