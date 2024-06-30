const mongoose = require("mongoose")

const UserSchema = ({

    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    username:{
        type: String,
        unique: true
    },
    password: {
        type: String,
        
    },

    role: {
        type: String,
        default: "user"
    },

    createdAt: {
         type: Date, 
         default: Date.now 
        },

    updatedAt: { 
        type: Date, 
        default: Date.now 
    }

})

const User = mongoose.model("User", UserSchema)

module.exports = User;
