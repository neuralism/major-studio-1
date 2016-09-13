var x = [];
var y = [];

function setup() {
    createCanvas(windowWidth, windowWidth);
    rectMode(CENTER);
    fill(255, 0, 0, 100)
}

// after setup is done draw() will be called 60 times per second
function draw() {
    background(150);
    line(0, 0, mouseX, 100);    
    rect(mouseX, mouseY, 100, 100, 10);
    
    beginShape(LINES);
    vertex(30, 20);
    vertex(85, 20);
    vertex(85, 75);
    vertex(30, 75);
    endShape();
    
    beginShape();
    for (i = 0; i < x.length; i++) {
        vertex(x[i], y[i]);
        textSize(12);
        text(String(i + 1), x[i] + 10, y[i] + 10);
    }
    endShape(CLOSE);
}

function mouseReleased() {
    if (x.length < 10) {
        x.push(mouseX);
        y.push(mouseY);
        console.log(x);
    }
}