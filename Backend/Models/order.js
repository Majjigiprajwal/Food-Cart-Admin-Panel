const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  recipe: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Recipe', 
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true, 
    min: [1, 'Quantity must be at least 1']
  },
  price: { 
    type: Number, 
    required: true,
    min: [0, 'Price cannot be negative']
  }
});

const orderSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  items: [orderItemSchema],
  totalPrice: { 
    type: Number, 
    required: true,
    min: [0, 'Total price cannot be negative']
  },
  status: { 
    type: String, 
     enum: ['pending', 'preparing', 'ready', 'delivered', 'cancelled'],
    default: 'pending'
  },
  deliveryAddress: { 
    type: String, 
    required: [true, 'Delivery address is required'],
    trim: true
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;