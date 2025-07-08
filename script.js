const board = document.getElementById("board");
const status = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

const winningCombinations = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diagonals
];

function handleClick(e) {
  const index = e.target.dataset.index;
  
  if (!isGameActive || gameBoard[index] !== "") return;

  gameBoard[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    status.textContent = `Player ${currentPlayer} wins!`;
    isGameActive = false;
    return;
  }

  if (!gameBoard.includes("")) {
    status.textContent = "It's a draw!";
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  status.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    );
  });
}

function resetGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameActive = true;
  status.textContent = `Player ${currentPlayer}'s turn`;
  document.querySelectorAll(".cell").forEach(cell => cell.textContent = "");
}

document.querySelectorAll(".cell").forEach(cell =>
  cell.addEventListener("click", handleClick)
);
resetBtn.addEventListener("click", resetGame);