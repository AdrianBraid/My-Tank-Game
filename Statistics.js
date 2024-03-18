class statistic {
  constructor(x, y, textSize, colour) {
    this.x = x
    this.y = y
    this.textSize = textSize
    this.colour = colour
    this.score = 0
    this.MainMenu;
    this.RestartLevel;
    this.updateSpeed;
    this.updateBullets
    this.updateSM;
    this.updateBulletSpeed;
    this.updateBB;
  }

  display() {
    text("SCORE: " + this.score, 0, 30)
  }

  //someone complain that the text moves due to the textALign being central
  losingScreen() {
    //code for display the screen once the user tank has been eliminated (in single player)
    push()
    noStroke()
    rectMode(CENTER)
    fill(this.colour)
    textSize(this.textSize)
    fill((169, 169, 169))
    textAlign(LEFT)
    rect(this.x, this.y, width / 2, height / 2.5, 25)
    fill(0)
    text("You Died!", 400, this.y / 1.4)
    fill(56, 111, 239)
    rect(this.x, this.y - 80, width / 2.3, height / 15, 25)
    fill(255)
    textSize(this.textSize / 1.2)
    text("Eliminations: " + tank1.eliminations, 315, 435)
    fill(56, 111, 239)
    rect(this.x, this.y, width / 2.3, height / 15, 25)
    fill(255)
    text("Level: " + (mapNumber + 1), 315, 515)
    fill(56, 111, 239)
    rect(this.x, this.y + 80, width / 2.3, height / 15, 25)
    fill(255)
    text("Score: " + (tank1.score), 315, 595)
    rectMode(CENTER)
    fill(230, 0, 0)
    rect(380, 655, width / 6, height / 15, 25)
    fill(255)
    textSize(20)
    strokeWeight(10)
    fill(56, 111, 239)
    rect(600, 655, width / 6, height / 15, 25)
    fill(255)
    text("RESTART LEVEL", 520, 660)
    textSize(20)
    strokeWeight(10)
    text("RETURN TO", 320, 655)
    text("MENU", 350, 675)
    pop()
  }

  //displays the amount of eliminations the user tank has in single player at the top of the screen
  eliminations() {
    push()
    strokeWeight(7)
    textSize(30)
    fill(255)
    stroke(0)
    text("ELIMINATIONS: " + tank1.eliminations, 200, 30)
    pop()
  }

  //displays the level number the user tank is on in single player at the top of the screen
  levelNumber() {
    push()
    stroke(0)
    strokeWeight(7)
    textSize(30)
    fill(255)
    textSize(30)
    text("LEVEL: " + (mapNumber + 1), 855, 30)
    pop()
  }
  //displayts the amount of ammo the user tank has at the top of the screen in single player
  ammo() {
    push()
    stroke(0)
    strokeWeight(7)
    fill(255)
    textSize(30)
    text("AMMO: " + ((tankAmmoCapacity + 1) - (tank1.bullets.length)), 705, 30)
    pop()
  }
  //
  upgradeMenu() {
    push()
    noStroke()
    rectMode(CENTER)
    fill(this.colour)
    textSize(this.textSize)
    fill((169, 169, 169))
    textAlign(CENTER)
    rect(this.x, this.y, width / 1.5, height / 2.2, 25)
    fill(0)
    text("Select an Upgrade!", this.x, this.y / 1.5)
    fill(255)
    rect(this.x, this.y - 80, width / 1.55, height / 20, 25)
    fill(0)
    textSize(20)
    text("Upgrade Type:", this.x - 240, this.y - 120)
    textSize(30)
    text("Tank Speed(10% Increase) ", this.x - 125, this.y - 70)
    fill(255)
    rect(this.x, this.y - 20, width / 1.55, height / 20, 25)
    fill(0)
    text("Maximum Bullets(+2)", this.x - 170, this.y - 10)
    fill(255)
    rect(this.x, this.y + 40, width / 1.55, height / 20, 25)
    fill(0)
    text("Bullet Bounce(+1)", this.x - 190, this.y + 50)
    fill(255)
    rect(this.x, this.y + 100, width / 1.55, height / 20, 25)
    fill(0)
    text("Bullet Speed(10% Increase)", this.x - 125, this.y + 110)
    //button for upgrading speed
    rectMode(CENTER)
    fill(56, 111, 239)
    rect(740, 420, width / 8, height / 25, 25)
    fill(255)
    textSize(23)
    text("Upgrade", 740, 427)
    //button for upgrading maximumBullets
    fill(56, 111, 239)
    rect(740, 480, width / 8, height / 25, 25)
    fill(255)
    text("Upgrade", 740, 487)
    //button for upgrading bullet bounce
    fill(56, 111, 239)
    rect(740, 540, width / 8, height / 25, 25)
    fill(255)
    text("Upgrade", 740, 547)
    //button for upgrading bullet speed
    fill(56, 111, 239)
    rect(740, 600, width / 8, height / 25, 25)
    fill(255)
    text("Upgrade", 740, 607)
    pop()
  }

  //the screen displayed once the user wins in single player
  winningScreen() {
    push()
    noStroke()
    rectMode(CENTER)
    textSize(this.textSize)
    fill(120, 190, 33, 140)
    textAlign(LEFT)
    rect(this.x, this.y, width / 1.5, height / 2, 25)
    fill(255)
    text("YOU'VE WON!!", 330, 320)
    fill(255, 160)
    rect(this.x, this.y - 80, width / 1.55, height / 20, 25)
    fill(0)
    textSize(30)
    text("YOUR STATISTICS:", 185, 380)
    textSize(30)
    text("YOUR SCORE: " + (tank1.score), 215, 430)
    fill(255, 160)
    rect(this.x, this.y - 20, width / 1.55, height / 20, 25)
    fill(0)
    text("TIME: " + (finishMinutes + ":" + finishSeconds), 215, this.y - 10)
    fill(255, 160)
    rect(this.x, this.y + 40, width / 1.55, height / 20, 25)
    fill(0)
    text("Deaths: " + (tank1.deaths), 215, this.y + 50)
    fill(255, 160)
    rect(this.x, this.y + 100, width / 1.55, height / 20, 25)
    fill(0)
    text("Eliminations:" + (tank1.eliminations), 215, this.y + 110)
    fill(255)
    rect(485, 690, width / 4, height / 10, 25)
    fill(0)
    text("RETURN TO", 400, 685)
    text("MAIN MENU", 400, 715)
    pop()
  }
  //shows the score of the user tank
  tankScore() {
    //displaying the tank score
    push()
    stroke(0)
    strokeWeight(7)
    fill(255)
    textSize(30)
    text("SCORE: " + tank1.score, 0, 30)
    pop()
  }

  //the timer for the game
  timer() {
    //displaying the time left.
    push()
    stroke(0)
    strokeWeight(7)
    textSize(30)
    fill(255)
    seconds = int(seconds / 1000)
    text("TIME: " + minFormat + ":" + secsFormat, width / 2, 30)
    min = Math.floor(seconds / 60);
    secs = seconds % 60;
    minFormat = nf(min, 2)
    secsFormat = nf(secs, 2)
    pop()
  }

  //tells you who's won the game after the 10 levels in multiplayer.
  multiplayerWinningScreen() {
    push()
    rectMode(CENTER)
    fill(255)
    textAlign(CENTER)
    rect(this.x, this.y, width/1.5, height / 15, 25)
    fill(0)
    textSize(height / 25)
    if (tank1.playerDeaths < enemyTank.playerDeaths) {
      text("Player One (blue tank) has won!", 500, 515)
    }
    else {
      text("Player two (black tank) has won", 500, 515)
    }
    pop()
  }
}
//function that returns players to main menu
function mainMenu() {
  window.location.assign("/")
}

//responsible for replaying levels
function replayLevel() {
  tank1.bullets.length = 0
  tank1.death = false
  initializeLevel(false)
}

//responsible for upgrading speed 
function updateSpeed() {
  //increase speed by 10%
  tank1.speedMultiplier = tank1.speedMultiplier * 1.1
}

//responsible for upgrading max bullet capcaity
function updateMaxBullets() {
  //add 2 to the ammo capacity
  tankAmmoCapacity = tankAmmoCapacity + 2
}
//responsible for upgrading the amount of bullet bounces
function updateBulletBounce() {
  //increase bullet bounce by 1
  maxBulletBounce = maxBulletBounce + 1
}
//responsible for upgrading bullet speed
function updateBulletSpeed() {
  //increase bullet speed by 10%
  bulletSpeed = bulletSpeed * 1.1
}