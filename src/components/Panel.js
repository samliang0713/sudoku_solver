import React, { useState } from "react";
import Button from "./Button";
import SolutionButton from "./SolutionButton";
import ImportButton from "./ImportButton";
import _ from "lodash";

import { removeProgressSquares } from "../sudoku/visual";
import { newBoard, solve, generateSudoku } from "../sudoku/algorithm";

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

  const updateNumString = (e) => {
    setNumString(e.target.value);
  };

  const onRefreshButtonClick = () => {
    const emptyBoard = newBoard();
    props.setBoard(emptyBoard);
    props.setProgressBoard(_.cloneDeep(emptyBoard));
  };

  const onSolveButtonClick = () => {
    if (solve(props.board).length) {
      console.log("inside if statemetn!");
      const solutionBoard = solve(props.board)[0];
      props.setProgressBoard(solutionBoard);
      const progressSquares = document.getElementsByClassName("progress");
      Array.from(progressSquares).forEach((square) => {
        square.classList.add("solution");
      });
    }
  };

  const onSetBoardButtonClick = () => {
    const currentBoard = _.cloneDeep(props.progressBoard);
    props.setBoard(currentBoard);
    removeProgressSquares();
  };

  const onGenerateSudokuButtonClick = () => {
    const newBoard = generateSudoku();
    props.setBoard(newBoard);
    props.setProgressBoard(newBoard);
    removeProgressSquares();
  };

  return (
    <div className="ui container center aligned">
      <div id="panelRow1">
        <Button
          onButtonClick={onGenerateSudokuButtonClick}
          text="Generate Sudoku"
        />
        <Button onButtonClick={onSolveButtonClick} text="Solve Puzzle" />
      </div>

      <div id="panelRow2">
        <Button onButtonClick={onSetBoardButtonClick} text="Set Board" />
        <Button onButtonClick={onRefreshButtonClick} text="Clear Board" />
      </div>
      <div id="panelRow3">
        <SolutionButton solve={solve} board={props.board} />
        <ImportButton
          onFormSubmit={onFormSubmit}
          updateNumString={updateNumString}
          numString={numString}
        />
      </div>
    </div>
  );
};

export default Panel;
