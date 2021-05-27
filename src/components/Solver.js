import Panel from "./Panel";
import _ from "lodash";
import "../css/Solver.css";
import React from "react";

const newBoard = () => {
  const board = new Array(9);
  for (let i = 0; i < board.length; i++) {
    board[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  }
  return board;
};

class Solver extends React.Component {
  constructor(props) {
    super(props);
    this.state = { board: newBoard(), progressBoard: newBoard() };
  }

  /*

  Loading Sudoku

  */

  importBoard = (numString) => {
    const importBoard = newBoard();
    if (numString.length !== importBoard.length * importBoard.length)
      throw new Error(
        "Fail to import: numString length is not equal to board length ^ 2"
      );

    let i = 0;
    let j = 0;

    for (let n = 0; n < numString.length; n++) {
      importBoard[i][j] = parseInt(numString[n]);
      if (j !== 8) {
        j += 1;
      } else {
        i += 1;
        j = 0;
      }
    }

    this.removeProgressSquares();

    this.setState({
      board: importBoard,
      progressBoard: _.cloneDeep(importBoard),
    });
  };

  printBoard = (board) => {
    for (let i = 0; i < board.length; i++) {
      let rowContent = "";
      for (let j = 0; j < board[0].length; j++) {
        rowContent += board[i][j] + " ";
        if (j === 2 || j === 5) rowContent += "| ";
      }
      console.log(rowContent);
      if (i === 2 || i === 5) console.log("- - - + - - - + - - -");
    }
  };

  setBoard = (board) => {
    this.setState({ board });
  };

  setProgressBoard = (board) => {
    this.setState({ progressBoard: board });
  };

  removeProgressSquares = () => {
    const currentProgressSquares = document.getElementsByClassName("progress");
    Array.from(currentProgressSquares).forEach((square) => {
      square.classList.remove("progress");
    });
  };

  /* 
  
  Solver Logic

  */
  isLegalMove(num, row, col, board) {
    if (num > 9 || num < 1 || row > 9 || row < 1 || col > 9 || col < 1) {
      console.log("num or row out of bounds");
      return false;
    }

    // check row
    for (let j = 0; j < board.length; j++) {
      if (j === col - 1) continue;
      if (board[row - 1][j] === num) {
        console.log("row contains same" + "row " + row + "col " + (j + 1));
        return false;
      }
    }

    // check col
    for (let i = 0; i < board[0].length; i++) {
      if (i === row - 1) continue;
      if (board[i][col - 1] === num) {
        console.log("col contains same");
        return false;
      }
    }

    // check block
    const rowBlockIndex = Math.floor((row - 1) / 3) * 3;
    const colBlockIndex = Math.floor((col - 1) / 3) * 3;

    for (let i = rowBlockIndex; i < rowBlockIndex + 3; i++) {
      for (let j = colBlockIndex; j < colBlockIndex + 3; j++) {
        if (i === row - 1 && j === col - 1) continue;
        if (board[i][j] === num) {
          console.log("block contains same");
          return false;
        }
      }
    }

    return true;
  }

  isLegalPlacement(num, row, col, board) {
    if (num === 0) return true;
    return this.isLegalMove(num, row, col, board);
  }

  isBoardLegal(board) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        if (
          board[i][j] !== 0 &&
          !this.isLegalPlacement(board[i][j], i + 1, j + 1, board)
        )
          return false;
      }
    }
    return true;
  }

  // find next empty location by row
  findNextEmpty(row, col, board) {
    if (row > 9 || row < 1 || col > 9 || col < 1) {
      throw new Error("Invalid row or col number");
    }

    for (let j = col - 1; j < board[0].length; j++) {
      if (board[row - 1][j] === 0) return [row, j + 1];
    }

    for (let i = row; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        if (board[i][j] === 0) return [i + 1, j + 1];
      }
    }

    throw new Error("Cannot find next Empty!");
  }

  isSolved(board) {
    for (let row = 1; row <= board.length; row++) {
      for (let col = 1; col < board.length; col++) {
        if (!this.isLegalPlacement(board[row - 1][col - 1], row, col, board))
          return false;
      }
    }
    return true;
  }

  isFilled(board) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        if (board[i][j] === 0) return false;
      }
    }
    return true;
  }

  // Uses backtracking algorithm to solve the sudoku puzzle
  solveHelper(row, col, board) {
    if (this.isFilled(board)) return true;

    if (board[row - 1][col - 1] !== 0) {
      const nextEmptyCoordinates = this.findNextEmpty(row, col, board);
      row = nextEmptyCoordinates[0];
      col = nextEmptyCoordinates[1];
    }

    for (let i = 1; i <= 9; i++) {
      if (this.isLegalMove(i, row, col, board)) {
        board[row - 1][col - 1] = i;
        this.printBoard(board);
        if (this.solveHelper(row, col, board)) return true;
        else board[row - 1][col - 1] = 0;
      }
    }
  }

  solve = (board) => {
    if (!this.isBoardLegal(board)) {
      window.alert("No solution because the board violates rules");
      return board;
    }
    const solution = _.cloneDeep(board);
    const emptyStart = this.findNextEmpty(1, 1, solution);
    const rowEmptyStart = emptyStart[0];
    const colEmptyStart = emptyStart[1];
    this.solveHelper(rowEmptyStart, colEmptyStart, solution);
    if (!this.isSolved(solution)) {
      window.alert("no solution available");
      return board;
    }
    return solution;
  };

  /*
   *==========================================================================
   */

  /*

  Render Elements & Display Logic

  */

  // Input must be a number
  processInput = (e) => {
    if (Number.isInteger(Number(e.nativeEvent.data))) {
      const newBoard = _.cloneDeep(this.state.progressBoard);
      const targetRow = e.target.id[0];
      const targetCol = e.target.id[1];
      if (this.state.board[targetRow - 1][targetCol - 1] === 0) {
        newBoard[targetRow - 1][targetCol - 1] = Number(e.nativeEvent.data);
        this.setState({ progressBoard: newBoard });
      }
    }
  };

  renderBoard() {
    let rowCounter = 0;
    let colCounter = 0;
    return this.state.progressBoard.map((row) => {
      rowCounter += 1;
      return (
        <tr>
          {row.map((num) => {
            if (colCounter >= 9) colCounter = 1;
            else colCounter += 1;
            return (
              <td>
                <input
                  className="numSquare"
                  placeholder={num === 0 ? "" : num}
                  value={num === 0 ? "" : num}
                  onChange={(e) => {
                    this.processInput(e);
                  }}
                  id={`${rowCounter}${colCounter}`}
                ></input>
              </td>
            );
          })}
        </tr>
      );
    });
  }

  /*

  Lifecycle

  */
  componentDidMount() {
    for (let row = 1; row <= this.state.board.length; row++) {
      for (let col = 1; col <= this.state.board[0].length; col++) {
        if (this.state.board[row - 1][col - 1] === 0) {
          document.getElementById(`${row}${col}`).classList.add("progress");
        }
      }
    }
  }

  componentDidUpdate() {
    for (let row = 1; row <= this.state.board.length; row++) {
      for (let col = 1; col <= this.state.board[0].length; col++) {
        if (this.state.board[row - 1][col - 1] === 0) {
          document.getElementById(`${row}${col}`).classList.add("progress");
        }

        if (
          !this.isLegalPlacement(
            this.state.progressBoard[row - 1][col - 1],
            row,
            col,
            this.state.progressBoard
          )
        ) {
          document.getElementById(`${row}${col}`).classList.add("illegal");
        } else if (
          document.getElementById(`${row}${col}`).classList.contains("illegal")
        ) {
          document.getElementById(`${row}${col}`).classList.remove("illegal");
        }
      }
    }
  }

  render() {
    return (
      <div>
        <table className="ui celled table">{this.renderBoard()}</table>
        <Panel
          importBoard={this.importBoard}
          progressBoard={this.state.progressBoard}
          board={this.state.board}
          setProgressBoard={this.setProgressBoard}
          solve={this.solve}
          newBoard={newBoard}
          setBoard={this.setBoard}
          removeProgressSquares={this.removeProgressSquares}
        />
      </div>
    );
  }
}
export default Solver;

// const testB = new Solver();
// testB.importBoard(
//   "000000010004087006060053000623008700700000025000702000030070002800024560052001040"
// );

// testB.printBoard(testB.board);
// console.log("==============================");
// solveA.solution().printBoard();
