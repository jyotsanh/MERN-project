const mongoose = require("mongoose")

const AdminSchema = ({

    email: {
        type: String
    },

    password: {
        type: String
    },

    isAdmin: {
        type: Boolean
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
