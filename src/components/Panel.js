import React, { useState } from "react";
import Button from "./Button";
import _ from "lodash";

const Panel = (props) => {
  const [numString, setNumString] = useState("");

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (e.target[0].value.length === 81) {
      props.importBoard(e.target[0].value);
    } else
      window.alert(
        "Incorrect length. Please make sure the string contains 81 digits."
      );
  };

  const onRefreshButtonClick = () => {
    const newBoard = props.newBoard();
    props.setBoard(newBoard);
    props.setProgressBoard(_.cloneDeep(newBoard));
  };

  const onSolveButtonClick = () => {
    const solutionBoard = props.solve(props.board);
    props.setProgressBoard(solutionBoard);
  };

  const onSetBoardButtonClick = () => {
    const currentBoard = _.cloneDeep(props.progressBoard);
    props.setBoard(currentBoard);
    props.removeProgressSquares();
  };

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <label for="">Import a Sudoku</label>
        <div>
          <input
            type="number"
            id="importNumString"
            value={numString}
            onChange={(e) => setNumString(e.target.value)}
          ></input>
          <button>Submit</button>
        </div>
      </form>

      <Button onButtonClick={onSolveButtonClick} text="Solve Puzzle" />
      <Button onButtonClick={onRefreshButtonClick} text="Refresh" />
      <Button onButtonClick={onSetBoardButtonClick} text="Set Board" />
    </div>
  );
};

export default Panel;
