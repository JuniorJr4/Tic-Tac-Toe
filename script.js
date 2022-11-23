const makePlayer = (player, piece, turn, winner) => {
  return { player, piece, turn, winner };
};

const gameBoard = (() => {
  let board = [];

  for (let i = 0; i < 9; i++) {
    board.push("");
  }

  let boardGrid = document.querySelector(".board-grid");

  board.forEach((square, index) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = square;
    boardGrid.appendChild(cell);
  });

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
          console.log(board))
        : ((square.textContent = gameEngine.computerPlayer.piece),
          (square.style.pointerEvents = "none"),
          (board[index] = gameEngine.computerPlayer.piece),
          (gameEngine.player1.turn = true),
          (gameEngine.computerPlayer.turn = false),
          gameEngine.checkForWinner(),
          console.log(board));
    });
  });

  return {
    board,
  };
})();

const gameEngine = (() => {
  const player1 = makePlayer("Name", "X", false, false);
  const computerPlayer = makePlayer("Robot", "O", true, false);

  var thereIsAWinner;
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

  const gameOver = () => {
    const gameOverMsg = document.querySelector(".game-over");
    if (player1.winner) {
      gameOverMsg.textContent = `${player1.player} wins!`;
    } else if (computerPlayer) {
      gameOverMsg.textContent = `${computerPlayer.player} wins!`;
    }
  };

  // const checkForTie = () => {
  //   var tie = gameBoard.includes('');
  //   if (gameBoard.board)
  // }
  const checkForWinner = () => {
    var tie = gameBoard.board.includes("");
    weHaveAWinner.forEach((row) => {
      if (
        gameBoard.board[row[0]] === gameBoard.board[row[1]] &&
        gameBoard.board[row[1]] === gameBoard.board[row[2]] &&
        gameBoard.board[row[2]] === player1.piece
      ) {
        thereIsAWinner = true;
        player1.winner = true;
        gameOver();
        console.log("Xwins");
        return true;
      } else if (
        gameBoard.board[row[0]] === gameBoard.board[row[1]] &&
        gameBoard.board[row[1]] === gameBoard.board[row[2]] &&
        gameBoard.board[row[2]] === computerPlayer.piece
      ) {
        computerPlayer.winner = true;
        console.log("Owins");
        gameOver();
        return true;
      }
    });
  };

  return {
    checkForWinner,
    player1,
    computerPlayer,
  };
})();
