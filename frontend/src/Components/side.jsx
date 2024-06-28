import React, { useState } from 'react';

function Side() {
  const [visibleSubOptions, setVisibleSubOptions] = useState({});

  const toggleSubOptions = (option) => {
    setVisibleSubOptions((prevVisibleSubOptions) => ({
      ...prevVisibleSubOptions,
      [option]: !prevVisibleSubOptions[option],
    }));
  };

  return (
    <div className="side-body">
      <div className="side-navbar">
        <div className="side-options">
          <div
            className="side-option"
            onClick={() => toggleSubOptions('gender')}
          >
            Gender
            <span>+</span>
          </div>
          <div
            className="side-sub-options"
            id="genderSubOptions"
            style={{
              display: visibleSubOptions.gender ? 'block' : 'none',
            }}
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

          <div
            className="side-option"
            onClick={() => toggleSubOptions('price')}
          >
            Price
            <span>+</span>
          </div>
          <div
            className="side-sub-options"
            id="priceSubOptions"
            style={{
              display: visibleSubOptions.price ? 'block' : 'none',
            }}
          >
            <div className="side-sub-option">
              <input type="checkbox" id="under50" name="price" />
              <label htmlFor="under50">Under $50</label>
            </div>
            <div className="side-sub-option">
              <input type="checkbox" id="50to100" name="price" />
              <label htmlFor="50to100">$50 - $100</label>
            </div>
            <div className="side-sub-option">
              <input type="checkbox" id="over100" name="price" />
              <label htmlFor="over100">Over $100</label>
            </div>
          </div>
          <div className="side-line"></div>

          <div
            className="side-option"
            onClick={() => toggleSubOptions('brands')}
          >
            Brands
            <span>+</span>
          </div>
          <div
            className="side-sub-options"
            id="brandsSubOptions"
            style={{
              display: visibleSubOptions.brands ? 'block' : 'none',
            }}
          >
            <div className="side-sub-option">
              <input type="checkbox" id="brand1" name="brands" />
              <label htmlFor="brand1">Brand 1</label>
            </div>
            <div className="side-sub-option">
              <input type="checkbox" id="brand2" name="brands" />
              <label htmlFor="brand2">Brand 2</label>
            </div>
            <div className="side-sub-option">
              <input type="checkbox" id="brand3" name="brands" />
              <label htmlFor="brand3">Brand 3</label>
            </div>
          </div>
          <div className="side-line"></div>

          <div
            className="side-option"
            onClick={() => toggleSubOptions('shape')}
          >
            Shape
            <span>+</span>
          </div>
          <div
            className="side-sub-options"
            id="shapeSubOptions"
            style={{
              display: visibleSubOptions.shape ? 'block' : 'none',
            }}
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
        <div className="side-content">Content Area</div>
      </div>
    </div>
  );
}

export default Side;
