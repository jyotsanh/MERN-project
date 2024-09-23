const PayementMiddleWare = async (req, res, next) => {
    try{
        console.log("Payement MiddleWare");

        const {userId,products}= req.body; // take the user id, items he wants to add in cart

        console.log(`Data ready to go for Payment ${req.body}`);
        console.log("-")
        console.log("--------------Payment Sucessfull--------------")
        console.log("-")
        next();
    }catch(err){
        return res.status(500).send({
            msg:"Server Error",
            error:err
        })
    }
}

exports.PayementMiddleWare = PayementMiddleWare;