import React, { useState, useEffect } from 'react';
import './Sunglasses.css';
import { FetchProducts } from '../../service/api';

function Sunglasses() {
  const [visibleSubOptions, setVisibleSubOptions] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await FetchProducts();
        console.log("productsData", productsData);
        const { Product } = productsData;
        setProducts(Product);
      } catch (error) {
        setProducts([]);
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

  return (
    <div className="container">
      <h1>Sunglasses</h1>
      <div style={{ display: 'flex', flex: 1 }}>
        <div className="side-navbar">
          <div className="side-options">
            <div className="side-option" onClick={() => toggleSubOptions('gender')}>
              Gender
              <span>+</span>
            </div>
            <div
              className="side-sub-options"
              style={{ display: visibleSubOptions.gender ? 'block' : 'none' }}
            >
              <div className="side-sub-option">
                <input type="checkbox" id="male" name="gender" />
                <label htmlFor="male">Male</label>
              </div>
              <div className="side-sub-option">
                <input type="checkbox" id="female" name="gender" />
                <label htmlFor="female">Female</label>
              </div>
              <div className="side-sub-option">
                <input type="checkbox" id="kids" name="gender" />
                <label htmlFor="kids">Kids</label>
              </div>
            </div>
            <div className="side-line"></div>

            <div className="side-option" onClick={() => toggleSubOptions('price')}>
              Price
              <span>+</span>
            </div>
            <div
              className="side-sub-options"
              style={{ display: visibleSubOptions.price ? 'block' : 'none' }}
            >
              <div className="side-sub-option">
                <input type="checkbox" id="under50" name="price" />
                <label htmlFor="under50">Under Rs 500</label>
              </div>
              <div className="side-sub-option">
                <input type="checkbox" id="50to100" name="price" />
                <label htmlFor="50to100">Rs 500 - Rs 2000</label>
              </div>
              <div className="side-sub-option">
                <input type="checkbox" id="over100" name="price" />
                <label htmlFor="over100">Over Rs 2000</label>
              </div>
            </div>
            <div className="side-line"></div>

            <div className="side-option" onClick={() => toggleSubOptions('brands')}>
              Brands
              <span>+</span>
            </div>
            <div
              className="side-sub-options"
              style={{ display: visibleSubOptions.brands ? 'block' : 'none' }}
            >
              <div className="side-sub-option">
                <input type="checkbox" id="brand1" name="brands" />
                <label htmlFor="brand1">Eye mate</label>
              </div>
              <div className="side-sub-option">
                <input type="checkbox" id="brand2" name="brands" />
                <label htmlFor="brand2">Ray-Ban</label>
              </div>
              <div className="side-sub-option">
                <input type="checkbox" id="brand3" name="brands" />
                <label htmlFor="brand3">Oakley</label>
              </div>
              <div className="side-sub-option">
                <input type="checkbox" id="brand3" name="brands" />
                <label htmlFor="brand3">Polo Ralph Lauren</label>
              </div>
              <div className="side-sub-option">
                <input type="checkbox" id="brand3" name="brands" />
                <label htmlFor="brand3">Carrera</label>
              </div>
            </div>
            <div className="side-line"></div>

            <div className="side-option" onClick={() => toggleSubOptions('shape')}>
              Shape
              <span>+</span>
            </div>
            <div
              className="side-sub-options"
              style={{ display: visibleSubOptions.shape ? 'block' : 'none' }}
            >
              <div className="side-sub-option">
                <input type="checkbox" id="square" name="shape" />
                <label htmlFor="square">Square</label>
              </div>
              <div className="side-sub-option">
                <input type="checkbox" id="round" name="shape" />
                <label htmlFor="round">Round</label>
              </div>
              <div className="side-sub-option">
                <input type="checkbox" id="aviator" name="shape" />
                <label htmlFor="aviator">Aviator</label>
              </div>
            </div>
            <div className="side-line"></div>
          </div>
        </div>

        <div className="product-list-container">
          {products.length === 0 ? (
            <p>No products available</p>
          ) : (
            <div className="product-list">
              {products.map((product) => (
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
