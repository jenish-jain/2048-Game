const config = require("../config/config");
let state = {}; // stores the game state
let size = 0;

exports.blankBoard = (size) => {
  let arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Array(size).fill(0));
  }
  // console.log(arr);
  return arr;
};

exports.randomTile = gameState => {
  let { board, size } = gameState;
    let options = [];
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (board[i][j] === 0) {
          options.push({
            x: i,
            y: j
          });
        }
      }
    }
    if (options.length > 0) {
      let spot = options[Math.floor(Math.random() * options.length)];
      let val = Math.random(1);
      board[spot.x][spot.y] = val > 0.5 ? 2 : 4;
    } else if (options.length == 0) {
      state.status = "loose";
    }
  console.table(board);
  return board;
};

const slide = row => {
  let arr = row.filter(val => val); // returns non zero values
  let missing = size - arr.length;
  let zeroes = Array(missing).fill(0);
  arr = zeroes.concat(arr);
  return arr;
};

exports.move = (gameState, dir) => {
  state = gameState;
  size = state.size;
  let { board, name } = state
  
  if (dir == 1) {
    // left
    let flippedBoard = flip(board); // flip the main board
    flippedBoard = performMove(flippedBoard); // perform move on the main board
    board = flip(flippedBoard); // agin restore the board order
  } else if (dir == 2) {
    // right
    board = performMove(board);
  } else if (dir == 3) {
    // up
    let rotatedBoard = rotateClockwise(board); // rotate clockwise to perform operation
    rotatedBoard = performMove(rotatedBoard);
    board = rotateAntiCLockwise(rotatedBoard); // restore board order
  } else if (dir == 4) {
    // down
    let rotatedBoard = rotateAntiCLockwise(board); // rotate anticlockwise to perform operation
    rotatedBoard = performMove(rotatedBoard);
    board = rotateClockwise(rotatedBoard); // restore board order
  }
  
  board = this.randomTile(state);
  console.log(`${name} your score is : ${state.score} `);

  return state; // return final board
};

function performMove(board) {
  for (let i = 0; i < size; i++) {
    board[i] = slide(board[i]);
    board[i] = combineTiles(board[i]); // combine tiles due to initial sliding
    board[i] = slide(board[i]); // to slide the combines tiles
  }
  return board;
}

function flip(board) {
  for (let i = 0; i < size; i++) {
    board[i].reverse();
  }
  return board;
}

function rotateClockwise(board) {
  for (let i = 0; i < size / 2; i++) {
    for (let j = i; j < size - i - 1; j++) {
      let temp = board[i][j];
      board[i][j] = board[size - 1 - j][i];
      board[size - 1 - j][i] = board[size - 1 - i][size - 1 - j];
      board[size - 1 - i][size - 1 - j] = board[j][size - 1 - i];
      board[j][size - 1 - i] = temp;
    }
  }
  return board;
}

function rotateAntiCLockwise(board) {
  for (let i = 0; i < size / 2; i++) {
    for (let j = i; j < size - i - 1; j++) {
      let temp = board[i][j];
      board[i][j] = board[j][size - 1 - i];
      board[j][size - 1 - i] = board[size - 1 - i][size - 1 - j];
      board[size - 1 - i][size - 1 - j] = board[size - 1 - j][i];
      board[size - 1 - j][i] = temp;
    }
  }
  return board;
}

function combineTiles(row) {
  for (let i = size - 1; i >= 0; i--) {
    let a = row[i];
    let b = row[i - 1];
    if (a == b) {
      row[i] = a + b;
      row[i - 1] = 0;
      state.score = state.score + row[i];
      if (row[i] == config.winningCondition) {
        state.status = "won";
      }
    }
  }
  return row;
}
