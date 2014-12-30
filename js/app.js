"use strict"
var enemyNum = 5;
var collision = 0;
var score = 0;
var myLives = 4;
var enemySpeed = 10;
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = Math.random() * 384;
    this.y = (Math.floor(Math.random() * 3) * 80) + 65;
    console.log(this.y);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (myLives < 1) {
        enemySpeed = 500;
        console.log("fast enemy!")
    }
    this.x = this.x + (dt * enemySpeed);
    if (this.x > 505) {
        this.x = 0;
        this.y = (Math.floor(Math.random() * 3) * 80) + 65;
    }    
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-princess-girl.png';
    this.x = 201.5;
    this.y = 410;

}

Player.prototype.update = function() {
    if (myLives > 0) {


    checkCollisions(this.x, this.y);
    if (collision) {
        myLives = myLives - 1;
        console.log("Lives: ", myLives);
        this.reset();
        collision = 0;
    }
    else if (this.y < 10) {
        score = score + 1;
        console.log("score:", score);
        this.reset();
    }
    else if (this.currKey === 'right') {
        this.x = this.x + 100;
        if (this.x > 401.5) {
            this.x = 401.5;
        }
    }
    else if (this.currKey === 'left') {
        this.x = this.x - 100;
        if (this.x < 0) {
            this.x = 0;
        }
    }
    else if (this.currKey ==='up') {
        this.y = this.y - 82;
        //if (this.y < 80) {
         //   this.reset();
        //}
    }
    else if (this.currKey === 'down') {
        this.y = this.y + 82;
        if (this.y > 410) {
        this.y = 410;  
        }
    }
}//end if
    this.currKey = null;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(myKey) {
    this.currKey = myKey;

}

Player.prototype.reset = function() {
        this.x = 201.5;
        this.y = 410;
    if (myLives > 0) {
        console.log("resetting")

    }
    else {
        player.sprite = 'images/char-princess-girl-dead.png'
        console.log("Game Over");
    }

}


function checkCollisions(playerX, playerY) { // 1 function bracket
    if (myLives > 0) {//0 if player alive


        for (var b = 0; b < enemyNum; b++) { // 2 for b bracket
            var thisEnemy = allEnemies[b];
            //console.log("playerY=", playerY, " thisEnemy.y=", thisEnemy.y);
            if ((playerY === 246 && thisEnemy.y === 225) || (playerY === 164 && thisEnemy.y === 145) 
                || (playerY === 82 && thisEnemy.y === 65)) { // 3 if player is dangerous row
                console.log("playerY=", playerY, " thisEnemy.y=", thisEnemy.y, "Dangerous row");
                //Is bug on left or maybe on top of the player?
                if ((playerX + 15) >= (thisEnemy.x -1)) { // 4 enemy on left
                    if ((playerX - thisEnemy.x) < 98) { // 5left collision check
                        collision = 1;
                        console.log("left collision", collision)
                        return;
                    } // end 5 left collision check
                }  //end  4 all left
                    //since bug not on left or on top, bug on right.  
                else if ((thisEnemy.x - playerX) < 75) { // 6 else right collision check
                     collision = 1;
                     console.log("right collision")
                     return;
                    } // end 6 right collision
                
            }  //3 end dangerous row
        }  //2 end for b
    }//0end live player
    else {
        console.log("lots of enemies)");
    }
}//1 end function

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
for (var i = 0; i < enemyNum; i++) {
    allEnemies.push(new Enemy());
};

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
