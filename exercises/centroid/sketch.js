var x = [];
var y = [];

var cX, cY;
var a;


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
    
    a = 0;
    cX = 0;
    cX = 0;
    
    // centroid formula: https://en.wikipedia.org/wiki/Centroid#Centroid_of_polygon
    for (var i = 0; i < x.length - 1; i++) {
        // enumerate
        cX += (x[i] + x[i + 1]) * (x[i] * y[i + 1] - x[i + 1] * y[i]);
        cY += (y[i] + y[i + 1]) * (x[i] * y[i + 1] - x[i + 1] * y[i]);
        a += x[i] * y[i + 1] - x[i + 1] * y[i];
    }
    
    a = 0.5 * a;
    cX = cX / (6*a);
    cY = cY / (6*a);
    
    ellipse(cX, cY, 10, 10);
}

function mouseReleased() {
    if (x.length < 10) {
        x.push(mouseX);
        y.push(mouseY);
        console.log(x);
    }
}