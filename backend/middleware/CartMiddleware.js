const userSchema = require("../schema/userSchema");
const ProductSchemadb = require("../schema/ProductSchema");



const CartMiddleWare = async (req, res, next) => {
   
    try{
        console.log("Cart MiddleWare")
        
        const {userId,items}= req.body; // take the user id, items he wants to add in cart
        console.log(` User Id : =>${userId}`)
        try{
            const userExists = await userSchema.findById(userId);
            if (!userExists) {
                return res.status(400).json(
                    { 
                        message: 'Invalid userId' 
                    }
                );
            } // if user exists
        }catch(err){
            return res.status(400).send({
                msg:"Invalid UserId",
                
            })
        }

        try{
             // Validate productIds
            for (const item of items) {
                console.log(`=> ${item.productId}`)
                console.log(`items => ${item}`)
                const productExists = await ProductSchemadb.findById(item.productId);
                if (!productExists) {
                    return res.status(400).json(
                        { 
                            message: `Invalid productId: ${item.productId}` 
                        }
                        );
                }
            }
        }catch(err){
            return res.status(400).send({
                msg:"Invalid ProductId",
                
            })
        }
        next();
    }catch(err){
        return res.status(400).send({
            msg:"middleware server  error",
            error:err
        })
    }
};

exports.CartMiddleWare = CartMiddleWare;