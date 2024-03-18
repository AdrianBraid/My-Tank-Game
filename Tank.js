let gridX;
let gridY;
let positionX;
let positionY;
let north;
let south;
let east;
let west;
let count;
let time = 0
let min;
let secs;
let secsFormat;
let minFormat;
let FgridX;
let FgridY;
let directionCalc;
let directions;
let movement;
let rotation;
let gridXZ;
let gridYZ;
let xPointM;
let xPointTL;
let xPointTR;
let xPointML;
let xPointBL;
let xPointMB;
let xPointBR;
let xPointMR;
let yPointM;
let yPointTL;
let yPointTR;
let yPointML;
let yPointBL;
let yPointMB;
let yPointBR;
let yPointMR;
let NExPointTR;
let NEyPointTR;
let NWxPointTL;
let NWyPointTL;
let SWxPointBL;
let SWyPointBL;
let SExPointBR;
let SEyPointBR;
let SWyPointBR;
let SWxPointBR;
let SWxPointC;
let SWyPointC;
let SEyPointBL;
let SExPointBL;
let NWyPointTR;
let NWxPointTR;
let NExPointTL;
let NEyPointTL;
let diagonal = false
let yShootingDirection;
let xShootingDirection;
let shootingDirection;
let shootingCalc;
let direction;

class Tank {

