let d;
let bulletX;
let bulletY;
let downBulletY;
let rightBulletX;
let upBulletY;
let leftBulletX;
let locationX;
let locationY;
let futureX;
let futureY;
let bulletXF;
let bulletYF;
let bulletLife;
let maxBulletBounce = 3
class Bullet {

  constructor(x, y, d, m) {
    //a position vector and velocity vector are created
    this.pos = createVector(x, y)
    this.velocity = createVector(1, 0).setHeading(d).setMag(m)
    //amount of bounces a bullet can have
    this.bounce = 0
  }

  update() {
    //adds velocity to position of bullet so that the bullet moves.
    this.pos.add(this.velocity)
  }

  draw(r, g, b) {
    //r,g,b are arguments passed which is the RGB format that the bullet will be drawn in
    fill(r, g, b)
    //the bullet is drawn in the shape of a circle
    circle(this.pos.x, this.pos.y, 5)
  }
  bulletCollision(x, y, width, height) {
    //if statement for when the bullet collides with any tank
    if (this.pos.x > x - width && this.pos.x < x + width &&
      this.pos.y > y - height && this.pos.y < y + height) {
      console.log("detect")
      return true
    }
  }

  collision() {
    //calculating the bullets x and y positions, with respects to the grid
    bulletX = Math.floor(this.pos.x / sqSize)
    bulletY = Math.floor(this.pos.y / sqSize)
    //calculating the bullets future x and y positions, with respects to the grid
    futureX = Math.floor((this.pos.x + this.velocity.x) / sqSize)
    futureY = Math.floor((this.pos.y + this.velocity.y) / sqSize)
    //checking to see if the bullet is within the range of the map
    if (bulletX >= 0 && bulletX < 20 && bulletY >= 0 && bulletY < 20 &&
      futureX >= 0 && futureX < 20 && futureY >= 0 && futureY < 20) {
      //checking if the future bullet has a collision
      if (currentMap[futureY][futureX] == 1) {
        //if the future x bullet is not equal to the bullets x position, increment bounce property and flip the velocity x axis.
        if (futureX != bulletX) {
          this.bounce++
          this.velocity.x = -this.velocity.x
        }
        //if the future y bullet is not equal to the bullets y position, increment bounce property and flip the velocity in the y axis.
        if (futureY != bulletY) {
          this.bounce++
          this.velocity.y = -this.velocity.y
        }
      }
    }
    //if the bullet hits the left side or top side of the barrier, flip the x velocity of the bullet and incrmenet bounce property.
    if (this.pos.x > width || this.pos.x < 0) {
      this.velocity.x = -this.velocity.x
      this.bounce = this.bounce + 1
    }
    //if the bullet hits the right side or bottom side of the barrier, flip the y velocity of the bullet and incrmenet bounce property.
    if (this.pos.y > height || this.pos.y < 0) {
      this.velocity.y = -this.velocity.y
      this.bounce = this.bounce + 1
    }
  }
  //method for dealing with each bullet bounce, argument "enemyTank" is passed in as enemyTank doesnt have the same amount of bounces as user tank.
  bouncey(enemyTank) {
    //checking if its the enemy AI's bullet
    if (enemyTank) {
      //if the enemy AI's bullet bounce is 2, return true
      if (this.bounce == 2) {
        return true
      }
    }
    else {
      //checking if its not the enemy tank
      if (!enemyTank) {
        //if the bullet bounce for the user tank is the max amount of bounces it can have, return true
        if (this.bounce == maxBulletBounce) {
          return true
        }
      }
    }
  }

  //a method dealing with any situation where the bullet ends up in the wall (though this is very unlikely and hasnt happened since i fixed the issue, as said in my development log)
  wallCollision() {
    //calculating the bullets x and y future position, with respects to the grid
    bulletXF = Math.floor(this.pos.x / sqSize)
    bulletYF = Math.floor(this.pos.y / sqSize)

    //check to see if the bullets x and y future positions are within the range of the map
    if (bulletXF >= 0 && bulletXF < 20 && bulletYF >= 0 && bulletYF < 20) {
      //if the bullet is inside a wall, delete the bullet.
      if (currentMap[bulletYF][bulletXF] == 1) {
        return true
      }
    }
  }
}