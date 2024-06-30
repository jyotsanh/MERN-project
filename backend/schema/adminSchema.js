const mongoose = require("mongoose")

const AdminSchema = ({

    email: {
        type: String
    },

    password: {
        type: String
    },

    username:{
        type: String
    },

    role: {
        type: String,
        default: "admin"
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

const AdminUser = mongoose.model("AdminUser", AdminSchema)

module.exports = AdminUser;
