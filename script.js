//your JS code here. If required.
const submitBtn = document.getElementById("submit");
const setupDiv = document.getElementById("setup");
const gameDiv = document.getElementById("game");
const messageDiv = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "x"; 
let board = Array(9).fill("");

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

submitBtn.addEventListener("click", () => {
  
  player1 = document.getElementById("player1").value.trim();
  player2 = document.getElementById("player2").value.trim();

  if (!player1 || !player2) return;

  setupDiv.classList.add("hidden");
  gameDiv.classList.remove("hidden");

  currentPlayer = player1;
  messageDiv.textContent = `${currentPlayer}, you're up`;
});

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (cell.textContent !== "") return;

    cell.textContent = currentSymbol;
    board[index] = currentSymbol;

    if (checkWin()) {
      messageDiv.textContent = `${currentPlayer} congratulations you won!`;
      cells.forEach(c => c.style.pointerEvents = "none");
      return;
    }

    currentSymbol = currentSymbol === "x" ? "o" : "x";
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    messageDiv.textContent = `${currentPlayer}, you're up`;
  });
});

function checkWin() {
  return winningCombos.some(combo =>
    combo.every(i => board[i] === currentSymbol)
  );
}