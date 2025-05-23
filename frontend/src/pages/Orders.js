import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/main.css';
import { useAuth } from '../contexts/AuthContext';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();

  useEffect(() => {
    console.log('Orders page - Auth status:', isAuthenticated);
    console.log('Orders page - Current user:', currentUser?.username);
    
    // Redirect to login if not authenticated
    if (!isAuthenticated || !currentUser) {
      console.warn('User not authenticated, redirecting to login');
      navigate('/login');
      return;
    }
    
    const fetchOrders = async () => {
      try {
        setLoading(true);
        
        // For development, we'll use localStorage to simulate orders
        // In a real app, you would fetch from an API
        const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        
        if (storedOrders.length === 0) {
          // Create some sample orders if none exist
          const sampleOrders = [
            {
              id: 1001,
              date: new Date().toISOString(),
              customer: currentUser.username,
              total: 29.95,
              status: 'Delivered',
              items: [
                { description: 'Margherita Pizza (Small)', price: 12.95, quantity: 1 },
                { description: 'Pepperoni Pizza (Large)', price: 17.00, quantity: 1 }
              ]
            },
            {
              id: 1002,
              date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
              customer: currentUser.username,
              total: 42.85,
              status: 'Pending',
              items: [
                { description: 'Sicilian Pizza (Large)', price: 24.95, quantity: 1 },
                { description: 'Special Pizza (Small)', price: 17.90, quantity: 1 }
              ]
            }
          ];
          
          localStorage.setItem('orders', JSON.stringify(sampleOrders));
          setOrders(sampleOrders);
        } else {
          setOrders(storedOrders);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders. Please try again.');
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="section-header">
          <h2>Order History</h2>
          <p>Your <span>Orders</span></p>
        </div>
        <div className="text-center py-5">
          <div className="spinner-border" style={{ color: 'var(--accent-color)' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="section-header">
          <h2>Order History</h2>
          <p>Your <span>Orders</span></p>
        </div>
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="section-header">
        <h2>Order History</h2>
        <p>Your <span>Orders</span></p>
      </div>
      
      {orders.length === 0 ? (
        <div className="text-center py-5 card shadow-sm">
          <div className="card-body p-5">
            <i className="bi bi-bag-x" style={{ fontSize: '4rem', color: '#ccc' }}></i>
            <h3 className="mt-3">You haven't placed any orders yet</h3>
            <p className="text-muted">Browse our menu and place your first order!</p>
            <div className="mt-4">
              <Link to="/menu-categories" className="btn btn-danger">
                <i className="bi bi-grid me-2"></i>Browse Menu
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          {orders.map(order => (
            <div key={order.id} className="col-md-6 mb-4">
              <div className="dashboard-card">
                <div className="dashboard-card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Order #{order.id}</h5>
                  <span className={`status-badge ${order.status === 'Delivered' ? 'status-completed' : 'status-pending'}`}>
                    {order.status}
                  </span>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <small className="text-muted">Order Date</small>
                    <p className="mb-0">{new Date(order.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</p>
                  </div>
                  
                  <div className="mb-3">
                    <small className="text-muted">Items</small>
                    <div className="table-responsive">
                      <table className="table table-sm">
                        <thead className="table-light">
                          <tr>
                            <th>Item</th>
                            <th>Qty</th>
                            <th className="text-end">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items.map((item, index) => (
                            <tr key={index}>
                              <td>{item.description}</td>
                              <td>{item.quantity}</td>
                              <td className="text-end">${(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                    <h5 className="mb-0">Total</h5>
                    <h5 className="mb-0" style={{ color: 'var(--accent-color)' }}>${order.total.toFixed(2)}</h5>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
