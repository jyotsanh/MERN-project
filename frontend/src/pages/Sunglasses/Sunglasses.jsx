import React, { useState, useEffect, useCallback } from 'react';
import './Sunglasses.css';
import { FetchProductsUser } from '../../service/api';
import { Link } from 'react-router-dom';

function Sunglasses() {
  const [visibleSubOptions, setVisibleSubOptions] = useState({});
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { Product } = await FetchProductsUser();
        setProducts(Product);
        setFilteredProducts(Product);
      } catch (error) {
        setProducts([]);
        setFilteredProducts([]);
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, []);

  const toggleSubOptions = useCallback((option) => {
    setVisibleSubOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  }, []);

  const handlePriceChange = useCallback((value) => {
    setSelectedPrice(value);
  }, []);

  const handleCategoryChange = useCallback((e) => {
    setSelectedCategory(e.target.value);
  }, []);

  const applyFilters = useCallback(() => {
    let filtered = products.filter((product) => {
      const priceMatch = !selectedPrice ||
        (selectedPrice === 'Under Rs 500' && product.price < 500) ||
        (selectedPrice === 'Rs 500 - Rs 2000' && product.price >= 500 && product.price <= 2000) ||
        (selectedPrice === 'Over Rs 2000' && product.price > 2000);

      const categoryMatch = !selectedCategory || product.category === selectedCategory;

      return priceMatch && categoryMatch;
    });

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, selectedPrice, selectedCategory]);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredProducts.length / productsPerPage)));
  }, [filteredProducts.length]);

  const handlePrevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="container">
      <h1>Sunglasses</h1>
      <div className="main-content">
        <div className="side-navbar">
          <div className="side-options">
            {/* Price filter options */}
            <div className="side-option" onClick={() => toggleSubOptions('price')}>
              Price <span>+</span>
            </div>
            {visibleSubOptions.price && (
              <div className="side-sub-options">
                {['Under Rs 500', 'Rs 500 - Rs 2000', 'Over Rs 2000'].map((option) => (
                  <div key={option} className="side-sub-option">
                    <input
                      type="radio"
                      id={option}
                      name="price"
                      value={option}
                      checked={selectedPrice === option}
                      onChange={(e) => handlePriceChange(e.target.value)}
                    />
                    <label htmlFor={option}>{option}</label>
                  </div>
                ))}
              </div>
            )}
            <div className="side-line"></div>

            {/* Category filter options */}
            <div className="side-option" onClick={() => toggleSubOptions('category')}>
              Category <span>+</span>
            </div>
            {visibleSubOptions.category && (
              <div className="side-sub-options">
                <div className="side-sub-option">
                  <select
                    id="category"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                  >
                    <option value="">Select a category</option>
                    {['prescription', 'reading', 'blue-light', 'progressive', 'sunglasses', 'bifocal', 'sports', 'fashion'].map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            <div className="side-line"></div>

            <div className="side-option">
              <button onClick={applyFilters}>Filter</button>
            </div>
          </div>
        </div>

        <div className="product-list-container">
          <div className="product-list">
            {currentProducts.map((product) => (
              <Link to={`/product/${product._id}`} key={product._id} className="product-card-link">
                <div className="product-card">
                  <img 
                    src={product.imageUrls && product.imageUrls.length > 0 ? `/${product.imageUrls[0]}` : "/path/to/default-image.jpg"}
                    alt={product.name || "Default"} 
                    className="product-image" 
                  />
                  <h2 className="product-name">{product.name}</h2>
                  <p className="product-price">Price: Rs.{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <button onClick={handleNextPage} disabled={currentPage >= Math.ceil(filteredProducts.length / productsPerPage)}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sunglasses;