import React from 'react'

const ItemCard = ({ item, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <img 
        src={item.image} 
        alt={item.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h3>
        <div className="flex justify-end">
          <button
            onClick={() => onDelete(item._id)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
