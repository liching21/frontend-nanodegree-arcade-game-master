/**
  * @desc this will create and initialise the objects used in the game
  * for project on Udacity
  * @author Liching Yew liching.yew@gmail.com
*/

/**
 * @desc Represents an enemy
 * @constructor
 */
 "use strict";

var Enemy = function() {


    //Setting the Enemy initial location the left outside the canvas
    this.x = -100;

    //Randomise the y-value to either of the three lanes
    this.y = enemyInitLoc[Math.floor((Math.random() * 3))];

    //Randomise the speed of the enemy
    this.speed = Math.floor((Math.random() * 6) + 1) * 50;

    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
};

 /**
  * @desc updates the enemy class with each frame
  * @param dt - time delta information
*/
Enemy.prototype.update = function(dt) {

    // multiply movement by the dt, to ensure the game runs at
    // the same speed for all computers.
    var move = this.speed * dt;

    // move enemy on screen
    if (this.x < 505){
        this.x += move;
    }

    // if enemy goes off screen, it resets back to the beginning
    if(this.x > 505){
        this.x = -100;
        this.y = enemyInitLoc[Math.floor((Math.random() * 3))];
        this.speed = Math.floor((Math.random() * 6) + 1) * 50;
    }
};

 /**
  * @desc Draw the enemy on the screen, required method for game
*/
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * @desc Represents a player
 * @constructor
 */
var Player = function() {

    //Setting the initial player location

    this.reset();
};

/**
  * @desc reset the player to the initial location
*/
Player.prototype.reset = function(){

    //Randomise the inital starting X value, Y is at the bottom
    var randomNum = Math.floor((Math.random() * 3) + 1);
    this.x = (randomNum * 100) +  randomNum;
    this.y = 390;
};

/**
  * @desc draw the player on screen, required method for the game
*/
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

 /**
  * @desc handles user input to control the player
  * @param key - key entered on the keyboard
*/
Player.prototype.handleInput = function(key){

    // moving the main character
    if(key == 'left'){

        if(this.x - 101 < 0)
            console.log("You can't move to the left");
        else{
            this.x -= 101;
        }
    }
    else if(key == 'right'){

        if(this.x > 400)
            console.log("You can't move to the right");
        else{
            this.x += 101;
        }
    }
    else if(key == 'up'){

        if(this.y - 83 < 0){
            console.log("You've won the game, HURRAY! :D");
            this.reset();
            counter++;
        }
        else{
            this.y -= 83;
        }
    }
    else if(key == 'down'){

        if(this.y + 83 >= 400)
            console.log("You can't go further down");
        else{
            this.y += 83;
        }
    }
    else{
        console.log("Please enter a valid arrow key");
    }
};

/**
  * @desc checks for collison between the player and the enemy
*/
var checkCollisions = function(){

    var heroX = player.x;
    var heroY = player.y;
    var bugX, bugY, bugWidth, bugHeight;

    for (var i = 0; i < enemyNum; i++){
        bugX = allEnemies[i].x;
        bugY = allEnemies[i].y;
        bugWidth = bugX + enemyWidth;
        bugHeight = bugY + enemyHeight;

        if(heroX > bugX && heroX < bugWidth && heroY > bugY && heroY <= bugHeight){
            player.reset();
            console.log("collisions!!");
            counter--;
        }
    }
};

// Initialise global variables and objects
var counter = 0;
var allEnemies = [];
var enemyWidth = 100;
var enemyHeight = 60;
var enemyInitLoc = [55, 137, 220]; //the 3 initial y location for the enemy

// Instantiate and add enemies on the game
var enemyNum = 3;
for (var i = 0; i < enemyNum; i++){
    var enemy = new Enemy();
    allEnemies.push(enemy);
}

// Instantiate the player
var player = new Player();

/**
  * @desc alert to user to select a player before the game begins
*/
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
};

/**
  * @desc This listens for key presses and sends the keys to your
  * Player.handleInput() method.
  * @param 'keyup', a function
*/
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
