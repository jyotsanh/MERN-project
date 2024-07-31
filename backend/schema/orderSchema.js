const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema({

  user_id: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' ,
    required: true
    },

  products: [
    {
      product_id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductSchemadb',
        required: true
        },
      quantity: {
        type:Number,
        required: true
        },
      price: {
        type : Number,
        required: true
      }
    },
  ],

  total_price: {
    type : Number,
    required: true
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
OrderSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const OrderSchemadb = mongoose.model("Order", OrderSchema);

module.exports = OrderSchemadb;

