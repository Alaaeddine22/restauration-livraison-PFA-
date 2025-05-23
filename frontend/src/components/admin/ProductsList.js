import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: ''
  });
  
  useEffect(() => {
    // In a real application, fetch products from the API
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // This would be an actual API call in a real application
        // const response = await axios.get('/api/admin/products/');
        // setProducts(response.data);
        
        // Mock data for demonstration
        setTimeout(() => {
          const mockProducts = [
            { id: 1, name: 'Margherita Pizza', category: 'Regular Pizza', price: 8.99, description: 'Classic pizza with tomato sauce, mozzarella, and basil.' },
            { id: 2, name: 'Pepperoni Pizza', category: 'Regular Pizza', price: 10.99, description: 'Pizza topped with pepperoni slices.' },
            { id: 3, name: 'Hawaiian Pizza', category: 'Regular Pizza', price: 11.99, description: 'Pizza with ham and pineapple toppings.' },
            { id: 4, name: 'Meat Lovers Pizza', category: 'Sicilian Pizza', price: 14.99, description: 'Deep dish pizza loaded with various meats.' },
            { id: 5, name: 'Veggie Pizza', category: 'Sicilian Pizza', price: 12.99, description: 'Deep dish pizza with assorted vegetables.' },
            { id: 6, name: 'Italian Sub', category: 'Sub', price: 9.50, description: 'Sub sandwich with Italian meats and cheeses.' },
            { id: 7, name: 'Meatball Sub', category: 'Sub', price: 9.99, description: 'Sub sandwich with meatballs and marinara sauce.' },
            { id: 8, name: 'Spaghetti Bolognese', category: 'Pasta', price: 12.50, description: 'Spaghetti with meat sauce.' },
            { id: 9, name: 'Fettuccine Alfredo', category: 'Pasta', price: 13.99, description: 'Fettuccine pasta in creamy Alfredo sauce.' },
            { id: 10, name: 'Caesar Salad', category: 'Salad', price: 7.99, description: 'Classic Caesar salad with romaine lettuce and croutons.' }
          ];
          setProducts(mockProducts);
          setLoading(false);
        }, 1000);
        
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again.');
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  const handleEditClick = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description
    });
  };
  
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    
    try {
      // Validate form
      if (!formData.name || !formData.category || !formData.price) {
        alert('Please fill in all required fields');
        return;
      }
      
      // This would be an actual API call in a real application
      // await axios.patch(`/api/admin/products/${editingProduct.id}/`, formData);
      
      // Update local state
      setProducts(products.map(product => 
        product.id === editingProduct.id 
          ? { ...product, ...formData, price: parseFloat(formData.price) } 
          : product
      ));
      
      // Reset form
      setEditingProduct(null);
      setFormData({
        name: '',
        category: '',
        price: '',
        description: ''
      });
      
      alert('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product. Please try again.');
    }
  };
  
  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        // This would be an actual API call in a real application
        // await axios.delete(`/api/admin/products/${productId}/`);
        
        // Remove the deleted product from state
        setProducts(products.filter(product => product.id !== productId));
        
        alert('Product deleted successfully');
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product. Please try again.');
      }
    }
  };
  
  const handleAddNewClick = () => {
    setEditingProduct({
      id: 'new',
      name: '',
      category: '',
      price: '',
      description: ''
    });
    setFormData({
      name: '',
      category: '',
      price: '',
      description: ''
    });
  };
  
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    
    try {
      // Validate form
      if (!formData.name || !formData.category || !formData.price) {
        alert('Please fill in all required fields');
        return;
      }
      
      // This would be an actual API call in a real application
      // const response = await axios.post('/api/admin/products/', formData);
      // const newProduct = response.data;
      
      // Mock new product creation
      const newProduct = {
        id: products.length + 1,
        ...formData,
        price: parseFloat(formData.price)
      };
      
      // Update local state
      setProducts([...products, newProduct]);
      
      // Reset form
      setEditingProduct(null);
      setFormData({
        name: '',
        category: '',
        price: '',
        description: ''
      });
      
      alert('Product created successfully');
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product. Please try again.');
    }
  };
  
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }
  
  // If currently editing a product, show the edit form
  if (editingProduct) {
    return (
      <div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>{editingProduct.id === 'new' ? 'Add New Product' : 'Edit Product'}</h2>
          <button 
            className="btn btn-secondary"
            onClick={() => setEditingProduct(null)}
          >
            Cancel
          </button>
        </div>
        
        <div className="card">
          <div className="card-body">
            <form onSubmit={editingProduct.id === 'new' ? handleCreateProduct : handleSaveEdit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Product Name*</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="category" className="form-label">Category*</label>
                <select
                  className="form-select"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Regular Pizza">Regular Pizza</option>
                  <option value="Sicilian Pizza">Sicilian Pizza</option>
                  <option value="Sub">Sub</option>
                  <option value="Pasta">Pasta</option>
                  <option value="Salad">Salad</option>
                  <option value="Dinner Platter">Dinner Platter</option>
                </select>
              </div>
              
              <div className="mb-3">
                <label htmlFor="price" className="form-label">Price ($)*</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleFormChange}
                  required
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleFormChange}
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary">
                {editingProduct.id === 'new' ? 'Create Product' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  
  // Otherwise, show the products list
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Products Management</h2>
        <div>
          <button 
            className="btn btn-primary"
            onClick={handleAddNewClick}
          >
            <i className="bi bi-plus-circle me-1"></i> Add New Product
          </button>
        </div>
      </div>
      
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>
                      {product.description.length > 50 
                        ? `${product.description.substring(0, 50)}...` 
                        : product.description}
                    </td>
                    <td>
                      <button 
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => handleEditClick(product)}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        Delete
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
  );
};

export default ProductsList;
