const inquirer = require("inquirer");

const askName = [
  {
    type: "input",
    name: "name",
    message: "What's your name ? "
  }
];

const askMove = [
  {
    type: "input",
    name: "move",
    message: "Input your move : ",
    validate: function(value) {
      const validMoves = ["1", "2", "3", "4"];
      if(value === "help"){
        return ("To make a move enter a number between 1 to 4"+
        "\n 1 => left"+
        "\n 2 => right"+
        "\n 3 => up"+
        "\n 4 => down")
      }else{
          if (validMoves.includes(value)) {
            return true;
          }
          return "Backspace & Please enter numbers between 1 & 4";
      }
    }
  }
];

exports.name = () => {
    return inquirer.prompt(askName).then(answers => {
        return answers["name"];
    });
};


exports.move = () => {
    return inquirer.prompt(askMove).then(answers => {
        return answers["move"];
    });
};


// exports.move = inquirer.prompt(askMove)
// .then(answers => {
// //   console.log(`your move is ${answers["move"]}!`);
// return answers["move"];
// });
