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
let enemyHit;
let milliseconds;
let tankAmmoCapacity = 4
let bulletSpeed = 3
let showUpgradeMenu;
let finishMinutes;
let finishSeconds;
let timeCalc = false

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
  tank1 = new Tank(150, 100, 40, 40, userTank, userTurret, true)
  playerData = new statistic(width / 2, height / 2, 50, "black")
  angleMode(RADIANS);
  initializeLevel(true)
  // applyMovement = { xSpeed: 0, ySpeed: 0, rotation: 0, shootingDirection: (3 * PI) / 2 }
}

function draw() {
  //the entire game is drawn here
  background(50)
  drawGrid()
  checkKeys()
  enemyAI()
  changeLevel()
  userTank1()
  statistics()
}

function checkKeys() {
  //Dealing with the movement for the user tank (tank1/blue tank)
  if (tank1.death != true) {
    //check if WASD has been pressed
    if (keyIsDown(87) || keyIsDown(83) || keyIsDown(68) || keyIsDown(65)) {
      //if W/w has been pressed, set north value to 8
      if (keyIsDown(87)) {
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
      if (keyIsDown(83)) {
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
      if (keyIsDown(68)) {
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
      if (keyIsDown(65)) {
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
}

function enemyAI() {
  //function for the enemy AI in singleplayer
  //loop through the enemies array (where the enemyAI are stored), and show the tank and turret
  for (i = 0; i < enemies.length; i++) {
    if (enemies[i].death != true) {
      enemies[i].showAI()
      enemies[i].showTurret(tank1.x, tank1.y)
      //loop through each of the enemy AI bullets, displaying where they are, how they're moving and what colour they are.
      for (l = 0; l < enemies[i].bullets.length; l++) {
        enemies[i].bullets[l].draw(0, 0, 0)
        enemies[i].bullets[l].update()
        //if an enemy bullet hits the user tank, destroy remove their tank off the game
        if (enemies[i].bullets[l].bulletCollision(tank1.x, tank1.y, tank1.width / 2, tank1.height / 2)) {
          tank1.death = true
        }
        //code for bouncing bullets
        enemies[i].bullets[l].collision()
        if (enemies[i].bullets[l].bouncey(true) || tank1.death) {
          enemies[i].bullets.splice(i, 1)
        }
      }
      //enemyAI shoot between an interval between 0.08ms and 0
      if ((milliseconds % 1000) > 0 && (milliseconds % 1000) < 8) {
        enemies[i].fire(tank1.x, tank1.y, true, 3)
      }
      for (j = 0; j < enemies[i].bullets.length; j++) {
        if (enemies[i].bullets[j].bulletCollision(tank1.x, tank1.y, tank1.width / 2, tank1.height / 2)) {
          tank1.death = true
        }
      }
    }
  }
}


function changeLevel() {
  //function responsible for changing the level
  //if all enemies have died and the level is less than 9, remove all the user tanks bullet, show the upgrade menu and after the upgrade menu has been interacted with, intialize the next level.
  if (enemies.length == 0 && mapNumber < 9) {
    tank1.bullets.length = 0
    if (showUpgradeMenu == true) {
      playerData.upgradeMenu()
    }
    if (showUpgradeMenu == false) {
      mapNumber++
      initializeLevel(true)
    }
  }
  //calculating the time once the game is over to display on winning screen
  if (enemies.length == 0 && mapNumber == 9 && timeCalc == false) {
    finishMinutes = minFormat
    finishSeconds = secsFormat
    timeCalc = true
  }
  //display the winning screen, once the time has been calculated and the levels have been completed.
  if (enemies.length == 0 && mapNumber == 9 && timeCalc) {
    playerData.winningScreen()
  }
}


function userTank1() {
  //the user tanks functions
  //checking to see if the user tank is still alive
  if (tank1.death != true) {
    //looping through each individaul user tank bullet
    for (i = 0; i < tank1.bullets.length; i++) {
      //loop through each individual bullet, then draw it and show its colour 
      tank1.bullets[i].update()
      tank1.bullets[i].draw(135, 206, 250)
      //if the user tank bullet hits itself, eliminate the user tank, adding onto the amount of deaths they've had 
      if (tank1.bullets[i].bulletCollision(tank1.x, tank1.y, tank1.width / 2, tank1.height / 2)) {
        tank1.death = true
        tank1.deaths++
      }
      //loop through each individaul enemyAI
      for (j = 0; j < enemies.length; j++) {
        //if the user tank bullet hits any enemy AI, eliminate the enemy AI, while simultaenously adding a score to the tanks score. Increasing the amount of eliminations the tank has and removing the bullet once the tanks eliminated.
        if (tank1.bullets[i].bulletCollision(enemies[j].x, enemies[j].y, enemies[j].width / 2, enemies[j].height / 2)) {
          enemyHit = true
          tank1.eliminations++
          tank1.score = tank1.score + 100
          enemies.splice(j, 1)
        }
      }
      //bullet bounce for the user tank
      tank1.bullets[i].collision()
      //checking if the number of bullet bounces has exceeded 4, checking if there is a bullet collision with a wall, if there is a bullet colision with itself or if it has hit an enemy.
      if (tank1.bullets[i].bouncey(false) || tank1.bullets[i].wallCollision() || tank1.bullets[i].bulletCollision(tank1.x, tank1.y, tank1.width / 2, tank1.height / 2) || enemyHit) {
        //checking if there is a collision, if so, delete the bullet.
        enemyHit = false
        tank1.bullets.splice(i, 1)
      }
    }
  }
//if the tank is still alive, show its turret.
  if (tank1.death != true) {
    tank1.showTurret(mouseX, mouseY)
  }
  tank1.check()
  //if the tank has died, show losing screen and remove bullets that pre-existed on the map.
  if (tank1.death) {
    tank1.bullets.length = 0
    playerData.losingScreen()
  }
}


function statistics() {
  //function responsible for showing the user tanks ammo, score, time spent in game, eliminatons and level number.
  playerData.ammo()
  playerData.tankScore()
  playerData.timer()
  playerData.eliminations()
  playerData.levelNumber()
  seconds = millis()
  milliseconds = millis()
}

function mouseClicked() {
  //if the mouse has been clicked shoot a bullet.
  if (tank1.bullets.length <= tankAmmoCapacity) {
    tank1.fire(mouseX, mouseY, false, bulletSpeed)
  }

  //check if the death screen is displayed
  if (tank1.death == true) {
    //if the mouse is clicked within the bounds of the return to menu button, return player to menu
    if (mouseX > (380 - (width / 6) / 2) && mouseX < (380 + (width / 6) / 2) && mouseY > (655 - (height / 15) / 2) && mouseY < (655 + (height / 15) / 2)) {
      mainMenu()
    }
    //if the mouse is clicked within the bounds of the restart level button, restart the level.
    if (mouseX > (600 - (width / 6) / 2) && mouseX < (600 + (width / 6) / 2) && (655 - (height / 15) / 2) && mouseY < (655 + (height / 15) / 2)) {
      replayLevel()
    }
  }
  //check if the upgrade menu is bieng displayed
  if (showUpgradeMenu == true) {
    //if the mouse is clicked within the bounds of the upgrade speed button, the run the function to upgrade speed, then set the menu to false to not show the upgrade menu
    if (mouseX > (740 - (width / 8) / 2) && mouseX < (740 + (width / 8) / 2) && mouseY > (420 - (height / 25) / 2) && mouseY < (420 + (height / 25) / 2)) {
      updateSpeed()
      showUpgradeMenu = false
    }
    //if the mouse is clicked within the bounds of the upgrade capacity of bullets button, then upgrade the maximum amount of bullets, then set the menu to false to not show the upgrade menu
    if (mouseX > (740 - (width / 8) / 2) && mouseX < (740 + (width / 8) / 2) && mouseY > (480 - (height / 25) / 2) && mouseY < (480 + (height / 25) / 2)) {
      updateMaxBullets()
      showUpgradeMenu = false
    }
    //if the mouse is clicked within the bounds of the upgrade bullet bounce button, then run the function to increase bullet bounce, then set the menu to false to not show the upgrade menu
    if (mouseX > (740 - (width / 8) / 2) && mouseX < (740 + (width / 8) / 2) && mouseY > (540 - (height / 25) / 2) && mouseY < (540 + (height / 25) / 2)) {
      updateBulletBounce()
      showUpgradeMenu = false
    }
    //if the mouse is clicked within the bounds of the upgrade speed button, then upgrade the speed of the tank, then set the menu to false to not show the upgrade menu
    if (mouseX > (740 - (width / 8) / 2) && mouseX < (740 + (width / 8) / 2) && mouseY > (600 - (height / 25) / 2) && mouseY < (600 + (height / 25) / 2)) {
      updateBulletSpeed()
      showUpgradeMenu = false
    }
  }
  //checking when the winning display is shown
  if (mapNumber == 9 && enemies.length == 0) {
    //return to main menu if main menu button is pressed.
    if (mouseX > (485 - ((width / 4) / 2)) && mouseX < (485 + ((width / 4) / 2)) && mouseY > (690 - ((height / 10) / 2)) && mouseY < (690 + ((height / 10) / 2))) {
      mainMenu()
    }
  }
}
