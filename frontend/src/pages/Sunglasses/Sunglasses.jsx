import React, { useState, useEffect } from 'react';
import './Sunglasses.css';
import { FetchProducts } from '../../service/api';

function Sunglasses() {
  const [visibleSubOptions, setVisibleSubOptions] = useState({});
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const productsData = await FetchProducts();
        
        const { Product } = productsData;
        
        setProducts(Product);
        setFilteredProducts(Product); // Initialize filteredProducts with all products
      } catch (error) {
        setProducts([]);
        setFilteredProducts([]);
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  const toggleSubOptions = (option) => {
    setVisibleSubOptions((prevVisibleSubOptions) => ({
      ...prevVisibleSubOptions,
      [option]: !prevVisibleSubOptions[option],
    }));
  };

  const handlePriceChange = (value) => {
    setSelectedPrice(value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const applyFilters = () => {
    let filtered = products;

    if (selectedPrice) {
      filtered = filtered.filter((product) => {
        if (selectedPrice === 'Under Rs 500') {
          return product.price < 500;
        } else if (selectedPrice === 'Rs 500 - Rs 2000') {
          return product.price >= 500 && product.price <= 2000;
        } else if (selectedPrice === 'Over Rs 2000') {
          return product.price > 2000;
        }
        return true;
      });
    }

    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="container">
      <h1>Sunglasses</h1>
      <div style={{ display: 'flex', flex: 1 }}>
        <div className="side-navbar">
          <div className="side-options">
            <div className="side-option" onClick={() => toggleSubOptions('price')}>
              Price
              <span>+</span>
            </div>
            <div
              className="side-sub-options"
              style={{ display: visibleSubOptions.price ? 'block' : 'none' }}
            >
              <div className="side-sub-option">
                <input
                  type="radio"
                  id="under50"
                  name="price"
                  value="Under Rs 500"
                  checked={selectedPrice === 'Under Rs 500'}
                  onChange={(e) => handlePriceChange(e.target.value)}
                />
                <label htmlFor="under50">Under Rs 500</label>
              </div>
              <div className="side-sub-option">
                <input
                  type="radio"
                  id="50to100"
                  name="price"
                  value="Rs 500 - Rs 2000"
                  checked={selectedPrice === 'Rs 500 - Rs 2000'}
                  onChange={(e) => handlePriceChange(e.target.value)}
                />
                <label htmlFor="50to100">Rs 500 - Rs 2000</label>
              </div>
              <div className="side-sub-option">
                <input
                  type="radio"
                  id="over100"
                  name="price"
                  value="Over Rs 2000"
                  checked={selectedPrice === 'Over Rs 2000'}
                  onChange={(e) => handlePriceChange(e.target.value)}
                />
                <label htmlFor="over100">Over Rs 2000</label>
              </div>
            </div>
            <div className="side-line"></div>

            <div className="side-option" onClick={() => toggleSubOptions('category')}>
              Category
              <span>+</span>
            </div>
            <div
              className="side-sub-options"
              style={{ display: visibleSubOptions.category ? 'block' : 'none' }}
            >
              <div className="side-sub-option">
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="">Select a category</option>
                  <option value="prescription">Prescription</option>
                  <option value="reading">Reading</option>
                  <option value="blue-light">Blue Light</option>
                  <option value="progressive">Progressive</option>
                  <option value="sunglasses">Sunglasses</option>
                  <option value="bifocal">Bifocal</option>
                  <option value="sports">Sports</option>
                  <option value="fashion">Fashion</option>
                </select>
              </div>
            </div>
            <div className="side-line"></div>

            <div className="side-option">
              <button onClick={applyFilters}>Filter</button>
            </div>
          </div>
        </div>

        <div className="product-list-container">
          {filteredProducts.length === 0 ? (
            <p>No products available</p>
          ) : (
            <div className="product-list">
              {filteredProducts.map((product) => (
                <div className="product-card" key={product._id}>
                  <img src={product.imageUrl} alt={product.name} className="product-image" />
                  <h2 className="product-name">{product.name}</h2>
                  <p className="product-price">Price: {product.price}</p>
                  <p className="product-description">Description: {product.description}</p>
                  <p className="product-category">Category: {product.category}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sunglasses;
