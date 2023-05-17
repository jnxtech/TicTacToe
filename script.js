document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const message = document.querySelector(".message");
    const restartButton = document.querySelector(".restart-button");
  
    let currentPlayer = "X";
    let isGameActive = true;
    let moves = 0;
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    cells.forEach((cell) => {
      cell.addEventListener("click", handleCellClick);
    });
  
    restartButton.addEventListener("click", restartGame);
  
    function handleCellClick(event) {
      const cell = event.target;
      const index = Array.from(cells).indexOf(cell);
  
      if (cell.textContent !== "" || !isGameActive) return;
  
      cell.textContent = currentPlayer;
      cell.style.backgroundColor = "#FFFFFF";
      cell.style.color = "#1F4068";
  
      moves++;
  
      if (checkWin(currentPlayer)) {
        message.textContent = `Player ${currentPlayer} wins!`;
        isGameActive = false;
        highlightWinningCombo(winningCombos);
        return;
      } else if (moves === 9) {
        message.textContent = "It's a draw!";
        isGameActive = false;
        return;
      }
  
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      message.textContent = `Player ${currentPlayer}'s turn`;
    }
  
    function checkWin(player) {
      return winningCombos.some((combo) => {
        return combo.every((index) => {
          return cells[index].textContent === player;
        });
      });
    }
  
    function highlightWinningCombo(winningCombos) {
      winningCombos.forEach((combo) => {
        const [a, b, c] = combo;
        cells[a].classList.add("win");
        cells[b].classList.add("win");
        cells[c].classList.add("win");
      });
    }
  
    function restartGame() {
      currentPlayer = "X";
      isGameActive = true;
      moves = 0;
      message.textContent = `Player ${currentPlayer}'s turn`;
  
      cells.forEach((cell) => {
        cell.textContent = "";
        cell.style.backgroundColor = "#1F4068";
        cell.style.color = "#64FFDA";
        cell.classList.remove("win");
      });
    }
  });
  