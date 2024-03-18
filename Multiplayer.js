let userTank;
let tank1;
let wall;
let floor
let imgs = []
let sqSize = 50
let b;
let seconds;
let RandomiseX;
let RandomiseY;
let enemyTank1;
let coinCollect;
let tankShoot;
let applyMovement;
let userTurret;
let enemyTurret;
let northCalc;
let southCalc;
let eastCalc;
let westCalc;
let directionCalc2;
let userTank123;
let losingScreen;
let enemyCount;
let enemyTank2;
let enemyHit;
let milliseconds;
let tankAmmoCapacity = 4
let bulletSpeed = 3
let showMenu;

//the features that have to be loaded in before the game starts.
function preload() {
  userTank = loadImage('Tanks/TankN.svg')
  userTurret = loadImage('Tanks/Blue_turret2.svg')
  enemyTank1 = loadImage('Tanks/Black_tank_base.svg')
  enemyTurret = loadImage('Tanks/Black_turret2.svg')
  wall = loadImage('map/wall.png')
  floor = loadImage('map/floor.jpg')
  coin = loadImage('map/coin.png')
  cobweb = loadImage('map/cobweb.png')
  imgs.push(floor)
  imgs.push(wall)
  imgs.push(coin)
  imgs.push(cobweb)
  coinCollect = loadSound('Sound/coinCollect.mp3')
  tankShoot = loadSound('Sound/tankShoot.mp3')
}

//this sets up the game before it begins.
function setup() {
  createCanvas(1000, 1000)
  background(50)
  playerData = new statistic(width / 2, height / 2, 50, "black")
  tank1 = new Tank(150, 100, 40, 40, userTank, userTurret, true)
  enemyTank = new Tank(500, 550, 40, 40, enemyTank1, enemyTurret, false)
  playerData = new statistic(width / 2, height / 2, 50, "black")
  angleMode(RADIANS);
  initializeMultiplayerLevel()
}

//the entire game is drawn here
function draw() {
  background(50)
  drawGrid()
  checkKeys()
  player1()
  player2()
  levelChange()
}

function checkKeys() {
  //Dealing with the movement for the user tank (tank1/blue tank)
  if (tank1.death != true) {
    //check if W/A/S/D has been pressed
    if (keyIsDown(87) || keyIsDown(119) || keyIsDown(115) || keyIsDown(83) || keyIsDown(68) || keyIsDown(100) || keyIsDown(65) || keyIsDown(97)) {
      //if W/w has been pressed, set north value to 8
      if (keyIsDown(87) || keyIsDown(119)) {
        northCalc = 8
        north = true
        south = false
        east = false
        west = false
      }
      else {
        northCalc = 0
      }
      //if S/s has been pressed, set south value to 2
      if (keyIsDown(115) || keyIsDown(83)) {
        southCalc = 2
        south = true
        north = false
        east = false
        west = false
      }
      else {
        southCalc = 0
      }
      //if E/e is pressed, set east value to 1
      if (keyIsDown(68) || keyIsDown(100)) {
        eastCalc = 1
        east = true
        north = false
        south = false
        west = false
      }
      else {
        eastCalc = 0
      }
      //If A/a is pressed, set west value to A
      if (keyIsDown(65) || keyIsDown(97)) {
        westCalc = 4
        west = true
        north = false
        east = false
        south = false
      }
      else {
        westCalc = 0
      }
      //Calculating which direction the tank will go in dependent on the buttons pressed
      directionCalc = northCalc + southCalc + eastCalc + westCalc
      //moving and showing the tank based on its direction
      tank1.move(directionCalc)
      tank1.show(directionCalc)
    }
    else {
      // no movement if nothing pressed.
      directionCalc = 0
      tank1.move(directionCalc)
      tank1.show(directionCalc)
    }
  }
  //checking to see if there has been no death for player 2 (enemyTank)
  if (enemyTank.death != true) {
    //check if I/J/K/L has been pressed
    if (keyIsDown(73) || keyIsDown(74) || keyIsDown(75) || keyIsDown(76)) {
      //check if I/i has been pressed. 
      if (keyIsDown(73)) {
        northCalc = 8
        north = true
        south = false
        east = false
        west = false
      }
      else {
        northCalc = 0
      }
      //check if J/j has been pressed
      if (keyIsDown(74)) {
        westCalc = 4
        north = false
        south = false
        west = true
        east = false
      }
      else {
        westCalc = 0
      }
      //check if K/k has been pressed
      if (keyIsDown(75)) {
        southCalc = 2
        north = false
        south = true
        west = false
        east = true
      }
      else {
        southCalc = 0
      }
      //check if L/l has been pressed
      if (keyIsDown(76)) {
        eastCalc = 1
        north = false
        south = false
        east = true
        west = true
      }
      else {
        eastCalc = 0
      }
      //Calculating which direction the tank will go in dependent on the buttons pressed
      directionCalc = northCalc + southCalc + eastCalc + westCalc
      //moving and showing the tank based on its direction
      enemyTank.move(directionCalc)
      enemyTank.show(directionCalc)
    }
    else {
      //no movement if nothing pressed.
      directionCalc = 0
      enemyTank.move(directionCalc)
      enemyTank.show(directionCalc)
    }
  }
}

