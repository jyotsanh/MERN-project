import React, { useState,useEffect } from 'react';

export default function Filter({
  handlePriceChange,
  selectedPrice,
  
  handleFrameMaterialChange,
  selectedFrameMaterial,

  handleLensMaterialChange, 
  selectedLensMaterial,
  
  handleFrameShapeChange,
  selectedFrameShape, 

  applyFilters,
  clearFilters
}) {
  
  const [visibleSubOptions, setVisibleSubOptions] = useState({});

  useEffect(() => {
    console.log("Filter Component Mounted")
  }, []);

  const toggleSubOptions = (option) => {
    setVisibleSubOptions((prevVisibleSubOptions) => ({
      ...prevVisibleSubOptions,
      [option]: !prevVisibleSubOptions[option],
    }));
  };  

 
  return (
    <>
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
    </>
  );
}