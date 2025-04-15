// Spinner.js
import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  border: 8px solid rgba(255, 255, 255, 0.3);
  border-top: 8px solid rgba(0,10,0); /* Customize the color */
  border-radius: 50%;
  width: 40px; /* Customize the size */
  height: 40px; /* Customize the size */
  animation: ${spin} 1s linear infinite;
  margin: auto; /* Center the spinner */
`;

const Spinner = () => {
  return <SpinnerContainer />;
};

export default Spinner;
