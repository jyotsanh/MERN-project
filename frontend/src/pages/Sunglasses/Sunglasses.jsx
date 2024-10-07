import React, { useState, useEffect } from 'react';
import './Sunglasses.css';
import { FetchProductsUser, FetchFilteredProducts } from '../../service/api';
import { Link } from 'react-router-dom';

function Sunglasses() {
  const [visibleSubOptions, setVisibleSubOptions] = useState({});
  const [products, setProducts] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedFrameMaterial, setSelectedFrameMaterial] = useState('');
  const [selectedLensMaterial, setSelectedLensMaterial] = useState('');
  const [selectedFrameShape, setSelectedFrameShape] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [currentPage, isFiltered]);

  const fetchProducts = async () => {
    try {
      setErrorMessage(''); // Clear any existing error message
      let productsData;
      if (isFiltered) {
        const filters = {
          price: selectedPrice,
          frameMaterial: selectedFrameMaterial,
          lensMaterial: selectedLensMaterial,
          frameShape: selectedFrameShape,
          page: currentPage,
        };

        // Remove empty filters
        const nonEmptyFilters = Object.entries(filters).reduce((acc, [key, value]) => {
          if (value !== '' && value !== null && value !== undefined) {
            acc[key] = value;
          }
          return acc;
        }, {});

        productsData = await FetchFilteredProducts(nonEmptyFilters);
      } else {
        productsData = await FetchProductsUser(currentPage);
      }
      setProducts(productsData.Products);
      setTotalPages(productsData.totalPages);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage('No products found matching the filter criteria. Try adjusting your filters.');
        setProducts([]);
        setTotalPages(0);
      } else {
        setErrorMessage('An error occurred while fetching products. Please try again later.');
        console.error('Error fetching products:', error);
      }
    }
  };

  const toggleSubOptions = (option) => {
    setVisibleSubOptions((prevVisibleSubOptions) => ({
      ...prevVisibleSubOptions,
      [option]: !prevVisibleSubOptions[option],
    }));
  };

  const handlePriceChange = (value) => {
    setSelectedPrice(value);
  };

  const handleFrameMaterialChange = (e) => {
    setSelectedFrameMaterial(e.target.value);
  };

  const handleLensMaterialChange = (e) => {
    setSelectedLensMaterial(e.target.value);
  };

  const handleFrameShapeChange = (e) => {
    setSelectedFrameShape(e.target.value);
  };

  const applyFilters = () => {
    const hasFilters = selectedPrice || selectedFrameMaterial || selectedLensMaterial || selectedFrameShape;
    setIsFiltered(hasFilters);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedPrice('');
    setSelectedFrameMaterial('');
    setSelectedLensMaterial('');
    setSelectedFrameShape('');
    setCurrentPage(1);
    setIsFiltered(false);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="container">
      <h1>Sunglasses</h1>
      <button className="hamburger" onClick={toggleSidebar}>
        &#9776;
      </button>
      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
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
                  id="under500"
                  name="price"
                  value="Under Rs 500"
                  checked={selectedPrice === 'Under Rs 500'}
                  onChange={(e) => handlePriceChange(e.target.value)}
                />
                <label htmlFor="under500">Under Rs 500</label>
              </div>
              <div className="side-sub-option">
                <input
                  type="radio"
                  id="500to2000"
                  name="price"
                  value="Rs 500 - Rs 2000"
                  checked={selectedPrice === 'Rs 500 - Rs 2000'}
                  onChange={(e) => handlePriceChange(e.target.value)}
                />
                <label htmlFor="500to2000">Rs 500 - Rs 2000</label>
              </div>
              <div className="side-sub-option">
                <input
                  type="radio"
                  id="over2000"
                  name="price"
                  value="Over Rs 2000"
                  checked={selectedPrice === 'Over Rs 2000'}
                  onChange={(e) => handlePriceChange(e.target.value)}
                />
                <label htmlFor="over2000">Over Rs 2000</label>
              </div>
            </div>
            <div className="side-line"></div>

            <div className="side-option" onClick={() => toggleSubOptions('frameMaterial')}>
              Frame Material
              <span>+</span>
            </div>
            <div
              className="side-sub-options"
              style={{ display: visibleSubOptions.frameMaterial ? 'block' : 'none' }}
            >
              <div className="side-sub-option">
                <select
                  id="frameMaterial"
                  value={selectedFrameMaterial}
                  onChange={handleFrameMaterialChange}
                >
                  <option value="">Select a Frame Material</option>
                  <option value="Aluminium">Aluminium</option>
                  <option value="Titanium">Titanium</option>
                  <option value="Stainless Steel">Stainless Steel</option>
                  <option value="Plastic">Plastic</option>
                  <option value="Carbon Fiber">Carbon Fiber</option>
                  <option value="Wood">Wood</option>
                  <option value="Leather">Leather</option>
                  <option value="TR-90">TR-90</option>
                </select>
              </div>
            </div>
            <div className="side-line"></div>

            <div className="side-option" onClick={() => toggleSubOptions('lensMaterial')}>
              Lens Material
              <span>+</span>
            </div>
            <div
              className="side-sub-options"
              style={{ display: visibleSubOptions.lensMaterial ? 'block' : 'none' }}
            >
              <div className="side-sub-option">
                <select
                  id="lensMaterial"
                  value={selectedLensMaterial}
                  onChange={handleLensMaterialChange}
                >
                  <option value="">Select a Lens Material</option>
                  <option value="Polycarbonate">Polycarbonate</option>
                  <option value="Glass">Glass</option>
                  <option value="Plastic">Plastic</option>
                </select>
              </div>
            </div>
            <div className="side-line"></div>

            <div className="side-option" onClick={() => toggleSubOptions('frameShape')}>
              Frame Shape
              <span>+</span>
            </div>
            <div
              className="side-sub-options"
              style={{ display: visibleSubOptions.frameShape ? 'block' : 'none' }}
            >
              <div className="side-sub-option">
                <select
                  id="frameShape"
                  value={selectedFrameShape}
                  onChange={handleFrameShapeChange}
                >
                  <option value="">Select a Frame Shape</option>
                  <option value="Rectangular">Rectangular</option>
                  <option value="Round">Round</option>
                  <option value="Square">Square</option>
                  <option value="Oval">Oval</option>
                  <option value="Cat-Eye">Cat-Eye</option>
                  <option value="Aviator">Aviator</option>
                  <option value="Browline/Clubmaster">Browline/Clubmaster</option>
                  <option value="Wayfarer">Wayfarer</option>
                  <option value="Oversized">Oversized</option>
                  <option value="Geometric">Geometric</option>
                  <option value="Rimless">Rimless</option>
                </select>
              </div>
            </div>
            <div className="side-line"></div>

            <div className="side-option">
              <button onClick={applyFilters}>Apply Filters</button>
              <button onClick={clearFilters}>Clear Filters</button>
            </div>
          </div>
        </div>

        <div className="product-list-container">
          

          {products.length > 0 ? (
            <div className="product-list">
              {products.map((product) => (
                <Link to={`/product/${product._id}`} key={product._id} className="product-card-link">
                  <div className="product-card">
                    {product.imageUrls && product.imageUrls.length > 0 ? (
                      <img src={`${product.imageUrls[0]}`} alt={product.name} className="imagess" />
                    ) : (
                      <img src="/path/to/default-image.jpg" alt="Default" className="imagess" />
                    )}
                    <h2 className="product-name">{product.name}</h2>
                    <p className="product-price"> Rs.{product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="no-products-message">
              {errorMessage || 'No products available.'}
            </div>
          )}

          {totalPages > 0 && (
            <div className="pagination">
              <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Previous
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button onClick={handleNextPage} disabled={currentPage >= totalPages}>
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sunglasses;