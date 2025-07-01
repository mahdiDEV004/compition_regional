// Enhanced WowPage.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const WowPage = () => {
  return (
    <div className="container mt-5" style={{ maxWidth: '800px' }}>
      <h1 
        className="display-4 fw-bold" 
        style={{ 
          color: '#333',
          letterSpacing: '1px',
          marginBottom: '2rem'
        }}
      >
        AVOUS DE RACONTER LE
      </h1>
      <h2 
        className="display-5 mt-4" 
        style={{ 
          color: '#555',
          fontStyle: 'italic',
          fontWeight: '300'
        }}
      >
        "WOW" II
      </h2>
    </div>
  );
};

export default WowPage;