  constructor(x, y, width, height, imageX, turretImg, userTank) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.image = imageX
    this.turret = turretImg
    this.bullets = []
    this.score = 0
    this.userTank = userTank
    this.applyMovement = { xSpeed: 0, ySpeed: 0, rotation: 0, shootingDirection: (3 * PI) / 2 }
    this.death = false
    this.eliminations = 0
    //how much to multiply the speed by
    this.speedMultiplier = 1
    this.xSpeed = 1.2
    this.ySpeed = 1.2
    this.deaths = 0
    //player deaths for multiplayer 
    this.playerDeaths = 0
  }

  //method responsbile for showing the image of the AI tank in single player 
  showAI() {
    push()
    imageMode(CENTER)
    angleMode(DEGREES)
    translate(this.x, this.y)
    image(this.image, 0, 0, this.width, this.height)
    pop()
  }

  //method responsible for showing any tank
  show(moveCalc) {
    //display image
    push()
    imageMode(CENTER)
    angleMode(DEGREES)
    translate(this.x, this.y)
    //if the tank isnt moving, set the x and y speed to 0 
    if (directions[moveCalc] == 's') {
      this.applyMovement.xSpeed = 0
      this.applyMovement.ySpeed = 0
    }
    //if its not equal to 0, allow the tank to move in the appropraite direction and speed
    else {
      this.applyMovement = movement[directions[moveCalc]]
    }
    rotate(this.applyMovement.rotation)
    image(this.image, 0, 0, this.width, this.height)
    pop()
  }

  //method responsbile for showing the turret of the tanks
  showTurret(x, y) {
    push()
    imageMode(CENTER)
    angleMode(RADIANS)
    translate(this.x, this.y)
    xShootingDirection = x - this.x
    yShootingDirection = this.y - y
    //calculate the direction the turret should be shooting in
    shootingDirection = atan2(xShootingDirection, yShootingDirection)
    rotate(shootingDirection)
    image(this.turret, 0, 0, this.width / 1.5, this.height * 2)
    pop()
  }



  move() {
    //an array considering all the different directions the tank could be facing. The index considers all the possible keystrokes and what their corresponding value is. for example, if no key is being pressed, the calculation for direction will be 0.
    directions = ['s', 'r', 'd', 'se', 'l', 's', 'sw', 'd', 'u', 'ne', 's', 'r', 'nw', 'u', 'l', 's']
    //the appropriate properties for the x and y speed, dependent on the movement
    movement =
    {
      's': { xSpeed: 0, ySpeed: 0, rotation: 0 },
      'r': { xSpeed: 1.2, ySpeed: 0, rotation: 90 },
      'd': { xSpeed: 0, ySpeed: 1.2, rotation: 180 },
      'se': { xSpeed: 0.85, ySpeed: 0.85, rotation: 135 },
      'l': { xSpeed: -1.2, ySpeed: 0, rotation: 270 },
      'sw': { xSpeed: -0.85, ySpeed: 0.85, rotation: 225 },
      'u': { xSpeed: 0, ySpeed: -1.2, rotation: 0 },
      'ne': { xSpeed: 0.85, ySpeed: -0.85, rotation: 45 },
      'nw': { xSpeed: -0.85, ySpeed: -0.85, rotation: 315 },
    }

    //checking if there hasnt been a collision 
    if (!this.collision()) {
      //calculating the tanks x and y positions, with respect to the grid
      gridXZ = Math.floor(this.x / sqSize)
      gridYZ = Math.floor(this.y / sqSize)
      //checking to see if the tank lies within the barrier
      if (gridXZ >= 0 && gridXZ < 20 && gridYZ >= 0 && gridYZ < 20) {
        //if the tank is not in cobweb, move it as normally
        if (currentMap[gridYZ][gridXZ] !== 3) {
          this.x += this.applyMovement.xSpeed * this.speedMultiplier
          this.y += this.applyMovement.ySpeed * this.speedMultiplier
        }
        //if the tank is a cobweb, slow the speed.
        if (currentMap[gridY][gridX] == 3) {
          this.x += this.applyMovement.xSpeed / 2
          this.y += this.applyMovement.ySpeed / 2
        }
      }
    }
  }

  check() {
    //this method is designed to check if the tank has left the barrier.
    //checking if the tank is at the left side of the barrier, if so stop the tank
    if (this.x - this.width / 2 < 0) {
      this.x = this.width / 2
      return true
    }
    //check if the tank is at the right side of the map.
    if (this.x + this.width / 2 > width) {
      this.x = width - (this.width / 2)
      return true
    }
    //check if the tank is at the top of the map.
    if (this.y - this.height / 2 < 0) {
      this.y = this.height / 2
      return true
    }
    //check if the tank is at the bottom of the map
    if (this.y + this.height / 2 > height) {
      this.y = height - (this.height / 2)
      return true
    }
  }

  boardPosition() {
    gridX = Math.floor(this.x / sqSize)
    gridY = Math.floor(this.y / sqSize)
  }

  collision() {

    //this method calculates if the tank is about to have a collison. If it does, it will stop.
    //calculate all x and y values for all parts of the tank 
    //TL = Top left, TR = Top right, BR = bottom right, BL = bottom left, NE = north east, NW = north west, SW = south west, SE= south east.
    //this is what the positions are set to if no keys are being pressed.
    positionX = Math.floor(this.x / sqSize)
    positionY = Math.floor(this.y / sqSize)
    xPointTL = Math.floor((this.x) / sqSize)
    yPointTL = Math.floor((this.y) / sqSize)
    xPointTR = Math.floor((this.x) / sqSize)
    yPointTR = Math.floor((this.y) / sqSize)
    xPointBR = Math.floor((this.x) / sqSize)
    yPointBR = Math.floor((this.y) / sqSize)
    xPointBL = Math.floor((this.x) / sqSize)
    yPointBL = Math.floor((this.y) / sqSize)
    NExPointTR = Math.floor((this.x) / sqSize)
    NEyPointTR = Math.floor((this.y) / sqSize)
    NWxPointTL = Math.floor((this.x) / sqSize)
    NWyPointTL = Math.floor((this.y) / sqSize)
    SWxPointBL = Math.floor((this.x) / sqSize)
    SWyPointBL = Math.floor((this.y) / sqSize)
    SWxPointBR = Math.floor((this.x) / sqSize)
    SWyPointBR = Math.floor((this.y) / sqSize)
    SWxPointC = Math.floor((this.x) / sqSize)
    SWyPointC = Math.floor((this.y) / sqSize)
    SExPointBR = Math.floor((this.x) / sqSize)
    SEyPointBR = Math.floor((this.y) / sqSize)
    SExPointBL = Math.floor((this.x) / sqSize)
    SEyPointBL = Math.floor((this.y) / sqSize)
    NWxPointTR = Math.floor((this.x) / sqSize)
    NWyPointTR = Math.floor((this.y) / sqSize)
    NExPointTL = Math.floor((this.x) / sqSize)
    NEyPointTL = Math.floor((this.y) / sqSize)

    //if the tank is facing north, calculate the top middle point of the tank 
    if (north) {
      positionY = Math.floor((this.y - this.height / 1.8 - this.applyMovement.ySpeed) / sqSize)
    }
    //if the tank is facing east, calculate the middle point of the right side of the tank
    if (east) {
      positionX = Math.floor((this.x + this.width / 2.1 + this.applyMovement.xSpeed) / sqSize)
    }
    //if the tank is facing south, calculate the bottom middle point of the tank 
    if (south) {
      positionY = Math.floor((this.y + this.height / 1.8 + this.applyMovement.ySpeed) / sqSize)
    }
    //if the tank is facing west, calculate the middle point of the left side of the tank
    if (west) {
      positionX = Math.floor((this.x - this.width / 1.8 - this.applyMovement.xSpeed) / sqSize)
    }
    //Calculating the top left and top right x y value when the tank is going upwards
    if (directions[directionCalc] == 'u') {
      xPointTL = Math.floor((this.x - this.width / 2.1 - this.applyMovement.xSpeed) / sqSize)
      yPointTL = Math.floor((this.y - this.height / 2.1 - this.applyMovement.ySpeed) / sqSize)
      xPointTR = Math.floor((this.x + this.width / 2.1 + this.applyMovement.xSpeed) / sqSize)
      yPointTR = Math.floor((this.y - this.height / 2.1 - this.applyMovement.ySpeed) / sqSize)
    }
    //Calculating the bottom right and top right x y value when the tank is going right
    if (directions[directionCalc] == 'r') {
      xPointTR = Math.floor((this.x + this.width / 2.1 + this.applyMovement.xSpeed) / sqSize)
      yPointTR = Math.floor((this.y - this.height / 2.1 - this.applyMovement.ySpeed) / sqSize)
      xPointBR = Math.floor((this.x + this.width / 2.1 - this.applyMovement.xSpeed) / sqSize)
      yPointBR = Math.floor((this.y + this.height / 2.1 - this.applyMovement.ySpeed) / sqSize)
    }
    //Calculating the top left and top right x y value when the tank is going upwards
    if (directions[directionCalc] == 'l') {
      xPointTL = Math.floor((this.x - this.width / 2.1 - this.applyMovement.xSpeed) / sqSize)
      yPointTL = Math.floor((this.y - this.height / 2.1 - this.applyMovement.ySpeed) / sqSize)
      xPointBL = Math.floor((this.x - this.width / 2.1 - this.applyMovement.xSpeed) / sqSize)
      yPointBL = Math.floor((this.y + this.height / 2.1 + this.applyMovement.ySpeed) / sqSize)
    }
    //Calculating the bottom left and bottom right x y value when the tank is going downwards
    if (directions[directionCalc] == 'd') {
      xPointBL = Math.floor((this.x - this.width / 2.1 - this.applyMovement.xSpeed) / sqSize)
      yPointBL = Math.floor((this.y + this.height / 2.1 + this.applyMovement.ySpeed) / sqSize)
      xPointBR = Math.floor((this.x + this.width / 2.1 + this.applyMovement.xSpeed) / sqSize)
      yPointBR = Math.floor((this.y + this.height / 2.1 + this.applyMovement.ySpeed) / sqSize)
    }
    //Calculating the top left, top right and top middle side x y value for when the tank is going north east
    if (directions[directionCalc] == 'ne') {
      NExPointTL = Math.floor((this.x) / sqSize)
      NEyPointTL = Math.floor((this.y - this.height / 1.6 - this.applyMovement.ySpeed) / sqSize)
      NExPointTR = Math.floor((this.x + this.width / 1.6 - this.applyMovement.ySpeed) / sqSize)
      NEyPointTR = Math.floor((this.y) / sqSize)
      xPointTR = Math.floor((this.x + this.width / 2.8 + this.applyMovement.xSpeed) / sqSize)
      yPointTR = Math.floor((this.y - this.height / 2.8 - this.applyMovement.ySpeed) / sqSize)
    }
    //Calculating the top left, top right and top middle side x y value for when the tank is going north west
    if (directions[directionCalc] == 'nw') {
      NWxPointTL = Math.floor((this.x - this.width / 1.6 + this.applyMovement.xSpeed) / sqSize)
      NWyPointTL = Math.floor((this.y) / sqSize)
      NWxPointTR = Math.floor((this.x) / sqSize)
      NWyPointTR = Math.floor((this.y - this.height / 1.6) / sqSize)
      xPointTL = Math.floor((this.x - this.width / 2.8 + this.applyMovement.xSpeed) / sqSize)
      yPointTL = Math.floor((this.y - this.height / 2.8 - this.applyMovement.ySpeed) / sqSize)
    }
    //Calculating the bottom left, bottom right and top middle side x y value when the tank is going south west
    if (directions[directionCalc] == 'sw') {
      SWxPointBL = Math.floor((this.x - this.width / 1.6 + this.applyMovement.xSpeed) / sqSize)
      SWyPointBL = Math.floor((this.y - this.applyMovement.ySpeed) / sqSize)
      SWxPointBR = Math.floor((this.x - this.applyMovement.xSpeed) / sqSize)
      SWyPointBR = Math.floor((this.y + this.height / 1.6 + this.applyMovement.ySpeed) / sqSize)
      SWxPointC = Math.floor((this.x - this.width / 2.8 - this.applyMovement.xSpeed) / sqSize)
      SWyPointC = Math.floor((this.y + this.height / 2.8 + this.applyMovement.ySpeed) / sqSize)
    }
    //Calculating the bottom left, bottom right and top middle side x y value when the tank is going south east
    if (directions[directionCalc] == 'se') {
      SExPointBL = Math.floor((this.x - this.applyMovement.xSpeed) / sqSize)
      SEyPointBL = Math.floor((this.y + this.height / 1.6 + this.applyMovement.ySpeed) / sqSize)
      SExPointBR = Math.floor((this.x + this.width / 1.6 - this.applyMovement.xSpeed) / sqSize)
      SEyPointBR = Math.floor((this.y - this.applyMovement.ySpeed) / sqSize)
      xPointBR = Math.floor((this.x + this.width / 2.8 - this.applyMovement.xSpeed) / sqSize)
      yPointBR = Math.floor((this.y + this.height / 2.8 - this.applyMovement.ySpeed) / sqSize)
    }

    //calcuating middle x y coordinates of tank, with respect to grid 
    gridX = Math.floor((this.x) / sqSize)
    gridY = Math.floor((this.y) / sqSize)

    //collision for coins
    if (gridX >= 0 && gridX < 20 && gridY >= 0 && gridY < 20) {
      //if the coordinates of the tank are in the same as a coin, play a sound
      if (currentMap[gridY][gridX] == 2) {
        coinCollect.play()
        coinCollect.setVolume(0.5)
        currentMap[gridY][gridX] = 0
        this.score = this.score + 10
      }
    }
    //checking collision for any walls
    if (positionX >= 0 && positionX < 20 && positionY >= 0 && positionY < 20) {
      if (currentMap[positionY][positionX] == 1) {
        this.applyMovement.xSpeed = 0
        this.applyMovement.ySpeed = 0
        return true
      }
      //making sure the collison is only valid between the barriers of the map.
      if (xPointTL >= 0 && xPointTL < 20 && yPointTL >= 0 && yPointTL < 20 &&
        xPointTR >= 0 && xPointTR < 20 && yPointTR >= 0 && yPointTR < 20 &&
        xPointBR >= 0 && xPointBR < 20 && yPointBR >= 0 && yPointBR < 20 &&
        xPointBL >= 0 && xPointBL < 20 && yPointBL >= 0 && yPointBL < 20 &&
        NExPointTR >= 0 && NExPointTR < 20 && NEyPointTR >= 0 && NEyPointTR < 20 &&
        NWxPointTL >= 0 && NWxPointTL < 20 && NWyPointTL >= 0 && NWyPointTL < 20 &&
        SWxPointBL >= 0 && SWxPointBL < 20 && SWyPointBL >= 0 && SWyPointBL < 20 &&
        SWxPointBR >= 0 && SWxPointBR < 20 && SWyPointBR >= 0 && SWyPointBR < 20 &&
        SWxPointC >= 0 && SWxPointC < 20 && SWyPointC >= 0 && SWyPointC < 20 &&
        SExPointBR >= 0 && SExPointBR < 20 && SEyPointBR >= 0 && SEyPointBR < 20 &&
        SExPointBL >= 0 && SExPointBL < 20 && SEyPointBL >= 0 && SEyPointBL < 20 &&
        NWxPointTR >= 0 && NWxPointTR < 20 && NWyPointTR >= 0 && NWyPointTR < 20 &&
        NExPointTL >= 0 && NExPointTL < 20 && NEyPointTL >= 0 && NEyPointTL < 20) {

        //check for top left point, or top right point, or bottom right point, or bottom left point, checking if there is a collision
        if (currentMap[yPointTL][xPointTL] == 1 || currentMap[yPointTR][xPointTR] == 1 || currentMap[yPointBR][xPointBR] == 1 || currentMap[yPointBL][xPointBL] == 1) {
          this.applyMovement.xSpeed = 0
          this.applyMovement.ySpeed = 0
          return true
        }

        //checking to see if there is a collision in north east direction 
        if (currentMap[NEyPointTL][NExPointTL] == 1 || currentMap[NEyPointTR][NExPointTR] == 1 || currentMap[yPointTR][xPointTR] == 1) {
          this.applyMovement.xSpeed = 0
          this.applyMovement.ySpeed = 0
          return true
        }
        //checking to see if there is a collision in north west direction
        if (currentMap[NWyPointTL][NWxPointTL] == 1 || currentMap[NWyPointTR][NWxPointTR] == 1 || currentMap[yPointTL][xPointTL] == 1) {
          this.applyMovement.xSpeed = 0
          this.applyMovement.ySpeed = 0
          diagonal = true
          return true
        }
        //checking to see if there is a collision in south east direction
        if (currentMap[SEyPointBR][SExPointBR] == 1 || currentMap[SEyPointBL][SExPointBL] == 1 || currentMap[yPointBR][xPointBR] == 1) {
          this.applyMovement.xSpeed = 0
          this.applyMovement.ySpeed = 0
          diagonal = true
          return true
        }
        //checking to see if there is a collision in south west direction
        if (currentMap[SWyPointBL][SWxPointBL] == 1 || currentMap[SWyPointBR][SWxPointBR] == 1 || currentMap[SWyPointC][SWxPointC] == 1) {
          this.applyMovement.xSpeed = 0
          this.applyMovement.ySpeed = 0
          diagonal = true
          return true
        }
      }
      return false
    }
  }
  //randomised movement for AI
   moveAI() {
    //every interval, move in a random x and y direction 
    if ((milliseconds % 1000) > 0 && (milliseconds % 1000) < 8) {
      this.xSpeed = random(-0.85, 0.85)
      this.ySpeed = random(-0.85, 0.85)
    }
    if (!this.collisionForAI()) {
      gridXZ = Math.floor(this.x / sqSize)
      gridYZ = Math.floor(this.y / sqSize)
      if (gridXZ >= 0 && gridXZ < 20 && gridYZ >= 0 && gridYZ < 20) {
        if (currentMap[gridYZ][gridXZ] !== 3) {
          this.x += this.xSpeed
          this.y += this.ySpeed
        }
        if (currentMap[gridYZ][gridXZ] == 3) {
          this.x += this.xSpeed / 2
          this.y += this.ySpeed / 2
        }
      }
    }
  }
  collisionForAI() {
    //calcuating all collision points
    positionX = Math.floor(this.x / sqSize)
    positionY = Math.floor(this.y / sqSize)

    xPointTL = Math.floor((this.x - this.width / 2.1 + this.xSpeed) / sqSize)
    yPointTL = Math.floor((this.y - this.height / 2.1 - this.ySpeed) / sqSize)
    xPointTR = Math.floor((this.x + this.width / 2.1 + this.xSpeed) / sqSize)
    yPointTR = Math.floor((this.y - this.height / 2.1 - this.ySpeed) / sqSize)
    xPointTR = Math.floor((this.x + this.width / 2.2 + this.xSpeed) / sqSize)
    yPointTR = Math.floor((this.y - this.height / 2.2 - this.ySpeed) / sqSize)
    xPointBR = Math.floor((this.x + this.width / 2.2 - this.xSpeed) / sqSize)
    yPointBR = Math.floor((this.y + this.height / 2.2 - this.ySpeed) / sqSize)
    xPointTL = Math.floor((this.x - this.width / 2.1 + this.xSpeed) / sqSize)
    yPointTL = Math.floor((this.y - this.height / 2.1 - this.ySpeed) / sqSize)
    xPointBL = Math.floor((this.x - this.width / 2.1 - this.xSpeed) / sqSize)
    yPointBL = Math.floor((this.y + this.height / 2.1 + this.ySpeed) / sqSize)
    xPointBL = Math.floor((this.x - this.width / 2.2 - this.xSpeed) / sqSize)
    yPointBL = Math.floor((this.y + this.height / 2.2 + this.ySpeed) / sqSize)
    xPointBR = Math.floor((this.x + this.width / 2.2 - this.xSpeed) / sqSize)
    yPointBR = Math.floor((this.y + this.height / 2.2 - this.ySpeed) / sqSize)

    //check if collision points are within the bounds
    if (positionX >= 0 && positionX < 20 && positionY >= 0 && positionY < 20 &&
      xPointTL >= 0 && xPointTL < 20 && yPointTL >= 0 && yPointTL < 20 &&
      xPointTR >= 0 && xPointTR < 20 && yPointTR >= 0 && yPointTR < 20 &&
      xPointBL >= 0 && xPointBL < 20 && yPointBL >= 0 && yPointBL < 20 &&
      xPointBR >= 0 && xPointBR < 20 && yPointBR >= 0 && yPointBR < 20) {
      //check for top left x  collision point
      if (currentMap[positionY][xPointTL] == 1) {
        this.xSpeed = -this.xSpeed
      }
      //check for top left y collision point
      if (currentMap[yPointTL][positionX] == 1) {
        this.ySpeed = -this.ySpeed
      }
      //check for top right y collision point.
      if (currentMap[yPointTR][positionX] == 1) {
        this.ySpeed = -this.ySpeed
      }
      //check for top right x collision point.
      if (currentMap[positionY][xPointTR] == 1) {
        this.xSpeed = -this.xSpeed
      }
      //check for bottom right x collision point.
      if (currentMap[positionY][xPointBR] == 1) {
        this.xSpeed = -this.xSpeed
      }
      //check for bottom right y collision point.
      if (currentMap[yPointBR][positionX] == 1) {
        this.ySpeed = -this.ySpeed
      }
      //check for bottom left x collision point.
      if (currentMap[positionY][xPointBL] == 1) {
        this.xSpeed = -this.xSpeed
      }
      //check for bottom left y collision point
      if (currentMap[yPointBL][positionX] == 1) {
        this.ySpeed = -this.ySpeed
      }
    }
  }

  fire(x, y, enemyTank, speed) {
    //shooting bullets
    push()
    angleMode(RADIANS)
    translate(this.x, this.y)
    xShootingDirection = x - this.x
    yShootingDirection = y - this.y
    shootingDirection = atan2(yShootingDirection, xShootingDirection)
    //bullet is shot at the end of the turret in any given direction
    b = new Bullet((this.x + (27 * cos(shootingDirection))), this.y + (27 * sin(shootingDirection)), shootingDirection, speed)
    this.bullets.push(b)
    if (enemyTank != true) {
      tankShoot.setVolume(0.1)
      tankShoot.play()
    }
    pop()
  }
}
