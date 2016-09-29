function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
}

function draw() {
    background(255);
    push();
    translate(100, 100);
    rotate(radians(mouseX));
    rect(0, 0, 100, 100);
    pop();
    translate(300, 100);
    rotate(radians(mouseY));
    rect(0, 0, 100, 100);
}