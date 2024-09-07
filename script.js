// Dastlabki tosh joylashuvlarini saqlash
const initialPositions = {
    X: [ [0, 0], [0, 1], [0, 2] ],
    O: [ [2, 0], [2, 1], [2, 2] ]
};

// O'yinchi navbati (X yoki O)
let currentPlayer = 'X';

// O'yin taxtasi (3x3 bo'sh kataklar)
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

// O'yin tugaganmi
let gameOver = false;

// Toshlarning dastlabki holatini tekshirish funksiyasi
function isInInitialPosition(player, row, col) {
    const positions = initialPositions[player];
    return positions.some(([r, c]) => r === row && c === col);
}

// O'yinni boshlash funksiyasi
function startGame() {
    currentPlayer = 'X'; // Birinchi bo'lib X o'ynaydi
    board = [
        ['X', 'X', 'X'],
        ['', '', ''],
        ['O', 'O', 'O']
    ];
    gameOver = false;
    renderBoard();
}

// Yutish holatini tekshirish
function checkForWin() {
    const winConditions = [
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ];

    for (let condition of winConditions) {
        const [a, b, c] = condition;
        const valueA = board[a[0]][a[1]];
        const valueB = board[b[0]][b[1]];
        const valueC = board[c[0]][c[1]];

        // Agar barcha toshlar bir xil bo'lsa va toshlar o'zining dastlabki o'rnida bo'lmasa
        if (valueA && valueA === valueB && valueA === valueC) {
            if (!isInInitialPosition(valueA, a[0], a[1]) &&
                !isInInitialPosition(valueB, b[0], b[1]) &&
                !isInInitialPosition(valueC, c[0], c[1])) {
                return valueA; // Yutgan o'yinchi qaytariladi (X yoki O)
            }
        }
    }
    return null; // Hozircha hech kim yutmadi
}

// Navbatni almashtirish
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Katakka bosilganda
function handleCellClick(row, col) {
    if (gameOver || board[row][col]) {
        return; // Agar o'yin tugagan bo'lsa yoki katak to'lgan bo'lsa
    }

    board[row][col] = currentPlayer; // Hozirgi o'yinchining toshini joylashtirish
    renderBoard(); // Taxtani qayta chizish

    // Yutish holatini tekshirish
    const winner = checkForWin();
    if (winner) {
        alert(`${winner} yutdi!`);
        gameOver = true; // O'yinni tugatish
        return;
    }

    // Navbatni almashtirish
    switchPlayer();
}

// Taxtani ekranga chizish
function renderBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = board[row][col];
            cell.addEventListener('click', () => handleCellClick(row, col));
            boardElement.appendChild(cell);
        }
    }
}

// O'yinni boshlash uchun tugmani bosganda
document.getElementById('restartButton').addEventListener('click', startGame);

// O'yinni boshlash
startGame();
