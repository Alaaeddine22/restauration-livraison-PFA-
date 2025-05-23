import React, { useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  UNSAFE_DataRouterContext,
  UNSAFE_DataRouterStateContext
} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Home from './pages/Home';
import Menu from './pages/Menu';
import MenuCategories from './pages/MenuCategories';
import Cart from './pages/Cart';
// Login page consolidated to LoginFr only
import LoginFr from './pages/LoginFr';
import Register from './pages/Register';
import Orders from './pages/Orders';
import Pizza from './pages/Pizza';
import Contact from './pages/Contact';
import Dashboard from './pages/admin/Dashboard';

// Configure future flags to address warnings
UNSAFE_DataRouterContext.v7_startTransition = true;
UNSAFE_DataRouterStateContext.v7_relativeSplatPath = true;

function App() {
  const useHeader = window.location.pathname === '/menu-categories' || 
                     window.location.pathname === '/pizza' || 
                     window.location.pathname === '/pasta' ||
                     window.location.pathname === '/salad' ||
                     window.location.pathname === '/sub' ||
                     window.location.pathname === '/dinner-platters';
  
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          {/* Show Navbar on most pages, Header on converted pages */}
          <Routes>
            <Route path="/menu-categories" element={<Header />} />
            <Route path="/pizza" element={<Header />} />
            <Route path="/pasta" element={<Header />} />
            <Route path="/salad" element={<Header />} />
            <Route path="/sub" element={<Header />} />
            <Route path="/dinner-platters" element={<Header />} />
            <Route path="/login-fr" element={<Header />} />
            <Route path="/contact" element={<Header />} />
            <Route path="*" element={<Navbar />} />
          </Routes>
          
          <main className="container mt-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/menu-categories" element={<MenuCategories />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<LoginFr />} />
              <Route path="/login-fr" element={<LoginFr />} />
              <Route path="/register" element={<Register />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/pizza" element={<Pizza />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Dashboard />} />
            </Routes>
          </main>
          
          <footer className="mt-5 py-3 bg-dark text-white text-center">
            <div className="container">
              <p>&copy; {new Date().getFullYear()} Pizza Restaurant. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
