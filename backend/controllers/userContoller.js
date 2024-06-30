const UserSchema = require("../schema/userSchema");
const bcrypt = require("bcrypt")

const UserLogInController = async (req,res)=>{
    try {
        const { email, password } = req.body
        //before creating a new user, check if there is a user in the DB with the same email
        const foundUser = await UserSchema.findOne({ email: email })
        if (foundUser) {
            const passwordMatch = await bcrypt.compare(password, foundUser.password);
            if (passwordMatch) {
                delete foundUser.password
                res.status(200).json({
                    msg: "Logged in successfully",
                    id: foundUser._id,
                    email: foundUser.email,
                    phoneNumber: foundUser.phoneNumber,
                    userRole: foundUser.role
                })
            } else {
                res.status(401).json({
                    password: "Password invalid",
                })
            }

        } else {
            res.status(404).json({
                password: "Email doesn't exists"
            })
        }

    } catch (error) {
        console.log("Server error")
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
            const data = await UserSchema.create(req.body)
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

exports.UserLogInController = UserLogInController;
exports.UserRegisterController = UserRegisterController;