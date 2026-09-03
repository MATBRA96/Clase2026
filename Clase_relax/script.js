const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");

const gridSize = 20;
const canvasSize = 400;

canvas.width = canvasSize;
canvas.height = canvasSize;

const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };

let dx = 0;
let dy = 0;

let score = 0;
let gameStarted = false;

function drawGame() {

    if (gameStarted) {
        moveSnake();

        if (checkGameOver()) {
            alert("¡Juego terminado! Puntuación final: " + score);
            resetGame();
            return;
        }
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

    snake.forEach((part, index) => {

        if (index === 0) {
            ctx.fillStyle = "#94e2d5";
        } 
        else {
            ctx.fillStyle = "#a6e3a1";
        }

        ctx.fillRect(
            part.x * gridSize,
            part.y * gridSize,
            gridSize - 2,
            gridSize - 2
        );
    });
}

function drawFood() {

    ctx.fillStyle = "#f38ba8";

    ctx.fillRect(
        food.x * gridSize,
        food.y * gridSize,
        gridSize - 2,
        gridSize - 2
    );
}

function moveSnake() {
    const head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    };

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = score;
        generateFood();

    } else {
        snake.pop();
    }
}

function generateFood() {

    let newFood;

    do {

        newFood = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };

    } while (
        snake.some(
            part =>
                part.x === newFood.x &&
                part.y === newFood.y
        )
    );

    food = newFood;
}

function checkGameOver() {

    const head = snake[0];

    const hitLeftWall = head.x < 0;
    const hitRightWall = head.x >= tileCount;
    const hitTopWall = head.y < 0;
    const hitBottomWall = head.y >= tileCount;

    if (
        hitLeftWall ||
        hitRightWall ||
        hitTopWall ||
        hitBottomWall
    ) {
        return true;
    }

    for (let i = 1; i < snake.length; i++) {

        if (
            head.x === snake[i].x &&
            head.y === snake[i].y
        ) {
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

    scoreElement.textContent = score;

    generateFood();

    clearCanvas();
    drawFood();
    drawSnake();
}

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {

    const keyPressed = event.key;

    const goingUp = dy === -1;
    const goingDown = dy === 1;
    const goingRight = dx === 1;
    const goingLeft = dx === -1;

    if (keyPressed === "ArrowLeft" && !goingRight) {

        dx = -1;
        dy = 0;
        gameStarted = true;
    }

    if (keyPressed === "ArrowUp" && !goingDown) {

        dx = 0;
        dy = -1;
        gameStarted = true;
    }

    if (keyPressed === "ArrowRight" && !goingLeft) {

        dx = 1;
        dy = 0;
        gameStarted = true;
    }

    if (keyPressed === "ArrowDown" && !goingUp) {

        dx = 0;
        dy = 1;
        gameStarted = true;
    }
}

generateFood();
drawGame();

setInterval(drawGame, 100);