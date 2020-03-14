const config = require('../config/config');
// const board =  new Array[config.boardSize];
const size = config.boardSize;

exports.displayBoard =  (board) => {
    for(let i=0; i < size; i++){
        let line = "";
        for(let j=0; j< size ; j++){
            line =line +  " | " +  board[i][j] + " | ";
        }
        console.log(line);
        console.log("____________");
    }
}

