// const makePlayer = (player, piece, turn) => {
//   return { player, piece, turn };
// };

const gameBoard = (() => {
  const makePlayer = (player, piece, turn) => {
    return { player, piece, turn };
  };
  const player1 = makePlayer("Name", "X", false);
  const computerPlayer = makePlayer("Robot", "O", true);
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
      player1.turn
        ? ((square.textContent = player1.piece),
          (square.style.pointerEvents = "none"),
          (board[index] = player1.piece),
          (player1.turn = false),
          (computerPlayer.turn = true),
          gameEngine.checkForWinner(),
          console.log(board))
        : ((square.textContent = computerPlayer.piece),
          (square.style.pointerEvents = "none"),
          (board[index] = computerPlayer.piece),
          (player1.turn = true),
          (computerPlayer.turn = false),
          gameEngine.checkForWinner(),
          console.log(board));
    });
  });

  return {
    board,
    player1,
    computerPlayer,
  };
})();

const gameEngine = (() => {
  var playerWon;
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
  // return {
  //   player1,
  //   computerPlayer,
  // };
  const gameOver = () => {
    const gameOverMsg = document.querySelector('.game-over');
    if (playerWon) {
      gameOverMsg.textContent = `${gameBoard.player1.player} wins!`;
    }
  }

  // const checkForTie = () => {
  //   if (something)
  // }
  const checkForWinner = () => {
    weHaveAWinner.forEach((row) => {
      if (
        gameBoard.board[row[0]] === gameBoard.board[row[1]] &&
        gameBoard.board[row[1]] === gameBoard.board[row[2]] &&
        gameBoard.board[row[2]] === gameBoard.player1.piece
      ) {
        playerWon = true;
        gameOver();
        console.log("Xwins");
      } else if (
        gameBoard.board[row[0]] === gameBoard.board[row[1]] &&
        gameBoard.board[row[1]] === gameBoard.board[row[2]] &&
        gameBoard.board[row[2]] === gameBoard.computerPlayer.piece
      ) {
        playerWon = false;
        console.log("Owins");
      }
    });
  };

  return {
    checkForWinner,
  };
})();
