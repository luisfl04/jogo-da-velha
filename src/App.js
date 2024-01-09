import { useState } from "react";

function CalculatorWinner(squares) {

  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Squares( {value, onSquareClick} ) {
  
  return(
    <button 
    className="square"
    onClick={onSquareClick}
    style={{
      color: value === "X" ? "red" : "blue"
    }}
    >
      {value}
    </button>
  )
};

function Board( {xIsNext, squares, onPlay} ) {

  function HandleClick(i) {

    if (squares[i] || CalculatorWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = "X";
    }
    else {
      nextSquares[i] = "0";
    }
    onPlay(nextSquares);
  }

  function VerifWinner() {
    const winner = CalculatorWinner(squares);
    let status;

    if (winner) {
      status = "Winner -> " + winner;
    }
    else {
      status = "Next player -> " + (xIsNext ? "X": "0");
    }
    return (
      <div style={{ color: winner ? "lightgreen" : "white"}}>
          {status}
      </div>
    )
  }

  return (
    <>
    <div className="titulo">
      
      <div className="texto-titulo">
        <h1>Welcome to game</h1>
      </div>

      <div className="status">  
        {VerifWinner()}
      </div>
      
    </div>

    <div className="board-row">
      <Squares value={squares[0]} onSquareClick={ () => HandleClick(0)} />
      <Squares value={squares[1]} onSquareClick={ () => HandleClick(1)} />
      <Squares value={squares[2]} onSquareClick={ () => HandleClick(2)} />
    </div>
    
    <div className="board-row">
      <Squares value={squares[3]} onSquareClick={ () => HandleClick(3)} />
      <Squares value={squares[4]} onSquareClick={ () => HandleClick(4)} />
      <Squares value={squares[5]} onSquareClick={ () => HandleClick(5)} />
    </div>
    
    <div className="board-row">
      <Squares value={squares[6]} onSquareClick={ () => HandleClick(6)} />
      <Squares value={squares[7]} onSquareClick={ () => HandleClick(7)} />
      <Squares value={squares[8]} onSquareClick={ () => HandleClick(8)} />
    </div>
    
    </>
  )

};

export default function Game() {

  const[history, setHistory] = useState( [Array(9).fill(null)] );
  const[currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function HandlePlay(nextSquares) {

    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1 );
  }

  function JumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map( (squares, move) => {

    let description;

    if (move > 0) {
      description = "Go to move #" + move;
    }
    else(
      description = "Go to game start"
    )
  
    return (
      <li key={move}>
        <button onClick={ () => JumpTo(move) }>
          {description}
        </button>
      </li>
    )
  })

  return (
    <div className="game">

      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={HandlePlay} />
      </div>

      <div className="game-info">
        <ol>
          {moves}
        </ol>
      </div>
    </div>
  )

};