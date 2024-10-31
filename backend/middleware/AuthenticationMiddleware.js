const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const AuthenticationMiddleware = (req, res, next) => {
    try{
        const token = req.headers['authorization'];
        console.log(`Token: ${token}`)
        if (!token) {
            return res.status(403).send(
                { msg: 'No token provided.' } // for deployment : { msg: 'You are not authorized' }
            );
        }

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            try{
                if (err) {
                    console.log(err) // prints error if token is expired
                    return res.status(500).send(
                        { msg: 'Failed to authenticate token.' }
                    );
                }
            }catch(err){
                return res.status(500).send(
                    { 
                        msg: 'Server Error'
                     }
                    );
            }
            console.log(`Decoded: ${decoded.role}`)
            if (decoded.role !== 'admin') {
                return res.status(403).send({ msg: 'You are not authorised' });
            }

            // If everything is good, save the decoded token to the request for use in other routes
            req.userId = decoded.id;
            console.log(`Decoded ID by MiddleWare: ${req.userId}`)
            next();
        });
    }catch(err){
        return res.status(500).send(
            { 
                msg: 'Server Error'
             }
            );
    }
};

const UserAuthenticationMiddleware = (req, res, next) => {
    try{
        const token = req.headers['authorization'];
        console.log(`Token: ${token}`)
        if (!token) {
            return res.status(403).send(
                { msg: 'No token provided.' } // for deployment : { msg: 'You are not authorized' }
            );
        }
        console.log(`Now here`)
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                console.log(`Error : ${err}`)
                return res.status(500).send(
                    { msg: 'Failed to authenticate token.' } // for deployment : { msg: 'You are not authorized' }
                );
            }
            console.log(`Decoded: ${decoded.role}`)
            if (decoded.role !== 'user') {
                console.log("Admin is not supposed to add to cart")
                return res.status(403).send({ msg: 'Admin is not supposed to add to cart' });
            }

            // If everything is good, save the decoded token to the request for use in other routes
            req.body.userId = decoded.id;
            if (!mongoose.Types.ObjectId.isValid(req.body.userId)) {
                return res.status(400).send({
                    msg: "Invalid userId"
                });
            }
        
            console.log(`Decoded ID by MiddleWare: ${req.body.userId}`)
            console.log("All checks are passed for User Authentication Middleware")
            next();
        });
    }catch(err){
        return res.status(500).send({
            msg:"server error",
            error:err
        });
    }
};

const CheckIncomingOrderMiddleWare = async (req, res, next) => {
    const { products, total_price, status, shipping_address,payment_method } = req.body;
    console.log(req.body)
    // Check if all required fields are present
    if (!products || !total_price || !shipping_address || !payment_method) {
        return res.status(400).send({
            msg: "All fields are required"
        });
    }

    // Check if userId is a valid ObjectId
    
    // Check if total_price is a number, if it's a string, convert it to a number
    if (typeof total_price === 'string') {
        const convertedPrice = Number(total_price);
        if (isNaN(convertedPrice)) {
            return res.status(400).send({
                msg: "total_price must be a valid number"
            });
        }
        req.body.total_price = convertedPrice;
    } else if (typeof total_price !== 'number') {
        return res.status(400).send({
            msg: "total_price must be a number"
        });
    }
    
    // Validate each product in the products array
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const { product_id, quantity, price } = product;
        
        if (!product_id || !quantity || !price) {
            return res.status(400).send({
                msg: `Product at index ${i} is missing required fields`
            });
        }

        if (!mongoose.Types.ObjectId.isValid(product_id)) {
            return res.status(400).send({
                msg: `Invalid product_id at index ${i}`
            });
        }

        if (typeof quantity !== 'number' || quantity <= 0) {
            return res.status(400).send({
                msg: `Invalid quantity at index ${i}`
            });
        }

        if (typeof price !== 'number' || price <= 0) {
            return res.status(400).send({
                msg: `Invalid price at index ${i}`
            });
        }
    }
    console.log("All checks passed for Incoming Order Middleware")
    // If all checks pass, move to the next middleware
    next();
};


module.exports = {
    AuthenticationMiddleware,
   UserAuthenticationMiddleware,
    CheckIncomingOrderMiddleWare,
};