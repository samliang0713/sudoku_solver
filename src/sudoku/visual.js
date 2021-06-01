const printBoard = function (board) {
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

const removeProgressSquares = function () {
  const currentProgressSquares = document.getElementsByClassName("progress");
  Array.from(currentProgressSquares).forEach((square) => {
    square.classList.remove("progress");
  });
};

const removeSolutionSquares = function () {
  const currentSolutionSquares = document.getElementsByClassName("solution");
  Array.from(currentSolutionSquares).forEach((square) => {
    square.classList.remove("solution");
  });
};

export { printBoard, removeProgressSquares, removeSolutionSquares };
