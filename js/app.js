/**
/*  Initial Code provided by Udacity
/*  Futher modified by Liching Yew
/**

/** Enemy contructor **/
var Enemy = function() {

    //Setting the Enemy initial location the left outside the canvas
    this.x = -100;

    //Randomise the y-value to either of the three lanes
    this.y = enemyInitLoc[Math.floor((Math.random() * 3))];

    //Randomise the speed of the enemy
    this.speed = Math.floor((Math.random() * 6) + 1) * 50;

    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
}

/**
 *  @param dt, a time delta between ticks
 *  Update the enemy's position, required method for game
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
}

/** Draw the enemy on the screen, required method for game **/
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

/** Player contructor **/
var Player = function() {
    //Setting the Enemy initial location (you need to implement)
    this.reset();
};

/** Resets the players initial location **/
Player.prototype.reset = function(){

    //Randomise the inital starting X value, Y is at the bottom
    var randomNum = Math.floor((Math.random() * 3) + 1)
    this.x = (randomNum * 100) +  randomNum;
    this.y = 390;
}

/** Draw the player on the screen, required method for game **/
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

/**
 *  @param key, key entered on the keyboard
 *  Handles the different player input
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
}

/** Check for collisions between player and enemy **/
var checkCollisions = function(){

    var collide = false;
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
            collide = true;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

/** Initialise global variables **/
var counter = 0;
var allEnemies = [];
var enemyWidth = 100;
var enemyHeight = 60;
var playerWidth = 70;
var playerHeight = 76;
var enemyInitLoc = [55, 137, 220]; //the 3 initial y location for the enemy

// Instantiate and add enemies on the game
var enemyNum = 3;
for (var i = 0; i < enemyNum; i++){
    var enemy = new Enemy();
    allEnemies.push(enemy);
}

// Instantiate the player
var player = new Player();


/** Select a player before the game starts **/
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
