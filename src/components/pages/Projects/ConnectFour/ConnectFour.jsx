import React, { Component } from "react";

class ConnectFour extends Component {
  constructor(props) {
    super(props);

    // Initialize the state
    this.state = {
      board: [
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
      ],
      currentPlayer: "X",
      winner: "",
    };
  }
  render() {
    return (
      <div>
        {this.state.winner ? (
          <div>Player {this.state.winner} has won the game!</div>
        ) : (
          <div>Current player: {this.state.currentPlayer}</div>
        )}
        <table>
          <tbody>
            {this.state.board.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    id={`${rowIndex}-${cellIndex}`}
                    onClick={() => this.handleClick(rowIndex, cellIndex)}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  handleClick(row, col) {
    // Make a copy of the board so we can update it without modifying the original
    let newBoard = this.state.board.map(row => row.slice());

    // Update the cell with the current player's game piece
    newBoard[row][col] = this.state.currentPlayer;

    // Check for a win
    let winner = this.checkForWin(newBoard) ? this.state.currentPlayer : '';

    // Update the game state with the new board and switch to the other player
    this.setState({
      board: newBoard,
      currentPlayer: this.state.currentPlayer === 'X' ? 'O' : 'X',
      winner: winner
    });
  }

  checkForWin(board) {
    // Check for horizontal wins
    for (let row = 0; row < board.length; row++) {
      if (board[row][0] !== '' && board[row][0] === board[row][1] && board[row][1] === board[row][2] && board[row][2] === board[row][3]) {
        return true;
      }
    }

    // Check for vertical wins
    for (let col = 0; col < board[0].length; col++) {
      if (board[0][col] !== '' && board[0][col] === board[1][col] && board[1][col] === board[2][col] && board[2][col] === board[3][col]) {
        return true;
      }
    }

    // Check for diagonal wins
    if (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[2][2] === board[3][3]) {
      return true;
    }
    if (board[0][3] !== '' && board[0][3] === board[1][2] && board[1][2] === board[2][1] && board[2][1] === board[3][0]) {
      return true;
    }

    // If we get to this point, no player has won
    return false;
  }

}

export default ConnectFour;