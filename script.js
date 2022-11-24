const boardGrid = document.querySelector(".board-grid");
const gameInfo = document.querySelector('.info');


const makePlayer = (player, piece, turn, winner) => {
  return { player, piece, turn, winner };
};

const gameBoard = (() => {
  let board = [];

  for (let i = 0; i < 9; i++) {
    board.push("");
  }

  // ADD EVENT LISTENER FOR EACH CELL
  const boardCells = document.querySelectorAll(".cell");
  boardCells.forEach((square, index) => {
    square.addEventListener("click", () => {
      gameEngine.player1.turn
        ? ((square.textContent = gameEngine.player1.piece),
          (square.style.pointerEvents = "none"),
          (board[index] = gameEngine.player1.piece),
          (gameEngine.player1.turn = false),
          (gameEngine.computerPlayer.turn = true),
          gameEngine.checkForWinner(),
          (gameInfo.textContent = 'Robot it is your turn'),
          console.log(board))
        : ((square.textContent = gameEngine.computerPlayer.piece),
          (square.style.pointerEvents = "none"),
          (board[index] = gameEngine.computerPlayer.piece),
          (gameEngine.player1.turn = true),
          (gameEngine.computerPlayer.turn = false),
          gameEngine.checkForWinner(),
          (gameInfo.textContent = "Player One's turn"),
          console.log(board));
    });
  });

  return {
    board,
  };
})();

const gameEngine = (() => {
  const player1 = makePlayer('Player1', "X", false, false);
  const computerPlayer = makePlayer("Robot", "O", true, false);

  const weHaveAWinner = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const gameOver = (whoWon) => {
    const gameOverMsg = document.querySelector(".game-over");
    if (whoWon === 'player') {
      gameOverMsg.textContent = `${player1.player} wins!`;
    } else if (whoWon === 'computer') {
      gameOverMsg.textContent = `${computerPlayer.player} wins!`;
    } else {
      gameOverMsg.textContent =  'Game ended as a draw'
    }
  };

  const checkForWinner = () => {
    var tie = gameBoard.board.includes("");
    var winner;
    weHaveAWinner.forEach((row) => {
      if (
        gameBoard.board[row[0]] === gameBoard.board[row[1]] &&
        gameBoard.board[row[1]] === gameBoard.board[row[2]] &&
        gameBoard.board[row[2]] === player1.piece
      ) {
        gameOver('player');
        console.log("Xwins");
        winner = true;
      } else if (
        gameBoard.board[row[0]] === gameBoard.board[row[1]] &&
        gameBoard.board[row[1]] === gameBoard.board[row[2]] &&
        gameBoard.board[row[2]] === computerPlayer.piece
      ) {
        console.log("Owins");
        gameOver('computer');
        winner = true;
      } else if (!tie && !winner) {
        gameOver('tied');
      }
    });
  };

  return {
    checkForWinner,
    player1,
    computerPlayer,
  };
})();
