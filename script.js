/* global alert, prompt */
const TicTacToe = (() => {
  let board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  board.clear = function () {
    board.forEach(row => row.fill(null));
    document.querySelectorAll('.cell').forEach((cell) => {cell.textContent = null});
  };


  let currentPlayer;

  const createPlayer = (name, marker) => {
    return {
      name: name,
      marker: marker,
      score: 0,
      move(r, c) {
        board[r][c] = this.marker;
      },
      display: null,
      update() {this.display.textContent = `${this.score}`}
    };
  };
  
  
 
  const player1 = createPlayer(prompt("Player 1's name:"), "x");
  const player2 = createPlayer(prompt("Player 2's name:"), "o");
  const players = [player1, player2];

  player1.display = document.querySelector('#player1')
  player2.display = document.querySelector('#player2')
  
  
  const setCurrentPlayer = function() {
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
      alert(`${currentPlayer.name} wins!`);
      currentPlayer.score++;
      currentPlayer.update();
      board.clear();
      return currentPlayer;
    }

    if (gameBoard.every((row) => row.every((cell) => cell != null))) {
      alert("Tie!");
      return currentPlayer;
    }
  };

  const gameLoop = (() => {
    setCurrentPlayer();
    for (let cell of document.querySelectorAll('.cell')) {
      cell.addEventListener('click', (event) => {
        const row = parseInt(event.target.id[0]);
        const col = parseInt(event.target.id[1]);
        if (board[row][col] === null) {
          event.target.textContent = currentPlayer.marker;
          currentPlayer.move(row,col);
          checkWinner(board);
          setCurrentPlayer();
        }
      });
    }
})();
})();