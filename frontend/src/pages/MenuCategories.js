import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MenuCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // In a real application, fetch data from your Django API
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Ideally, you would fetch this data from your Django API
        // const response = await axios.get('/api/categories/');
        // setCategories(response.data);
        
        // For now, we'll use mock data similar to your Django template
        const mockCategories = [
          {
            id: 1,
            category_title: 'Pizza',
            category_description: 'Our pizzas are made with fresh ingredients and baked in a traditional oven.',
            category_image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
          },
          {
            id: 2,
            category_title: 'Pasta',
            category_description: 'Authentic Italian pasta dishes made with homemade sauce.',
            category_image: 'https://images.unsplash.com/photo-1556761223-4c4282c73f77?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
          },
          {
            id: 3,
            category_title: 'Salad',
            category_description: 'Fresh salads made with locally sourced produce.',
            category_image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
          },
          {
            id: 4,
            category_title: 'Sub',
            category_description: 'Delicious submarine sandwiches with a variety of fillings.',
            category_image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
          },
          {
            id: 5,
            category_title: 'Dinner Platters',
            category_description: 'Generous portions of our most popular dishes.',
            category_image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
          }
        ];
        
        setCategories(mockCategories);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load menu categories. Please try again.');
        setLoading(false);
      }
    };
    
    fetchCategories();
  }, []);
  
  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading menu categories...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mt-4">
      <div className="section-header">
        <h2>Food Menu</h2>
        <p>Check Our <span>Delicious Menu</span></p>
      </div>
      <div className="row justify-content-center menu">
        {categories.map(category => (
          <div className="col-md-4 mb-4" key={category.id}>
            <div className="menu-item h-100 shadow">
              <img 
                src={category.category_image} 
                className="img-fluid" 
                alt={`${category.category_title} category`} 
              />
              <div className="menu-content d-flex flex-column">
                <h4>{category.category_title}</h4>
                <p className="flex-grow-1">{category.category_description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="menu-price">From $12.95</span>
                  <Link 
                    to={`/${category.category_title.toLowerCase()}`} 
                    className="btn btn-danger"
                  >
                    <i className="bi bi-cart-plus me-2"></i>Order Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuCategories;
