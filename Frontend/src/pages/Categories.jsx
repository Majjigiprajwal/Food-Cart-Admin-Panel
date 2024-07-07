import { useState, useEffect } from 'react';
import axios from 'axios';
import ItemCard from '../components/ItemCard';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '', image: null });
  const [imagePreview, setImagePreview] = useState(null);
  const token = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    fetchCategories();
  }, []);

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
    formData.append('name', newCategory.name);
    formData.append('image', newCategory.image);

    try {
      await axios.post('http://localhost:4000/admin/categories', formData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchCategories();
      setNewCategory({ name: '', image: null });
      formData.append('image',null)
      setImagePreview(null);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/admin/categories/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewCategory({ ...newCategory, image: file });
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <div className='w-full max-w-4xl mx-auto p-6 bg-gray-50'>
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Categories</h2>
      
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-2">
            Category Name
          </label>
          <input
            id="categoryName"
            type="text"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            placeholder="Enter category name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="categoryImage" className="block text-sm font-medium text-gray-700 mb-2">
            Category Image
          </label>
          <input
            id="categoryImage"
            type="file"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        
        {imagePreview && (
          <div className="mb-4">
            <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-md" />
          </div>
        )}
        
        <button 
          type="submit" 
          className="w-full bg-primary  text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Add Category
        </button>
      </form>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories?.map(category => (
          <ItemCard key={category._id} item={category} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default Categories;