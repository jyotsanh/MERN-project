const UserSchema = require("../schema/userSchema");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = process.env.SECRET_KEY
const generateToken = (user) => {
    return jwt.sign({ id: user.id, role: user.role,username:user.username }, SECRET_KEY, { expiresIn: '1h' });
  };
const UserLogInController = async (req,res)=>{
    try {
        const { email, password } = req.body
        
        //before creating a new user, check if there is a user in the DB with the same email
        const foundUser = await UserSchema.findOne({ email: email })
        if (foundUser) {
            const passwordMatch = await bcrypt.compare(password, foundUser.password);
            console.log(password) // remove this line while deploying
            if (passwordMatch) {
                const token = generateToken(foundUser);
                delete foundUser.password;
                res.status(200).json({
                    msg: "Logged in successfully",
                    id: foundUser._id,
                    email: foundUser.email,
                    phoneNumber: foundUser.phoneNumber,
                    userRole: foundUser.role,
                    token: token
                })
            } else {
                res.status(401).json({
                    password: "Email or Password doesn't match",
                })
            }

        } else {
            res.status(404).json({
                password: "Email or Passowrd doesn't match"
            })
        }

    } catch (error) {
        res.status(401).json({
            msg: "Internal Server Error",
        })
    }
}

const UserRegisterController = async (req,res) => {
    try {
        // email we get from the frontend in req
        const { email, username } = req.body;
        //before creating a new user, check if there is a user in the DB with the same email
        const foundEmail = await UserSchema.findOne({ email: email })
        // if found tell the user in response, can't sign up os email exists

        const foundUser = await UserSchema.findOne({ username: username })
        if (foundEmail) {
            res.status(404).json({
                email: "Email already exists"
            })
        }
        else if(foundUser){
            res.status(404).json({
                username: "User with username already exists"
            })
        }
        else {
            const encryptedPassword = await bcrypt.hash(req.body.password, 10)
            req.body.password = encryptedPassword
            // if the email is not found in DB, create a user using that email
            const newUser = new UserSchema(req.body);
            const data = await newUser.save();
            if (data) {
                const token = generateToken(newUser);
                res.status(200).json({
                    msg: "User registered",
                    email: req.body.email,
                    token: token
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

exports.UserLogInController = UserLogInController;
exports.UserRegisterController = UserRegisterController;