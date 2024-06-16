import React from 'react';
import './Square.css';

const Square = ({ value, onClick, isWinning }) => {
  return (
    <button className={`square ${isWinning ? 'winning' : ''}`} onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;