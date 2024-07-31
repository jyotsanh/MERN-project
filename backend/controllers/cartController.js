const CartSchemadb = require("../schema/CartSchema");


const AddToCart = async (req,res) => {
    try{
        const items = req.body.items
        let total_price = 0;
        for (const item of items) {
            const price = item.price;
            total_price = total_price + price;
        }
        req.body.total_price = total_price;
        console.log(`Here is the CartSchemadb ${req.body}`); // remove while deployment 
        const cart_data = await CartSchemadb.create(req.body);
        if(cart_data){
            return res.status(200).send({
                "Cart":cart_data,
                "status":"data added successfully",
                "msg":"data in db"
            })
        }else{
            return res.status(400).send({
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

const GetCartItems = async (req,res) => {
    try{

        const cart_data = await CartSchemadb.find({ userId: req.userId });
        if(cart_data){
            return res.send({
                "Cart":cart_data
            })
        }else{
            return res.send({
                "msg":"no data in db"
            })
        }
    }catch(err){
        return res.send({
            msg:"server error",
            error:err
        })
    }
}

const DelCartItems = async (req,res) => {
    try{
        const cart_data = await CartSchemadb.findByIdAndDelete(req.params.id);
        if(cart_data){
            return res.send({
                "Cart":cart_data
            })
        }else{
            return res.send({
                "msg":"no data in db"
            })
        }
    }catch(err){
        return res.send({
            msg:"server error",
            error:err
        })
    }
}

exports.AddToCart=AddToCart;
exports.GetCartItems=GetCartItems;
exports.DelCartItems=DelCartItems;