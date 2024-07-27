import React from 'react';

const Spinner = () => {
  const spinnerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f3f3f3'
  };

  const loaderStyle = {
    border: '16px solid #f3f3f3',
    borderRadius: '50%',
    borderTop: '16px solid #3498db',
    width: '120px',
    height: '120px',
    animation: 'spin 2s linear infinite'
  };

  return (
    <div style={spinnerStyle}>
      <div style={loaderStyle}></div>
    </div>
  );
};

export default Spinner;

// Adding keyframes for spin animation
const styleSheet = document.styleSheets[0];
const keyframes =
`@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
