var score = 0;
var x = [];
var y = [];
var xSpeed = [];
var ySpeed = [];

function setup() {
    createCanvas(800, 800);
    rectMode(CENTER);
    for (var i = 0; i < 10; i++) {
        x[i] = random(width);
        y[i] = random(height);
        xSpeed[i] = random(-2, 2);
        ySpeed[i] = random(-2, 2);
    }
}

function draw() {
    background(128, 128, 0);
    for (var i = 0; i < 10; i++) {
        x[i] += xSpeed[i];
        y[i] += ySpeed[i];
        ellipse(x[i], y[i], 20, 20);
        
        if (y[i] < 0 || y[i] > 800) {
            ySpeed[i] *= -1; // ySpeed[i] = -ySpeed[i]
        }
        
        if (x[i] < 0 || x[i] > 800) {
            xSpeed[i] *= -1; // xSpeed[i] = -xSpeed[i]
        }
        
        if (y[i] > height - 72 && abs(x[i] - mouseX) - width / 4 / 2) {
            ySpeed[i] *= -1;
            // score++;
        }
    }

    rect(mouseX, height - 50, width / 4, 25, 10);
    text(score, mouseX, height - 45);
}