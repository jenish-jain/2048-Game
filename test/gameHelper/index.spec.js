const test = require('ava');
const game = require('../../gameHelper/index');
let fakeGameState, fakeLooseState, fakeWinState;

test.beforeEach(() => {
    fakeGameState = {
        name: "fakeUser",
        size: 3,
        board: [
            [0, 0, 0],
            [0, 1, 0],
            [0, 0, 0]
        ],
        // 1 never occurs in board hence a unique char to track
        score: 0,
        status: "progress"
    };

    fakeLooseState = {
        name: "fakeUser",
        size: 3,
        board: [
            [2, 4, 2],
            [4, 2, 4],
            [2, 4, 2]
        ],
        // 1 never occurs in board hence a unique char to track
        score: 0,
        status: "progress"
    }

    fakeWinState = {
        name: "fakeUser",
        size: 3,
        board: [
            [0, 1024, 0],
            [1024, 1024, 1024],
            [0, 1024, 0]
        ],
        // 1 never occurs in board hence a unique char to track
        score: 0,
        status: "progress"
    }

})

test.afterEach( () =>{
    fakeGameState.board = undefined;
})

test("create blank board successfully", t => {
    let board = game.blankBoard(2);
    t.deepEqual(board, [[0, 0], [0, 0]]);
    board = game.blankBoard(4);
    t.deepEqual(board, [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]);
})

test.serial(" move right successfully", t => {
    t.is(fakeGameState.board[1][1], 1);
    let updatedState = game.move(fakeGameState, 2);
    t.not(updatedState.board[1][1], 1);
    t.is(updatedState.board[1][2], 1);
    t.is(updatedState.status, "progress");
})

test.serial(" move left successfully", t => {
    t.is(fakeGameState.board[1][1], 1);
    let updatedState = game.move(fakeGameState, 1);
    t.not(updatedState.board[1][1], 1);
    t.is(updatedState.board[1][0], 1);
    t.is(updatedState.status, "progress");
})

test.serial(" move up successfully", t => {
    t.is(fakeGameState.board[1][1], 1);
    let updatedState = game.move(fakeGameState, 3);
    t.not(updatedState.board[1][1], 1);
    t.is(updatedState.board[0][1], 1);
    t.is(updatedState.status, "progress");
})

test.serial(" move down successfully", t => {
    t.is(fakeGameState.board[1][1], 1);
    let updatedState = game.move(fakeGameState, 4);
    t.not(updatedState.board[1][1], 1);
    t.is(updatedState.board[2][1], 1);
    t.is(updatedState.status, "progress");
})

test.serial("loose game wen all tiles are filled", t =>{
    let updatedState = game.move(fakeLooseState, 1);
    t.is(updatedState.status, 'loose');
     updatedState = game.move(fakeLooseState, 2);
    t.is(updatedState.status, 'loose');
    updatedState = game.move(fakeLooseState, 3);
    t.is(updatedState.status, 'loose');
     updatedState = game.move(fakeLooseState, 4);
    t.is(updatedState.status, 'loose');
})

test.serial(" win when winning condition is achieved" , t =>{
    let updatedState = game.move(fakeWinState, 1);
    t.is(updatedState.status, 'won');
     updatedState = game.move(fakeWinState, 2);
    t.is(updatedState.status, 'won');
    updatedState = game.move(fakeWinState, 3);
    t.is(updatedState.status, 'won');
     updatedState = game.move(fakeWinState, 4);
    t.is(updatedState.status, 'won');
})