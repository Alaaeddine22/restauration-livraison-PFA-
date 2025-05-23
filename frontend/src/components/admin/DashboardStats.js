import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DashboardStats = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Get real data from localStorage where available
        // Orders
        const ordersData = JSON.parse(localStorage.getItem('orders') || '[]');
        const pendingOrdersCount = ordersData.filter(order => order.status === 'Pending').length;
        
        // Products (we'll use a mock count since we don't have product management yet)
        const productsCount = 45;
        
        // Users
        const usersData = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Recent orders (use real orders or fallback to samples)
        const recentOrders = ordersData.length > 0 
          ? ordersData.slice(0, 5).map(order => ({
              id: order.id,
              user: order.customer,
              price: order.total,
              date: new Date(order.date).toLocaleDateString(),
              status: order.status
            }))
          : [
              { id: 1, user: 'johndoe', price: 29.99, date: '2025-05-22', status: 'Delivered' },
              { id: 2, user: 'janedoe', price: 42.50, date: '2025-05-22', status: 'Pending' },
              { id: 3, user: 'bobsmith', price: 18.75, date: '2025-05-21', status: 'Delivered' },
              { id: 4, user: 'alicejones', price: 35.25, date: '2025-05-21', status: 'Pending' },
              { id: 5, user: 'mikebrown', price: 24.00, date: '2025-05-20', status: 'Delivered' }
            ];
            
        setStats({
          totalOrders: ordersData.length || 12, // Fallback to 12 if no orders exist
          pendingOrders: pendingOrdersCount || 3,
          totalProducts: productsCount,
          totalUsers: usersData.length || 8,
          recentOrders: recentOrders
        });
        
        setLoading(false);
        
      } catch (error) {
        console.error('Error fetching admin stats:', error);
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);
  
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="admin-dashboard">
      <div className="row g-4 mb-4">
        <div className="col-12">
          <div className="dashboard-card">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-uppercase fw-semibold mb-2" style={{ fontSize: '0.85rem', color: 'var(--admin-gray)' }}>Welcome back, Admin!</h6>
                  <h5 className="fw-bold mb-2" style={{ fontSize: '1.5rem', color: 'var(--admin-dark)' }}>Restaurant Dashboard</h5>
                  <p className="mb-0" style={{ color: 'var(--admin-gray)' }}>Here's what's happening with your restaurant today.</p>
                </div>
                <div className="d-none d-md-block">
                  <img src="https://cdn-icons-png.flaticon.com/512/2082/2082063.png" alt="Dashboard" style={{ width: '100px', opacity: '0.8' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row g-4">
        <div className="col-xl-3 col-lg-6 col-md-6">
          <Link to="#" onClick={() => window.location.hash = '#orders'} className="text-decoration-none">
            <div className="dashboard-stat-card stat-primary">
              <div className="stat-icon">
                <i className="bi bi-cart3"></i>
              </div>
              <div className="stat-content">
                <h3 className="stat-title">TOTAL ORDERS</h3>
                <h2 className="stat-value">{stats.totalOrders}</h2>
                <p className="stat-desc mb-0">
                  <i className="bi bi-arrow-up-right stat-trend-up"></i>
                  <span className="stat-trend-up fw-medium">+24%</span> this month
                </p>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="col-xl-3 col-lg-6 col-md-6">
          <Link to="#" onClick={() => window.location.hash = '#pending'} className="text-decoration-none">
            <div className="dashboard-stat-card stat-warning">
              <div className="stat-icon">
                <i className="bi bi-hourglass-split"></i>
              </div>
              <div className="stat-content">
                <h3 className="stat-title">PENDING ORDERS</h3>
                <h2 className="stat-value">{stats.pendingOrders}</h2>
                <p className="stat-desc mb-0">
                  <i className="bi bi-arrow-down-right stat-trend-down"></i>
                  <span className="stat-trend-down fw-medium">-3%</span> since yesterday
                </p>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="col-xl-3 col-lg-6 col-md-6">
          <Link to="#" onClick={() => window.location.hash = '#products'} className="text-decoration-none">
            <div className="dashboard-stat-card stat-success">
              <div className="stat-icon">
                <i className="bi bi-box-seam"></i>
              </div>
              <div className="stat-content">
                <h3 className="stat-title">TOTAL PRODUCTS</h3>
                <h2 className="stat-value">{stats.totalProducts}</h2>
                <p className="stat-desc mb-0">
                  <i className="bi bi-arrow-up-right stat-trend-up"></i>
                  <span className="stat-trend-up fw-medium">+12%</span> from last week
                </p>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="col-xl-3 col-lg-6 col-md-6">
          <Link to="#" onClick={() => window.location.hash = '#users'} className="text-decoration-none">
            <div className="dashboard-stat-card stat-info">
              <div className="stat-icon">
                <i className="bi bi-people"></i>
              </div>
              <div className="stat-content">
                <h3 className="stat-title">TOTAL USERS</h3>
                <h2 className="stat-value">{stats.totalUsers}</h2>
                <p className="stat-desc mb-0">
                  <i className="bi bi-arrow-up-right stat-trend-up"></i>
                  <span className="stat-trend-up fw-medium">+8.4%</span> this month
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      
      <div className="row g-4 mb-4 mt-1">
        <div className="col-lg-8">
          <div className="dashboard-card chart-card">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-semibold mb-0" style={{ color: 'var(--admin-dark)' }}>Sales Analytics</h5>
                <div className="d-flex align-items-center">
                  <div className="dropdown me-2">
                    <button className="btn btn-sm btn-light px-3 rounded-pill" type="button" id="timeRangeDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                      <span className="fw-medium">This Month</span> <i className="bi bi-chevron-down ms-1"></i>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end shadow border-0" aria-labelledby="timeRangeDropdown">
                      <li><a className="dropdown-item" href="#">Today</a></li>
                      <li><a className="dropdown-item active" href="#">This Month</a></li>
                      <li><a className="dropdown-item" href="#">Last 3 Months</a></li>
                      <li><a className="dropdown-item" href="#">This Year</a></li>
                    </ul>
                  </div>
                  <button className="btn btn-sm btn-outline-secondary rounded-pill px-3">
                    <i className="bi bi-download"></i>
                  </button>
                </div>
              </div>
              <div className="chart-placeholder" style={{ 
                height: '280px', 
                background: 'linear-gradient(180deg, rgba(67, 97, 238, 0.05) 0%, rgba(67, 97, 238, 0) 100%)', 
                borderRadius: 'var(--admin-border-radius)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden' 
              }}>
                <div className="text-center">
                  <i className="bi bi-bar-chart" style={{ fontSize: '3rem', color: 'var(--admin-primary)' }}></i>
                  <p className="mt-2 mb-0 fw-medium">Sales Analytics Visualization</p>
                </div>
                <div style={{ 
                  position: 'absolute', 
                  bottom: 0, 
                  left: 0, 
                  width: '100%', 
                  height: '80px', 
                  background: 'linear-gradient(0deg, rgba(67, 97, 238, 0.1) 0%, rgba(67, 97, 238, 0) 100%)' 
                }}></div>
              </div>
              <div className="row mt-4">
                <div className="col-4">
                  <div className="text-center">
                    <h6 className="text-uppercase fw-semibold mb-1" style={{ fontSize: '0.85rem', color: 'var(--admin-gray)' }}>TOTAL REVENUE</h6>
                    <h4 className="fw-bold mb-0">$12,485</h4>
                    <span className="badge bg-success-subtle text-success rounded-pill px-2 py-1 mt-1">
                      <i className="bi bi-arrow-up-short"></i> 16.24%
                    </span>
                  </div>
                </div>
                <div className="col-4">
                  <div className="text-center">
                    <h6 className="text-uppercase fw-semibold mb-1" style={{ fontSize: '0.85rem', color: 'var(--admin-gray)' }}>ORDERS</h6>
                    <h4 className="fw-bold mb-0">142</h4>
                    <span className="badge bg-success-subtle text-success rounded-pill px-2 py-1 mt-1">
                      <i className="bi bi-arrow-up-short"></i> 8.65%
                    </span>
                  </div>
                </div>
                <div className="col-4">
                  <div className="text-center">
                    <h6 className="text-uppercase fw-semibold mb-1" style={{ fontSize: '0.85rem', color: 'var(--admin-gray)' }}>CUSTOMERS</h6>
                    <h4 className="fw-bold mb-0">64</h4>
                    <span className="badge bg-danger-subtle text-danger rounded-pill px-2 py-1 mt-1">
                      <i className="bi bi-arrow-down-short"></i> 3.42%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4">
          <div className="dashboard-card h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-semibold mb-0" style={{ color: 'var(--admin-dark)' }}>Recent Activities</h5>
                <button className="btn btn-sm btn-link text-decoration-none p-0" style={{ color: 'var(--admin-primary)' }}>
                  View All <i className="bi bi-arrow-right ms-1"></i>
                </button>
              </div>
              
              <div className="timeline position-relative">
                <div className="timeline-item d-flex mb-4">
                  <div className="timeline-icon bg-primary-subtle" style={{ 
                    width: '36px', 
                    height: '36px', 
                    minWidth: '36px',
                    borderRadius: '50%', 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '15px',
                    zIndex: 2
                  }}>
                    <i className="bi bi-cart-check" style={{ color: 'var(--admin-primary)' }}></i>
                  </div>
                  <div>
                    <h6 className="mb-1 fw-medium">New order received</h6>
                    <p className="mb-1" style={{ fontSize: '0.9rem', color: 'var(--admin-gray)' }}>Order #2345 for Margherita Pizza</p>
                    <span style={{ fontSize: '0.8rem', color: 'var(--admin-gray)' }}><i className="bi bi-clock me-1"></i> 30 min ago</span>
                  </div>
                </div>
                
                <div className="timeline-item d-flex mb-4">
                  <div className="timeline-icon bg-warning-subtle" style={{ 
                    width: '36px', 
                    height: '36px', 
                    minWidth: '36px',
                    borderRadius: '50%', 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '15px',
                    zIndex: 2
                  }}>
                    <i className="bi bi-exclamation-triangle" style={{ color: 'var(--admin-warning)' }}></i>
                  </div>
                  <div>
                    <h6 className="mb-1 fw-medium">Low stock alert</h6>
                    <p className="mb-1" style={{ fontSize: '0.9rem', color: 'var(--admin-gray)' }}>Cheese Pizza is running low</p>
                    <span style={{ fontSize: '0.8rem', color: 'var(--admin-gray)' }}><i className="bi bi-clock me-1"></i> 2 hours ago</span>
                  </div>
                </div>
                
                <div className="timeline-item d-flex">
                  <div className="timeline-icon bg-success-subtle" style={{ 
                    width: '36px', 
                    height: '36px', 
                    minWidth: '36px',
                    borderRadius: '50%', 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '15px',
                    zIndex: 2
                  }}>
                    <i className="bi bi-person-plus" style={{ color: 'var(--admin-success)' }}></i>
                  </div>
                  <div>
                    <h6 className="mb-1 fw-medium">New user registered</h6>
                    <p className="mb-1" style={{ fontSize: '0.9rem', color: 'var(--admin-gray)' }}>john.doe@example.com</p>
                    <span style={{ fontSize: '0.8rem', color: 'var(--admin-gray)' }}><i className="bi bi-clock me-1"></i> 5 hours ago</span>
                  </div>
                </div>
                
                <div className="timeline-line" style={{ 
                  position: 'absolute', 
                  top: '0', 
                  bottom: '0', 
                  left: '18px', 
                  width: '1px', 
                  background: 'rgba(0,0,0,0.08)',
                  zIndex: 1
                }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row g-4 mb-4">
        <div className="col-12">
          <div className="dashboard-card">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-semibold mb-0" style={{ color: 'var(--admin-dark)' }}>Recent Orders</h5>
                <button 
                  className="btn btn-sm btn-primary rounded-pill px-3" 
                  style={{ backgroundColor: 'var(--admin-primary)', borderColor: 'var(--admin-primary)' }}
                  onClick={() => window.location.hash = 'orders'}
                >
                  View All Orders <i className="bi bi-arrow-right ms-1"></i>
                </button>
              </div>
              
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">Order ID</th>
                      <th scope="col">Customer</th>
                      <th scope="col">Items</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Date</th>
                      <th scope="col">Status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentOrders.map(order => (
                      <tr key={order.id}>
                        <td><span className="fw-medium">#{order.id}</span></td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="me-2" style={{ 
                              width: '32px', 
                              height: '32px', 
                              borderRadius: '8px', 
                              backgroundColor: 'var(--admin-info)', 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center', 
                              color: 'white',
                              fontWeight: 'bold',
                              fontSize: '0.75rem'
                            }}>
                              {order.user.charAt(0).toUpperCase()}
                            </div>
                            <div>{order.user}</div>
                          </div>
                        </td>
                        <td className="text-center">{order.items || 2}</td>
                        <td>${order.price.toFixed(2)}</td>
                        <td>{new Date(order.date).toLocaleDateString()}</td>
                        <td>
                          <span className={`badge rounded-pill ${order.status === 'Delivered' ? 'bg-success' : 'bg-warning text-dark'}`}>
                            {order.status}
                          </span>
                        </td>
                        <td>
                          <div className="dropdown">
                            <button className="btn btn-sm btn-light" type="button" id={`dropdownOrder${order.id}`} data-bs-toggle="dropdown" aria-expanded="false">
                              <i className="bi bi-three-dots"></i>
                            </button>
                            <ul className="dropdown-menu shadow border-0" aria-labelledby={`dropdownOrder${order.id}`}>
                              <li><a className="dropdown-item" href="#"><i className="bi bi-eye me-2"></i> View Details</a></li>
                              <li><a className="dropdown-item" href="#"><i className="bi bi-pencil me-2"></i> Edit Order</a></li>
                              <li><hr className="dropdown-divider" /></li>
                              <li><a className="dropdown-item text-danger" href="#"><i className="bi bi-trash me-2"></i> Delete</a></li>
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
      </div>

      {/* Users Section */}
      <div className="row g-4 mb-4">
        <div className="col-12">
          <div className="dashboard-card">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-semibold mb-0" style={{ color: 'var(--admin-dark)' }}>Users</h5>
                <button 
                  className="btn btn-sm btn-primary rounded-pill px-3" 
                  style={{ backgroundColor: 'var(--admin-primary)', borderColor: 'var(--admin-primary)' }}
                  onClick={() => window.location.hash = 'users'}
                >
                  View All Users <i className="bi bi-arrow-right ms-1"></i>
                </button>
              </div>
              
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">User</th>
                      <th scope="col">Email</th>
                      <th scope="col">Joined</th>
                      <th scope="col">Status</th>
                      <th scope="col">Role</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 1, username: 'johndoe', email: 'john@example.com', date_joined: '2025-01-15', is_active: true, is_staff: false },
                      { id: 2, username: 'janedoe', email: 'jane@example.com', date_joined: '2025-01-20', is_active: true, is_staff: false },
                      { id: 3, username: 'bobsmith', email: 'bob@example.com', date_joined: '2025-02-05', is_active: true, is_staff: false },
                      { id: 9, username: 'admin', email: 'admin@example.com', date_joined: '2025-01-01', is_active: true, is_staff: true },
                      { id: 4, username: 'alicejones', email: 'alice@example.com', date_joined: '2025-02-10', is_active: false, is_staff: false }
                    ].map((user) => (
                      <tr key={user.id}>
                        <td><span className="fw-medium">#{user.id}</span></td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="me-2" style={{ 
                              width: '32px', 
                              height: '32px', 
                              borderRadius: '8px', 
                              backgroundColor: user.is_staff ? 'var(--admin-primary)' : 'var(--admin-info)', 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center', 
                              color: 'white',
                              fontWeight: 'bold',
                              fontSize: '0.75rem'
                            }}>
                              {user.username.charAt(0).toUpperCase()}
                            </div>
                            <div>{user.username}</div>
                          </div>
                        </td>
                        <td>{user.email}</td>
                        <td>{new Date(user.date_joined).toLocaleDateString()}</td>
                        <td>
                          <span className={`badge rounded-pill ${user.is_active ? 'bg-success' : 'bg-danger'}`}>
                            {user.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <span className={`badge rounded-pill ${user.is_staff ? 'bg-primary' : 'bg-info text-dark'}`}>
                            {user.is_staff ? 'Admin' : 'Customer'}
                          </span>
                        </td>
                        <td>
                          <div className="dropdown">
                            <button className="btn btn-sm btn-light" type="button" id={`dropdownUser${user.id}`} data-bs-toggle="dropdown" aria-expanded="false">
                              <i className="bi bi-three-dots"></i>
                            </button>
                            <ul className="dropdown-menu shadow border-0" aria-labelledby={`dropdownUser${user.id}`}>
                              <li><a className="dropdown-item" href="#"><i className="bi bi-eye me-2"></i> View Profile</a></li>
                              <li><a className="dropdown-item" href="#"><i className="bi bi-pencil me-2"></i> Edit User</a></li>
                              <li><a className="dropdown-item" href="#"><i className="bi bi-shield-lock me-2"></i> Change Role</a></li>
                              <li><hr className="dropdown-divider" /></li>
                              <li><a className="dropdown-item text-danger" href="#"><i className="bi bi-trash me-2"></i> Delete</a></li>
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
      </div>
    </div>
  );
};

export default DashboardStats;
