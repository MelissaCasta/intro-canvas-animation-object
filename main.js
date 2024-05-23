const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const canvasMulti = document.getElementById("canvasMulti");
const ctxMulti = canvasMulti.getContext("2d");

const window_height = 300;
const window_width = 500;

canvas.height = window_height;
canvas.width = window_width;
canvasMulti.height = window_height;
canvasMulti.width = window_width;

canvas.style.backgroundColor = "#008080";
canvasMulti.style.backgroundColor = "#7f7679";

class Circle {
    constructor(x, y, radius, color, text, backcolor, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.backcolor = backcolor;
        this.speed = speed;
        this.dx = 0.9 * this.speed;
        this.dy = 0.9 * this.speed;
    }

    draw(context) {
        context.beginPath();
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.backcolor;
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = this.color;
        context.stroke();
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "bold 20px cursive";
        context.fillStyle = "white";
        context.fillText(this.text, this.posX, this.posY);
        context.closePath();
    }

    update(context) {
        this.draw(context);

        if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.posY + this.radius > window_height || this.posY - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.posX += this.dx;
        this.posY += this.dy;
    }
}

const nCircles = 10;
let circlesCanvas1 = [];
let circlesCanvas2 = [];

for (let i = 0; i < nCircles; i++) {
    let randomRadius = Math.floor(Math.random() * 30 + 20);
    let randomX = Math.random() * window_width;
    let randomY = Math.random() * window_height;
    let randomSpeed = Math.random() * 3 + 1; // Velocidad aleatoria entre 1 y 4

    // Ajustar la velocidad según el índice del círculo
    if (i < 2) { // Los primeros dos círculos van muy lentos
        randomSpeed *= 0.2;
    } else if (i < 5) { // Los siguientes cinco círculos van lentos
        randomSpeed *= 0.5;
    } else if (i < 8) { // Los siguientes tres círculos van rápidos
        randomSpeed *= 2;
    } // Los últimos círculos (del 8 al 9) van muy rápidos

    let randomBackcolor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.4)`;
    let randomStrokecolor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`;

    randomX = Math.max(randomRadius, Math.min(randomX, window_width - randomRadius));
    randomY = Math.max(randomRadius, Math.min(randomY, window_height - randomRadius));

    let circle1 = new Circle(randomX, randomY, randomRadius, randomStrokecolor, i + 1, randomBackcolor, randomSpeed);
    circlesCanvas1.push(circle1);
}

// Un solo círculo para el segundo canvas
let singleCircleRadius = Math.floor(Math.random() * 30 + 20);
let singleCircleX = Math.random() * window_width;
let singleCircleY = Math.random() * window_height;
let singleCircleSpeed = Math.random() * 3 + 1;
let singleCircleBackcolor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.4)`;
let singleCircleStrokecolor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`;

singleCircleX = Math.max(singleCircleRadius, Math.min(singleCircleX, window_width - singleCircleRadius));
singleCircleY = Math.max(singleCircleRadius, Math.min(singleCircleY, window_height - singleCircleRadius));

let singleCircle = new Circle(singleCircleX, singleCircleY, singleCircleRadius, singleCircleStrokecolor, 1, singleCircleBackcolor, singleCircleSpeed);
circlesCanvas2.push(singleCircle);

function createCoordinatesTable(canvasId, circles) {
    const tableBody = document.getElementById(canvasId);
    tableBody.innerHTML = ""; // Clear previous rows

    circles.forEach((circle, index) => {
        const row = document.createElement('tr');

        const cellID = document.createElement('td');
        cellID.textContent = circle.text;
        row.appendChild(cellID);

        const cellX = document.createElement('td');
        cellX.textContent = circle.posX.toFixed(1);
        row.appendChild(cellX);

        const cellY = document.createElement('td');
        cellY.textContent = circle.posY.toFixed(1);
        row.appendChild(cellY);

        tableBody.appendChild(row);
    });
}

function updateCircles(ctx, circles) {
    ctx.clearRect(0, 0, window_width, window_height);
    circles.forEach(circle => {
        circle.update(ctx);
    });
}

function animate() {
    updateCircles(ctx, circlesCanvas1);
    updateCircles(ctxMulti, circlesCanvas2);
    createCoordinatesTable('circle-data-canvas1', circlesCanvas1);
    createCoordinatesTable('circle-data-canvas2', circlesCanvas2);
    requestAnimationFrame(animate);
}

animate();