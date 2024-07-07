import  { useState, useEffect } from 'react';
import axios from 'axios';
import { dummyOrders } from '../dummyData';

const OrderStatusBadge = ({ status }) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    preparing: 'bg-blue-100 text-blue-800',
    ready: 'bg-green-100 text-green-800',
    delivered: 'bg-purple-100 text-purple-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const Orders = () => {
  const [orders, setOrders] = useState(dummyOrders);
  const token = JSON.parse(localStorage.getItem('token'));

  // useEffect(() => {
  //   fetchOrders();
  // }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:4000/admin/orders', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setOrders(response.data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.patch(`http://localhost:4000/admin/orders/${orderId}`, { status }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Orders</h2>
      <div className="space-y-6">
        {orders.map(order => (
          <div key={order._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Order #{order.orderNumber}</h3>
                <OrderStatusBadge status={order.status} />
              </div>
              <p className="text-gray-600">Customer: {order.customer.name}</p>
              <p className="text-gray-600">Total: ${order.total.toFixed(2)}</p>
              <p className="text-gray-600">Ordered at: {new Date(order.createdAt).toLocaleString()}</p>
              <div className="mt-4">
                <h4 className="font-semibold text-gray-700 mb-2">Items:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {order.items.map(item => (
                    <li key={item._id} className="text-gray-600">
                      {item.quantity}x {item.recipe.name} - ${(item.quantity * item.recipe.price).toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-4">
              <h4 className="font-semibold text-gray-700 mb-2">Update Status:</h4>
              <div className="flex space-x-2">
                {['pending', 'preparing', 'ready', 'delivered', 'cancelled'].map(status => (
                  <button
                    key={status}
                    onClick={() => updateOrderStatus(order._id, status)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize
                      ${order.status === status ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;