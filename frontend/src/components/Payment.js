import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const Payment = ({ show, onHide, onComplete, amount }) => {
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [formattedCardNumber, setFormattedCardNumber] = useState('');

  // Handle card number formatting with spaces
  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\s/g, '');
    setCardNumber(value);
    
    // Format with spaces
    const formatted = value.replace(/(\d{4})/g, '$1 ').trim();
    setFormattedCardNumber(formatted);
  };

  // Handle expiry date formatting (MM/YY)
  const handleExpiryChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 2) {
      setExpiryDate(value);
    } else {
      setExpiryDate(`${value.slice(0, 2)}/${value.slice(2, 4)}`);
    }
  };

  const validateForm = () => {
    // Reset error
    setError('');
    
    // Simple validation
    if (paymentMethod === 'credit-card') {
      if (!cardNumber || cardNumber.length < 16) {
        setError('Please enter a valid card number');
        return false;
      }
      
      if (!expiryDate || expiryDate.length < 4) {
        setError('Please enter a valid expiry date');
        return false;
      }
      
      if (!cvv || cvv.length < 3) {
        setError('Please enter a valid CVV');
        return false;
      }
      
      if (!nameOnCard) {
        setError('Please enter the name on card');
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Simulate payment processing
    setProcessing(true);
    
    setTimeout(() => {
      setProcessing(false);
      
      // Generate a transaction ID
      const transactionId = `TXN${Date.now().toString().substr(-8)}`;
      
      // Complete the payment
      onComplete({
        transactionId,
        paymentMethod,
        amount,
        date: new Date().toISOString(),
        last4: cardNumber.slice(-4)
      });
    }, 2000);
  };

  return (
    <Modal 
      show={show} 
      onHide={onHide}
      backdrop="static"
      keyboard={false}
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && (
          <Alert variant="danger">
            {error}
          </Alert>
        )}
        
        <div className="mb-4">
          <h4>Order Summary</h4>
          <div className="d-flex justify-content-between">
            <span>Total Amount:</span>
            <span className="fw-bold">${amount.toFixed(2)}</span>
          </div>
        </div>
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label>Payment Method</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                id="credit-card"
                name="paymentMethod"
                label="Credit/Debit Card"
                value="credit-card"
                checked={paymentMethod === 'credit-card'}
                onChange={() => setPaymentMethod('credit-card')}
              />
              <Form.Check
                inline
                type="radio"
                id="paypal"
                name="paymentMethod"
                label="PayPal"
                value="paypal"
                checked={paymentMethod === 'paypal'}
                onChange={() => setPaymentMethod('paypal')}
              />
              <Form.Check
                inline
                type="radio"
                id="cash"
                name="paymentMethod"
                label="Cash on Delivery"
                value="cash"
                checked={paymentMethod === 'cash'}
                onChange={() => setPaymentMethod('cash')}
              />
            </div>
          </Form.Group>
          
          {paymentMethod === 'credit-card' && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Name on Card</Form.Label>
                <Form.Control
                  type="text"
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                  placeholder="Name as it appears on your card"
                  required
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Card Number</Form.Label>
                <Form.Control
                  type="text"
                  value={formattedCardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="XXXX XXXX XXXX XXXX"
                  maxLength={19}
                  required
                />
              </Form.Group>
              
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Expiry Date</Form.Label>
                    <Form.Control
                      type="text"
                      value={expiryDate}
                      onChange={handleExpiryChange}
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>CVV</Form.Label>
                    <Form.Control
                      type="password"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      placeholder="XXX"
                      maxLength={4}
                      required
                    />
                  </Form.Group>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="bg-light p-3 rounded">
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-shield-lock me-2"></i>
                    <strong>Secure Payment</strong>
                  </div>
                  <small className="text-muted">Your payment information is encrypted and secure. We do not store your credit card details.</small>
                </div>
              </div>
            </>
          )}
          
          {paymentMethod === 'paypal' && (
            <div className="text-center p-4">
              <div className="mb-4">
                <i className="bi bi-paypal" style={{ fontSize: '3rem', color: '#0070ba' }}></i>
                <h5 className="mt-2">PayPal</h5>
              </div>
              <p>You will be redirected to PayPal to complete your payment.</p>
            </div>
          )}
          
          {paymentMethod === 'cash' && (
            <div className="text-center p-4">
              <div className="mb-4">
                <i className="bi bi-cash" style={{ fontSize: '3rem', color: '#28a745' }}></i>
                <h5 className="mt-2">Cash on Delivery</h5>
              </div>
              <p>You will pay when your order is delivered.</p>
            </div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={processing}>
          Cancel
        </Button>
        <Button 
          variant="primary" 
          onClick={handleSubmit}
          disabled={processing}
        >
          {processing ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Processing...
            </>
          ) : (
            `Pay $${amount.toFixed(2)}`
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Payment;
