const   bugs        = [
            "images/bug_blue.png",
            "images/bug_red.png",
            "images/bug_green.png"],
        enemyRow    = [55, 138, 221],
        allEnemies  = [],
        pStartX     = 202,
        pStartY     = 387;

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * 150) + 100;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    // random bugs
    this.sprite = bugs[Math.floor(Math.random() * bugs.length)];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // bugs reach end canvas
    if (this.x >= 505) {
        this.x = -101;
        this.speed = Math.floor(Math.random() * 250) + 100;
    }

    this.x += this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function(x, y) {
    this.x      = x;
    this.y      = y;
    this.sprite = "images/char-boy.png";
};

Player.prototype.update = function() {
    x = this.x;
    y = this.y;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// player input while keeping on canvas
Player.prototype.handleInput = function(key) {
    switch(key) {
        case "up":
            if (this.y > 130)
            this.y -= 83;
            break;

        case "down":
            if (this.y < pStartY)
            this.y += 83;
            break;

        case "right":
            if (this.x < pStartX * 2)
            this.x += 101;
            break;

        case "left":
            if (this.x > 0)
            this.x -= 101;
            break;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// random rows for bugs
enemyRow.forEach(function(y) {
    enemies = new Enemy(0, y);
    allEnemies.push(enemies);
});

// Place the player object in a variable called player
const player = new Player(pStartX, pStartY);

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
