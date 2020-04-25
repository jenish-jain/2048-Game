const inquirer = require("inquirer");
const chalk = require('chalk');
const info = chalk.bold.blue;

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
      if (value === "help") {
        return (
          "To make a move enter a number between 1 to 4" +
          "\n 1 => left" +
          "\n 2 => right" +
          "\n 3 => up" +
          "\n 4 => down"
        );
      } else {
        if (validMoves.includes(value)) {
          return true;
        }
        return "Backspace & Please enter numbers between 1 & 4";
      }
    }
  }
];

const askSize = [
  {
    type: "input",
    name: "size",
    message: "Please enter the gameBoard size : "
  }
];

exports.name = () => {
  return inquirer.prompt(askName).then(answers => {
    return answers["name"];
  });
};

exports.move = () => {
  return inquirer.prompt(askMove).then(answers => {
    let message ;
    switch (answers["move"]){
      case '1':
        message  =  " you moved left";
        break;
      case '2':
        message  =  " you moved right";
        break;
      case '3':
        message  =  " you moved up";
        break;
      case '4':
        message  =  " you moved down";
        break;
    }
    console.log(info(message));
    return answers["move"];
  });
};

exports.size = () => {
  return inquirer.prompt(askSize).then(answers => {
    return parseInt(answers["size"]);
  });
};
