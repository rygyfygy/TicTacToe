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

  this.move = function () {
    const dest = this.input();
    board[dest[0]][dest[1]] = this.marker;
  };
}

const player1 = new Player("Pierwszy", "x");
const player2 = new Player("Drugi", "o");
const players = [player1, player2];


function checkWinner(board) {
  const lines = [
    // rows
    ...board,
    // cols
    ...[0, 1, 2].map((c) => board.map((row) => row[c])),
    // diagonals
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]],
  ];

  for (const p of players) {
    if (lines.some((line) => line.every((cell) => cell === p.marker))) {
      alert(`${p.name} WINS!`);
      return;
    }
  }

  if (lines.every((line) => line.every((cell) => cell != null))) {
    alert('TIE!');
    return;
  }
}


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
