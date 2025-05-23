import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Pizza = () => {
  const [regularPizzas, setRegularPizzas] = useState([]);
  const [sicilianPizzas, setSicilianPizzas] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modal state
  const [showToppingsModal, setShowToppingsModal] = useState(false);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [numberOfToppingsRequired, setNumberOfToppingsRequired] = useState(0);
  const [currentPizzaSelection, setCurrentPizzaSelection] = useState({
    type: '',
    size: '',
    price: 0
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    // In a real application, fetch data from your Django API
    const fetchPizzaData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Ideally, you would fetch this data from your Django API
        // const response = await axios.get('/api/menu/pizzas/');
        
        // For now, we'll use mock data similar to your Django template
        const mockRegularPizzas = [
          { id: 1, pizza_choice: 'Cheese', small_price: 12.70, large_price: 17.95, category_description: 'Traditional New York style pizza' },
          { id: 2, pizza_choice: 'Special', small_price: 13.20, large_price: 19.95, category_description: 'default' },
          { id: 3, pizza_choice: '1 topping', small_price: 13.70, large_price: 20.95, category_description: 'default' },
          { id: 4, pizza_choice: '2 toppings', small_price: 15.20, large_price: 22.95, category_description: 'default' },
          { id: 5, pizza_choice: '3 toppings', small_price: 16.20, large_price: 24.95, category_description: 'default' },
          { id: 6, pizza_choice: 'Special', small_price: 17.75, large_price: 26.95, category_description: 'default' },
        ];
        
        const mockSicilianPizzas = [
          { id: 1, pizza_choice: 'Cheese', small_price: 24.45, large_price: 38.70, category_description: 'Deep dish square pizza with a thick crust' },
          { id: 2, pizza_choice: '1 topping', small_price: 26.45, large_price: 40.70, category_description: 'default' },
          { id: 3, pizza_choice: '2 toppings', small_price: 28.45, large_price: 42.70, category_description: 'default' },
          { id: 4, pizza_choice: '3 toppings', small_price: 30.45, large_price: 44.70, category_description: 'default' },
          { id: 5, pizza_choice: 'Special', small_price: 32.45, large_price: 47.70, category_description: 'default' },
        ];
        
        const mockToppings = [
          { id: 1, name: 'Pepperoni' },
          { id: 2, name: 'Sausage' },
          { id: 3, name: 'Mushrooms' },
          { id: 4, name: 'Onions' },
          { id: 5, name: 'Ham' },
          { id: 6, name: 'Canadian Bacon' },
          { id: 7, name: 'Pineapple' },
          { id: 8, name: 'Eggplant' },
          { id: 9, name: 'Tomato & Basil' },
          { id: 10, name: 'Green Peppers' },
          { id: 11, name: 'Hamburger' },
          { id: 12, name: 'Spinach' },
          { id: 13, name: 'Artichoke' },
          { id: 14, name: 'Buffalo Chicken' },
          { id: 15, name: 'Barbecue Chicken' },
          { id: 16, name: 'Anchovies' },
          { id: 17, name: 'Black Olives' },
          { id: 18, name: 'Fresh Garlic' },
          { id: 19, name: 'Zucchini' },
        ];
        
        setRegularPizzas(mockRegularPizzas);
        setSicilianPizzas(mockSicilianPizzas);
        setToppings(mockToppings);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching pizza data:', err);
        setError('Failed to load pizza menu. Please try again.');
        setLoading(false);
      }
    };
    
    fetchPizzaData();
  }, []);
  
  const getNumberOfToppings = (pizzaChoice) => {
    if (pizzaChoice.includes('1 topping')) return 1;
    if (pizzaChoice.includes('2 toppings')) return 2;
    if (pizzaChoice.includes('3 toppings')) return 3;
    return 0;
  };
  
  const handleAddToCart = (pizzaType, pizzaChoice, size, price) => {
    const numberOfToppings = getNumberOfToppings(pizzaChoice);
    
    if (numberOfToppings > 0) {
      // Open toppings selection modal
      setNumberOfToppingsRequired(numberOfToppings);
      setCurrentPizzaSelection({
        type: pizzaType,
        choice: pizzaChoice,
        size: size,
        price: price
      });
      setSelectedToppings([]);
      setShowToppingsModal(true);
    } else {
      // Add directly to cart
      const cartItem = {
        id: Date.now(),
        description: `${size} ${pizzaType} Pizza - ${pizzaChoice}`,
        price: price,
        quantity: 1
      };
      
      addItemToCart(cartItem);
    }
  };
  
  const handleToppingsSelection = (e) => {
    const options = e.target.options;
    const selectedValues = [];
    
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    
    setSelectedToppings(selectedValues);
  };
  
  const handleToppingsSubmit = () => {
    if (selectedToppings.length !== numberOfToppingsRequired) {
      alert(`Please select exactly ${numberOfToppingsRequired} topping${numberOfToppingsRequired > 1 ? 's' : ''}.`);
      return;
    }
    
    const toppingsText = selectedToppings.join(', ');
    const cartItem = {
      id: Date.now(),
      description: `${currentPizzaSelection.size} ${currentPizzaSelection.type} Pizza - ${currentPizzaSelection.choice} with ${toppingsText}`,
      price: currentPizzaSelection.price,
      quantity: 1
    };
    
    addItemToCart(cartItem);
    setShowToppingsModal(false);
  };
  
  const addItemToCart = (item) => {
    try {
      // Get existing cart or initialize a new one
      let cart = [];
      
      try {
        // Try to get existing cart from localStorage
        const cartData = localStorage.getItem('cart');
        if (cartData) {
          // Parse the existing cart data
          const parsedCart = JSON.parse(cartData);
          // Ensure it's an array
          cart = Array.isArray(parsedCart) ? parsedCart : [];
        }
      } catch (e) {
        console.warn('Error reading cart from localStorage, initializing empty cart', e);
        cart = [];
      }
      
      // Add the new item to cart
      cart.push(item);
      
      // Save cart back to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      
      // Notify the user
      alert(`Added to cart: ${item.description}`);
      
      // Trigger storage event for any listeners (like the Navbar)
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error('Error adding item to cart:', error);
      alert('Sorry, there was an error adding the item to your cart. Please try again.');
    }
  };
  
  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading pizza menu...</p>
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
        <h2>Our Menu</h2>
        <p>Choose your <span>Favorite Pizza</span> 🍕</p>
      </div>
      <div className="card shadow">
        <div className="card-body">
          
          <div className="row justify-content-center mb-4">
            <div className="col-md-5">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Regular</h5>
                  {regularPizzas.map(pizza => (
                    pizza.category_description !== "default" && (
                      <p key={pizza.id} className="card-text">
                        {pizza.category_description}
                      </p>
                    )
                  ))}
                </div>
              </div>
            </div>
            
            <div className="col-md-5">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Sicilian</h5>
                  {sicilianPizzas.map(pizza => (
                    pizza.category_description !== "default" && (
                      <p key={pizza.id} className="card-text">
                        {pizza.category_description}
                      </p>
                    )
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6 mb-4">
              <h5>Sicilian Pizza</h5>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="table-dark">
                    <tr>
                      <th>Pizza</th>
                      <th>Small</th>
                      <th>Large</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sicilianPizzas.map(pizza => (
                      <tr key={pizza.id}>
                        <th>{pizza.pizza_choice}</th>
                        <td>
                          <button 
                            className="btn btn-outline-danger"
                            onClick={() => handleAddToCart('Sicilian', pizza.pizza_choice, 'Small', pizza.small_price)}
                          >
                            ${pizza.small_price.toFixed(2)}
                          </button>
                        </td>
                        <td>
                          <button 
                            className="btn btn-danger"
                            onClick={() => handleAddToCart('Sicilian', pizza.pizza_choice, 'Large', pizza.large_price)}
                          >
                            ${pizza.large_price.toFixed(2)}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="col-md-6">
              <h5>Regular Pizza</h5>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="table-dark">
                    <tr>
                      <th>Pizza</th>
                      <th>Small</th>
                      <th>Large</th>
                    </tr>
                  </thead>
                  <tbody>
                    {regularPizzas.map(pizza => (
                      <tr key={pizza.id}>
                        <th>{pizza.pizza_choice}</th>
                        <td>
                          <button 
                            className="btn btn-outline-danger"
                            onClick={() => handleAddToCart('Regular', pizza.pizza_choice, 'Small', pizza.small_price)}
                          >
                            ${pizza.small_price.toFixed(2)}
                          </button>
                        </td>
                        <td>
                          <button 
                            className="btn btn-danger"
                            onClick={() => handleAddToCart('Regular', pizza.pizza_choice, 'Large', pizza.large_price)}
                          >
                            ${pizza.large_price.toFixed(2)}
                          </button>
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
      
      {/* Toppings Selection Modal */}
      <Modal show={showToppingsModal} onHide={() => setShowToppingsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select Toppings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please select exactly {numberOfToppingsRequired} topping{numberOfToppingsRequired > 1 ? 's' : ''}:</p>
          <Form.Control 
            as="select" 
            multiple 
            value={selectedToppings} 
            onChange={handleToppingsSelection}
            style={{ height: '200px' }}
          >
            {toppings.map(topping => (
              <option key={topping.id} value={topping.name}>
                {topping.name}
              </option>
            ))}
          </Form.Control>
          {selectedToppings.length !== numberOfToppingsRequired && (
            <p className="text-danger mt-2">
              You must select exactly {numberOfToppingsRequired} topping{numberOfToppingsRequired > 1 ? 's' : ''}.
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowToppingsModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleToppingsSubmit}>
            Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Pizza;
