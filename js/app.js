"use strict"
var myLives = 6;
var enemyNum = 6;
var collision = 0;
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = Math.random() * 384;
    this.y = (Math.floor(Math.random() * 4) * 80) + 80;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (dt * 1);
    if (this.x > 505) {
        this.x = 0;
        this.y = (Math.floor(Math.random() * 4) * 80) + 80;
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
    this.x = (555 / 2) - 50;
    this.y = 395;

}

Player.prototype.update = function() {
    if (this.y < 80 || collision) {
        player.reset;
        myLives = myLives - 1;
    }
    else if (this.currKey === 'right') {
        this.x = this.x + 100;
        if (this.x > 455) {
            this.x = 455;
        }
    }
    else if (this.currKey === 'left') {
        this.x = this.x - 100;
        if (this.x < 0) {
            this.x = 0;
        }
    }
    else if (this.currKey ==='up') {
        this.y = this.y - 80;
        if (this.y < 80) {
            player.reset;
        }
    }
    else if (this.currlKey === 'down') {
        this.y = this.y + 80;
        if (this.y > 395) {
        this.y = 395;  
        }
    }
    return;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(myKey) {
    this.currKey = myKey;

}
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
