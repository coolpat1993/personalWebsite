import "./TicTacToe.css";
import Board from "./Board";
import Square from "./Square";
import { useState, useEffect } from "react";

const defaultSquares = () => new Array(9).fill(null);

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

function TicTacToe() {
  const [squares, setSquares] = useState(defaultSquares());
  const [winner, setWinner] = useState(null);
  const [currentTurn, setCurrentTurn] = useState("player");
  const [thinking, setThinking] = useState(true);

  useEffect(() => {
    const linesThatAre = (a, b, c) => {
      return lines.filter(squareIndexes => {
        const squareValues = squareIndexes.map(index => squares[index]);
        return (
          JSON.stringify([a, b, c].sort()) ===
          JSON.stringify(squareValues.sort())
        );
      });
    };
    const emptyIndexes = squares
      .map((square, index) => (square === null ? index : null))
      .filter(val => val !== null);
    const playerWon = linesThatAre("x", "x", "x").length > 0;
    const computerWon = linesThatAre("o", "o", "o").length > 0;
    const draw = squares.toString().length === 17;
    if (playerWon) {
      setWinner("x");
    }
    if (computerWon) {
      setWinner("o");
    }
    if (draw && !playerWon && !computerWon) {
      setWinner("d");
    }
    const putComputerAt = index => {
      let newSquares = squares;
      newSquares[index] = "o";
      setSquares([...newSquares]);
    };

    if (currentTurn === "computer" && thinking === false && winner === null) {
      const winingLines = linesThatAre("o", "o", null);
      if (winingLines.length > 0) {
        const winIndex = winingLines[0].filter(
          index => squares[index] === null
        )[0];
        putComputerAt(winIndex);
        setCurrentTurn("player");
        setThinking(true);
        return;
      }

      const linesToBlock = linesThatAre("x", "x", null);
      if (linesToBlock.length > 0) {
        const blockIndex = linesToBlock[0].filter(
          index => squares[index] === null
        )[0];
        putComputerAt(blockIndex);
        setCurrentTurn("player");
        setThinking(true);
        return;
      }

      const linesToContinue = linesThatAre("o", null, null);
      if (linesToContinue.length > 0) {
        putComputerAt(
          linesToContinue[0].filter(index => squares[index] === null)[0]
        );
        setCurrentTurn("player");
        setThinking(true);
        return;
      }

      const randomIndex =
        emptyIndexes[Math.ceil(Math.random() * emptyIndexes.length)];
      putComputerAt(randomIndex);
      setCurrentTurn("player");
      setThinking(true);
    }
  }, [squares, currentTurn, thinking, winner]);

  function restart() {
    setSquares([null, null, null, null, null, null, null, null, null]);
    setWinner(null);
    setCurrentTurn("player");
    setThinking(true);
  }

  function handleSquareClick(index) {
    if (currentTurn === "player" && winner === null) {
      let newSquares = squares;
      if (newSquares[index] !== "o" && newSquares[index] !== "x") {
        newSquares[index] = "x";
        setSquares([...newSquares]);
        setTimeout(() => setThinking(false), 1000);
        setCurrentTurn("computer");
      }
    }
  }

  function handleEnter(e) {
    if(e.target.innerText !== 'x' && e.target.innerText !== 'o'){
    e.target.style.background = "red";
    console.log(e.target.innerText);
    }
  }

  function handleLeave(e) {
    e.target.style.background = "";
  }

  // console.log({ squares });
  // console.log({ winner });
  // console.log({ currentTurn });
  // console.log({ thinking });
  // console.log(squares.includes("x"));
  return (
    <main>
      <Board>
        {squares.map((square, index) => (
          <Square
            x={square === "x" ? 1 : 0}
            o={square === "o" ? 1 : 0}
            onClick={() => handleSquareClick(index)}
            className={"square"}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          />
        ))}
      </Board>
      {!!winner && winner === "x" && (
        <div className="result green">You WON!</div>
      )}
      {!!winner && winner === "o" && (
        <div className="result red">You LOST!</div>
      )}
      {!!winner && winner === "d" && (
        <div className="result red">You DREW!</div>
      )}
      <button onClick={() => restart()}>restart</button>
    </main>
  );
}

export default TicTacToe;
