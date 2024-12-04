const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const resetButton = document.getElementById("resetButton");
const newGameButton = document.getElementById("newGameButton");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popupMessage");
const closePopupButton = document.getElementById("closePopupButton");
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const checkWinner = () => {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      gameActive = false;
      popupMessage.textContent = `${currentPlayer} Wins!`;
      popup.style.display = "flex";
      return;
    }
  }

  if (!gameBoard.includes("")) {
    gameActive = false;
    popupMessage.textContent = "It's a Draw!";
    popup.style.display = "flex";
  }
};

const handleClick = (event) => {
  const index = event.target.getAttribute("data-index");

  if (gameBoard[index] !== "" || !gameActive) return;

  gameBoard[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  checkWinner();

  if (gameActive) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    message.textContent = `${currentPlayer}'s turn`;
  }
};

const resetGame = () => {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  message.textContent = `${currentPlayer}'s turn`;

  cells.forEach((cell) => {
    cell.textContent = "";
  });
};

const newGame = () => {
  resetGame();
  message.textContent = `${currentPlayer}'s turn`;
  popup.style.display = "none";
};

cells.forEach((cell) => {
  cell.addEventListener("click", handleClick);
});

resetButton.addEventListener("click", resetGame);
newGameButton.addEventListener("click", newGame);
closePopupButton.addEventListener("click", () => {
  popup.style.display = "none";
});
