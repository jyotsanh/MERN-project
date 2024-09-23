const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema({

  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' ,
    required: true
    },

  first_name: {
      type: String,
      required: true
    },
  
  last_name: {
      type: String,
      required: true
    },
  
  phone_number: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return /^\d{10}$/.test(v); // Regular expression to validate 10 digits
        },
        message: props => `${props.value} is not a valid 10-digit phone number!`
      }
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
        required: true,
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
    zip: String,

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

