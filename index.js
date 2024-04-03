document.addEventListener('DOMContentLoaded', function () {
    const playerText = document.getElementById('playerText');
    const restartBtn = document.getElementById('restartBtn');
    const boxes = document.querySelectorAll('.box');
  
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
  
    function handleCellClick(event) {
      const index = event.target.id;
      if (!gameActive || board[index] !== '') return;
  
      board[index] = currentPlayer;
      event.target.textContent = currentPlayer;
  
      if (checkWinner()) {
        playerText.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
      } else if (board.every(cell => cell !== '')) {
        playerText.textContent = "It's a tie!";
        gameActive = false;
      } else {
        switchPlayer();
      }
    }
  
    function switchPlayer() {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      playerText.textContent = `Player ${currentPlayer}'s turn`;
    }
  
    function checkWinner() {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
      ];
  
      for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          highlightWinnerCells(pattern);
          return true;
        }
      }
  
      return false;
    }
  
    function highlightWinnerCells(cells) {
      for (const index of cells) {
        boxes[index].style.backgroundColor = 'var(--winning-blocks)';
      }
    }
  
    function resetGame() {
      currentPlayer = 'X';
      board = ['', '', '', '', '', '', '', '', ''];
      gameActive = true;
  
      playerText.textContent = `Player ${currentPlayer}'s turn`;
  
      boxes.forEach(box => {
        box.textContent = '';
        box.style.backgroundColor = 'transparent';
      });
    }
  
    restartBtn.addEventListener('click', resetGame);
  
    boxes.forEach(box => {
      box.addEventListener('click', handleCellClick);
    });
  });
  