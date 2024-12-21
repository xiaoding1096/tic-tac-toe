const board = document.getElementById("board");

for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  board.appendChild(cell);
}

let currentPlayer = "X";

const winningCombinations = [
  //horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //diagonal
  [0, 4, 8],
  [2, 4, 6],
];

board.addEventListener("click", (event) => {
  const cell = event.target;
  console.log(cell);
  if (!cell.classList.contains("cell") || cell.classList.contains("taken"))
    return;
  const cells = document.querySelectorAll(".cell");
  const index = Array.from(cells).indexOf(cell);
  console.log(index);
  cell.textContent = currentPlayer;
  cell.classList.add("taken");
  cell.setAttribute("data-player", currentPlayer);

  if (checkWin(currentPlayer)) {
    setTimeout(() => {
      alert(`Player ${currentPlayer} Wins !`);
      resetGame();
    }, 100);
    return;
  }

  if (checkDraw(currentPlayer)) {
    setTimeout(() => {
      alert("Draw Draw !!");
      resetGame();
    }, 100);
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
});

function checkWin(player) {
  const cells = document.querySelectorAll(".cell");
  return winningCombinations.some((combination) =>
    combination.every(
      (index) => cells[index].getAttribute("data-player") === player
    )
  );
}

function checkDraw() {
  const cells = document.querySelectorAll(".cell");
  return Array.from(cells).every((cell) => cell.classList.contains("taken"));
}

function resetGame() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("taken");
    cell.removeAttribute("data-player");
  });
  currentPlayer = "X";
}
