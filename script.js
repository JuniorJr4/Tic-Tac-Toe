//BUILD BOARD AND LISTENERS
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
          gameEngine.playerTurn(),
          console.log(board))
        : ((square.textContent = gameEngine.computerPlayer.piece),
          (square.style.pointerEvents = "none"),
          (board[index] = gameEngine.computerPlayer.piece),
          gameEngine.playerTurn(),
          console.log(board));
    });
  });

//RESTART THE GAME
  const restartBtn = document.querySelector('.btn');
  restartBtn.addEventListener('click', restart);
  function restart() {
    gameEngine.resetValues();
    boardCells.forEach((square, index) => {
      square.textContent = '';
      board[index] = '';
      square.style.pointerEvents = 'auto';
    });
  }

  return {
    board,
  };
})();

//PROCESSES TO RUN THE GAME
const gameEngine = (() => {
  const gameInfo = document.querySelector(".info");
  const gameOverMsg = document.querySelector(".game-over");
  const boardGrid = document.querySelector(".board-grid");

  const makePlayer = (player, piece, turn, winner) => {
    return { player, piece, turn, winner };
  };
  const player1 = makePlayer("Player1", "X", true, false);
  const computerPlayer = makePlayer("Player2", "O", false, false);

  //WINNING LINES IF ALL MATCHED
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

  //MAKE PLAY, UPDATE BOARD, CHECK FOR WIN AND CHANGE PLAYERS
  const playerTurn = () => {
    player1.turn
      ? ((gameInfo.textContent = "Player two it is your turn"),
        checkForWinner(),
        (player1.turn = false),
        (computerPlayer.turn = true))
      : ((gameInfo.textContent = "Player One's turn"),
        checkForWinner(),
        (player1.turn = true),
        (computerPlayer.turn = false));
  };

  //INFORM WHO WON
  const gameOver = (whoWon) => {
    if (whoWon === "player") {
      gameOverMsg.textContent = `${player1.player} wins!`;
      gameInfo.textContent = "";
    } else if (whoWon === "computer") {
      gameOverMsg.textContent = `${computerPlayer.player} wins!`;
      gameInfo.textContent = "";
    } else {
      gameOverMsg.textContent = "Game ended as a draw";
      gameInfo.textContent = "";
    }
    boardGrid.style.pointerEvents = "none";
    boardGrid.style.opacity = "0.6";

  };

  //RESET STARTING VALUES
  function resetValues() {
    player1.turn = true;
    player1.winner = false;
    computerPlayer.turn = false;
    computerPlayer.winner = false;
    gameOverMsg.textContent = '';
    gameInfo.textContent = 'Player One, you go first';
    boardGrid.style.opacity = "1.0";
  }
  //CHECK FOR WINNER AGAINST ARRAY OR TIE
  const checkForWinner = () => {
    var tie = gameBoard.board.includes("");
    var winner;
    weHaveAWinner.forEach((row) => {
      if (
        gameBoard.board[row[0]] === gameBoard.board[row[1]] &&
        gameBoard.board[row[1]] === gameBoard.board[row[2]] &&
        gameBoard.board[row[2]] === player1.piece
      ) {
        gameOver("player");
        console.log("Xwins");
        winner = true;
      } else if (
        gameBoard.board[row[0]] === gameBoard.board[row[1]] &&
        gameBoard.board[row[1]] === gameBoard.board[row[2]] &&
        gameBoard.board[row[2]] === computerPlayer.piece
      ) {
        console.log("Owins");
        gameOver("computer");
        winner = true;
      } else if (!tie && !winner) {
        gameOver("tied");
      }
    });
  };

  return {
    checkForWinner,
    player1,
    computerPlayer,
    playerTurn,
    resetValues
  };
})();
