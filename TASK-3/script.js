const cells = document.querySelectorAll('[data-cell]');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let gameActive = true;
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

restartButton.addEventListener('click', restartGame);

function handleClick(e) {
    const cell = e.target;
    if (!gameActive || cell.textContent) return;

    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    if (checkWin(currentPlayer)) {
        messageElement.textContent = `${currentPlayer} wins!`;
        gameActive = false;
    } else if (isDraw()) {
        messageElement.textContent = 'Draw!';
        gameActive = false;
    } else {
        swapTurns();
    }
}

function swapTurns() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    messageElement.textContent = `${currentPlayer}'s turn`;
    messageElement.classList.add('turn');
}

function checkWin(player) {
    let win = false;
    WINNING_COMBINATIONS.forEach(combination => {
        if (combination.every(index => cells[index].textContent === player)) {
            win = true;
            combination.forEach(index => cells[index].style.animation = 'winAnimation 1s alternate infinite');
        }
    });
    return win;
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.textContent === 'X' || cell.textContent === 'O';
    });
}

function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    messageElement.textContent = `${currentPlayer}'s turn`;
    messageElement.classList.remove('turn');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
        cell.style.animation = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
}
