console.log("script started");
const input = require("./service/input");
const output = require("./service/display");
async function fetchMove() {
  const name = await input.name();
  const move = await input.move();
  console.log(`${name} , your move is`, move);
  let board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];

  output.displayBoard(board);
}


fetchMove();

// input.move.then(output => console.log(output.move, "was your move"));
