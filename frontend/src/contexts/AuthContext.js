import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for stored user on initial load and listen for storage changes
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setCurrentUser(user);
          setIsAuthenticated(true);
          console.log('User authenticated from localStorage:', user.username);
        } else {
          console.log('No user found in localStorage');
          setCurrentUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        // Clear potentially corrupted auth data
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    // Initial check
    checkAuth();
    
    // Listen for storage events (in case another tab changes auth state)
    const handleStorageChange = (e) => {
      if (e.key === 'currentUser') {
        checkAuth();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Login function
  const login = (userData) => {
    if (!userData) {
      console.error('Attempting to login with invalid user data');
      return false;
    }
    
    try {
      // Ensure all required fields are present
      const validatedUser = {
        id: userData.id || Date.now(),
        username: userData.username,
        email: userData.email || '',
        first_name: userData.first_name || '',
        last_name: userData.last_name || '',
        is_authenticated: true,
        is_staff: userData.is_staff || (userData.username === 'admin')
      };
      
      // Update state
      setCurrentUser(validatedUser);
      setIsAuthenticated(true);
      
      // Store in localStorage
      localStorage.setItem('currentUser', JSON.stringify(validatedUser));
      
      console.log('User logged in successfully:', validatedUser.username);
      return true;
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
    
    // Also clear cart data for security
    localStorage.removeItem('cart');
    
    // Dispatch storage event to ensure all components update
    window.dispatchEvent(new Event('storage'));
  };

  // Check if user is admin
  const isAdmin = () => {
    return currentUser && currentUser.username === 'admin';
  };

  // Auth context value
  const value = {
    currentUser,
    isAuthenticated,
    isLoading,
    login,
    logout,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
