var enemyPosY = [60, 143, 226];
var enemySpeed = [100, 130, 160, 200, 250, 300, 400];
var gemPosX = [0, 101, 202, 303, 404, 505, 606, 707, 808];
var gemImages = ['images/Gem_Orange.png', 'images/Gem_Blue.png', 'images/Gem_Green.png'];
var playerImages = [
  'images/char-boy.png',
  'images/char-cat-girl.png',
  'images/char-horn-girl.png',
  'images/char-pink-girl.png',
  'images/char-princess-girl.png'
];

/**
 * Enemies our player must avoid.
 */
var Enemy = function() {
  this.sprite = 'images/enemy-bug.png';
  this.x = -100;
  this.y = enemyPosY[Math.floor(Math.random() * 3)];
  this.speed = enemySpeed[Math.floor(Math.random() * 7)];
}
/** 
 * Updates the enemy's position.
 * And resets player when collide.
 * @param dt A time delta between ticks.
 */
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x = this.x + (this.speed * dt);
  if (this.x > 960) {
    this.x = -100;
    this.y = this.y + 83;
    this.speed = enemySpeed[Math.floor(Math.random() * 7)];
    if (this.y > 226) {
      this.y = 60;
    }
  }

  if (this.x > -50 && this.x < 50) {
    this.tileX = 0;
  } else if (this.x > 50 && this.x < 150) {
    this.tileX = 101;
  } else if (this.x > 150 && this.x < 250) {
    this.tileX = 202;
  } else if (this.x > 250 && this.x < 350) {
    this.tileX = 303;
  } else if (this.x > 350 && this.x < 450) {
    this.tileX = 404;
  } else if (this.x > 450 && this.x < 550) {
    this.tileX = 505;
  } else if (this.x > 550 && this.x < 650) {
    this.tileX = 606;
  } else if (this.x > 650 && this.x < 750) {
    this.tileX = 707;
  } else if (this.x > 750 && this.x < 850) {
    this.tileX = 808;
  } else if (this.x > 850) {
    this.tileX = 1;
  }

  if (player.x === this.tileX && player.y === this.y) {
    player.reset();
    gameLife.decrease();
  }
}
/**
 * Renders the enemy on the screen.
 */
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


/**
 * Player class
 */
var Player = function() {
  this.pImg = playerImages[Math.floor(Math.random() * 5)];
  this.x = 404;
  this.y = 392;
}
/** 
 * Updates the player's position.
 * The player's position is updated by the direction of ctlKey value.
 * The player's position resets when reach the water.
 */
Player.prototype.update = function() {
  if (this.ctlKey === 'left' && this.x != 0) {
    this.x = this.x - 101;
  } else if (this.ctlKey === 'right' && this.x != 808) {
    this.x = this.x + 101;
  } else if (this.ctlKey === 'up') {
    this.y = this.y - 83;
  } else if (this.ctlKey === 'down' && this.y != 392) {
    this.y = this.y + 83;
  }
  this.ctlKey = null;

  if (this.y < 60) {
    this.reset();
    gameLife.decrease();
  }
}
/**
 * Move the player to initial position.
 */
Player.prototype.reset = function() {
  this.x = 404;
  this.y = 392;
}
/**
 * Renders the player on the screen.
 */
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.pImg), this.x, this.y);
}
/**
 * Sets control key for updating player's postion.
 * @param key Direction passed in from user's key input.
 */
Player.prototype.handleInput = function(key) {
  this.ctlKey = key;
}


/**
 * A player should try to collect gems.
 * Gems appean on the map randomly,
 * and whenever player collect one, the enemy increments by 1.
 */
var Gem = function() {
  this.gemImg = gemImages[Math.floor(Math.random() * 3)];
  this.x = gemPosX[Math.floor(Math.random() * 9)];
  this.y = enemyPosY[Math.floor(Math.random() * 3)];
}
/** 
 * Updates the gem's position.
 * Gem's position will reset whenever player touches it.
 */
Gem.prototype.update = function() {
  if (player.x === this.x && player.y === this.y) {
    this.gemImg = gemImages[Math.floor(Math.random() * 3)];
    this.x = gemPosX[Math.floor(Math.random() * 9)];
    this.y = enemyPosY[Math.floor(Math.random() * 3)];
    if (allEnemies.length < 30) {
      allEnemies.push(new Enemy());
    }
    if (gameScore.score < 30) {
      gameScore.score++;
    }
  }
}
/**
 * Renders the gem on the screen.
 */
Gem.prototype.render = function() {
  ctx.drawImage(Resources.get(this.gemImg), this.x, this.y);
}


/**
 * Score shows number of gems player has collected.
 */
var Score = function() {
  this.scoreImg = 'images/Gem_Orange_s.png';
  this.score = 0;
}
/**
 * Renders the score on the screen.
 */
Score.prototype.render = function() {
  var x = 0;
  for (var i = 0; i < this.score; i++) {
    ctx.drawImage(Resources.get(this.scoreImg), x, 10);
    x = x + 30;
  }
}


/**
 * Life of the player.
 */
var Life = function() {
  this.lifeImg = 'images/Heart_s.png';
  this.life = 5;
}
/**
 * Renders the life on the screen.
 */
Life.prototype.render = function() {
  var x = 0;
  for (var i = 0; i < this.life; i++) {
    ctx.drawImage(Resources.get(this.lifeImg), x, 590);
    x = x + 50;
  }
  if (this.life === 0) {
    ctx.drawImage(Resources.get('images/gameover.png'), 0, 50);
    ctx.font = '30px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText("You've collected "+gameScore.score+" gems",300,420);
  }
}
/**
 * Decrease number of lives.
 */
Life.prototype.decrease = function() {
  if (this.life > 0) {
    this.life = this.life - 1;
  }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemyA = new Enemy();
var enemyB = new Enemy();
var enemyC = new Enemy();
var enemyD = new Enemy();
var allEnemies = [enemyA, enemyB, enemyC, enemyD];

var player = new Player();
var gem = new Gem();
var gameScore = new Score();
var gameLife = new Life();


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
// This listens for key presses and disables default scroll actions.
document.addEventListener('keydown', function(e) {
  if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }  
}, false);
