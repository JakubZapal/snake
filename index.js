const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let direction = 'right'
const x = 50;
const y = 50;
const size = 10;
const currentPosition = [x, y];
let foodCoords = []
let snakeLength = 3;
let snakeBody = [];

makeFoodItem();
MainLoop.setMaxAllowedFPS(30).setDraw(move).start();

document.addEventListener("keydown", (e) => {
    switch (e.code) {
        case 'KeyW':
            if (direction != 'down') {
                direction = 'up'
            }
            break;

        case 'KeyS':
            if (direction != 'up') {
                direction = 'down'
            }
            break;
            
        case 'KeyA':
            if (direction != 'right'){
                direction = 'left'
            }
            break;

        case 'KeyD':
            if (direction != 'left'){
                direction = 'right'
            }
            break;
    }
})

function draw() {
    if (snakeBody.some(hasEatenItself)) {
        gameOver();
        return;
    }
    snakeBody.push([currentPosition[0], currentPosition[1]]);
    ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillRect(currentPosition[0], currentPosition[1], size, size);
    if (snakeBody.length > snakeLength) {
        const itemToRemove = snakeBody.shift();
        ctx.clearRect(itemToRemove[0], itemToRemove[1], size, size);
    }
    if (currentPosition[0] == foodCoords[0] && currentPosition[1] == foodCoords[1]) {
        makeFoodItem();
        snakeLength++;
    }
}

function hasEatenItself(element, index, array) {
    return (element[0] == currentPosition[0] && element[1] == currentPosition[1]);
}

function move() {
    switch (direction) {
        case 'up':
            moveUp()
            break;
        case 'down':
            moveDown()
            break;
        case 'left':
            moveLeft()            
            break;
        case 'right':
            moveRight()
            break;
    }
}
function moveUp(){
    if (up() >= 0) {
        executeMove('up', 1, currentPosition[1] - size);
    }
    else {
        gameOver()
    }
}

function moveDown(){
    if (down() < canvas.height) {
        executeMove('down', 1, currentPosition[1] + size);
    }
    else {
        gameOver()
    }
}

function moveLeft(){
    if (left() >= 0) {
        executeMove('left', 0, currentPosition[0] - size);
    }
    else {
        gameOver()
    }
}

function moveRight(){
    if (right() < canvas.width) {
        executeMove('right', 0, right());
    }
    else {
        gameOver()
    }
}

function executeMove(dir, axis, value) {
    direction = dir;
    currentPosition[axis] = value;
    draw();
}

function left(){
    return currentPosition[0] - size;
}
    
function right(){
    return currentPosition[0] + size;
}
    
function up(){
    return currentPosition[1] - size;
}
    
function down(){
    return currentPosition[1] + size;
}

function makeFoodItem(){
    foodCoords = [Math.floor(Math.random()*(canvas.width/size))*size, Math.floor(Math.random()*(canvas.height/size))*size];
    if (snakeBody.some(hasPoint)) {
        makeFoodItem();
    } else {
        ctx.fillStyle = "rgb(10,100,0)";
        ctx.fillRect(foodCoords[0], foodCoords[1], size, size);
    };
}
  
function hasPoint(element, index, array) {
    return (element[0] == foodCoords[0] && element[1] == foodCoords[1]);
}

function gameOver() {
    const score = snakeLength - 3;
    MainLoop.stop();
    snakeBody = [];
    snakeLength = 3;
    if(confirm("koniec gry lol, twoj wynik: " + score)) {
        location.reload();
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
