var GAME_RESET = false;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    //Setting the Enemy initial location (you need to implement)
    this.x = 100; //some value

    this.y = Math.floor((Math.random() * 3) + 1) * 70;

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
        this.y = Math.floor((Math.random() * 3) + 1) * 70;
        this.speed = Math.floor((Math.random() * 6) + 1) * 50;
    }

    var move = this.speed * dt;
    this.x = this.x + move;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.strokeRect(this.x, this.y + 80, 100, 60);
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

    //this.collision();
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //ctx.strokeRect(this.x + 10, this.y + 60, 80, 80);
    ctx.strokeRect(this.x + 50, this.y + 100, 80, 80);
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
            console.log("Collision!!!");
            player.x = 200;
            player.y = 400;
            collide = true;
            return collide;
        }
        //console.log("hx= " + heroX + ", bx= " + bugX + " bw= " + bugWidth);
        //console.log("hy= " + heroY + ", by= " + bugY + " bh= " + bugHeight);
    }
    return collide;
}

/**Player.prototype.collision = function(){

    var heroX = this.x + 50;
    var heroY = this.y + 100;

    var bugX, bugY, bugWidth, bugHeight;

    //checking collision for each enemy
    for (var i = 0; i < enemyNum; i++){
        bugX = allEnemies[i].x;
        bugY = allEnemies[i].y;
        bugWidth = bugX + 100;
        bugHeight = bugY + 140;

        if(heroX > bugX && heroX < bugWidth && heroY > bugY && heroY <= bugHeight){
            console.log("Collision!!!");
            this.x = 200;
            this.y = 400;
            GAME_RESET = true;
        }

        //console.log("hx= " + heroX + ", bx= " + bugX + " bw= " + bugWidth);
        //console.log("hy= " + heroY + ", by= " + bugY + " bh= " + bugHeight);

    }
}**/


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


/** TODO Extra: randomise the inital player location **/

var allEnemies = [];

var enemyNum = 3;
for (var i = 0; i < enemyNum; i++){
    var enemy = new Enemy();
    allEnemies.push(enemy);
}

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