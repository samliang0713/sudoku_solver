import React from "react";

const Header = (props) => {
  return (
    <div>
      <div className="ui one item menu" id="header">
        <div className="item">Sudoku Solver</div>
      </div>

      <div className="ui center aligned text container" id="instruction">
        <p>Start playing in 1 of the 3 following ways:</p>
        <div id="waysWrapper">
          <div className="ui left aligned text container" id="waysToStart">
            1. Click <b>"Generate Sudoku"</b> <br />
            2. Enter your board and then click <b>"Set Board"</b> <br />
            3. Click <b>"Import Puzzle"</b> to import a puzzle <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
