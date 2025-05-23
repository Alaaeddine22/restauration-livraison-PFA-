import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';

const Home = () => {
  return (
    <div>
      <section className="hero-section py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4" style={{ fontFamily: 'var(--heading-font)', fontWeight: 'bold' }}>
                Welcome to <span style={{ color: 'var(--accent-color)' }}>Pizza</span> Restaurant
              </h1>
              <p className="lead my-4">Enjoy our delicious Italian cuisine made with fresh ingredients. Authentic recipes prepared by our expert chefs to deliver the perfect taste.</p>
              <div className="d-flex gap-3">
                <Link to="/menu-categories" className="btn btn-danger btn-lg">
                  <i className="bi bi-grid me-2"></i>Browse Menu
                </Link>
                <Link to="/pizza" className="btn btn-outline-dark btn-lg">
                  <i className="bi bi-arrow-right me-2"></i>Order Pizza
                </Link>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <img 
                src="/images/hero-img.png" 
                alt="Pizza Restaurant" 
                className="img-fluid rounded shadow-lg" 
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="section-header">
            <h2>Why Us</h2>
            <p>Why <span>Choose Us</span></p>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <div className="stat-card-icon mx-auto" style={{ backgroundColor: '#ffb03b' }}>
                    <i className="bi bi-award"></i>
                  </div>
                  <h3 className="card-title">Quality Ingredients</h3>
                  <p className="card-text">We use only the freshest and highest quality ingredients for all our dishes.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <div className="stat-card-icon mx-auto" style={{ backgroundColor: '#5bd9a9' }}>
                    <i className="bi bi-clock"></i>
                  </div>
                  <h3 className="card-title">Fast Delivery</h3>
                  <p className="card-text">Our dedicated delivery team ensures your food arrives hot and fresh.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <div className="stat-card-icon mx-auto" style={{ backgroundColor: 'var(--accent-color)' }}>
                    <i className="bi bi-heart"></i>
                  </div>
                  <h3 className="card-title">Made with Love</h3>
                  <p className="card-text">Every dish is prepared with passion and attention to detail.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <div className="section-header">
            <h2>Our Specials</h2>
            <p>Check Our <span>Specials</span></p>
          </div>
          <div className="row menu">
            <div className="col-md-4">
              <div className="menu-item">
                <img src="/images/menu-item-1.png" className="img-fluid" alt="Margherita Pizza" />
                <div className="menu-content">
                  <h4>Margherita Pizza</h4>
                  <p>Classic pizza with tomato sauce, mozzarella, and basil.</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="menu-price">$12.95</span>
                    <Link to="/pizza" className="btn btn-danger">
                      <i className="bi bi-cart-plus me-2"></i>Order Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="menu-item">
                <img src="/images/menu-item-2.png" className="img-fluid" alt="Pepperoni Pizza" />
                <div className="menu-content">
                  <h4>Pepperoni Pizza</h4>
                  <p>Delicious pizza topped with pepperoni slices.</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="menu-price">$14.95</span>
                    <Link to="/pizza" className="btn btn-danger">
                      <i className="bi bi-cart-plus me-2"></i>Order Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="menu-item">
                <img src="/images/menu-item-3.png" className="img-fluid" alt="Pasta" />
                <div className="menu-content">
                  <h4>Special Pizza</h4>
                  <p>Our chef's special pizza with secret sauce and premium toppings.</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="menu-price">$17.95</span>
                    <Link to="/pizza" className="btn btn-danger">
                      <i className="bi bi-cart-plus me-2"></i>Order Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
