/* global alert, prompt */

let board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function Player(name, marker) {
  this.name = name;
  this.marker = marker;
  this.points = 0;

  this.input = function () {
    return prompt(`${this.name}, please make your move: `);
  };

  this.move = function (r,c) {
    board[r][c] = this.marker;
  };
}

const player1 = new Player("Pierwszy", "x");
const player2 = new Player("Drugi", "o");
const players = [player1, player2];
let currentPlayer;

const setCurrentPlayer = (players) => {
  if (currentPlayer) {
    currentPlayer.marker === "o"
      ? (currentPlayer = player1)
      : (currentPlayer = player2);
  } else {
    currentPlayer = players[Math.floor(Math.random() * 2)];
  }
};
const checkWinner = function(gameBoard) {
  const lines = [
    // rows
    ...gameBoard,
    // cols
    ...[0, 1, 2].map((c) => gameBoard.map((r) => r[c])),
    // diagonals
    [gameBoard[0][0], gameBoard[1][1], gameBoard[2][2]],
    [gameBoard[0][2], gameBoard[1][1], gameBoard[2][0]],
  ];

  if (lines.some((line) => line.every((cell) => cell === currentPlayer.marker))) {
    alert(`${currentPlayer.name} WINS!`);
    return;
  }

  if (lines.every((line) => line.every((cell) => cell != null))) {
    alert("TIE!");
    return;
  }
};


setCurrentPlayer(players);
for (let cell of document.querySelectorAll('.cell')) {
  cell.addEventListener('click', (event) => {
    const row = parseInt(event.target.id[0]);
    const col = parseInt(event.target.id[1]);
    if (board[row][col] === null) {
      event.target.textContent = currentPlayer.marker;
      currentPlayer.move(row,col);
      checkWinner(board);
      setCurrentPlayer(players);
    }
  });
}

// TODO: refractor logic, add event listeners

// player1.move();
// player2.move();
// alert(board);
// player1.move();
// player2.move();
// alert(board);
// player1.move();
// player2.move();

// board[0][0] = 'x';
// board[0][1] = 'x';
// board[0][2] = 'x';

// checkWinner(board);
// alert(board);
