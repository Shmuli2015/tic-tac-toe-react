import React from 'react';
import Square from '../square/Square';
import './Board.css';

const Board = ({ squares, onClick, winningSquares }) => {
  return (
    <div className="board">
      {squares.map((square, i) => (
        <Square key={i} value={square} onClick={() => onClick(i)} isWinning={winningSquares.includes(i)} />
      ))}
    </div>
  );
};

export default Board;