const mongoose = require('mongoose');

const EsewaPaymentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference the User model
        required: true
    },
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order', // Reference the Order model
        required: true
    },
    transaction_id: {
        type: String, // Store the transaction ID provided by eSewa
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    payment_status: {
        type: String, 
        enum: ['Pending', 'Success', 'Failed'], // Status of the transaction
        default: 'Pending'
    },
    payment_date: {
        type: Date,
        default: Date.now
    }
});

const EsewaPaymentSchemadb = mongoose.model('EsewaPayment', EsewaPaymentSchema);

module.exports = EsewaPaymentSchemadb;
