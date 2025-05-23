import React, { useState } from 'react';
import '../styles/main.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="container mt-4">
      <div className="section-header">
        <h2>Contact</h2>
        <p>Need Help? <span>Contact Us</span></p>
      </div>

      <div className="row">
        <div className="col-lg-5">
          <div className="dashboard-card mb-4">
            <div className="card-body">
              <h3 className="mb-4" style={{ fontFamily: 'var(--heading-font)', color: 'var(--heading-color)' }}>Get in Touch</h3>
              
              <div className="d-flex align-items-center mb-3">
                <div className="me-3">
                  <div className="stat-card-icon" style={{ backgroundColor: 'var(--accent-color)', width: '40px', height: '40px' }}>
                    <i className="bi bi-geo-alt"></i>
                  </div>
                </div>
                <div>
                  <h5 className="mb-0">Location:</h5>
                  <p className="mb-0">123 Pizza Street, New York, NY 10001</p>
                </div>
              </div>
              
              <div className="d-flex align-items-center mb-3">
                <div className="me-3">
                  <div className="stat-card-icon" style={{ backgroundColor: '#5bd9a9', width: '40px', height: '40px' }}>
                    <i className="bi bi-envelope"></i>
                  </div>
                </div>
                <div>
                  <h5 className="mb-0">Email:</h5>
                  <p className="mb-0">info@pizzarestaurant.com</p>
                </div>
              </div>
              
              <div className="d-flex align-items-center mb-3">
                <div className="me-3">
                  <div className="stat-card-icon" style={{ backgroundColor: '#ffb03b', width: '40px', height: '40px' }}>
                    <i className="bi bi-telephone"></i>
                  </div>
                </div>
                <div>
                  <h5 className="mb-0">Call:</h5>
                  <p className="mb-0">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <div className="stat-card-icon" style={{ backgroundColor: '#6c757d', width: '40px', height: '40px' }}>
                    <i className="bi bi-clock"></i>
                  </div>
                </div>
                <div>
                  <h5 className="mb-0">Open Hours:</h5>
                  <p className="mb-0">Monday-Saturday: 11AM - 10PM<br />Sunday: 12PM - 9PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-lg-7">
          <div className="dashboard-card">
            <div className="card-body">
              <h3 className="mb-4" style={{ fontFamily: 'var(--heading-font)', color: 'var(--heading-color)' }}>Send us a Message</h3>
              
              {submitted ? (
                <div className="alert alert-success" role="alert">
                  <i className="bi bi-check-circle me-2"></i> Thank you for your message! We'll get back to you soon.
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="name" className="form-label">Your Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="email" className="form-label">Your Email</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="subject" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea 
                      className="form-control" 
                      id="message" 
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  
                  <div className="text-center">
                    <button type="submit" className="btn btn-danger">
                      <i className="bi bi-send me-2"></i>Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-5">
        <div className="dashboard-card">
          <div className="card-body p-0">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.6175903075606!2d-73.98784368499875!3d40.74844057932772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1590179541218!5m2!1sen!2sus" 
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Restaurant Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
