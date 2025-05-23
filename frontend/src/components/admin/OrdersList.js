import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // In a real application, fetch orders from the API
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // This would be an actual API call in a real application
        // const response = await axios.get('/api/admin/orders/');
        // setOrders(response.data);
        
        // Mock data for demonstration
        setTimeout(() => {
          const mockOrders = [
            { id: 1, user: 'johndoe', email: 'john@example.com', items: 3, price: 29.99, date: '2025-05-22', status: 'Delivered' },
            { id: 2, user: 'janedoe', email: 'jane@example.com', items: 2, price: 42.50, date: '2025-05-22', status: 'Pending' },
            { id: 3, user: 'bobsmith', email: 'bob@example.com', items: 1, price: 18.75, date: '2025-05-21', status: 'Delivered' },
            { id: 4, user: 'alicejones', email: 'alice@example.com', items: 4, price: 35.25, date: '2025-05-21', status: 'Pending' },
            { id: 5, user: 'mikebrown', email: 'mike@example.com', items: 2, price: 24.00, date: '2025-05-20', status: 'Delivered' },
            { id: 6, user: 'sarahlee', email: 'sarah@example.com', items: 3, price: 32.75, date: '2025-05-20', status: 'Delivered' },
            { id: 7, user: 'davidwilson', email: 'david@example.com', items: 1, price: 15.50, date: '2025-05-19', status: 'Pending' },
            { id: 8, user: 'emmajohnson', email: 'emma@example.com', items: 5, price: 56.25, date: '2025-05-19', status: 'Delivered' },
            { id: 9, user: 'ryanclark', email: 'ryan@example.com', items: 2, price: 28.99, date: '2025-05-18', status: 'Pending' },
            { id: 10, user: 'oliviamartin', email: 'olivia@example.com', items: 3, price: 37.50, date: '2025-05-18', status: 'Delivered' }
          ];
          setOrders(mockOrders);
          setLoading(false);
        }, 1000);
        
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to load orders. Please try again.');
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);
  
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // This would be an actual API call in a real application
      // await axios.patch(`/api/admin/orders/${orderId}/`, { status: newStatus });
      
      // Update local state to reflect the change
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      
      alert(`Order #${orderId} status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status. Please try again.');
    }
  };
  
  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        // This would be an actual API call in a real application
        // await axios.delete(`/api/admin/orders/${orderId}/`);
        
        // Remove the deleted order from state
        setOrders(orders.filter(order => order.id !== orderId));
        
        alert(`Order #${orderId} has been deleted`);
      } catch (error) {
        console.error('Error deleting order:', error);
        alert('Failed to delete order. Please try again.');
      }
    }
  };
  
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }
  
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Orders Management</h2>
        <div>
          <button className="btn btn-outline-primary me-2">
            <i className="bi bi-file-earmark-excel me-1"></i> Export
          </button>
          <button className="btn btn-outline-secondary">
            <i className="bi bi-funnel me-1"></i> Filter
          </button>
        </div>
      </div>
      
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.user}</td>
                    <td>{order.email}</td>
                    <td>{order.items}</td>
                    <td>${order.price.toFixed(2)}</td>
                    <td>{order.date}</td>
                    <td>
                      <span className={`badge ${order.status === 'Delivered' ? 'bg-success' : 'bg-warning'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <div className="dropdown">
                        <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                          Actions
                        </button>
                        <ul className="dropdown-menu">
                          <li><button className="dropdown-item" onClick={() => alert(`View details for Order #${order.id}`)}>View Details</button></li>
                          <li>
                            <button 
                              className="dropdown-item" 
                              onClick={() => handleStatusChange(order.id, order.status === 'Delivered' ? 'Pending' : 'Delivered')}
                            >
                              Mark as {order.status === 'Delivered' ? 'Pending' : 'Delivered'}
                            </button>
                          </li>
                          <li><hr className="dropdown-divider" /></li>
                          <li><button className="dropdown-item text-danger" onClick={() => handleDeleteOrder(order.id)}>Delete</button></li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersList;
