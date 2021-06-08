// Select elements on the page - canvas, shake button
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakebutton = document.querySelector('.shake-button');
const MOVE_AMOUNT = 20;
const LINE_WIDTH = 40;
const COLOR_SPEED = 2;
let hue = 0;

// Setup canvas for drawing
// Make a variable called height and width from the same properties on our canvas.
const { width, height } = canvas;

// Create random x and y starting points on the canvas
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = LINE_WIDTH;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

// Start the drawing
ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// Write a draw function
function draw({ key }) {

    //Increment the hue
    hue += COLOR_SPEED;

    console.log(key);

    // Start the path
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

    // Move x and y values depending on user action
    switch (key) {
        case 'ArrowUp':
            y -= MOVE_AMOUNT;
            break;
        case 'ArrowDown':
            y += MOVE_AMOUNT;
            break;
        case 'ArrowLeft':
            x -= MOVE_AMOUNT;
            break;
        case 'ArrowRight':
            x += MOVE_AMOUNT;
            break;
        default:
            break;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
}

// Write a handler for the keys
function handleKey(e) {
    if (e.key.includes('Arrow')) {
        e.preventDefault();
        draw({ key: e.key });
    }
}

// Clear/shake function
function clearCanvas() {
    canvas.classList.add('shake');
    ctx.clearRect(0, 0, width, height);
    canvas.addEventListener('animationend', function() {
        canvas.classList.remove('shake');
    },
    { once: true }
    );
}

shakebutton.addEventListener('click', clearCanvas);

// Listen for arrow keys
window.addEventListener('keydown', handleKey);