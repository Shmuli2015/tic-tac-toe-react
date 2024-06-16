import React, { useState, useEffect } from 'react';
import Board from '../board/Board';
import './Game.css';

const Game = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [stepCount, setStepCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds countdown
  const [winner, setWinner] = useState(null);
  const [winningSquares, setWinningSquares] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const [messageContent, setMessageContent] = useState('');

  useEffect(() => {
    if (timeLeft > 0 && !winner && gameStarted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, winner, gameStarted]);

  const handleClick = (i) => {
    if (squares[i] || winner) return;
    const newSquares = squares.slice();
    newSquares[i] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
    setStepCount(stepCount + 1);
    const result = calculateWinner(newSquares);
    if (result) {
      setWinner(result.winner);
      setWinningSquares(result.line);
      showMessage(`Winner: ${result.winner}`, 3000);
    } else if (stepCount === 8) {
      setWinner('Draw');
      showMessage("It's a draw!", 3000);
    }
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    return null;
  };

  const startGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setStepCount(0);
    setTimeLeft(60);
    setWinner(null);
    setWinningSquares([]);
    setGameStarted(true);
  };

  const showMessage = (content, duration) => {
    setMessageContent(content);
    setMessageVisible(true);
    setTimeout(() => {
      setMessageVisible(false);
    }, duration);
  };

  return (
    <div className="game">
      <h1>Tic-Tac-Toe</h1>
      {!gameStarted ? (
        <button className="start-button" onClick={startGame}>
          Start Game
        </button>
      ) : (
        <>
          <Board squares={squares} onClick={handleClick} winningSquares={winningSquares} />
          <div className="info">
            <p>Next player: {isXNext ? 'X' : 'O'}</p>
            <p>Step count: {stepCount}</p>
            <p>Time left: {timeLeft}s</p>
            {messageVisible && <div className="message">{messageContent}</div>}
            {winner && winner !== 'Draw' && (
              <>
                <p className="winner">Winner: {winner}</p>
                <button className="play-again-button" onClick={startGame}>
                  Play Again
                </button>
              </>
            )}
            {winner === 'Draw' && (
              <>
                <p className="draw-message">It's a draw!</p>
                <button className="play-again-button" onClick={startGame}>
                  Play Again
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Game;