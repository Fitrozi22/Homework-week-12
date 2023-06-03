
import React, { useState } from 'react';
import './App.css';



function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [nextValue, setNextValue] = useState ('X');
  const [winner, setWinner] = useState(null);

  function selectSquare(square) {
    if (winner || squares[square]) {
      return;
    }

    const updatedSquares = [...squares];
    updatedSquares[square] = nextValue;
    setSquares(updatedSquares);
    setNextValue(nextValue === 'X' ? 'O' : 'X');
    const calculatedWinner = calculateWinner(updatedSquares);
    if (calculatedWinner) {
      setWinner(calculatedWinner);
    }
  }

  function restart() {
    setSquares(Array(9).fill(null));
    setNextValue('X');
    setWinner(null);
  }

  function renderSquare(i) {
    return (
      <button 
      className="bg-gray-300 hover:bg-gray-400 text-gray-800 w-12 h-12 font-bold mx-2 py-2 px-4 rounded"
      onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    );
  }

  return (
    <div>
      <div className="mb-6 text-center text-white text-ellipsis">STATUS : {calculateStatus(winner,squares, nextValue)} </div>
      <div className="mb-6">
      <div className="flex justify-center mb-6">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="flex justify-center mb-6">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="flex justify-center">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      </div>
      <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={restart}>
        restart
      </button>
    </div>
  );
}

function Game() {
  return (
    <div className="flex justify-center min-h-screen items-center" >
      <div >
        <Board />
      </div>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
      ? `DRAW`
      : `Next player: ${nextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
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
      return squares[a];
    }
  }
  return null;
}

function App() {
  return (
    <div className="App bg-gray-800 h-screen">
    <Game />
    </div>
  ) 
}

export default App;


