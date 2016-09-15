var padX;
var padY;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  padX = mouseX;
  padY = mouseY;
  
  noStroke();
  rect(0, 0, width, height);
  stroke(1);
  quad(padX + 15, padY + 360, padX + 45, padY + 360, padX + 40, padY + 370, padX + 20, padY + 370);
  quad(padX + 15, padY + 250, padX + 45, padY + 250, padX + 45, padY + 360, padX + 15, padY + 360);
  quad(padX + 20, padY + 235, padX + 40, padY + 235, padX + 45, padY + 250, padX + 15, padY + 250);
  quad(padX + 20, padY + 115, padX + 40, padY + 115, padX + 40, padY + 235, padX + 20, padY + 235);
  quad(padX + 15, padY + 100, padX + 45, padY + 100, padX + 40, padY + 115, padX + 20, padY + 115);
  quad(padX + 0, padY + 330, padX + 15, padY + 310, padX + 15, padY + 360, padX + 0, padY + 360);
  quad(padX + 45, padY + 310, padX + 60, padY + 330, padX + 60, padY + 360, padX + 45, padY + 360);
  quad(padX + 15, padY + 75, padX + 45, padY + 75, padX + 45, padY + 100, padX + 15, padY + 100);
  triangle(padX + 30, padY + 0, padX + 45, padY + 75, padX + 15, padY + 75);
}

function mousePressed() {
  fill(red);
}