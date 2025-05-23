import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/main.css';

const LoginFr = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Attempting login with:', formData.username);
    
    // For development purposes, using localStorage for authentication
    // In production, you would use your Django backend API
    try {
      // Get users from localStorage (now an array after our Register component update)
      let users = [];
      try {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
          const parsedUsers = JSON.parse(storedUsers);
          if (Array.isArray(parsedUsers)) {
            users = parsedUsers;
          } else {
            console.warn('Stored users is not an array');
          }
        }
      } catch (parseError) {
        console.error('Error parsing users from localStorage:', parseError);
      }
      
      if (users.length === 0) {
        // Create default users if none exist
        console.log('No users found, creating defaults');
        users = [
          {
            id: 1,
            username: 'admin',
            password: 'admin123',
            email: 'admin@example.com',
            first_name: 'Admin',
            last_name: 'User',
            date_joined: new Date().toISOString(),
            is_staff: true
          },
          {
            id: 2,
            username: 'user1',
            password: 'password123',
            email: 'user1@example.com',
            first_name: 'Regular',
            last_name: 'User',
            date_joined: new Date().toISOString(),
            is_staff: false
          }
        ];
        localStorage.setItem('users', JSON.stringify(users));
      }
      
      // Find user by username
      const user = users.find(u => u.username === formData.username);
      console.log('User found?', !!user);
      
      if (user && user.password === formData.password) {
        console.log('Password matched, logging in');
        
        // Create user object for authentication
        const userData = {
          id: user.id,
          username: user.username,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          is_staff: user.is_staff || (user.username === 'admin'),
          is_authenticated: true
        };
        
        // Use the auth context to log in (this will store user in localStorage and state)
        const loginSuccess = login(userData);
        
        if (loginSuccess) {
          console.log('Login successful');
          
          // Initialize empty cart if needed
          if (!localStorage.getItem('cart')) {
            localStorage.setItem('cart', JSON.stringify([]));
          }
          
          // Redirect admin users to the admin dashboard, regular users to home page
          if (userData.username === 'admin') {
            console.log('Redirecting to admin dashboard');
            navigate('/admin'); // Redirect admin to dashboard
          } else {
            console.log('Redirecting to home page');
            navigate('/'); // Redirect regular users to home page
          }
        } else {
          console.error('Login context failed');
          setErrorMessage('Authentication error. Please try again.');
        }
      } else {
        console.warn('Invalid credentials');
        setErrorMessage("Nom d'utilisateur ou mot de passe incorrect.");
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  // Initialize default users if none exist (for development)
  React.useEffect(() => {
    try {
      // Try to get existing users
      let users = [];
      try {
        const storedUsers = localStorage.getItem('users');
        users = storedUsers ? JSON.parse(storedUsers) : [];
        
        // Validate that users is actually an array
        if (!Array.isArray(users)) {
          console.warn('Stored users is not an array, resetting...');
          users = [];
        }
      } catch (parseError) {
        console.error('Error parsing stored users, resetting:', parseError);
        users = [];
      }
      
      // If no users exist, create default ones
      if (users.length === 0) {
        console.log('Creating default users for development...');
        const defaultUsers = [
          {
            id: 1,
            username: 'admin',
            password: 'admin123',
            email: 'admin@example.com',
            first_name: 'Admin',
            last_name: 'User',
            date_joined: new Date().toISOString(),
            is_staff: true
          },
          {
            id: 2,
            username: 'user1',
            password: 'password123',
            email: 'user1@example.com',
            first_name: 'Regular',
            last_name: 'User',
            date_joined: new Date().toISOString(),
            is_staff: false
          }
        ];
        localStorage.setItem('users', JSON.stringify(defaultUsers));
        console.log('Default users created successfully');
      }
    } catch (error) {
      console.error('Error setting up default users:', error);
    }
  }, []);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="dashboard-card">
            <div className="card-body">
              <div className="text-center mb-4">
                <h2 className="mb-2" style={{ fontFamily: 'var(--heading-font)', color: 'var(--heading-color)' }}>Welcome Back</h2>
                <p className="text-muted">Sign in to your account</p>
              </div>
              
              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  <i className="bi bi-exclamation-circle me-2"></i>
                  {errorMessage}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-person"></i></span>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Enter your username"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group mb-4">
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-lock"></i></span>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>
                
                <div className="d-grid gap-2 mb-3">
                  <button type="submit" className="btn btn-primary">
                    <i className="bi bi-box-arrow-in-right me-2"></i>Sign In
                  </button>
                </div>
                
                <div className="text-center mb-3">
                  <p className="mb-0">Don't have an account? <Link to="/register">Register here</Link></p>
                </div>
              </form>
              
              <div className="admin-info mt-4 p-3" style={{ backgroundColor: 'rgba(0,0,0,0.03)', borderRadius: '8px' }}>
                <h5 className="mb-3"><i className="bi bi-shield-lock me-2"></i>Admin Access</h5>
                <p className="mb-2"><strong>Username:</strong> admin</p>
                <p className="mb-2"><strong>Password:</strong> admin123</p>
                <p className="mb-0 small text-muted">Use these credentials to access the admin dashboard.</p>
                <div className="d-grid mt-3">
                  <Link to="/admin" className="btn btn-sm btn-outline-secondary">
                    <i className="bi bi-speedometer2 me-2"></i>Go to Admin Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginFr;
