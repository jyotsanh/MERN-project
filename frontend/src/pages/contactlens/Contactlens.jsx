import React from 'react';
import './Contact.css';

// Component importing
import SoftContactLens from './SoftContactLens.jsx';
import DisposableContactLens from './DisposableContactLens.jsx';
import GasPermeableContactLens from './GasPermeableContactLens.jsx';
import ExtendibleContactLens from './ExtendibleContactLens.jsx';

function Contactlens() {
  return (
    <div className="lens-container">
      <h1>Types Of Lens</h1>
      <div className="content">
        <SoftContactLens />
        <DisposableContactLens />
        <GasPermeableContactLens />
        <ExtendibleContactLens />
      </div>
    </div>
  );
}

export default Contactlens;
