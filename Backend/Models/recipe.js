const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Recipe name is required'],
    trim: true
  },
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', 
    required: [true, 'Category is required']
  },
  ingredients: [{ 
    type: String, 
    required: true,
    trim: true
  }],
  price: { 
    type: Number, 
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  images: [{ 
    type: String, 
    required: true 
  }],
}, {
  timestamps: true
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;