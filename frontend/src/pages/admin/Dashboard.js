import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from '../../components/admin/Sidebar';
import Header from '../../components/admin/Header';
import OrdersList from '../../components/admin/OrdersList';
import ProductsList from '../../components/admin/ProductsList';
import UsersList from '../../components/admin/UsersList';
import DashboardStats from '../../components/admin/DashboardStats';
import '../../styles/main.css';
import '../../styles/admin.css';

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const { currentUser, isAuthenticated, isLoading } = useAuth();
  
  // Check if the current user is an admin
  const isAdminUser = currentUser && (currentUser.username === 'admin' || currentUser.is_staff === true);
  
  // Redirect to login if not authenticated or not admin
  if (!isLoading && (!isAuthenticated || !isAdminUser)) {
    return <Navigate to="/login-fr" />;
  }
  
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border" style={{ color: 'var(--accent-color)' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  // Render the appropriate component based on the active menu item
  const renderComponent = () => {
    switch(activeComponent) {
      case 'dashboard':
        return <DashboardStats />;
      case 'orders':
        return <OrdersList />;
      case 'products':
        return <ProductsList />;
      case 'users':
        return <UsersList />;
      default:
        return <DashboardStats />;
    }
  };
  
  return (
    <div className="dashboard-container">
      <Sidebar activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      
      <div className="dashboard-content">
        <Header />
        
        <main className="p-4 pb-5">
          <div className="container-fluid">
            <div className="dashboard-header mb-4">
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div>
                  <h1 className="mb-1 fw-bold" style={{ fontSize: '1.75rem', color: 'var(--admin-dark)' }}>
                    {activeComponent.charAt(0).toUpperCase() + activeComponent.slice(1)}                
                  </h1>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0">
                      <li className="breadcrumb-item"><a href="#" className="text-decoration-none" style={{ color: 'var(--admin-primary)' }}>Home</a></li>
                      <li className="breadcrumb-item active" aria-current="page">{activeComponent.charAt(0).toUpperCase() + activeComponent.slice(1)}</li>
                    </ol>
                  </nav>
                </div>
                
                <div className="d-flex mt-3 mt-md-0">
                  <button className="btn btn-outline-secondary me-2 d-flex align-items-center" style={{ borderRadius: '0.5rem' }}>
                    <i className="bi bi-download me-2"></i> Export
                  </button>
                  <button className="btn btn-primary d-flex align-items-center" style={{ borderRadius: '0.5rem', backgroundColor: 'var(--admin-primary)', borderColor: 'var(--admin-primary)' }}>
                    <i className="bi bi-plus-lg me-2"></i> Add New
                  </button>
                </div>
              </div>
            </div>
            
            {renderComponent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
