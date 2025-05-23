import axios from 'axios';

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

// Create an axios instance with custom configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  // If in development, prioritize using localStorage
  useLocalStorageFallback: isDevelopment
});

// Add a request interceptor to handle authentication tokens
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Implement development fallback for API errors
    if (error.response && error.response.status === 500) {
      console.log('API error in development mode, fallback to localStorage may be used');
    }
    
    // Don't automatically log out on API errors
    // Only log console warning for debugging
    if (error.response && error.response.status === 401) {
      console.warn('API authentication error, but keeping user logged in');
      // We're removing this automatic logout behavior
      // Users should only be logged out when they explicitly press the logout button
    }
    
    return Promise.reject(error);
  }
);

// Utility functions for common API operations
export const loginUser = async (credentials) => {
  // If in development mode or using fallback is explicitly enabled, use localStorage directly
  if (isDevelopment || api.defaults.useLocalStorageFallback) {
    console.log('Development mode: using localStorage for authentication');
    try {
      return handleLoginFallback(credentials);
    } catch (error) {
      throw error; // Re-throw the error to be handled by the calling component
    }
  }
  
  // Otherwise, try the API first
  try {
    const response = await api.post('/api/auth/login/', credentials);
    return response.data;
  } catch (error) {
    console.log('API error, using localStorage fallback');
    return handleLoginFallback(credentials);
  }
};

export const registerUser = async (userData) => {
  // If in development mode or using fallback is explicitly enabled, use localStorage directly
  if (isDevelopment || api.defaults.useLocalStorageFallback) {
    console.log('Development mode: using localStorage for registration');
    try {
      return handleRegisterFallback(userData);
    } catch (error) {
      throw error; // Re-throw the error to be handled by the calling component
    }
  }
  
  // Otherwise, try the API first
  try {
    const response = await api.post('/api/auth/register/', userData);
    return response.data;
  } catch (error) {
    console.log('API error, using localStorage fallback for registration');
    return handleRegisterFallback(userData);
  }
};

// Development fallback functions
const handleLoginFallback = (credentials) => {
  let users = [];
  try {
    const usersData = localStorage.getItem('users');
    if (usersData) {
      const parsedUsers = JSON.parse(usersData);
      if (Array.isArray(parsedUsers)) {
        users = parsedUsers;
      }
    }
  } catch (e) {
    console.error('Error parsing users from localStorage:', e);
    throw new Error('An error occurred during login');
  }
  
  // Find user with matching credentials
  const user = users.find(u => 
    u.username === credentials.username && u.password === credentials.password
  );
  
  if (!user) {
    throw new Error('Invalid username or password');
  }
  
  // Create mock response
  return {
    token: 'dev-token-' + Date.now(),
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      is_staff: user.is_staff || false
    }
  };
};

const handleRegisterFallback = (userData) => {
  let users = [];
  try {
    const usersData = localStorage.getItem('users');
    if (usersData) {
      const parsedUsers = JSON.parse(usersData);
      if (Array.isArray(parsedUsers)) {
        users = parsedUsers;
      }
    }
  } catch (e) {
    console.error('Error parsing users from localStorage:', e);
    users = [];
  }
  
  // Check if username already exists
  if (users.some(user => user.username === userData.username)) {
    throw new Error('Username already exists');
  }
  
  // Check if email already exists
  if (users.some(user => user.email === userData.email)) {
    throw new Error('Email already exists');
  }
  
  // Add new user
  const newUser = {
    ...userData,
    id: Date.now(),
    date_joined: new Date().toISOString(),
    is_staff: false
  };
  
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  
  // Create mock response with user data for auto-login
  return {
    message: 'User registered successfully',
    user: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      first_name: newUser.first_name || '',
      last_name: newUser.last_name || '',
      is_staff: newUser.is_staff || false
    }
  };
};

export default api;
