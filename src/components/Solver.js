import Panel from "./Panel";
import _ from "lodash";
import React from "react";

import "../css/Solver.css";
import { newBoard, isLegalPlacement, isSolved } from "../sudoku/algorithm";
import {
  removeProgressSquares,
  removeSolutionSquares,
  onArrowKeys,
  animateTable,
} from "../sudoku/visual";

class Solver extends React.Component {
  constructor(props) {
    super(props);
    this.state = { board: newBoard(), progressBoard: newBoard() };
  }

  /*
   * Loading Sudoku
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

    removeProgressSquares();

    this.setBoard(importBoard);
    this.setProgressBoard(_.cloneDeep(importBoard));
  };

  setBoard = (board) => {
    removeSolutionSquares();
    animateTable();
    this.setState({ board });
  };

  setProgressBoard = (board) => {
    this.setState({ progressBoard: board });
  };

  /*
   *Render Elements & Display
   */

  processInput = (e) => {
    if (e.target.classList.contains("solution"))
      e.target.classList.remove("solution");

    // Input must be a number
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
        <tr key={`row${rowCounter}`}>
          {row.map((num) => {
            if (colCounter >= 9) colCounter = 1;
            else colCounter += 1;
            return (
              <td key={`${rowCounter}${colCounter}`}>
                <input
                  className="numSquare"
                  placeholder={num === 0 ? "" : num}
                  value={num === 0 ? "" : num}
                  onChange={(e) => {
                    this.processInput(e);
                  }}
                  onKeyDown={onArrowKeys}
                  id={`${rowCounter}${colCounter}`}
                ></input>
              </td>
            );
          })}
        </tr>
      );
    });
  }

  renderSuccessMessage() {
    if (isSolved(this.state.progressBoard)) {
      return (
        <div id="successMessage">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Congrats! <br />
          You solved the puzzle!
        </div>
      );
    }
  }

  /*
   * Lifecycle
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
          !isLegalPlacement(
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
        <div className="ui container" id="tableWrapper">
          <table className="ui celled table" id="boardTable">
            <tbody>{this.renderBoard()}</tbody>
          </table>
        </div>
        <div className="ui center aligned container">
          <div
            className="ui container center aligned"
            id="successMessageWrapper"
          >
            {this.renderSuccessMessage()}
          </div>
          <Panel
            importBoard={this.importBoard}
            progressBoard={this.state.progressBoard}
            board={this.state.board}
            setProgressBoard={this.setProgressBoard}
            setBoard={this.setBoard}
          />
        </div>
      </div>
    );
  }
}
export default Solver;
