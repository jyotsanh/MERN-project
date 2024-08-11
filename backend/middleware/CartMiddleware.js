const userSchema = require("../schema/userSchema");
const ProductSchemadb = require("../schema/ProductSchema");
const CartSchemadb = require("../schema/CartSchema");


const CartMiddleWare = async (req, res, next) => {
   
    try{
        console.log("Cart MiddleWare")
        
        const {userId,items}= req.body; // take the user id, items he wants to add in cart
       
        try{
            const userExists = await userSchema.findById(userId); // see if the user exists
            if (!userExists) {
                return res.status(400).json(
                    { 
                        message: 'userId doesnt exist' 
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
                
                const productExists = await ProductSchemadb.findById(item.productId); // see if the product exists in ProductSchemadb
                
                if (!productExists) {
                    return res.status(400).json(
                        { 
                            message: `Product with id: ${item.productId} doesn't exist` 
                        }
                        );
                }
            }
        }catch(err){
            console.log(err)
            return res.status(400).send({
                msg:"Invalid ProductId",
                
            })
        }

        try{ // In this try block a same user won't be able to add same product more than once
            const cart_data = await CartSchemadb.find({ userId: userId });   
            console.log(cart_data.length)
            if (cart_data.length>0){ // checks if the user with this id has any cart in schema or not

                Schema_items = cart_data[0].items

                // Iterate over the new items
                items.forEach(newItem => {
                    const existingItemIndex = Schema_items.findIndex(cartItem => cartItem.productId.toString() === newItem.productId);
        
                    if (existingItemIndex === -1) {
                        // If the item does not exist, add it to the cart
                        Schema_items.push(newItem);
                    }
                });

                // Save the updated cart data back to the database
                await CartSchemadb.updateOne(
                    { userId: userId },
                    { $set: { items: Schema_items } }
                );
                const updated_cart_data = await CartSchemadb.find({ userId: userId });
                return res.status(200).send({
                    
                    "status":"This userId has cart items in database",
                    
                    "updated-items":updated_cart_data
                })
            }
        }catch(err){
            console.log(err)
            return res.status(400).send({
                msg:"Internal Error",
                
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