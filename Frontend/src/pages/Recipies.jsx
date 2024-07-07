import { useState, useEffect } from 'react';
import axios from 'axios';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    category: '',
    ingredients: '',
    price: '',
    images: []
  });
  const [imagePreview, setImagePreview] = useState([]);

  const token = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    fetchRecipes();
    fetchCategories();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:4000/admin/recipes', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setRecipes(response.data.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:4000/admin/categories', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setCategories(response.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in newRecipe) {
      if (key === 'images') {
        for (let image of newRecipe.images) {
          formData.append('images', image);
        }
      } else {
        formData.append(key, newRecipe[key]);
      }
    }
    
    try {
      let response = await axios.post('http://localhost:4000/admin/recipes', formData, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response)
      fetchRecipes();
      setNewRecipe({ name: '', category: '', ingredients: '', price: '', images: [] });
      setImagePreview([]);
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/admin/recipes/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchRecipes();
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewRecipe({ ...newRecipe, images: files });
    setImagePreview(files.map(file => URL.createObjectURL(file)));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Recipes</h2>

      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            value={newRecipe.name}
            onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
            placeholder="Recipe Name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <select
            value={newRecipe.category}
            onChange={(e) => setNewRecipe({ ...newRecipe, category: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={newRecipe.ingredients}
            onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })}
            placeholder="Ingredients (comma separated)"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="number"
            value={newRecipe.price}
            onChange={(e) => setNewRecipe({ ...newRecipe, price: e.target.value })}
            placeholder="Price"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
        {imagePreview.length > 0 && (
          <div className="mb-4 flex space-x-2">
            {imagePreview.map((src, index) => (
              <img key={index} src={src} alt="Preview" className="w-20 h-20 object-cover rounded-md" />
            ))}
          </div>
        )}
        <button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Add Recipe
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map(recipe => (
          <div key={recipe._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={recipe.images[0]} alt={recipe.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{recipe.name}</h3>
              <p className="text-gray-600 mb-2">Category: {recipe.category.name}</p>
              <p className="text-gray-600 mb-2">Ingredients: {recipe.ingredients.join(', ')}</p>
              <p className="text-gray-800 font-bold mb-4">Price: {recipe.price} <strong>RS</strong></p>
              <button
                onClick={() => handleDelete(recipe._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;