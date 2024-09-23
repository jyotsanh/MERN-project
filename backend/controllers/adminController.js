const AdminSchema = require("../schema/adminSchema");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const OrderSchemadb = require("../schema/orderSchema");


const SECRET_KEY = process.env.SECRET_KEY


const generateToken = (user) => {
    return jwt.sign({ id: user.id, role: user.role,username:user.username }, SECRET_KEY, { expiresIn: '1h' });
  };

const LoginAdmin = async (req, res) => {
    try{
        const { email, password } = req.body;
        console.log(email, password)
        const foundUser = await AdminSchema.findOne({ email: email })
        if (!foundUser) {
                return res.status(400).send({
                    "msg":"Email or Password doesn't match"
                });
        } else{
    
                const validPassword = bcrypt.compareSync(password, foundUser.password);
                if (!validPassword) {
                        return res.status(400).send({
                            "msg":"Email or Password doesn't match"
                        });
                }
            
                const token = generateToken(foundUser);
                delete foundUser.password
                res.send({
                    
                    msg: "Logged in successfully",
                    "token": token,
                    id: foundUser._id,
                    email: foundUser.email

                });
        }
    }catch(error){
        return res.status(400).send({
            "msg":"Server here Error",
            "error":error
        })
    }
};

const AdminRegisterController = async (req,res)=>{
    try {
        // email we get from the frontend in req
        const { email, username } = req.body;
        //before creating a new user, check if there is a user in the DB with the same email
        const foundEmail = await AdminSchema.findOne({ email: email })
        // if found tell the user in response, can't sign up os email exists

        const foundUser = await AdminSchema.findOne({ username: username })
        if (foundEmail) {
            res.status(404).json({
                msg: "Email already exists"
            })
        }
        else if(foundUser){
            res.status(404).json({
                msg: "User with username already exists"
            })
        }
        else {
            const encryptedPassword = await bcrypt.hash(req.body.password, 10)
            req.body.password = encryptedPassword
            // if the email is not found in DB, create a user using that email
            const data = await AdminSchema.create(req.body)
            if (data) {
                res.status(200).json({
                    msg: "User registered",
                    email: req.body.email
                })
                // if no response from DB, send error res to teh front end
            } else {
                res.status(403).json({
                    msg: "User registration failed."
                })
            }
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Server error"
        })
    }
}
const fetchOrders = async (req, res) => {
    try {
        const orders = await OrderSchemadb.find().populate('products'); // Adjust the populate method based on your schema
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error. Could not fetch orders.' });
    }
};

exports.AdminRegisterController = AdminRegisterController;
exports.LoginAdmin = LoginAdmin;
exports.fetchOrders = fetchOrders;