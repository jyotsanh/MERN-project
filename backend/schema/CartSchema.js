const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model to reference
        required: true
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProductSchemadb', //should match the exports schema name
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        category: [{
            type: String,
            required: true
        }]
    }],
    total_price: {
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
});

// Pre-save middleware to update the updatedAt field
CartSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const CartSchemadb = mongoose.model("Cart", CartSchema);

module.exports = CartSchemadb;
