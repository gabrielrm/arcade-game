const   bugs        = [
            "images/bug_blue.png",
            "images/bug_red.png",
            "images/bug_green.png"],
        enemyRow    = [55, 138, 221],
        allEnemies  = [],
        pStartX     = 202,
        pStartY     = 387,
        end         = document.querySelector(".overlay"),
        playerChar  = [
            "images/char-boy.png",
            "images/char-cat-girl.png",
            "images/char-horn-girl.png",
            "images/char-pink-girl.png",
            "images/char-princess-girl.png"];

let     swim        = 0,
        life        = 3,
        renderStop  = false,
        keyOn       = false;

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

    // player collison
    if (Math.trunc(this.x) >= player.x - pStartX / 3 &&
        Math.trunc(this.x) <= player.x + pStartX / 3 &&
        this.y === player.y) {
            player.goBack();
            life -= 1;
    }

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
    this.sprite = playerChar[Math.floor(Math.random() * playerChar.length)];
};

Player.prototype.update = function() {
    x = this.x;
    y = this.y;

    if (life === 5 || life === 0) {
        this.end();
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.display();
}

// player input while keeping on canvas
Player.prototype.handleInput = function(key) {
    switch(key) {
        case "up":
            if (this.y > 130) {
                this.y -= 83;
            } else {
                this.goBack();
                swim += 1;
            }
            if (swim === 3) {
                this.goBack();
                this.moreLife();
            }
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

Player.prototype.goBack = function() {
    this.x = pStartX;
    this.y = pStartY;
};

Player.prototype.end = function() {
    // alert("Game Over!");
    // this.goBack;
    // life = 3;
    // swim = 0;
    keyOn = false;
    overlay();
}

Player.prototype.moreLife = function() {
    life += 1;
    swim = 0;
};

Player.prototype.display = function() {
    ctx.font="bold 20px Roboto Condensed";
    ctx.fillStyle="#8a0925";
    ctx.fillText("Lives: " + life, 118, 573);
    ctx.fillText("Swim: " + swim, 318, 573);
}

function overlay() {
    renderStop = true;
    keyOn = false;
    // modal from https://raventools.com/blog/create-a-modal-dialog-using-css-and-javascript/
    end.style.visibility = (end.style.visibility == "visible") ? "hidden" : "visible";
}

// reload modal button
function reload() {
    location = location;
    this.goBack();
    life = 3;
    swim = 0;
    keyOn = true;
}

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

    if (keyOn) {
        player.handleInput(allowedKeys[e.keyCode]);
    }
});
