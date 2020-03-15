console.log("script started");
const game = require("./gameHelper");
const input = require("./service/input");
// const config = require("./config/config");

async function initializeGame() {
  let gameState = {}; // stores the state for a game
  gameState.name = await input.name();
  gameState.size = await input.size();
  gameState.board = game.blankBoard(gameState.size);
  gameState.score = 0;
  gameState.status = "progress";

  return gameState;
}

async function fetchMove(gameState) {
  const dir = await input.move();
  let {name, status} =  gameState
  gameState = game.move(gameState, dir);
  if(status == "progress"){
      fetchMove(gameState);
  }else{
      console.log(`${name}, You ${status}`)
  }
}

async function startGame(){
   let gameState =  await initializeGame();
   console.log(gameState)
   gameState.board = game.randomTile(gameState);
   gameState.board = game.randomTile(gameState);
   fetchMove(gameState);
}

startGame();