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
       
