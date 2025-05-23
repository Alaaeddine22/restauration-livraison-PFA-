import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem('loggedInUser');
    setIsAuthenticated(!!loggedInUser);
    
    // Get initial cart count
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.length);
    
    // Add listener for cart updates
    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(updatedCart.length);
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Handle storage events triggered by this component
    window.addEventListener('storageEvent', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('storageEvent', handleStorageChange);
    };
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setIsAuthenticated(false);
    navigate('/login');
  };
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>Pizza</span>Restaurant
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarContent">
          {isAuthenticated ? (
            <>
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/menu-categories">
                    <i className="bi bi-grid"></i> Menu
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/pizza">
                    <i className="bi bi-circle"></i> Pizza
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact">
                    <i className="bi bi-telephone"></i> Contact Us
                  </Link>
                </li>
              </ul>
              
              <div className="d-flex align-items-center">
                <Link to="/orders" className="btn btn-outline-dark btn-sm me-2">
                  <i className="bi bi-list-ul"></i> Orders
                </Link>
                
                <Link to="/cart" className="btn btn-danger btn-sm me-2 position-relative">
                  <i className="bi bi-cart"></i> Cart
                  {cartCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                      {cartCount}
                    </span>
                  )}
                </Link>
                
                <button 
                  className="btn btn-outline-secondary btn-sm" 
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right"></i> Logout
                </button>
              </div>
            </>
          ) : (
            <div className="ms-auto">
              <Link to="/login" className="btn btn-outline-primary me-2">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
