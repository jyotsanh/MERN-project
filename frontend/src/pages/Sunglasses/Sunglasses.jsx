import React, { useState, useEffect } from 'react';
import './Sunglasses.css';
import { FetchProductsUser, FetchFilteredProducts } from '../../service/api';
import { Link } from 'react-router-dom';

//Filter Component
import Filter from './Filter';

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
    console.log(value);
    setSelectedPrice(value);
  };

  const handleFrameMaterialChange = (e) => {
    console.log(e.target.value);
    setSelectedFrameMaterial(e.target.value);
  };

  const handleLensMaterialChange = (e) => {
    console.log(e.target.value);
    setSelectedLensMaterial(e.target.value);
  };

  const handleFrameShapeChange = (e) => {
    console.log(e.target.value);
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
        <Filter 
        handlePriceChange={handlePriceChange}
        selectedPrice={selectedPrice}

        handleFrameMaterialChange={handleFrameMaterialChange}
        selectedFrameMaterial={selectedFrameMaterial}

        handleLensMaterialChange={handleLensMaterialChange}
        selectedLensMaterial={selectedLensMaterial}
        
        handleFrameShapeChange={handleFrameShapeChange}
        selectedFrameShape={selectedFrameShape}

        applyFilters = {applyFilters}
        clearFilters = {clearFilters}
        ></Filter>

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