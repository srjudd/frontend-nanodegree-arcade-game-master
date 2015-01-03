/**app.js
 * @fileoverview
 * app.js
 * This file codes a clone of a simplified frogger arcade game.
 * All script and image files for this frogger game were downloaded from the
 * Udacity github site. The app.js file was extended to flesh out the game.
 * https://github.com/udacity/frontend-nanodegree-arcade-game
 *
 * @author Renee Judd <a href = mailto:rjudd@nl.edu>Renee Judd</a>
 * @requires engine.js
 * @requires resources.js
 * @requires ../html.doc
 * @requires ../images/
 * @requires ../css/style.css
 *
 *
 ********************Section 1*************************************************
 *This section of code initializes global variables.
 */
'use strict'
var enemyNum = 5;
var level = 1;
var collision = 0;
var score = 0;
var myLives = 4;
var enemySpeed = 50;
var scoreBoard = document.getElementById('score');
var instructions = document.getElementById('instructions');

/******************** Section 2 ************************************************
 * This section defines the enemy and its methods */
var Enemy = function () {
    this.sprite = 'images/enemy-bug.png';
    this.x = Math.random() * 384;
    this.y = (Math.floor(Math.random() * 3) * 80) + 65;
}

/* Update the enemy's position, required method for game
 * Parameter: dt, a time delta between ticks to ensure that the game runs
 * at the same speed for all computers.
 */
Enemy.prototype.update = function (dt) {

    if (myLives === 0) {
        enemySpeed = 500; // if the game is over, the 
    }
    this.x = this.x + (dt * enemySpeed);
    if (this.x > 505) {
        // This small random increment prevents persistent x-bunching.
        this.x = 0 - Math.random() * 10;
        //The enemy can tandomly enter on any of the three stone rows.
        this.y = (Math.floor(Math.random() * 3) * 80) + 65;
    }
}

/** This method draws the enemy on the screen, required method for game. */
Enemy.prototype.render = function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    /******************** Section 3 ************************************************
     * This section of code sets up the player class.
     * The player class has an initial position and a sprite. It also has update(),
     * render(), handleInput(), and reset() methods.
     */
var Player = function () {
        this.sprite = 'images/char-princess-girl.png';
        this.x = 201.5;
        this.y = 410;
    }
    /* This method checks for a "live" player, then for collisions and for player 
     * reaching the water and handles these special situations.
     * Otherwise it updates the player position based on keyboard input
     * but does not allow the player to exceed the left and right keyboard margins.
     */
Player.prototype.update = function () {
        if (myLives > 0) {

            checkCollisions(this.x, this.y);
            if (collision) {
                myLives = myLives - 1;
                this.reset();
                collision = 0;
            } else if (this.y < 82) { // Player in water
                score = score + 1;
                if (score % 5 === 0) levelUp();
                this.reset();
            } else if (this.currKey === 'right') {
                this.x = this.x + 100;
                if (this.x > 401.5) {
                    this.x = 401.5;
                }
            } else if (this.currKey === 'left') {
                this.x = this.x - 100;
                if (this.x < 0) {
                    this.x = 0;
                }
            } else if (this.currKey === 'up') {
                this.y = this.y - 82;

            } else if (this.currKey === 'down') {
                this.y = this.y + 82;
                if (this.y > 410) {
                    this.y = 410;
                }
            }
        }
        this.currKey = null; // Resets the key info so that it doesn't stick.
    }
    /** Used by engine.js. */
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

/* Binds the current key to a Player property. */
Player.prototype.handleInput = function (myKey) {
    this.currKey = myKey;
}

/* Puts the player back at the starting point. If the player is out of lives,
 * the player sprite is switched and game instructions are updated.
 */
Player.prototype.reset = function () {
    this.x = 201.5;
    this.y = 410;
    drawScoreboard();
    if (myLives === 0) {
        player.sprite = 'images/char-princess-girl-dead.png'
        instructions.innerHTML = 'GAME OVER. To Play again, reload the page.'
    }

}

/******************** Section 4 ************************************************
 * These functions monitor and update the progress of the game when they are
 * called.
 *
 *
 * This function takes into account the different widths and up-down placement
 * in the immage tile of the player and an enemy.
 * It does nothing if the player is dead. (Game over.)
 * @param playerX    The x coordinate of the player when called.
 * @param playerY    The y coordinate of the player when called.
 */
function checkCollisions(playerX, playerY) {
    if (myLives > 0) {
        for (var b = 0; b < enemyNum; b++) {
            var thisEnemy = allEnemies[b];
            //Is the player in the same row as this enemy?
            if ((playerY === 246 && thisEnemy.y === 225) ||
                (playerY === 164 && thisEnemy.y === 145) || (playerY === 82 && thisEnemy.y === 65)) {
                //Is this enemy on left or maybe at the same spot as the player?
                if ((playerX + 15) >= (thisEnemy.x - 1)) { // enemy on left
                    if ((playerX - thisEnemy.x) < 98) { // left collision check
                        collision = 1;
                        return;
                    }
                }
                //since bug not on left or on top, bug on right.  
                else if ((thisEnemy.x - playerX) < 75) { // right collision check
                    collision = 1;
                    return;
                }
            }
        }
    }
}

/* Called by player's update method when conditions are met to go up a level. 
 */
function levelUp() {
    level = level + 1;
    myLives = myLives + 1;
    enemyNum = enemyNum + 1;
    score = score + 5;
    allEnemies.push(new Enemy());
}

/** Called at the start of game and 
when the scoring info needs to be updated. */
function drawScoreboard() {
    scoreBoard.innerHTML =
        'Level\: ' + level + '  Lives\: ' + myLives + '  Score\: ' + score;
}

/******************** Section 5 ************************************************
/* The code section starts the game by placing the scoreboard, instantiating 
* objects, listening for keyboard input. 
* Once the player and the enemies are instantiated, the game begins.
*/

drawScoreboard();

var allEnemies = [];
for (var i = 0; i < enemyNum; i++) {
    allEnemies.push(new Enemy());
};

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});