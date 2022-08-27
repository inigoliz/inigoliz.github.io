// function setup() {
//   createCanvas(400, 400);
// }

// function draw() {
//   if (mouseIsPressed) {
//     fill(0);
//   } else {
//     fill(255, 100, 0);
//   }
//   ellipse(mouseX, mouseY, 80, 80);
// }


// let radiusCircle = 100;
// float deltaAgle = 0.5;
// float deltaRadius = 15;

class NestLine {
  
  constructor(angle) {
    this.radiusCircle = 100;
    this.deltaAgle = 0.5;
    this.deltaRadius = 15;
    this.positionAngle = angle;
    this.len = random(25, 50);
    this.orientation = angle + random(-this.deltaAgle, this.deltaAgle);
    this.orientationBaseline = this.orientation;
    this.radius = this.radiusCircle + random(-this.deltaRadius, this.deltaRadius);
    this.radiusBaseline = this.radius;
    this.velocityOrientation = 0;
    this.accelerationOrientation = 0;
    this.velocityRadius = 0;
    this.accelerationRadius = 0;
  }
  
  display() {
    translate(this.radius*cos(this.positionAngle), this.radius*sin(this.positionAngle));
    stroke(255);
    line(-this.len*sin(this.orientation), this.len*cos(this.orientation), this.len*sin(this.orientation), -this.len*cos(this.orientation));
    translate(-this.radius*cos(this.positionAngle), -this.radius*sin(this.positionAngle));
  }
  
  update() {
    this.velocityOrientation += this.accelerationOrientation;
    this.orientation += this.velocityOrientation; 
    this.accelerationOrientation = 0;
    
    this.velocityRadius += this.accelerationRadius;
    this.radius += this.velocityRadius;
    this.accelerationRadius = 0;
  }
  
  addForce(force) {
    this.accelerationOrientation += force;
  }
  
  addRadiusForce(force) {
   this.accelerationRadius += force;
  }
  
  addFriction() {
    this.accelerationOrientation -= 0.1*this.velocityOrientation;
    this.accelerationRadius -= 0.1*this.velocityRadius;
  }
  
  addRestoringForce() {
    let coef1 = 0.5;
    let coef2 = 0.3;
    this.accelerationOrientation -= coef1*(this.orientation - this.orientationBaseline);
    this.accelerationRadius -= coef2*(this.radius - this.radiusBaseline);
    
  }
  
  addMouseForce() {
    let coef = 0.05;
    
    let lineX = this.radius*cos(this.positionAngle);
    let lineY = this.radius*sin(this.positionAngle);
    let mouseXX = mouseX - width/2;
    let mouseYY = mouseY - height/2;
  
    
    let d = sqrt(pow((mouseXX - lineX), 2) + pow((mouseYY - lineY), 2));
    if (d < 100) { 
      this.addRadiusForce(coef*d);
    }
  }
}


let lines = []

function setup() {
  pixelDensity(2);
  createCanvas(500, 500);
  
  noFill();
  strokeWeight(10.0);
  strokeJoin(MITER);
  
  for (let i=0; i<80; i++) {
    let angle = random(0, TWO_PI);
    lines.push(new NestLine(angle));
  }

}

function draw() {
  background(234, 118, 9);
  translate(width/2, height/2);

  let chance = int(random(1, lines.length));
  for (let i=0; i<lines.length; i++) {
    let force = random(-0.02, 0.02);
    lines[chance].addForce(force);
    lines[i].addFriction();
    lines[i].addRestoringForce();
    lines[i].addMouseForce();
    lines[i].update();
    lines[i].display();
  }

}
  