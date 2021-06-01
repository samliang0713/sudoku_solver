# Sudoku Solver

This project can generate a random sudoku, solve a given sudoku, and allow users to create their puzzles.  

## Functions

### Generate Sudoku

Generates a sudoku puzzle by first generating a randomized solution board and taking out clues until taking out the next clue will cause the puzzle to have more than 1 solutions. 

### Solve Puzzle

Solves any sudoku puzzle that has at least 1 solution with the backtracking algorithm. 

### Set Board

Allows users to create their puzzles by setting the current numbers on the board to be a puzzle.

### Clear Board

Clears all numbers currently on the board.

### Show # of Solutions

Displays the total number of solutions to the current puzzle (although technically sudoku puzzles should only have 1 solution).

### Import Puzzle 

Allows users to import a sudoku puzzle with a 81-digit string (ex. 000000010004087006060053000623008700700000025000702000030070002800024560052001040).


