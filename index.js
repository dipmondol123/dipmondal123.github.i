const board = document.getElementById('board');
const boxes = board.querySelectorAll('.box');
const text = document.getElementById('text');
const restart = document.getElementById('restart');

let currentPlayer = 'X';
let spaces = {};
let gameOver = false;

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Function to restart the game
function restartButton() {
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].textContent = "";
    }
    text.textContent = `X's turn!`;
    spaces = {};
    gameOver = false;
    currentPlayer = 'X';
  }

// Function to check for a win
function checkWin(currentPlayer) {
  for (let i = 0; i < winningCombos.length; i++) {
    const [a, b, c] = winningCombos[i];
    if (boxes[a].textContent === currentPlayer &&
        boxes[b].textContent === currentPlayer &&
        boxes[c].textContent === currentPlayer) {
      return true;
    }
  }
  return false;
}

// Function to check for a tie
function checkTie() {
  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i].textContent === '') {
      return false;
    }
  }
  return true;
}

// Event listener for each square
for (let i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener('click', function() {
    if (boxes[i].textContent!== '' || gameOver) {
      return;
    }
    boxes[i].textContent = currentPlayer;
    spaces[i] = currentPlayer;
    if (checkWin(currentPlayer)) {
      text.textContent = `Game over! ${currentPlayer} wins!`;
      gameOver = true;
      alert(`${currentPlayer} wins!`);
      return;
    } else if (checkTie()) {
      text.textContent = `Game is tied!`;
      alert("It's a tie!");
      return;
    }
    currentPlayer = (currentPlayer === 'X')? 'O' : 'X';
    text.textContent = `${currentPlayer}'s turn!`;
  });
}

// Event listener for the restart button
restart.addEventListener('click', restartButton);

// Initialize the game
restartButton();