const gameBoard = (() => {
  //let boardCells = [...document.querySelectorAll(".cell")];
  let board = ["x", "x", "x", "o", "o", "o", "x", "o", "x"];

  //   for (let i = 0; i < 9; i++) {
  //     board.push("");
  //   }

  let boardGrid = document.querySelector(".board-grid");
  
    board.forEach((square, index) => {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.textContent = square;
      boardGrid.appendChild(cell);
    });
  
  const getBoard = () => {
    return board;
  };
  return {
    board,
    getBoard,
    
  };
})();