function levelChange() {
  //function responsible for changing the level
  //if player 1 (blue tank) or player 2 (enemy(black) tank) is eliminated, change level but the map number has to be less than 9 as mapNumber 9 is level 10.
  if ((tank1.death || enemyTank.death) && mapNumber < 9) {
    console.log("yet")
    mapNumber++
    tank1.bullets.length = 0
    enemyTank.bullets.length = 0
    initializeMultiplayerLevel()
  }
  //if player1/player2 are dead and they're on the last level (10), show w
  if ((tank1.death || enemyTank.death) && mapNumber == 9) {
    console.log("true")
    playerData.multiplayerWinningScreen()
  }
}

//all of player 1's functions 
function player1() {
  //check if player 1 is not eliminated
  if (tank1.death != true) {
    //loop through each individual bullet. draw it, update the bullets position.
    for (i = 0; i < tank1.bullets.length; i++) {
      //loop through each individual bullet, then draw it.
      tank1.bullets[i].update()
      tank1.bullets[i].draw(135, 206, 250)
      //check if there has been a bullet collision with the enemy
      if (tank1.bullets[i].bulletCollision(enemyTank.x, enemyTank.y, enemyTank.width / 2, enemyTank.height / 2)) {
        enemyTank.death = true
        enemyTank.playerDeaths++
      }
      //check if there has been a bullet collision with the tank
      if (tank1.bullets[i].bulletCollision(tank1.x, tank1.y, tank1.width / 2, tank1.height / 2)) {
        tank1.death = true
        tank1.playerDeaths++
      }
      //bullet bounce for player 1
      tank1.bullets[i].collision()
      //check to see if the limit of bounces has been reached, if the bullet has intersected with a wall/player2/player1.
      if (tank1.bullets[i].bouncey(false) || tank1.bullets[i].wallCollision() || tank1.bullets[i].bulletCollision(enemyTank.x, enemyTank.y, enemyTank.width / 2, enemyTank.height / 2) || tank1.bullets[i].bulletCollision(tank1.x, tank1.y, tank1.width / 2, tank1.height / 2) || enemyHit) {
        enemyHit = false
        tank1.bullets.splice(i, 1)
      }
    }
  }
  //show turret if tank isnt destroyed.
  if (tank1.death != true) {
    tank1.showTurret(mouseX, mouseY)
  }
  tank1.check()
}


function player2() {
  //check to see if player 2 hasnt been eliminated 
  if (enemyTank.death != true) {
    //loop through each bullet
    for (i = 0; i < enemyTank.bullets.length; i++) {
      //show state of bullet and draw it
      enemyTank.bullets[i].update()
      enemyTank.bullets[i].draw(0, 0, 0)
      //check to see if player 2 bullet has intersected with player 1 bullet
      if (enemyTank.bullets[i].bulletCollision(tank1.x, tank1.y, tank1.width / 2, tank1.height / 2)) {
        tank1.death = true
        tank1.playerDeaths++
      }
      //check to see if player 2 bullet has intersected with itself
      if (enemyTank.bullets[i].bulletCollision(enemyTank.x, enemyTank.y, enemyTank.width / 2, enemyTank.height / 2)) {
        enemyTank.death = true
        enemyTank.playerDeaths++
      }
      //player 2 bullet bounce 
      enemyTank.bullets[i].collision()
      //check if player 2 bullet has reached the certain amount of bounces, if the bullet has his itself/player 1.
      if (enemyTank.bullets[i].bouncey() || enemyTank.bullets[i].bulletCollision(tank1.x, tank1.y, tank1.width / 2, tank1.height / 2) || enemyTank.bullets[i].bulletCollision(enemyTank.x, enemyTank.y, enemyTank.width / 2, enemyTank.height / 2)) {
        //delete the bullet.
        enemyTank.bullets.splice(i, 1)
      }
    }
  }
  //if player 2 is alive, show turret.
  if (enemyTank.death != true) {
    enemyTank.showTurret(tank1.x, tank1.y)
  }
  //method for preventing player 2 leaving barrier.
  enemyTank.check()
}


function mouseClicked() {
  //fire player1 bullet when mouse clicked
  tank1.fire(mouseX, mouseY, false, bulletSpeed)
}

function keyPressed() {
  //fire player2 bullet when enter key is pressed.
  if (keyCode == 13) {
    enemyTank.fire(tank1.x, tank1.y, false, 3)
  }
}
