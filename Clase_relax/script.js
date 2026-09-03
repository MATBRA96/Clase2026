const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let score = 0;
let gameInterval;
let gameStarted = false;

function drawGame() {
    moveSnake();

    if (checkGameOver()) {
        alert("¡Juego Terminado! Puntuación final: " + score);
        resetGame();
        return;
    }

    clearCanvas();
    drawFood();
    drawSnake();
}

function clearCanvas() {
    ctx.fillStyle = "#181825";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = "#a6e3a1";
    snake.forEach((part, index) => {
        // La cabeza es ligeramente más oscura
        if (index === 0) ctx.fillStyle = "#94e2d5";
        else ctx.fillStyle = "#a6e3a1";

        ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 2, gridSize - 2);
    });
}

function drawFood() {
    ctx.fillStyle = "#f38ba8";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

function moveSnake() {
    if (!gameStarted) return;

    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    // Comprobar si come la manzana
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.innerText = score;
        generateFood();
    } else {
        snake.pop();
    }
}

function generateFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);

    // Evitar que la comida aparezca sobre la serpiente
    snake.forEach(part => {
        if (part.x === food.x && part.y === food.y) {
            generateFood();
        }
    });
}

function checkGameOver() {
    if (!gameStarted) return false;

    const head = snake[0];

    // Colisión con paredes
    const hitLeftWall = head.x < 0;
    const hitRightWall = head.x >= tileCount;
    const hitToptWall = head.y < 0;
    const hitBottomWall = head.y >= tileCount;

    if (hitLeftWall || hitRightWall || hitToptWall || hitBottomWall) {
        return true;
    }

    // Colisión consigo misma
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    dx = 0;
    dy = 0;
    score = 0;
    gameStarted = false;
    scoreElement.innerText = score;
    generateFood();
    clearCanvas();
    drawFood();
    drawSnake();
}

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    const keyPressed = event.keyCode;
    const LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;

    const goingUp = dy === -1;
    const goingDown = dy === 1;
    const goingRight = dx === 1;
    const goingLeft = dx === -1;

    if (keyPressed === LEFT && !goingRight) {
        dx = -1; dy = 0; gameStarted = true;
    }
    if (keyPressed === UP && !goingDown) {
        dx = 0; dy = -1; gameStarted = true;
    }
    if (keyPressed === RIGHT && !goingLeft) {
        dx = 1; dy = 0; gameStarted = true;
    }
    if (keyPressed === DOWN && !goingUp) {
        dx = 0; dy = 1; gameStarted = true;
    }
}

// Bucle principal del juego (actualiza cada 100ms)
setInterval(drawGame, 100);
generateFood();