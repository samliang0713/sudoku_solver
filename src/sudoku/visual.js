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

const onArrowKeys = function (e) {
  const key = e.key;
  const currentId = e.target.id;
  switch (key) {
    case "ArrowUp":
      document
        .getElementById(
          `${
            Number.parseInt(currentId[0]) !== 1
              ? Number.parseInt(currentId[0]) - 1
              : 1
          }${currentId[1]}`
        )
        .focus();
      break;
    case "ArrowDown":
      document
        .getElementById(
          `${
            Number.parseInt(currentId[0]) !== 9
              ? Number.parseInt(currentId[0]) + 1
              : 9
          }${currentId[1]}`
        )
        .focus();
      break;
    case "ArrowLeft":
      document
        .getElementById(
          `${currentId[0]}${
            Number.parseInt(currentId[1]) !== 1
              ? Number.parseInt(currentId[1]) - 1
              : 1
          }`
        )
        .focus();
      break;
    case "ArrowRight":
      document
        .getElementById(
          `${currentId[0]}${
            Number.parseInt(currentId[1]) !== 9
              ? Number.parseInt(currentId[1]) + 1
              : 9
          }`
        )
        .focus();
      break;
    default:
      break;
  }
};

const animateTable = function () {
  const table = document.getElementById("boardTable");
  for (let i = 0; i < table.children[0].children.length; i++) {
    table.children[0].children[i].animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 1500,
      easing: "ease-in-out",
    });
  }
};
export {
  printBoard,
  removeProgressSquares,
  removeSolutionSquares,
  onArrowKeys,
  animateTable,
};
