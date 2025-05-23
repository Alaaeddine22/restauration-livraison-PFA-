import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/main.css';

const Sidebar = ({ activeComponent, setActiveComponent }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirect to login page
    navigate('/login');
  };
  
  return (
    <div className="dashboard-sidebar">
      <div className="sidebar-header">
        <h4><span style={{ color: 'var(--accent-color)' }}>Pizza</span>Restaurant</h4>
        <p className="text-muted mb-0">Admin Panel</p>
      </div>
      
      <div className="sidebar-menu">
        <button 
          className={activeComponent === 'dashboard' ? 'active' : ''}
          onClick={() => setActiveComponent('dashboard')}
        >
          <i className="bi bi-speedometer2"></i> Dashboard
        </button>
        <button 
          className={activeComponent === 'orders' ? 'active' : ''}
          onClick={() => setActiveComponent('orders')}
        >
          <i className="bi bi-cart-check"></i> Orders
        </button>
        <button 
          className={activeComponent === 'products' ? 'active' : ''}
          onClick={() => setActiveComponent('products')}
        >
          <i className="bi bi-box"></i> Products
        </button>
        <button 
          className={activeComponent === 'users' ? 'active' : ''}
          onClick={() => setActiveComponent('users')}
        >
          <i className="bi bi-people"></i> Users
        </button>
      </div>
      
      <div className="mt-5 p-3">
        <button 
          className="btn btn-danger w-100" 
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right me-2"></i> Logout
        </button>
        
        <Link to="/" className="btn btn-outline-secondary w-100 mt-2">
          <i className="bi bi-house-door me-2"></i> Back to Site
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
