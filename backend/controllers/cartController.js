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
        
        
 // remove while deployment 
        try{ 
            const cart_data = await CartSchemadb.create(req.body);
            
            if(cart_data){
                return res.status(200).send({
                    "Cart":cart_data,
                    "status":"data added successfully",
                    
                })

            }
            console.log("cart data added successfully")
        }catch(err){
            return res.status(500).send({
                msg:"Insertion in Database error",
                error:err
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

        const cart_data = await CartSchemadb.find({ userId: req.body.userId });
        if(cart_data.length > 0){
            console.log("data is fetched")
            
            console.log(cart_data)
            return res.send({
                "Cart":cart_data[0]
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

const DelCartItems = async (req, res) => {
    try {
        const userId = req.body.userId; // Assuming you store the user ID in the JWT payload
        const { productId } = req.body;
        console.log("product id")
        console.log(productId)
        // Find the cart and update it by removing the specific item
        if (productId == "" || productId == null || productId == undefined) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }
            const cart = await CartSchemadb.findOneAndUpdate(
                { userId },
                { $pull: { items: { productId } } },
                { new: true, runValidators: true } // Ensure the new document is returned and validators run on the update
            );
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }
            console.log("---------------")
            console.log(cart.items.length)
        
        
        console.log("No error")

        // Recalculate the total price if there are still items in the cart
        if (cart.items.length > 0) {
            const updatedTotalPrice = cart.items.reduce((acc, item) => acc + item.price, 0);
            cart.total_price = updatedTotalPrice;
            await cart.save();
            return res.status(200).json({
                message: 'Item removed from cart.',
                cart: cart
            });
        } else {
            // Optionally, you can delete the cart if no items remain
            await CartSchemadb.deleteOne({ _id: cart._id });
            return res.status(200).json({
                message: 'Item removed from cart. Cart is now empty and has been deleted.',
                cart: cart
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Failed to remove item from cart',
            error: error.message
        });
    }
};


module.exports = {
    AddToCart,
    GetCartItems,
    DelCartItems
};
