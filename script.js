document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const restartButton = document.getElementById('restart-button');

    let currentPlayer = 'player1';
    let boardState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(e) {
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (boardState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        boardState[clickedCellIndex] = currentPlayer;
        clickedCell.classList.add(currentPlayer);

        checkResult();
    }

    function checkResult() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            const a = boardState[winCondition[0]];
            const b = boardState[winCondition[1]];
            const c = boardState[winCondition[2]];

            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            status.textContent = `${currentPlayer === 'player1' ? 'Maçã' : 'Uva'} Venceu!`;
            gameActive = false;
            return;
        }

        let roundDraw = !boardState.includes('');
        if (roundDraw) {
            status.textContent = 'Empate!';
            gameActive = false;
            return;
        }

        changePlayer();
    }

    function changePlayer() {
        currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
        status.textContent = `Vez de ${currentPlayer === 'player1' ? 'Maçã' : 'Uva'}`;
    }

    function restartGame() {
        currentPlayer = 'player1';
        boardState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        status.textContent = `Vez de Maçã`;
        cells.forEach(cell => {
            cell.classList.remove('player1', 'player2');
        });
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);

    // Inicializa o jogo
    status.textContent = `Vez de Maçã`;
});