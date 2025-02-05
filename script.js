const cells = document.querySelectorAll('.cell');
const status = document.querySelector('.status p');
const restartBtn = document.querySelector('.restart-btn');
let currentPlayer = 'X';
let gameActive = true;
let gameBoard = ['', '', '', '', '', '', '', '', ''];

const checkWinner = () => {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            setTimeout(() => {
                alert(`${gameBoard[a]} wins!`);
                gameActive = false;
            }, 200);
            return;
        }
    }

    if (!gameBoard.includes('')) {
        setTimeout(() => {
            alert('It\'s a draw!');
            gameActive = false;
        }, 200);
    }
};

const handleCellClick = (e) => {
    const index = e.target.getAttribute('data-index');

    if (gameBoard[index] || !gameActive) return;

    gameBoard[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.style.fontSize = '3rem';
    
    checkWinner();

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
};

const restartGame = () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;

    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.fontSize = '2.5rem';
    });
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
