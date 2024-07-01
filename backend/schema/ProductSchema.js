const mongoose = require("mongoose")

const ProductSchema = ({

    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true
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

const ProductSchemadb = mongoose.model("Product", ProductSchema)

module.exports = ProductSchemadb;
