import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Toast, ToastContainer } from 'react-bootstrap';
import Payment from '../components/Payment';
import { useAuth } from '../contexts/AuthContext';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [totalWithTax, setTotalWithTax] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();

  useEffect(() => {
    // Ensure user authentication is maintained
    console.log('Cart component - Current user:', currentUser?.username);
    console.log('Cart component - Is authenticated:', isAuthenticated);
    
    // Get cart items from localStorage
    try {
      const storedCartItems = localStorage.getItem('cart');
      if (storedCartItems) {
        setCartItems(JSON.parse(storedCartItems));
      }
      
      // Double-check authentication status
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser && !currentUser) {
        console.warn('User data found in localStorage but not in context, restoring...');
        // The user data exists but our context doesn't have it - this helps recover from some edge cases
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setIsLoading(false);
    }
    
    // Load cart items from localStorage
    const loadCart = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartItems(cart);
      
      // Calculate total
      const cartTotal = cart.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
      }, 0);
      
      setTotal(cartTotal);
      
      // Calculate total with tax (9% tax)
      const tax = cartTotal * 0.09;
      setTotalWithTax(cartTotal + tax);
    };

    loadCart();
    
    // Listen for cart updates
    window.addEventListener('storage', loadCart);
    return () => window.removeEventListener('storage', loadCart);
  }, []);

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQuantity;
    setCartItems(updatedCart);
    
    // Update localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Recalculate total
    const cartTotal = updatedCart.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
    
    setTotal(cartTotal);
  };

  const removeItem = (index) => {
    const updatedCart = [...cartItems];
    const removedItem = updatedCart[index];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    
    // Update localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Trigger storage event for navbar to update cart count
    window.dispatchEvent(new Event('storage'));
    
    // Recalculate total
    const cartTotal = updatedCart.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
    
    setTotal(cartTotal);
    
    // Show toast notification
    setToastMessage(`Removed ${removedItem.description} from cart`);
    setToastType('warning');
    setShowToast(true);
  };

  const clearCart = () => {
    setCartItems([]);
    
    // Instead of removing the cart from localStorage, set it as an empty array
    localStorage.setItem('cart', JSON.stringify([]));
    
    // Trigger storage event for navbar to update cart count
    window.dispatchEvent(new Event('storage'));
    
    setTotal(0);
    setTotalWithTax(0);
  };

  const initiateCheckout = () => {
    // Check for authentication using our AuthContext
    if (!isAuthenticated) {
      setToastMessage('Please login to place an order');
      setToastType('danger');
      setShowToast(true);
      setTimeout(() => navigate('/login-fr'), 2000);
      return;
    }
    
    if (cartItems.length === 0) {
      setToastMessage('Your cart is empty');
      setToastType('warning');
      setShowToast(true);
      return;
    }
    
    // Show payment modal
    setShowPaymentModal(true);
  };
  
  const handlePaymentComplete = async (paymentDetails) => {
    // Hide payment modal
    setShowPaymentModal(false);
    
    try {
      setLoading(true);
      
      // Use currentUser from AuthContext instead of reading from localStorage directly
      // This prevents any issues with the user session
      
      // Format order data
      const orderData = {
        customer: currentUser.username,
        items: cartItems.map(item => ({
          description: item.description,
          price: item.price,
          quantity: item.quantity
        })),
        total: totalWithTax,
        status: 'Paid',
        payment: {
          method: paymentDetails.paymentMethod,
          transactionId: paymentDetails.transactionId,
          date: paymentDetails.date,
          amount: paymentDetails.amount
        }
      };
      
      // In a real application, this would send the data to the backend
      // await axios.post('/api/orders/', orderData);
      
      // For now, we'll simulate a successful order by storing it in localStorage
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const newOrder = {
        id: Date.now(),
        date: new Date().toISOString(),
        ...orderData
      };
      orders.push(newOrder);
      localStorage.setItem('orders', JSON.stringify(orders));
      
      // Clear cart after successful order, but be careful not to affect user login
      setCartItems([]);
      localStorage.setItem('cart', JSON.stringify([]));
      setTotal(0);
      setTotalWithTax(0);
      
      // Trigger storage event for navbar to update cart count
      window.dispatchEvent(new Event('storage'));
      
      // Set success message
      setToastMessage('Payment successful! Order placed successfully!');
      setToastType('success');
      setShowToast(true);
      
      // Use a reference to the current user to ensure we're still logged in when redirecting
      const username = currentUser ? currentUser.username : '';
      console.log(`Redirecting to orders page for user: ${username}`);
      
      // Navigate with a slight delay to allow the toast to be seen
      setTimeout(() => {
        if (isAuthenticated) {
          navigate('/orders');
        } else {
          console.error('User authentication lost during payment process');
          // If somehow authentication was lost, redirect to home page instead
          navigate('/');
        }
      }, 2000);
      
    } catch (error) {
      console.error('Error placing order:', error);
      setToastMessage('Failed to place order. Please try again.');
      setToastType('danger');
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="mb-4">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-5">
          <div className="card shadow-sm p-5">
            <div className="card-body">
              <i className="bi bi-cart-x" style={{ fontSize: '4rem', color: '#ccc' }}></i>
              <h3 className="mt-3">Your cart is empty</h3>
              <p className="text-muted">Add some delicious items to your cart and come back!</p>
              <div className="mt-4">
                <Link to="/menu-categories" className="btn btn-primary me-2">Browse Menu</Link>
                <Link to="/pizza" className="btn btn-outline-primary">Order Pizza</Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">Cart Items</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr key={index}>
                        <td>{item.description}</td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>
                          <div className="input-group input-group-sm" style={{ width: '120px' }}>
                            <button 
                              className="btn btn-outline-secondary" 
                              type="button"
                              onClick={() => updateQuantity(index, item.quantity - 1)}
                            >
                              <i className="bi bi-dash"></i>
                            </button>
                            <input 
                              type="number" 
                              className="form-control text-center" 
                              value={item.quantity}
                              readOnly
                            />
                            <button 
                              className="btn btn-outline-secondary" 
                              type="button"
                              onClick={() => updateQuantity(index, item.quantity + 1)}
                            >
                              <i className="bi bi-plus"></i>
                            </button>
                          </div>
                        </td>
                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                        <td>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeItem(index)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <div className="row mb-4">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Order Summary</h5>
                  <hr />
                  <div className="d-flex justify-content-between mb-3">
                    <span>Subtotal:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Tax (9%):</span>
                    <span>${(total * 0.09).toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Shipping:</span>
                    <span>$0.00</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-3">
                    <strong>Total:</strong>
                    <strong>${totalWithTax.toFixed(2)}</strong>
                  </div>
                  <button 
                    className="btn btn-primary w-100" 
                    onClick={initiateCheckout}
                    disabled={loading || cartItems.length === 0}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span className="ms-2">Processing...</span>
                      </>
                    ) : 'Proceed to Payment'}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-header bg-light">
                  <h5 className="mb-0">Actions</h5>
                </div>
                <div className="card-body">
                  <div className="d-grid gap-2">
                    
                    <Link to="/menu-categories" className="btn btn-outline-primary">
                      <i className="bi bi-arrow-left me-2"></i> Continue Shopping
                    </Link>
                    
                    <button 
                      className="btn btn-outline-danger"
                      onClick={clearCart}
                    >
                      <i className="bi bi-trash me-2"></i> Clear Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 1070 }}>
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)} 
          delay={3000} 
          autohide 
          bg={toastType}
        >
          <Toast.Header>
            <strong className="me-auto">{toastType === 'success' ? 'Success' : toastType === 'danger' ? 'Error' : 'Notice'}</strong>
          </Toast.Header>
          <Toast.Body className={toastType === 'danger' ? 'text-white' : ''}>
            {toastMessage}
          </Toast.Body>
        </Toast>
      </ToastContainer>
      
      {/* Payment Modal */}
      <Payment
        show={showPaymentModal}
        onHide={() => setShowPaymentModal(false)}
        onComplete={handlePaymentComplete}
        amount={totalWithTax}
      />
    </div>
  );
};

export default Cart;
