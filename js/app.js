// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    //Setting the Enemy initial location (you need to implement)
    this.x = 100; //some value
    this.y = 150; //some value

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';


}

/** The Enemy function, which initiates the Enemy by:
Setting the Enemy initial location (you need to implement)
Setting the Enemy speed (you need to implement)*/

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    //Setting the Enemy initial location (you need to implement)
    this.x = 200;
    this.y = 400;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(){

}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key){

    // moving the main character
    if(key == 'left'){

        if(this.x - 100 < 0)
            console.log("You can't move to the left");
        else{
            this.x -= 100;
        }
    }
    else if(key == 'right'){

        if(this.x > 300)
            console.log("You can't move to the right");
        else{
            this.x += 100;
        }
    }
    else if(key == 'up'){

        if(this.y - 100 < 0)
            console.log("You've already won the game, stop going up!");
        else{
            this.y -= 100;
        }
    }
    else if(key == 'down'){

        if(this.y > 300)
            console.log("You can't go further down");
        else{
            this.y += 100;
        }
    }
    else{
        console.log("Please enter a valid arrow key");
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var bug = new Enemy();

var allEnemies = [];
allEnemies[0] = bug;
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
