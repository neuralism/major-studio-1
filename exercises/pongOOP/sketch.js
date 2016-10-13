var score = 0;
var num = 10;

var pongBalls = [];

function setup() {
    createCanvas(600, 600);
    rectMode(CENTER);
    textAlign(CENTER);
    
    for (var i = 0; i < num; i++) {
        pongBalls.push(new PongBall(random(30, width - 30), random(30, height - 30)));
    }
}

function PongBall(myX, myY) {
    this.x = myX;
    this.y = myY;
    this.speedX = random(-10, 10);
    this.speedY = random(-10, 10);
    
    console.log(this.x + ' | ' + this.y);
    
    this.display = function() {
        push();
        translate(this.x, this.y);
        ellipse(0, 0, 15, 15);
        pop();
    }
    
    this.update = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x <= 10)
            this.xSpeed *= -1;
            
        if (this.y <= 10)
            this.ySpeed *= -1;
            
        if (this.x >= width - 10)
            this.xSpeed = -this.xSpeed;
    }
}

function draw() {
    for (var i = 0; i < pongBalls.length; i++) {
        pongBalls[i].update();
        pongBalls[i].display();
    }
}