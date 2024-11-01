const mongoose = require('mongoose');


const OrderDataSchema = new mongoose.Schema({

  user_id: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
    },

  products: [
    {
      product_id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductSchemadb' 
        },
      quantity: {
        type:Number
        },
      price: {
        type : Number
      }
    }
  ],

  total_price: {
    type : Number
  },

  status: { 
    type: String, 
    default: 'Pending' 
    },

  shipping_address: {
    street: String,
    city: String,
    state: String,
    zip: String
  },

  created_at: { 
    type: Date, 
    default: Date.now 
    },

  updated_at: { 
    type: Date, 
    default: Date.now 
    }
});




// Pre-save middleware to update the updatedAt field
OrderDataSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const OrderDataSchemadb = mongoose.model("OrderData", OrderDataSchema);

module.exports = OrderDataSchemadb;

