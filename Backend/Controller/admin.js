const Category = require('../Models/category');
const Recipe = require('../Models/recipe');
const Order = require('../Models/order');
const { deleteFile } = require('../Utils/s3');


exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(req)
    const image = req.file.location;

    const existingCategory = await Category.findOne({ name: name.trim() });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const category = new Category({ name, image });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: 'Error creating category', error: error.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({succeds:true,data:categories,message:'Fetched All the categories Successfully'});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    if (req.file) {
      
      const oldImageKey = category.image.split('/').pop();
      await deleteFile(oldImageKey);

      category.image = req.file.location;
    }

    category.name = name;
    await category.save();

    res.json(category);
  } catch (error) {
    res.status(400).json({ message: 'Error updating category', error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const imageKey = category.image.split('/').pop();
    await deleteFile(imageKey);

    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error: error.message });
  }
};


exports.createRecipe = async (req, res) => {
  try {
    const { name, category, ingredients, price, description } = req.body;
    const images = req.files.map(file => file.location); 

    const existingRecipe = await Recipe.findOne({ name: name.trim(), category });
    if (existingRecipe) {
      return res.status(400).json({ message: 'Recipe already exists in this category' });
    }

    const recipe = new Recipe({
      name,
      category,
      ingredients,
      price,
      images,
      description
    });

    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Error creating recipe', error: error.message });
  }
};

exports.getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('category');
    res.status(200).json({success:true,data:recipes,message:'Fetched all the recipies'});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes', error: error.message });
  }
};


exports.updateRecipe = async (req, res) => {
  try {
    const { name, category, ingredients, price, description } = req.body;
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

 
    if (req.files && req.files.length > 0) {
     
      await Promise.all(recipe.images.map(image => deleteFile(image.split('/').pop())));

      recipe.images = req.files.map(file => file.location);
    }

    recipe.name = name;
    recipe.category = category;
    recipe.ingredients = JSON.parse(ingredients);
    recipe.price = price;
    recipe.description = description;

    await recipe.save();
    res.json(recipe);
  } catch (error) {
    res.status(400).json({ message: 'Error updating recipe', error: error.message });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

   
    await Promise.all(recipe.images.map(image => deleteFile(image.split('/').pop())));

    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting recipe', error: error.message });
  }
};


exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').sort('-createdAt');
    res.status(200).json({success:true,data:orders,message:'Fetched all the orders successfully'});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('user', 'name email');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({success:true,data:order,message:'Successfully updated order status'});
  } catch (error) {
    res.status(400).json({ message: 'Error updating order status', error: error.message });
  }
};