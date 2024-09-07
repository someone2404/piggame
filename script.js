const gameBoard = document.getElementById('gameBoard');
const resetButton = document.getElementById('resetButton');
const playerSelection = document.getElementById('playerSelection');
let selectedStone = null;
let currentPlayer = null;
let gameActive = false;
let winningLine = [];
let gameOverMessage = '';

// Dastlabki toshlarning joylashuvi
let board = [
    ['X', 'X', 'X'],
    ['', '', ''],
    ['O', 'O', 'O'],
];

// Dastlabki pozitsiyalarni saqlash
let initialBoard = [
    ['X', 'X', 'X'],
    ['', '', ''],
    ['O', 'O', 'O'],
];

// O'yin taxtasini ko'rsatish
function renderBoard() {
    gameBoard.innerHTML = '';
    board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            cellDiv.textContent = cell;

            if (selectedStone && selectedStone.row === rowIndex && selectedStone.col === colIndex) {
                cellDiv.classList.add('selected');
            }

            if (winningLine.some(([x, y]) => x === rowIndex && y === colIndex)) {
                cellDiv.classList.add('winning');
                cellDiv.style.color = 'red';
            }

            cellDiv.addEventListener('click', () => handleCellClick(rowIndex, colIndex));
            gameBoard.appendChild(cellDiv);
        });
    });

    if (gameOverMessage) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = gameOverMessage;
        messageDiv.classList.add('message');
        gameBoard.appendChild(messageDiv);
    }

    resetButton.style.display = gameActive ? 'none' : 'block';
}

// O'yinchini tanlash
function selectPlayer(player) {
    currentPlayer = player;
    selectedStone = null;
    gameActive = true;
    playerSelection.style.display = 'none';
    renderBoard();
}

// Katakka bosilganda
function handleCellClick(row, col) {
    if (!gameActive) return;

    if (selectedStone === null) {
        if (board[row][col] === currentPlayer) {
            selectedStone = { row, col };
            renderBoard();
        }
    } else {
        // Tanlangan toshni bekor qilish
        if (selectedStone.row === row && selectedStone.col === col) {
            selectedStone = null;
            renderBoard();
            return;
        }

        // Faqat bo'sh katakka ko'chirishga ruxsat berish
        if (isAdjacent(selectedStone.row, selectedStone.col, row, col) && board[row][col] === '') {
            // Tanlangan toshni ko'chirish
            board[row][col] = currentPlayer;
            board[selectedStone.row][selectedStone.col] = '';

            // Tanlangan tosh dastlabki joyiga qaytganini tekshirish
            const isBackToInitialPosition = initialBoard[selectedStone.row][selectedStone.col] === currentPlayer;

            // Faqat tosh boshqa joyga ko'chirilgan bo'lsa yutishni tekshirish
            if (checkWin(currentPlayer) && !isBackToInitialPosition && (selectedStone.row !== row || selectedStone.col !== col)) {
                gameActive = false;
                gameOverMessage = `${currentPlayer} yutdi!`;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }

            selectedStone = null;
            renderBoard();
        }
    }
}

// Atrofdagi kataklarni tekshirish
function isAdjacent(row1, col1, row2, col2) {
    const rowDiff = Math.abs(row1 - row2);
    const colDiff = Math.abs(col1 - col2);
    return (rowDiff <= 1 && colDiff <= 1);
}

// Yutishni tekshirish
function checkWin(player) {
    const winPatterns = [
        [[0, 0], [0, 1], [0, 2]], // 1-qator
        [[1, 0], [1, 1], [1, 2]], // 2-qator
        [[2, 0], [2, 1], [2, 2]], // 3-qator
        [[0, 0], [1, 0], [2, 0]], // 1-stun
        [[0, 1], [1, 1], [2, 1]], // 2-stun
        [[0, 2], [1, 2], [2, 2]], // 3-stun
        [[0, 0], [1, 1], [2, 2]], // Diagonal 1
        [[0, 2], [1, 1], [2, 0]], // Diagonal 2
    ];

    for (const pattern of winPatterns) {
        if (pattern.every(([x, y]) => board[x][y] === player)) {
            winningLine = pattern;
            return true;
        }
    }
    return false;
}

// O'yinni qayta tiklash
function resetGame() {
    board = [
        ['X', 'X', 'X'],
        ['', '', ''],
        ['O', 'O', 'O'],
    ];
    currentPlayer = null;
    selectedStone = null;
    gameActive = false;
    winningLine = [];
    gameOverMessage = '';
    playerSelection.style.display = 'block';
    renderBoard();
}

// O'yin boshlanishi
renderBoard();

// Qayta tiklash tugmasi
resetButton.addEventListener('click', resetGame);

// O'yinchilarni tanlash tugmalari
document.getElementById('selectX').addEventListener('click', () => selectPlayer('X'));
document.getElementById('selectO').addEventListener('click', () => selectPlayer('O'));
