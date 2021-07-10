const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d");

const ICON_SIZE = 524;

const FLAPPY_SPEED = 24;
const FLAPPY_SIZE = 24;

const PIPE_WIDTH = 24;

const CANVAS_SIZE = 400;
const GRAVITY = 0.5;

let topScore = 0;
let score = 0;

let birdX = 0;
let birdY = 200;
let birdDeltaYSpeed  = 0;

let pipeX = 400;
let pipeGap = 200;
let pipeTopLength = 24;

const bird = new Image();
bird.src = "bird.png"

canvas.onclick = () => birdDeltaYSpeed = 9; 

const drawBird = () => {
    context.fillStyle = "skyblue";
    context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    birdY -= birdDeltaYSpeed -= GRAVITY;
    context.drawImage(bird, birdX, birdY, FLAPPY_SIZE * (ICON_SIZE/374), FLAPPY_SIZE);
    
}

const handleGame = () => {
    const hasBirdFallenOffScreen = birdY > CANVAS_SIZE;
    const hasBirdHitPipeHeight = birdY < pipeTopLength || birdY > pipeTopLength + pipeGap;
    const hasBirdHitPipeLength = pipeX < FLAPPY_SIZE * (ICON_SIZE/374)

    if(hasBirdFallenOffScreen ||  (hasBirdHitPipeHeight && hasBirdHitPipeLength)) {
        birdDeltaYSpeed = 0; 
        birdY = 200; 
        pipeX = CANVAS_SIZE;
        score = 0;
    }
}

const handlePipe = () => {
    context.fillStyle = 'green';
    pipeX -= 8;

    const pipeOffScreen = pipeX < -PIPE_WIDTH; 
    if (pipeOffScreen) {
        pipeX = CANVAS_SIZE;
        pipeTopLength = pipeGap * Math.random();
    }

    context.fillRect(pipeX, 0, PIPE_WIDTH, pipeTopLength);
    context.fillRect(pipeX, pipeTopLength + pipeGap, PIPE_WIDTH, CANVAS_SIZE);
}

const handleScore = () => {
    context.fillStyle = "black";
    context.fillText(score++, 9, 25); 
    topScore = topScore < score ? score : topScore; 
    context.fillText(`Best: ${topScore}`, 9, 50);
}

setInterval(() => {
    drawBird();
    handlePipe();
    handleScore();
    handleGame();
}, FLAPPY_SPEED);