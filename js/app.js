var counter = 0;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    //Setting the Enemy initial location the left ourside the canvas
    this.x = 100;

    //Randomise the y-value to either of the three lanes

    //this.y = 210; // 50 130
    this.y = enemyInitLoc[Math.floor((Math.random() * 3))];

    //this.speed = 0;
    this.speed = Math.floor((Math.random() * 6) + 1) * 50;

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

    if(this.x == 0){
        this.x++;
    }

    // if enemy goes off screen, it resets back to the beginning
    if(this.x > 505){
        this.x = 0;
        this.y = enemyInitLoc[Math.floor((Math.random() * 3))];
        this.speed = Math.floor((Math.random() * 6) + 1) * 50;
    }

    var move = this.speed * dt;
    this.x = this.x + move;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //ctx.strokeRect(this.x, this.y + 80, 100, 60);
    console.log("The y loc of enemy is " + this.y);

}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    //Setting the Enemy initial location (you need to implement)
    this.x = Math.floor((Math.random() * 3) + 1) * 100;
    this.y = 400;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(){

}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //ctx.strokeRect(this.x + 10, this.y + 60, 80, 80);
    //ctx.strokeRect(this.x + 50, this.y + 100, 80, 80);
    console.log("The counter is " + counter);
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

        if(this.y - 80 < 0)
            console.log("You've already won the game, stop going up!");
        else{
            this.y -= 80;
        }
    }
    else if(key == 'down'){

        if(this.y >= 400)
            console.log("You can't go further down");
        else{
            this.y += 80;
        }
    }
    else{
        console.log("Please enter a valid arrow key");
    }
}

/** Checking for collision between player and enemy **/
var checkCollisions = function(){

    var heroX = player.x + 50;
    var heroY = player.y + 100;
    var collide = false;
    var bugX, bugY, bugWidth, bugHeight;

    //checking collision for each enemy
    for (var i = 0; i < enemyNum; i++){
        bugX = allEnemies[i].x;
        bugY = allEnemies[i].y;
        bugWidth = bugX + 100;
        bugHeight = bugY + 140;

        if(heroX > bugX && heroX < bugWidth && heroY > bugY && heroY <= bugHeight){
            player.x = Math.floor((Math.random() * 3) + 1) * 100;
            player.y = 400;
            collide = true;
            return collide;
        }

        //console.log("player.y= " + player.y);
        //console.log("hy= " + heroY + ", by= " + bugY + " bh= " + bugHeight);
    }
    return collide;
}

//Player reached the river, reset player location
var gameWon = function(){

    if(player.y == 0){
        player.x = Math.floor((Math.random() * 3) + 1) * 100;
        player.y = 400;
        return true;
    }
    return false;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var enemyInitLoc = [55, 137, 220]; //the 3 initial y location for the enemy

var enemyNum = 3;
for (var i = 0; i < enemyNum; i++){
    var enemy = new Enemy();
    allEnemies.push(enemy);
}

var player = new Player();

var selectPlayer = function(){

    var playerNum;
    while (playerNum != 1 || playerNum != 2 || playerNum != 3 || playerNum != 4 || playerNum != 5)
    {
        playerNum = prompt("Please select a player:\n1 = Boy, 2 = cat-girl, 3 = horn-girl, 4 = pink-girl, 5 = princess-girl");
        if(playerNum == 1){
            player.sprite = 'images/char-boy.png';
            return;
        }
        else if(playerNum == 2){
            player.sprite = 'images/char-cat-girl.png';
            return;
        }
        else if(playerNum == 3){
            player.sprite = 'images/char-horn-girl.png';
            return;
        }
        else if(playerNum == 4){
            player.sprite = 'images/char-pink-girl.png';
            return;
        }
        else if(playerNum == 5){
            player.sprite = 'images/char-princess-girl.png';
            return;
        }
    }
}


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
