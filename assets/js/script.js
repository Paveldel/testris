"use strict";

const I = 0;
const T = 1;
const O = 2;
const L = 3;
const J = 4;
const S = 5;
const Z = 6;

const SPAWN_HEIGHT = 20;

const FOUR_CORNERS = [
    [[0, 0], [1, 2], [-2, 1], [3, 1]],
    [[1, 1], [-1, 1], [1, -1], [-1, -1]],
    [],
    [[-1, 1], [0, 1], [1, -1], [-1, -1]],
    [[1, 1], [0, 1], [1, -1], [-1, -1]],
    [[-1, 1], [1, 0], [-2, 0], [2, 1]],
    [[1, 1], [-1, 0], [2, 0], [-2, 1]],
];

const FOUR_WIDE_RESIDUAL = [
    [],
    [[3, 0]],
    [[3, 0], [3, 1]],
    [[3, 0], [3, 1], [4, 1]],
    [[3, 0], [3, 1], [4, 1], [5, 0]],
    [[3, 0], [3, 1], [4, 1], [5, 0], [6, 0]],
    [[3, 0], [3, 1], [4, 1], [5, 0], [6, 0], [6, 1]],
];

const damagePerClear = [0, 0, 1, 2];

const TETROMINO_PIECE_I = [[0, 1], [-1, 1], [1, 1], [2, 1]];
const TETROMINO_PIECE_T = [[0, 0], [-1, 0], [1, 0], [0, 1]];
const TETROMINO_PIECE_O = [[0, 0], [1, 0], [0, 1], [1, 1]];
const TETROMINO_PIECE_L = [[0, 0], [-1, 0], [1, 0], [1, 1]];
const TETROMINO_PIECE_J = [[0, 0], [-1, 0], [1, 0], [-1, 1]];
const TETROMINO_PIECE_S = [[0, 0], [-1, 0], [0, 1], [1, 1]];
const TETROMINO_PIECE_Z = [[0, 0], [1, 0], [0, 1], [-1, 1]];

const TETROMINOS = [TETROMINO_PIECE_I, TETROMINO_PIECE_T, TETROMINO_PIECE_O, TETROMINO_PIECE_L, TETROMINO_PIECE_J, TETROMINO_PIECE_S, TETROMINO_PIECE_Z];

const rotationIndexLookup = [
    [0, 8, 7],
    [2, 9, 1],
    [4, 10, 3],
    [6, 11, 5]
];

const TABLE_INDEX = [1, 0, 1, 0, 0, 0, 0];

