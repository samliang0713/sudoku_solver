import _ from "lodash";

const newBoard = function () {
  const board = new Array(9);
  for (let i = 0; i < board.length; i++) {
    board[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  }
  return board;
};

const isLegalMove = function (num, row, col, board) {
  if (num > 9 || num < 1 || row > 9 || row < 1 || col > 9 || col < 1) {
    return false;
  }

  // check row
  for (let j = 0; j < board.length; j++) {
    if (j === col - 1) continue;
    if (board[row - 1][j] === num) {
      return false;
    }
  }

  // check col
  for (let i = 0; i < board[0].length; i++) {
    if (i === row - 1) continue;
    if (board[i][col - 1] === num) {
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
        return false;
      }
    }
  }

  return true;
};

const isLegalPlacement = function (num, row, col, board) {
  if (num === 0) return true;
  return isLegalMove(num, row, col, board);
};

const isBoardLegal = function (board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (
        board[i][j] !== 0 &&
        !isLegalPlacement(board[i][j], i + 1, j + 1, board)
      )
        return false;
    }
  }
  return true;
};

// find next empty location by row
const findNextEmpty = function (row, col, board) {
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
};

const isFilled = function (board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] === 0) return false;
    }
  }
  return true;
};

const isSolved = function (board) {
  for (let row = 1; row <= board.length; row++) {
    for (let col = 1; col < board.length; col++) {
      if (isLegalPlacement(board[row - 1][col - 1], row, col, board))
        return false;
    }
  }
  return true;
};

// Uses backtracking algorithm to solve the sudoku puzzle
const solveHelper = function (row, col, board, solutionList) {
  if (isFilled(board)) {
    solutionList.push(_.cloneDeep(board));
    return;
  }

  if (board[row - 1][col - 1] !== 0) {
    const nextEmptyCoordinates = findNextEmpty(row, col, board);
    row = nextEmptyCoordinates[0];
    col = nextEmptyCoordinates[1];
  }

  for (let i = 1; i <= 9; i++) {
    if (solutionList.length >= 600) break;
    if (isLegalMove(i, row, col, board)) {
      board[row - 1][col - 1] = i;
      solveHelper(row, col, board, solutionList);
      board[row - 1][col - 1] = 0;
    }
  }
};

const solve = function (board) {
  if (!isBoardLegal(board)) {
    window.alert("No solution because the board violates rules");
    return [];
  }
  const solution = _.cloneDeep(board);

  const solutionList = [];
  solveHelper(1, 1, solution, solutionList);
  if (solutionList.length === 0) {
    window.alert("No solution available");
    return [];
  }
  return solutionList;
};

const generateRandomNineNum = function () {
  const randomNineNum = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let m = randomNineNum.length,
    i,
    temp;
  while (m) {
    i = Math.floor(Math.random() * m);
    m -= 1;
    temp = randomNineNum[m];
    randomNineNum[m] = randomNineNum[i];
    randomNineNum[i] = temp;
  }
  return randomNineNum;
};

const generateRandomFilledBoard = function () {
  const randomBoard = newBoard();

  // Randomly fill the top-left, top-middle, and top-right blocks
  let k, rowBlockIndex, colBlockIndex, randomNine, i, j, z;

  k = 0;

  fillBlock: while (k < 3) {
    rowBlockIndex = 0;
    colBlockIndex = k * 3;
    randomNine = generateRandomNineNum();
    for (i = rowBlockIndex; i < rowBlockIndex + 3; i++) {
      for (j = colBlockIndex; j < colBlockIndex + 3; j++) {
        for (z = 0; z < randomNine.length; z++) {
          if (isLegalMove(randomNine[z], i + 1, j + 1, randomBoard)) {
            randomBoard[i][j] = randomNine[z];
            randomNine.splice(z, 1);
            break;
          }
        }
      }
    }

    /* check if any of the top row contains 0 - if true, start refilling at
     * top-middle block
     */

    for (i = rowBlockIndex; i < rowBlockIndex + 3; i++) {
      for (j = colBlockIndex; j < colBlockIndex + 3; j++) {
        if (randomBoard[i][j] === 0) {
          k = 1;
          continue fillBlock;
        }
      }
    }
    k++;
  }

  // fill the first column

  const numsToFillFirstColumn = generateRandomNineNum().filter(
    (num) =>
      num !== randomBoard[0][0] &&
      num !== randomBoard[1][0] &&
      num !== randomBoard[2][0]
  );

  for (j = 3; j < randomBoard[0].length; j++) {
    randomBoard[j][0] = numsToFillFirstColumn.pop();
  }

  // solved the random board to generate a filled, legal board

  return solve(randomBoard)[0];
};

const calculateSumOfCandidates = function (puzzleBoard) {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let sumOfCandidates = 0,
    i,
    j,
    num;

  for (i = 0; i < puzzleBoard.length; i++) {
    for (j = 0; j < puzzleBoard[0].length; j++) {
      if (puzzleBoard[i][j] === 0) {
        for (num of nums) {
          if (isLegalMove(num, i + 1, j + 1, puzzleBoard)) sumOfCandidates++;
        }
      }
    }
  }

  return sumOfCandidates;
};

const generateSudoku = function () {
  let difficultyEstimate = 0,
    pairA,
    board,
    nextBoard;
  while (difficultyEstimate < 130) {
    board = generateRandomFilledBoard();

    /* keeps removing clues
     * until the board can be solved with more than 1 solution
     */
    while (true) {
      do {
        pairA = [Math.floor(Math.random() * 9), Math.floor(Math.random() * 9)];
      } while (board[pairA[0]][pairA[1]] === 0);

      nextBoard = _.cloneDeep(board);
      nextBoard[pairA[0]][pairA[1]] = 0;

      if (solve(nextBoard).length > 1) break;
      else {
        board[pairA[0]][pairA[1]] = 0;
      }
    }
    difficultyEstimate = calculateSumOfCandidates(board);
  }
  return board;
};

export {
  newBoard,
  isLegalMove,
  isLegalPlacement,
  isBoardLegal,
  findNextEmpty,
  isFilled,
  isSolved,
  solveHelper,
  solve,
  generateRandomNineNum,
  generateRandomFilledBoard,
  generateSudoku,
};
