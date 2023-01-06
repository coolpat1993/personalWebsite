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

  function handleSquareClick(index, e) {
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
    if (e.target.innerText !== "x" && e.target.innerText !== "o") {
      e.target.style.background = "#4caf50";
      // console.log(e.target.innerText);
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
    <>
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
      <button className="button" onClick={() => restart()}>
        restart
      </button>
      <br></br>
    </main>
      <div className="textBox">
      <h1>Tic-tac-toe</h1>
        <p>
          This code is game of Tic-Tac-Toe implemented in JavaScript using the
          React library. It has several state variables: squares, which
          represents the current state of the Tic-Tac-Toe board; winner, which
          stores the winner of the game (or null if the game is still in
          progress); currentTurn, which stores the current turn ("player" or
          "computer"); and thinking, which is a boolean that determines whether
          the computer is currently thinking about its next move. The game has a
          useEffect hook that runs some code whenever the squares, currentTurn,
          thinking, or winner state variables change. This code checks for a
          winner or a draw, and if the game is still in progress, it makes the
          computer's move if it is the computer's turn and thinking is false.
          The game also has a restart function that resets the game by setting
          all the state variables back to their default values. The game board
          is made up of Square components, which are buttons that display the
          value of the square and have an onClick event handler that updates the
          squares array with an "x" at the clicked index and sets the
          currentTurn to "computer". The computer's move is determined by
          looking for a winning move or a move to block the player from winning,
          or by choosing a random empty square.{" "}
        </p>
      </div>
      </>
  );
}

export default TicTacToe;