const TLJSZ_KICK_TABLE= [
    [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
    [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
    [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
    [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
    [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
    [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
    [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
    [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
    [[0, 0], [0, 1], [1, 1], [-1, 1], [1, 0], [-1, 0]],
    [[0, 0], [1, 0], [1, 2], [1, 1], [0, 2], [0, 1]],
    [[0, 0], [0, -1], [-1, -1], [1, -1], [-1, 0], [1, 0]],
    [[0, 0], [-1, 0], [-1, 2], [-1, 1], [0, 2], [0, 1]]

];

const IO_KICK_TABLE= [
    [[0, 0], [-2, 0], [1, 0], [-2, -1], [1, 2]],
    [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2]],
    [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2]],
    [[0, 0], [-2, 0], [1, 0], [-2, -1], [1, 2]],
    [[0, 0], [2, 0], [-1, 0], [2, -1], [-1, 2]],
    [[0, 0], [-2, 0], [1, 0], [-2, 1], [1, -2]],
    [[0, 0], [-2, 0], [1, 0], [-2, 1], [1, -2]],
    [[0, 0], [2, 0], [-1, 0], [2, -1], [-1, 2]],
    [[0, 0], [0, 1], [1, 1], [-1, 1], [1, 0], [-1, 0]],
    [[0, 0], [1, 0], [1, 2], [1, 1], [0, 2], [0, 1]],
    [[0, 0], [0, -1], [-1, -1], [1, -1], [-1, 0], [1, 0]],
    [[0, 0], [-1, 0], [-1, 2], [-1, 1], [0, 2], [0, 1]]
];

const KICK_TABLE_BY_INDEX = [TLJSZ_KICK_TABLE, IO_KICK_TABLE]; // data for pieces


const TETROMINO_OBJECTS = [
    {
        blocks: TETROMINOS[I],
        rotIdx: 0,
        position: [4, SPAWN_HEIGHT],
        kickTable: TABLE_INDEX[I],
        pieceIndex: I
    },
    {
        blocks: TETROMINOS[T],
        rotIdx: 0,
        position: [4, SPAWN_HEIGHT],
        kickTable: TABLE_INDEX[T],
        pieceIndex: T
    },
    {
        blocks: TETROMINOS[O],
        rotIdx: 0,
        position: [4, SPAWN_HEIGHT],
        kickTable: TABLE_INDEX[O],
        pieceIndex: O
    },
    {
        blocks: TETROMINOS[L],
        rotIdx: 0,
        position: [4, SPAWN_HEIGHT],
        kickTable: TABLE_INDEX[L],
        pieceIndex: L
    },
    {
        blocks: TETROMINOS[J],
        rotIdx: 0,
        position: [4, SPAWN_HEIGHT],
        kickTable: TABLE_INDEX[J],
        pieceIndex: J
    },
    {
        blocks: TETROMINOS[S],
        rotIdx: 0,
        position: [4, SPAWN_HEIGHT],
        kickTable: TABLE_INDEX[S],
        pieceIndex: S
    },
    {
        blocks: TETROMINOS[Z],
        rotIdx: 0,
        position: [4, SPAWN_HEIGHT],
        kickTable: TABLE_INDEX[Z],
        pieceIndex: Z
    },
];

let lastActionRotation;
let lastKickIndex;

let nextWave = null;

let totalSpike;
let spikeTimer;
const MAX_SPIKE_DISTANCE = 1000;

let sentDamage;
let damageQueue;
let combo;
let B2B;
let currentWell;
const MAX_DAMAGE_RECEIVED = 20;

let start;
let totalLines;
let totalPieces;
let totalDamage;

let gameOver = true;
let activePiece;
let allowHold;
let holdPiece;
let board;
let queue;

let countDown = 1000;
let startTimer = null;
let goLeft = false;
let goRight = false;
let softDrop = false;

let gravity = 750;
let stepTimer = null;
let lockResets;
let grounded;
let resetGrounded;
let lockTimer;
const MAX_LOCK_RESETS = 10;
const LOCK_DELAY = 1000;
let lockStep = false;

let dasLeftTimer = null;
let dasRightTimer = null;
let arrLeftTimer = null;
let arrRightTimer = null;
let softDropTimer = null; // variables for midGame


let gridElements = [];
let $victory;
let $time;
let $PPS;
let $attack;
let $efficiency;
let $damageBar;
let $messageBlock;
let $hold;
let lastTimeStamp;
let currentAudio;
const LINE_CLEAR_SFX = ["assets/sfx/single.wav", "assets/sfx/double.wav", "assets/sfx/triple.wav"];
const MESSAGE_DURATION = 1000;
const messageTimers = [];

const SKIN = 1;
const previews = [
    ["assets/media/jstris/previews/IPiece.png", "assets/media/jstris/previews/TPiece.png", "assets/media/jstris/previews/OPiece.png", "assets/media/jstris/previews/LPiece.png", "assets/media/jstris/previews/JPiece.png", "assets/media/jstris/previews/SPiece.png", "assets/media/jstris/previews/ZPiece.png", "assets/media/jstris/previews/IPieceDisabled.png", "assets/media/jstris/previews/TPieceDisabled.png", "assets/media/jstris/previews/OPieceDisabled.png", "assets/media/jstris/previews/LPieceDisabled.png", "assets/media/jstris/previews/JPieceDisabled.png", "assets/media/jstris/previews/SPieceDisabled.png", "assets/media/jstris/previews/ZPieceDisabled.png"],
    ["assets/media/tetris99/previews/IPiece.png", "assets/media/tetris99/previews/TPiece.png", "assets/media/tetris99/previews/OPiece.png", "assets/media/tetris99/previews/LPiece.png", "assets/media/tetris99/previews/JPiece.png", "assets/media/tetris99/previews/SPiece.png", "assets/media/tetris99/previews/ZPiece.png", "assets/media/tetris99/previews/IPieceDisabled.png", "assets/media/tetris99/previews/TPieceDisabled.png", "assets/media/tetris99/previews/OPieceDisabled.png", "assets/media/tetris99/previews/LPieceDisabled.png", "assets/media/tetris99/previews/JPieceDisabled.png", "assets/media/tetris99/previews/SPieceDisabled.png", "assets/media/tetris99/previews/ZPieceDisabled.png"],
];

const blocks = [
    ["assets/media/jstris/blocks/Grid.png", "assets/media/jstris/blocks/I.png", "assets/media/jstris/blocks/T.png", "assets/media/jstris/blocks/O.png", "assets/media/jstris/blocks/L.png", "assets/media/jstris/blocks/J.png", "assets/media/jstris/blocks/S.png", "assets/media/jstris/blocks/Z.png", "assets/media/jstris/blocks/Garbage.png", "assets/media/jstris/blocks/ShadowI.png", "assets/media/jstris/blocks/ShadowT.png", "assets/media/jstris/blocks/ShadowO.png", "assets/media/jstris/blocks/ShadowL.png", "assets/media/jstris/blocks/ShadowJ.png", "assets/media/jstris/blocks/ShadowS.png", "assets/media/jstris/blocks/ShadowZ.png"],
    ["assets/media/tetris99/blocks/Grid.png", "assets/media/tetris99/blocks/I.png", "assets/media/tetris99/blocks/T.png", "assets/media/tetris99/blocks/O.png", "assets/media/tetris99/blocks/L.png", "assets/media/tetris99/blocks/J.png", "assets/media/tetris99/blocks/S.png", "assets/media/tetris99/blocks/Z.png", "assets/media/tetris99/blocks/Garbage.png", "assets/media/tetris99/blocks/ShadowI.png", "assets/media/tetris99/blocks/ShadowT.png", "assets/media/tetris99/blocks/ShadowO.png", "assets/media/tetris99/blocks/ShadowL.png", "assets/media/tetris99/blocks/ShadowJ.png", "assets/media/tetris99/blocks/ShadowS.png", "assets/media/tetris99/blocks/ShadowZ.png"]
];

const color = ["#000000", "#0f9bd7", "#af298a", "#e39f02", "#e35b02", "#2141c6", "#59b101", "#d70f37", "#888888", "#074D6B", "#561445", "#724E01", "#722C01", "#102163", "#2D5900", "#6B071B"]; // settings for renderer

const DAS = 70;
const ARR = 0;
const SDF = 0;
const DCD = 16;

const SOUND = false;

const RESET_KEY = "u";
const ROTATE_CLOCKWISE_KEY = "r";
const ROTATE_180_KEY = "e";
const ROTATE_ANTI_CLOCKWISE_KEY = "z";
const HARD_DROP_KEY = " ";
const SOFT_DROP_KEY = "2";
const HOLD_KEY = "5";
const LEFT_KEY = "1";
const RIGHT_KEY = "3";  // player settings

document.addEventListener("DOMContentLoaded", init);

function fillMatrix() {
    for (let i = 0; i < 200; i++) {
        const $matrix = document.querySelector('.matrix');
        $matrix.insertAdjacentHTML("beforeend", "<div class='block'> </div>");
    }
}

function findHTMLElements() {
    $damageBar = document.querySelector(".damageQueued");
    $victory = document.querySelector(".linesLeft");
    $time = document.querySelector("footer li:nth-child(1) p");
    $PPS = document.querySelector("footer li:nth-child(2) p");
    $attack = document.querySelector("footer li:nth-child(3) p");
    $efficiency = document.querySelector("footer li:nth-child(4) p");
    $messageBlock = document.querySelector(".messages");
    $hold = document.querySelector(".holdPreview");
}

function init() {
    if (!gameOver) {
        gameModes();
    }
    findHTMLElements();
    fillMatrix();
    fillGridWithElements();
    reset();
    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased);
}

function update(timestamp) {
    fillQueue();

    manageStartDelay(timestamp);

    chronoMeter(timestamp);

    if (activePiece !== null && !gameOver) {
        step(timestamp);
    }

    if (activePiece === null && !gameOver) {
        nextPiece();
    }

    if (gameOver) {
        return null;
    }


    steadyDamage(5, 0.3, timestamp);

    movement(timestamp);

    updateRender(timestamp);

    window.requestAnimationFrame(update);
}

function fillGridWithElements() {
    for (let i = 0; i < 10; i++) {
        gridElements.push(new Array(40).fill(null));
        for (let j = 0; j < 40; j++) {
            gridElements[i][j] = document.querySelector(".block:nth-child(" + (1 + j * 10 + i) + ")");
        }
    }
}

function resetStats() {
    totalLines = 0;
    totalPieces = 0;
    totalDamage = 0;
}

function resetDamage() {
    combo = 0;
    B2B = 0;
    damageQueue = [];
    sentDamage = [];
    currentWell = null;
    totalSpike = 0;
}

function clearBoard() {
    board = [];
    for (let i = 0; i < 10; i++) {
        board.push(new Array(40).fill(0));
    }
}

function resetUI() {
    $hold.style.backgroundImage = "";
    startTimer = null;
    gameOver = true;
    start = null;
    $victory.innerHTML = "";
    removeAllMessages();
}

function removeAllMessages() {
    while (messageTimers.length > 0) {
        remove(messageTimers, 0);
        document.querySelector(".messages p:first-child").remove();
    }
}

function updateSpike(timeDifference) {
    spikeTimer -= timeDifference;
    if (spikeTimer <= 0) {
        totalSpike = 0;
    }
}

function updateMessageTimers(timestamp) {
    let difference = timestamp - lastTimeStamp;
    for (let i = 0; i < messageTimers.length; i++) {
        messageTimers[i] -= difference;
    }
    lastTimeStamp = timestamp;
    removeExpiredMessages();
    updateSpike(difference);
}

function removeExpiredMessages() {
    for (let i = 0; i < messageTimers.length; i++) {
        if (messageTimers[i] <= 0) {
            remove(messageTimers, i);
            document.querySelector(".messages p:last-child").remove();
        }
    }
}

function addMessage(text, color) {
    $messageBlock.insertAdjacentHTML("afterbegin", "<p style='color: " + color + "'>" + text + "</p>");
    messageTimers.push(MESSAGE_DURATION);
}

function resetGame() {
    resetDamage();
    clearBoard();
    queue = [];
    holdPiece = null;
    activePiece = null;
    allowHold = true;
}

function reset() {
    resetUI();
    resetStats();
    resetGame();
    fillQueue();
    drawPreviews();
    drawGrid();
    window.requestAnimationFrame(update);
}

function pressedRotation(event) {
    switch (event.key) {
        case ROTATE_CLOCKWISE_KEY:
            activePiece = KickRotate(activePiece, 1);
            break;
        case ROTATE_180_KEY:
            activePiece = KickRotate(activePiece, 2);
            break;
        case ROTATE_ANTI_CLOCKWISE_KEY:
            activePiece = KickRotate(activePiece, 3);
            break;
    }
}

function pressedMove(event) {
    switch (event.key) {
        case HARD_DROP_KEY:
            hardDrop();
            playSound("assets/sfx/harddrop.wav");
            break;
        case LEFT_KEY:
            activePiece = movePiece(activePiece, -1, true);
            playSound("assets/sfx/move.wav");
            goLeft = true;
            break;
        case RIGHT_KEY:
            activePiece = movePiece(activePiece, 1, true);
            playSound("assets/sfx/move.wav");
            goRight = true;
            break;
        case SOFT_DROP_KEY:
            activePiece = movePiece(activePiece, 0, true);
            playSound("assets/sfx/softdrop.wav");
            softDrop = true;
            break;
        case HOLD_KEY:
            hold();
            playSound("assets/sfx/hold.wav");
            break;
    }
}

function keyPressed(event) {
    if (event.key === RESET_KEY) {
        reset();
    }
    if (gameOver || event.repeat) {
        return;
    }
    pressedRotation(event);
    pressedMove(event);
    updateMatrix();
}

function keyReleased(event) {
    switch (event.key) {
        case LEFT_KEY:
            goLeft = false;
            break;
        case RIGHT_KEY:
            goRight = false;
            break;
        case SOFT_DROP_KEY:
            softDrop = false;
            break;
    }
}

function keepSoftDropping(timestamp) {
    while (timestamp > softDropTimer) {
        if (activePiece !== movePiece(activePiece, 0, false)) {
            activePiece = movePiece(activePiece, 0, true);
            updateMatrix();
            playSound("assets/sfx/softdrop.wav");
            softDropTimer += SDF;

        } else {
            softDropTimer = timestamp;
            break;
        }
    }
}

function handleSoftDrop(timestamp) {
    if (softDropTimer === null) {
        softDropTimer = timestamp;
    }
    keepSoftDropping(timestamp);
}

function movement(timestamp) {
    if (goLeft) {
        handleLeft(timestamp);
    } else {
        dasLeftTimer = null;
        arrLeftTimer = null;
    }
    if (goRight) {
        handleRight(timestamp);
    } else {
        dasRightTimer = null;
        arrRightTimer = null;
    }
    if (softDrop) {
        handleSoftDrop(timestamp);
    } else {
        softDropTimer = null;
    }
}

function checkLockDelay(timestamp) {
    if (grounded) {
        lockDelay(timestamp);
    } else {
        lockTimer = null;
    }
}

function step(timestamp) {
    if (stepTimer === null) {
        stepTimer = timestamp + gravity;
    }
    if (timestamp > stepTimer) {
        if (activePiece !== movePiece(activePiece, 0, false)) {
            activePiece = movePiece(activePiece, 0, true);
            updateMatrix();
            stepTimer = timestamp + gravity;
        }
    }
    checkLockDelay(timestamp);
}

function lockDelay(timestamp) {
    if (lockTimer === null || resetGrounded) {
        stepTimer = timestamp + gravity;
        lockTimer = timestamp + LOCK_DELAY;
        resetGrounded = false;
    }
    if (timestamp > lockTimer && grounded) {
        hardDrop();
        playSound("assets/sfx/lock.wav");
    }
}

function grayOutBoard() {
    for (let i = 0; i < 40; i++) {
        for (let j = 0; j < 10; j++) {
            if (board[j][i] !== 0) {
                board[j][i] = 8;
            }
        }
    }
}

function blockOut() {
    startTimer = 0;
    grayOutBoard();
    activePiece = null;
    updateMatrix();
    gameOver = true;
}

function resetLock() {
    stepTimer = null;
    lockResets = MAX_LOCK_RESETS;
    lockTimer = null;
    grounded = false;
    lockStep = false;
}

function nextPiece() {
    activePiece = copyObject(queue[0]);
    remove(queue, 0);
    if (!overlapPiece(activePiece)) {
        dead();
        return null;
    }
    updateMatrix();
    resetLock();
}

function updateMatrix() {
    drawGrid();
    drawPreviews();
}

function updateRender(timestamp) {
    updateUI(timestamp);
    updateMessageTimers(timestamp);
    drawDamage();
}

function fillStandardUI() {
    $time.innerHTML = "Time: 0.000";
    $PPS.innerHTML = "PPS: 0.00";
    $attack.innerHTML = "Attack: 0";
    $efficiency.innerHTML = "Efficiency: 0.00";
}

function updateUI(timestamp) {
    if (startTimer === 0) {
        return null;
    }
    if (!isNaN(((timestamp - start) / 1000))) {
        $time.innerHTML = "Time: " +((timestamp - start) / 1000).toFixed(3);
    }
    if (!isNaN(((timestamp - start) / 1000))) {
        $PPS.innerHTML = "PPS: " + (totalPieces / ((timestamp - start) / 1000)).toFixed(2);
    }
    $attack.innerHTML = "Attack: " + totalDamage;
    if (totalPieces !== 0) $efficiency.innerHTML = "Efficiency: " + (totalDamage / totalPieces).toFixed(2);
    if (startTimer > timestamp && gameOver) {
        fillStandardUI();
    }
}

function chronoMeter(timestamp) {
    if (start === null && !gameOver) {
        start = timestamp;
    }
}

function manageStartDelay(timestamp) {
    if (startTimer === 0) {
        return null;
    }
    if (startTimer === null) {
        startTimer = timestamp + countDown;
    }
    if (timestamp > startTimer) {
        gameOver = false;
    }
    else {
        window.requestAnimationFrame(update);
        updateRender(timestamp);
    }
}

function fillQueue() {
    if (queue.length < 10) {
        addBag();
    }
}

function drawDamage() {
    let drawDamage = (countDamage() * 5);
    if (drawDamage > 100) {
        drawDamage = 100;
    }
    $damageBar.style.height = ((drawDamage) + "%");
}

function drawBoard() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 20; j++) {
            gridElements[i][j].style.backgroundImage = "url('" + blocks[SKIN][board[i][19 - j]] + "')";
        }
    }
}

function drawShadow() {
    const shadow = deepDrop(activePiece, false);
    for (let i = 0; i < shadow.blocks.length; i++) {
        if (19 - (shadow.position[1] + shadow.blocks[i][1]) >= 0) {
            gridElements[shadow.position[0] + shadow.blocks[i][0]][19 - (shadow.position[1] + shadow.blocks[i][1])].style.backgroundImage = "url('" + blocks[SKIN][shadow.pieceIndex + 9] + "')";
        }
    }
}

function drawActive() {
    for (let i = 0; i < activePiece.blocks.length; i++) {
        if (19 - (activePiece.position[1] + activePiece.blocks[i][1]) >= 0) {
            gridElements[activePiece.position[0] + activePiece.blocks[i][0]][19 - (activePiece.position[1] + activePiece.blocks[i][1])].style.backgroundImage = "url('" + blocks[SKIN][activePiece.pieceIndex + 1] + "')";
        }
    }
}

function drawGrid() {
    drawBoard();
    if (activePiece === null) {
        return null;
    }
    drawShadow();
    drawActive();
}

function drawPreviews() {
    if (holdPiece !== null) {
        if (allowHold) {
            $hold.style.backgroundImage = "url('" + previews[SKIN][holdPiece] + "')";
        }
        else {
            $hold.style.backgroundImage = "url('" + previews[SKIN][holdPiece + 7] + "')";
        }
    }
    for (let i = 0; i < 5; i++) {
        document.querySelector(".queuePreview:nth-child(" + (i+1) + ")").style.backgroundImage = "url('" + previews[SKIN][queue[i].pieceIndex] + "')";
    }
}

function addBag() {
    let bag = copyArray(TETROMINO_OBJECTS);
    for (let i = 0; i < TETROMINO_OBJECTS.length; i++) {
        const random = Math.floor(Math.random() * bag.length);
        queue.push(bag[random]);
        remove(bag, random);
    }
    return true;
}

function remove(array, index) {
    return array.splice(index, 1);
}

function overlapBlock(position) {
    if (position[0] < 0 || position[0] > 9 || position[1] < 0 || position[1] > 39) {
        return false;
    }
    return board[position[0]][position[1]] === 0;
}

function overlapPiece(piece) {
    for (let i = 0; i < piece.blocks.length; i++) {
        if (!overlapBlock([(piece.blocks[i][0] + piece.position[0]), (piece.blocks[i][1] + piece.position[1])])) {
            return false;
        }
    }
    return true;
}

function rotateBlock(block, rotation) {
    switch (rotation) {
        case 1:
            return [block[1], -block[0]];
        case 2:
            return [-block[0], -block[1]];
        case 3:
            return [-block[1], block[0]];
        default:
            return [block[0], block[1]];
    }
}

function unbindBlocks(piece) {
    for (let i = 0; i < piece.blocks.length; i++) {
        piece.blocks[i] = copyArray(piece.blocks[i]);
    }
}

function rotatePiece(piece, rotation) {
    unbindBlocks(piece);
    adjustCenter(piece);
    piece.rotIdx += rotation;
    piece.rotIdx %= 4;
    for (let i = 0; i < piece.blocks.length; i++) {
        piece.blocks[i] = rotateBlock(piece.blocks[i], rotation);
    }
    adjustCenterBack(piece);
    return piece;
}

function adjustCenter(piece) {
    if (piece.kickTable === 0) {
        return piece;
    }
    for (let i = 0; i < piece.blocks.length; i++) {
        piece.blocks[i][0] -= 0.5;
        piece.blocks[i][1] -= 0.5;
    }
    return piece;
}

function adjustCenterBack(piece) {
    if (piece.kickTable === 0) {
        return piece;
    }
    for (let i = 0; i < piece.blocks.length; i++) {
        piece.blocks[i][0] = Math.ceil(piece.blocks[i][0]);
        piece.blocks[i][1] = Math.ceil(piece.blocks[i][1]);
    }
    return piece;
}

function nudge(direction, pieceDuplicate) {
    switch (direction) {
        case 1:
            pieceDuplicate.position[0]++;
            break;
        case -1:
            pieceDuplicate.position[0]--;
            break;
        case 0:
            pieceDuplicate.position[1]--;
            break;
    }
}

function checkGrounded(piece, update) {
    if (!update) {
        return grounded;
    }
    if (movePiece(piece, 0, false) === piece) {
        lockResets--;
        if (lockResets > 0) {
            resetGrounded = true;
        }
        return true;
    }
    else {
        return false;
    }
}

function movePiece(piece, direction, update) {
    let pieceDuplicate = copyObject(piece);
    nudge(direction, pieceDuplicate);
    if (overlapPiece(pieceDuplicate)) {
        if (update) {
            lastActionRotation = false;
            grounded = checkGrounded(pieceDuplicate, update);
        }
        return pieceDuplicate;
    }
    return piece;
}

function arrLeft(timestamp) {
    while (timestamp > arrLeftTimer) {
        if (activePiece !== movePiece(activePiece, -1, false)) {
            activePiece = movePiece(activePiece, -1, true);
            updateMatrix();
            playSound("assets/sfx/move.wav");
            arrLeftTimer += ARR;
        } else {
            dasLeftTimer = timestamp;
            break;
        }
    }
}

function handleLeft(timestamp) {
    if (dasLeftTimer === null) {
        dasLeftTimer = timestamp + DAS;
    }
    if (timestamp > dasLeftTimer) {
        arrLeft(timestamp);
    } else {
        arrLeftTimer = timestamp;
    }
}

function arrRight(timestamp) {
    while (timestamp > arrRightTimer) {
        if (activePiece !== movePiece(activePiece, 1, false)) {
            activePiece = movePiece(activePiece, 1, true);
            updateMatrix();
            playSound("assets/sfx/move.wav");
            arrRightTimer += ARR;
        } else {
            dasRightTimer = timestamp;
            break;
        }
    }
}

function handleRight(timestamp) {
    if (dasRightTimer === null) {
        dasRightTimer = timestamp + DAS;
    }
    if (timestamp > dasRightTimer) {
        arrRight(timestamp);
    } else {
        arrRightTimer = timestamp;
    }
}

function deepDrop(piece, update) {
    let pieceDuplicate = copyObject(piece);
    while (pieceDuplicate !== movePiece(pieceDuplicate, 0, false)) {
        pieceDuplicate = movePiece(pieceDuplicate, 0, update);
    }
    return pieceDuplicate;
}

function hardDrop() {
    activePiece = deepDrop(activePiece, true);
    lock();
    dasRightTimer += DCD;
    dasLeftTimer += DCD;
}

function copyObject(object) {
    let objectCopy = {};
    const keys = Object.keys(object);
    for (let i = 0; i < keys.length; i++) {
        if (typeof object[keys[i]] === 'object') {
            objectCopy[keys[i]] = copyArray(object[keys[i]]);
        }
        else {
            objectCopy[keys[i]] = object[keys[i]];
        }
    }
    return objectCopy;
}

function copyArray(array) {
    let copy = [];
    for (const arrayElement of array) {
        copy.push(arrayElement);
    }
    return copy;
}

function clearLine(lineIndex) {
    for (let i = lineIndex; i < 39; i++) {
        for (let j = 0; j < 10; j++) {
            board[j][i] = board[j][i + 1];
        }
    }
}

function sendDamage(lines) {
    sentDamage.push(lines);
    totalDamage += lines;
    totalSpike += lines;
    if (totalSpike >= 10) {
        removeMessagesByColor(color[3]);
        addMessage("Spike " + (totalSpike), color[3]);
    }
    spikeTimer = MAX_SPIKE_DISTANCE;
}

function checkPC() {
    let PC = true;
    for (let i = 0; i < 10 && PC; i++) {
        if (board[i][0] !== 0) {
            PC = false;
        }
    }
    if (PC) {
        sendDamage(10);
        return true;
    }
    return false;
}

function TSpin(lineAmount) {
    addMessage("T-spin", color[2]);
    B2B++;
    playSound("assets/sfx/tspin.wav");
    return 2 * lineAmount + combo - 1 + B2BDamage(B2B);
}

function TSpinMini(lineAmount) {
    addMessage("T-spin mini", color[2]);
    B2B++;
    playSound("assets/sfx/tspin.wav");
    return damagePerClear[lineAmount] + comboDamage(combo);
}

function tetris() {
    addMessage("Tetris", color[1]);
    B2B++;
    playSound("assets/sfx/tetris.wav");
    return 4 + combo - 1 + B2BDamage(B2B);
}

function comboDamage(combo) {
    return Math.round(combo / 4);
}

function B2BDamage(B2B) {
    return Math.round(B2B / 4);
}

function decideDamage(spin, lineAmount) {
    let damage;
    if (spin === 2 && activePiece.pieceIndex === 1) {
        damage = TSpin(lineAmount);
    } else if (spin === 1 && activePiece.pieceIndex === 1) {
        damage = TSpinMini(lineAmount);
    } else if (lineAmount === 4) {
        damage = tetris();
    } else {
        damage = damagePerClear[lineAmount] + comboDamage(combo);
        playSound(LINE_CLEAR_SFX[lineAmount - 1]);
        B2B = 0;
    }
    return damage;
}

function lineClearMessages() {
    if (combo > 1) {
        removeMessagesByColor(color[6]);
        addMessage("Combo " + (combo - 1), color[6]);
    }
    if (B2B > 1) {
        removeMessagesByColor(color[4]);
        addMessage("B2B " + (B2B), color[4]);
    }
}

function removeMessagesByColor(color) {
    const messages = document.querySelectorAll(".messages p");
    for (let i = 0; i < messages.length; i++) {
        if (rgba2hex(messages[i].style.color) === color) {
            messages[i].remove();
            remove(messageTimers, i);
        }
    }
}

function checkDamage(lineAmount, spin) {
    let damage = 0;
    if (lineAmount > 0) {
        damage = decideDamage(spin, lineAmount);
        lineClearMessages();
    }
    if (damage !== 0) {
        sendDamage(damage);
    }
}

function handleCombos(lineAmount) {
    if (lineAmount === 0) {
        combo = 0;
    } else {
        combo++;
    }
}

function createHole(well) {
    for (let i = 0; i < 10; i++) {
        if (i !== well) {
            board[i][0] = 8;
        }
        else {
            board[i][0] = 0;
        }
    }
}

function moveBoardUp() {
    for (let i = 39; i >= 0; i--) {
        for (let j = 0; j < 10; j++) {
            board[j][i] = board[j][i - 1];
        }
    }
}

function takeDamage(well) {
    moveBoardUp();
    createHole(well);
}

function putLinesOnBoard() {
    let damageReceived = 0;
    while (damageReceived < MAX_DAMAGE_RECEIVED && damageQueue.length > 0) {
        damageQueue[0]--;
        takeDamage(currentWell);
        if (damageQueue[0] < 1) {
            remove(damageQueue, 0);
            currentWell = Math.floor(Math.random() * 10);
        }
        damageReceived++;
    }
}

function receiveLines() {
    if (damageQueue.length < 1) {
        return null;
    }
    if (currentWell === null) {
        currentWell = Math.floor(Math.random() * 10);
    }
    playSound("assets/sfx/damageTaken.wav");
    putLinesOnBoard();
}

function addDamageToQueue(amountOfLines) {
    if (amountOfLines === 0) {
        return null;
    }
    damageQueue.push(amountOfLines);
    playSound("assets/sfx/damageQueued.wav");
}

function clearLines() {
    let lineAmount = 0;
    for (let i = 0; i < 40; i++) {
        let emptySpace = false;
        for (let j = 0; j < 10; j++) {
            if (board[j][i] === 0) {
                emptySpace = true;
            }
        }
        if (!emptySpace) {
            clearLine(i);
            lineAmount++;
            i--;
        }
    }
    return lineAmount;
}

function cancelGarbage() {
    while (sentDamage.length > 0 && damageQueue.length > 0) {
        sentDamage[0]--;
        damageQueue[0]--;
        if (sentDamage[0] === 0) {
            remove(sentDamage, 0);
        }
        if (damageQueue[0] === 0) {
            remove(damageQueue, 0);
        }
    }
}

function handleDroppedPiece(spin) {
    let lineAmount = clearLines();
    if (checkPC()) {
        addMessage("PC", color[5]);
        playSound("assets/sfx/perfectClear.wav");
    }
    handleCombos(lineAmount);
    checkDamage(lineAmount, spin);
    cancelGarbage();
    if (lineAmount === 0) {
        receiveLines();
    }
    return lineAmount;
}

function prepareNextPiece() {
    updateMatrix();
    allowHold = true;
    totalLines += handleDroppedPiece(fourCorner());
    activePiece = null;
}

function lock() {
    for (let i = 0; i < activePiece.blocks.length; i++) {
        board[activePiece.blocks[i][0] + activePiece.position[0]][activePiece.blocks[i][1] + activePiece.position[1]] = activePiece.pieceIndex + 1;
    }
    prepareNextPiece();
    nextPiece();
    totalPieces++;
}

function checkCorners() {
    let corners = 0;
    let importantCorners = 0;
    for (let i = 0; i < FOUR_CORNERS[activePiece.pieceIndex].length; i++) {
        let corner = rotateBlock(FOUR_CORNERS[activePiece.pieceIndex][i], activePiece.rotIdx);
        if (!overlapBlock([activePiece.position[0] + corner[0], activePiece.position[1] + corner[1]])) {
            corners++;
            if (i < 2) {
                importantCorners++;
            }
        }
    }
    return {corners, importantCorners};
}

function fourCorner() {
    if (!lastActionRotation || activePiece.pieceIndex === 2) {
        return 0;
    }
    const cornerOccupancy = checkCorners();
    const corners = cornerOccupancy.corners;
    const importantCorners = cornerOccupancy.importantCorners;
    if (corners > 2 && (importantCorners === 2 || lastKickIndex === 4)) {
        return 2;
    }
    else if (corners > 2) {
        return 1;
    }
    return 0;
}

function rotationSoundEffect() {
    if (fourCorner()) {
        playSound("assets/sfx/spin.wav");
    } else {
        playSound("assets/sfx/rotate.wav");
    }
}

function KickRotate(piece, rotation) {
    let pieceDuplicate = copyObject(piece);
    const rotationIndex = rotationIndexLookup[piece.rotIdx][rotation - 1];
    pieceDuplicate = rotatePiece(pieceDuplicate, rotation);
    for (let i = 0; i < KICK_TABLE_BY_INDEX[pieceDuplicate.kickTable][rotationIndex].length; i++) {
        addKickValue(pieceDuplicate, KICK_TABLE_BY_INDEX[pieceDuplicate.kickTable][rotationIndex][i]);
        if (overlapPiece(pieceDuplicate)) {
            lastKickIndex = i;
            lastActionRotation = true;
            grounded = checkGrounded(pieceDuplicate, true);
            rotationSoundEffect();
            return pieceDuplicate;
        }
        addKickValue(pieceDuplicate, KICK_TABLE_BY_INDEX[pieceDuplicate.kickTable][rotationIndex][i], -1);
    }
    return piece;
}

function addKickValue(piece, kick, reverse = 1) {
    piece.position[0] += kick[0] * reverse;
    piece.position[1] += kick[1] * reverse;
    return piece;
}

function holdWithEmpty() {
    holdPiece = activePiece.pieceIndex;
    activePiece = null;
    allowHold = false;
}

function swapHold() {
    let currentPieceIndex = activePiece.pieceIndex;
    activePiece = TETROMINO_OBJECTS[holdPiece];
    holdPiece = currentPieceIndex;
}

function hold() {
    if (!allowHold) {
        return null;
    }
    updateMatrix();
    if (holdPiece === null) {
        holdWithEmpty();
        return;
    }
    swapHold();
    allowHold = false;
}

function countDamage() {
    let sum = 0;
    for (let i = 0; i < damageQueue.length; i++) {
        sum += damageQueue[i];
    }
    return sum;
}

function dead() {
    blockOut();
    addMessage("Died", color[7]);
}

function playSound(link) {
    if (!SOUND) {
        return null;
    }
    let audio = new Audio(link);
    currentAudio = audio.play();
}

function incrementVictory() {
    $victory.innerHTML = parseInt($victory.innerHTML) + 1;
}

function decrementVictory() {
    $victory.innerHTML = parseInt($victory.innerHTML) - 1;
}

function backFire(multiplier = 1) {
    while (sentDamage.length) {
        addDamageToQueue(sentDamage[0] * multiplier);
        remove(sentDamage, 0);
    }
}

function sprint(targetLines) {
    $victory.innerHTML = (targetLines - totalLines).toFixed(0);
    if (totalLines >= targetLines) {
        blockOut();
    }
}

function wave(timestamp, level, messiness) {
    nextWave =  1000 + timestamp + (50000 * Math.random() / level);
    let waveDamage = Math.floor(4 + Math.random() * level * 1.5);
    while (waveDamage > 0) {
        let nextBag = 1;
        while (Math.random() > messiness && nextBag < waveDamage) {
            nextBag++;
        }
        waveDamage -= nextBag;
        addDamageToQueue(nextBag);
    }
}

function steadyDamage(level, messiness, timestamp) {
    $victory.innerHTML = ((nextWave - timestamp) / 1000).toFixed(0);
    if (nextWave === null) {
        nextWave =  1000 + timestamp + (50000 * Math.random() / level);
    }
    if (timestamp > nextWave) {
        wave(timestamp, level, messiness);
        cancelGarbage();
        sentDamage = [];
    }
}

function tenPCBlockOut() {
    for (let i = 0; i < 10; i++) {
        if (board[i][4 - totalLines] !== 0) {
            dead();
        }
    }
}

function tenPC() {
    resetVictory();
    if (totalLines && checkPC()) {
        totalLines = 0;
        incrementVictory();
    }
    if (gameOver) {
        return null;
    }
    tenPCBlockOut();
}

function checkForDoubles() {
    if (totalLines !== 0) {
        if (totalLines !== 2) {
            dead();
        } else {
            totalLines = 0;
        }
    }
}

function checkForTSD() {
    if (sentDamage.length > 0) {
        if (sentDamage[0] > 3) {
            if (checkPC()) {
                dead();
            }
            else {
                remove(sentDamage, 0);
                incrementVictory();
            }
        } else {
            dead();
        }
    }
}

function resetVictory() {
    if ($victory.innerHTML === "") {
        $victory.innerHTML = 0;
    }
}

function twentyTSD() {
    resetVictory();
    checkForDoubles();
    checkForTSD();
}

function cheeseRace(totalLines, height) {
    if (gameOver) {
        return null;
    }
    if ($victory.innerHTML === "") {
        $victory.innerHTML = totalLines;
    }
    if (parseInt($victory.innerHTML) <= 0 && !(board[0][0] === 8 || board[1][0] === 8)) {
        blockOut();
        return null;
    }
    while (!((board[0][height] === 8 || board[1][height] === 8) || parseInt($victory.innerHTML) <= 0)) {
        currentWell = Math.floor(Math.random() * 10);
        takeDamage(currentWell);
        updateMatrix();
        parseInt($victory.innerHTML);
        decrementVictory();
    }

}

function fourWideRow() {
    for (let i = 39; board[0][i] !== 8 && i >= 0; i--) {
        board[0][i] = 8;
        board[1][i] = 8;
        board[2][i] = 8;
        board[7][i] = 8;
        board[8][i] = 8;
        board[9][i] = 8;
    }
}

function fillResidual(blocks) {
    for (let i = 0; i < blocks.length; i++) {
        board[blocks[i][0]][blocks[i][1]] = 8;
    }
}

function fourWide(residual = 3) {
    $victory.innerHTML = combo;
    if (gameOver) {
        return null;
    }
    if (board[0][0] === 0) {
        fillResidual(FOUR_WIDE_RESIDUAL[residual]);
        fourWideRow();
        updateMatrix();
    }
    while (board[0][19] !== 8) {
        fourWideRow();
        updateMatrix();
    }
}

function downStack(height, messiness) {
    if (gameOver || combo > 0) {
        return null;
    }
    while (!(board[0][height - 1] === 8 || board[1][height - 1] === 8)) {
        if (Math.random() < messiness || currentWell === null) {
            currentWell = Math.floor(Math.random() * 10);
        }
        takeDamage(currentWell);
        updateMatrix();
    }
}

function gameModes() {
    //just here to stop unnecessary errors
    tenPC();
    steadyDamage();
    sprint();
    backFire();
    twentyTSD();
    cheeseRace();
    downStack();
    fourWide();
}

const rgba2hex = (rgba) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.?\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`;