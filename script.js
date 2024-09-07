const gameBoard = document.getElementById('gameBoard');
const resetButton = document.getElementById('resetButton');
const playerSelection = document.getElementById('playerSelection');
let selectedStone = null;
let currentPlayer = null;
let gameActive = false; // O'yin faoliyatini boshqaruvchi o'zgaruvchi
let winningLine = []; // Yutgan chiziq uchun
let gameOverMessage = ''; // O'yin tugaganda ko'rsatiladigan xabar

// Dastlabki toshlarning joylashuvi
let board = [
    ['X', 'X', 'X'],
    ['', '', ''],
    ['O', 'O', 'O'],
];

// Dastlabki toshlar joylashuvini saqlash uchun
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

            // Tanlangan toshni rangini o'zgartirish
            if (selectedStone && selectedStone.row === rowIndex && selectedStone.col === colIndex) {
                cellDiv.classList.add('selected'); // Tanlangan tosh uchun klass
            }

            // Yutgan toshlarning rangini o'zgartirish
            if (winningLine.some(([x, y]) => x === rowIndex && y === colIndex)) {
                cellDiv.classList.add('winning'); // Yutgan tosh uchun klass
                cellDiv.style.color = 'red'; // Rangini qizilga o'zgartirish
            }

            cellDiv.addEventListener('click', () => handleCellClick(rowIndex, colIndex));

            gameBoard.appendChild(cellDiv);
        });
    });

    // Agar o'yin tugagan bo'lsa, xabarni ko'rsatish
    if (gameOverMessage) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = gameOverMessage;
        messageDiv.classList.add('message'); // Xabar uchun klass
        gameBoard.appendChild(messageDiv);
    }

    // Qayta tiklash tugmasini ko'rsatish faqat o'yin tugaganda
    resetButton.style.display = gameActive ? 'none' : 'block'; // O'yin davomida yashirish
}

// O'yinchini tanlash
function selectPlayer(player) {
    currentPlayer = player;
    selectedStone = null;
    gameActive = true; // O'yin faoliyatini yoqish
    playerSelection.style.display = 'none'; // Tanlashni yashirish
    renderBoard(); // O'yin taxtasini ko'rsatish
}

// Katakka bosilganda
function handleCellClick(row, col) {
    if (!gameActive) return; // Agar o'yin tugagan bo'lsa, hech narsa qilmang

    if (selectedStone === null) {
        if (board[row][col] === currentPlayer) {
            selectedStone = { row, col };
            renderBoard(); // Tanlangan toshni ko'rsatish
        }
    } else {
        // Tanlangan toshni bekor qilish
        if (selectedStone.row === row && selectedStone.col === col) {
            selectedStone = null; // Tanlangan toshni tozalang
            renderBoard(); // Yangilangan taxtani ko'rsatish
            return;
        }

        // Atrofdagi kataklarni tekshirish
        if (isAdjacent(selectedStone.row, selectedStone.col, row, col) && board[row][col] === '') {
            // Tanlangan toshni ko'chirish
            board[row][col] = currentPlayer;
            board[selectedStone.row][selectedStone.col] = '';

            // Tanlangan tosh dastlabki joyiga qaytganini tekshirish
            const isBackToInitialPosition = initialBoard[selectedStone.row][selectedStone.col] === currentPlayer;

            // Yutishni tekshirish va tosh dastlabki joyiga qaytgan bo'lsa yutishni bekor qilish
            if (checkWin(currentPlayer) && !isBackToInitialPosition) {
                gameActive = false; // O'yin tugadi
                gameOverMessage = `${currentPlayer} yutdi!`; // O'yin tugashi xabari
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Navbatni o'zgartirish
            }

            selectedStone = null; // Tanlangan toshni tozalang
            renderBoard(); // Yangilangan taxtani ko'rsatish
        }
    }
}

// Atrofdagi kataklarni tekshirish (burchaklar ham kiradi)
function isAdjacent(row1, col1, row2, col2) {
    const rowDiff = Math.abs(row1 - row2);
    const colDiff = Math.abs(col1 - col2);
    return (rowDiff <= 1 && colDiff <= 1); // Burchaklarni va qo'shni xonalarni tekshirish
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
        [[0, 0], [1, 1], [2, 2]], // Chapdan o'ngga
        [[0, 2], [1, 1], [2, 0]], // O'ngdan chapga
    ];

    for (const pattern of winPatterns) {
        if (pattern.every(([x, y]) => board[x][y] === player)) {
            winningLine = pattern; // Yutgan chiziqni saqlash
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
    currentPlayer = null; // O'yinchi tanlanmagan
    selectedStone = null;
    gameActive = false; // O'yin faoliyatini o'chirish
    winningLine = []; // Yutgan chiziqni tozalash
    gameOverMessage = ''; // Xabarni tozalash
    playerSelection.style.display = 'block'; // Tanlashni ko'rsatish
    renderBoard();
}

// O'yin boshlanishi
renderBoard();

// Qayta tiklash tugmasi
resetButton.addEventListener('click', resetGame);

// O'yinchilarni tanlash tugmalari
document.getElementById('selectX').addEventListener('click', () => selectPlayer('X'));
document.getElementById('selectO').addEventListener('click', () => selectPlayer('O'));
