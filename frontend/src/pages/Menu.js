import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Menu = () => {
  const [menuData, setMenuData] = useState({
    categories: [],
    regular_pizzas: [],
    sicilian_pizzas: [],
    toppings: [],
    subs: [],
    pastas: [],
    salads: [],
    dinner_platters: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('regular_pizzas');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/menu/');
        setMenuData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load menu. Please try again later.');
        setLoading(false);
        console.error('Error fetching menu:', err);
      }
    };

    fetchMenu();
  }, []);

  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartItem = {
      id: item.id,
      name: item.name || item.pizza_type,
      price: item.price_small || item.price || 0,
      quantity: 1,
      category: activeCategory,
      size: 'small'
    };
    
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Trigger storage event for navbar to update cart count
    window.dispatchEvent(new Event('storage'));
    
    alert('Item added to cart!');
  };

  const renderMenuItems = () => {
    if (loading) return <p className="text-center py-5">Loading menu...</p>;
    if (error) return <p className="text-center py-5 text-danger">{error}</p>;

    const items = menuData[activeCategory] || [];
    
    if (items.length === 0) {
      return <p className="text-center py-5">No items available in this category.</p>;
    }

    return (
      <div className="row">
        {items.map(item => (
          <div key={item.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{item.name || item.pizza_type || 'Menu Item'}</h5>
                {activeCategory.includes('pizza') && (
                  <div className="mb-3">
                    <p className="mb-1">Small: ${item.price_small}</p>
                    <p className="mb-1">Large: ${item.price_large}</p>
                  </div>
                )}
                {!activeCategory.includes('pizza') && item.price && (
                  <p className="mb-3">${item.price}</p>
                )}
                <button 
                  className="btn btn-primary"
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4">Our Menu</h1>
      
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeCategory === 'regular_pizzas' ? 'active' : ''}`} 
            onClick={() => setActiveCategory('regular_pizzas')}
          >
            Regular Pizzas
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeCategory === 'sicilian_pizzas' ? 'active' : ''}`} 
            onClick={() => setActiveCategory('sicilian_pizzas')}
          >
            Sicilian Pizzas
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeCategory === 'subs' ? 'active' : ''}`} 
            onClick={() => setActiveCategory('subs')}
          >
            Subs
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeCategory === 'pastas' ? 'active' : ''}`} 
            onClick={() => setActiveCategory('pastas')}
          >
            Pasta
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeCategory === 'salads' ? 'active' : ''}`} 
            onClick={() => setActiveCategory('salads')}
          >
            Salads
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeCategory === 'dinner_platters' ? 'active' : ''}`} 
            onClick={() => setActiveCategory('dinner_platters')}
          >
            Dinner Platters
          </button>
        </li>
      </ul>
      
      {renderMenuItems()}
    </div>
  );
};

export default Menu;
