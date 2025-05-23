import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/main.css';

const Header = () => {
  const [currentDate, setCurrentDate] = useState('');
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  
  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/login-fr');
  };
  
  useEffect(() => {
    // Set current date
    const date = new Date();
    setCurrentDate(date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }));
  }, []);
  
  return (
    <header className="dashboard-header p-3 mb-0">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <div className="search-box me-3 d-none d-md-block">
              <div className="position-relative">
                <input 
                  type="text" 
                  className="form-control bg-light border-0 rounded-pill" 
                  placeholder="Search..." 
                  style={{ paddingLeft: '40px', paddingRight: '20px', boxShadow: 'none' }}
                />
                <i className="bi bi-search position-absolute" style={{ left: '15px', top: '10px', color: 'var(--admin-gray)' }}></i>
              </div>
            </div>
            <p className="text-muted mb-0 d-none d-md-block">{currentDate}</p>
          </div>
          
          <div className="d-flex align-items-center">
            <div className="dropdown me-3">
              <button className="btn btn-link position-relative p-0" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="bi bi-bell fs-5" style={{ color: 'var(--admin-gray)' }}></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>3</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow border-0" aria-labelledby="dropdownMenuButton" style={{ minWidth: '280px', borderRadius: 'var(--admin-border-radius)' }}>
                <li><h6 className="dropdown-header fw-bold">Notifications</h6></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item py-2" href="#"><i className="bi bi-cart-check me-2 text-success"></i> New order received</a></li>
                <li><a className="dropdown-item py-2" href="#"><i className="bi bi-exclamation-circle me-2 text-warning"></i> Low inventory alert</a></li>
                <li><a className="dropdown-item py-2" href="#"><i className="bi bi-person-plus me-2 text-primary"></i> New user registered</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item text-center" href="#">View all notifications</a></li>
              </ul>
            </div>
            
            <div className="dropdown">
              <button className="btn p-0 d-flex align-items-center" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <div className="me-2" style={{ 
                  width: '42px', 
                  height: '42px', 
                  borderRadius: '12px', 
                  backgroundColor: 'var(--admin-primary)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: 'white',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 8px rgba(67, 97, 238, 0.2)'
                }}>
                  {(currentUser?.username || 'A').charAt(0).toUpperCase()}
                </div>
                <div className="d-none d-md-block">
                  <h6 className="mb-0 fw-semibold">{currentUser?.username || 'Admin'}</h6>
                  <small className="text-muted">Administrator</small>
                </div>
                <i className="bi bi-chevron-down ms-2 d-none d-md-block" style={{ fontSize: '0.8rem', color: 'var(--admin-gray)' }}></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow border-0" aria-labelledby="userDropdown" style={{ borderRadius: 'var(--admin-border-radius)' }}>
                <li><a className="dropdown-item" href="#"><i className="bi bi-person me-2"></i> My Profile</a></li>
                <li><a className="dropdown-item" href="#"><i className="bi bi-gear me-2"></i> Settings</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item" onClick={handleLogout}><i className="bi bi-box-arrow-right me-2"></i> Logout</button></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
