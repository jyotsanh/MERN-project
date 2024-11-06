import React, { useState, useEffect } from 'react';
import './Sunglasses.css';

//Filter Component
import Filter from './FilterCompo';
import ProductsCompo from './ProductsCompo';
function Sunglasses() {
  const [visibleSubOptions, setVisibleSubOptions] = useState({});
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedFrameMaterial, setSelectedFrameMaterial] = useState('');
  const [selectedLensMaterial, setSelectedLensMaterial] = useState('');
  const [selectedFrameShape, setSelectedFrameShape] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  const toggleSubOptions = (option) => {
    setVisibleSubOptions((prevVisibleSubOptions) => ({
      ...prevVisibleSubOptions,
      [option]: !prevVisibleSubOptions[option],
    }));
  };

  const handlePriceChange = (value) => {
    setIsFiltered(true);
    setCurrentPage(1);
    console.log(value);
    setSelectedPrice(value);
  };

  const handleFrameMaterialChange = (e) => {
    setIsFiltered(true);
    setCurrentPage(1);
    console.log(e.target.value);
    setSelectedFrameMaterial(e.target.value);
  };

  const handleLensMaterialChange = (e) => {
    setIsFiltered(true);
    setCurrentPage(1);
    console.log(e.target.value);
    setSelectedLensMaterial(e.target.value);
  };

  const handleFrameShapeChange = (e) => {
    setIsFiltered(true);
    setCurrentPage(1);
    console.log(e.target.value);
    setSelectedFrameShape(e.target.value);
  };

  const applyFilters = () => {
    const hasFilters = selectedPrice || selectedFrameMaterial || selectedLensMaterial || selectedFrameShape;
    if(hasFilters) {
      setIsFiltered(true);
      console.log("Filters applied"); // checked working
    }else{
      setIsFiltered(false);
    }

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

          <ProductsCompo
          currentPage = {currentPage}
          totalPages = {totalPages}
          setTotalPages = {setTotalPages}
          handleNextPage = {handleNextPage}
          handlePrevPage = {handlePrevPage}

          selectedPrice={selectedPrice}
          selectedFrameMaterial={selectedFrameMaterial}
          selectedLensMaterial={selectedLensMaterial}
          selectedFrameShape={selectedFrameShape}
          isFiltered={isFiltered}
          ></ProductsCompo>
        
      </div>
    </div>
  );
}

export default Sunglasses;