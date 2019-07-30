// the Game object used by the phaser.io library

var actions = { preload: preload, create: create, update: update };
var game = new Phaser.Game(790, 400, Phaser.AUTO, "game", actions);
// Global score variable initialised to 0.
var score = 0;
// Global variable to hold the text displaying the score.
var labelScore;
// Global player variable declared but not initialised.
var player;
// Global pipes variable initialised to the empty array.
var pipes = [];
//// the interval (in seconds) at which new pipe columns are spawned
var pipeInterval = 1.75;
// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)


/*
 * Loads all resources for the game and gives them names.
 */

 // Loads all resources for the game and gives them names.
function preload() {
    game.load.image("mybg","../assets/Playa.jpg");
    // make image file available to game and associate with alias playerImg
    game.load.image("playerImg","../assets/Flamingo-1.png");
    // make sound file available to game and associate with alias score
    game.load.audio("score", "../assets/point.ogg");
    game.load.audio("music", "../assets/song.mp3");

    game.load.image("pipeBlock","../assets/pipe_pink.png");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    game.stage.setBackgroundColor("#ff3385");
    game.sound.play("music");
    game.add.tileSprite(0, 0, 790, 400, 'mybg');
    //add welcome text
    //game.add.text(20, 20, "Benvenuta nel gioco ufficiale del fenicottero rosa!",
    //{font: "30px Arial", fill: "#FFFFFF"});
    // add score text
    //labelScore = game.add.text(20, 60, "0",
    //{font: "30px Arial", fill: "#FFFFFF"});
    // initialise the player and associate it with playerImg
    player = game.add.sprite(80, 200, "playerImg");
    // associate right arrow key with moveRight function
    //game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
    // associate left arrow key with moveLeft function
    //game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);
    // associate up arrow key with moveUp function
    //game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
    // associate down arrow key with moveDown function
    //game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);
    //To test the changeScore function
    //changeScore();
    //changeScore();
    //game.add.image(0,0,"bg");
    //game.add.text(680, 360, "morning", {font: "30px COMBAK", fill: "#FFFFFF"});
    //game.add.text(20, 20, "good", {font: "30px COMBAK", fill: "#63b5d"});
    //game.add.sprite(50,50, "playerImg");
    //game.input.onDown.add(clickHandler);
    labelScore=game.add.text(200,20,score);

    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
    player.anchor.setTo(0.5,0.5);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(player);
    player.body.gravity.y=100;
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(playerJump);
    var pipeInterval = 1.9 * Phaser.Timer.SECOND;
game.time.events.loop(
 pipeInterval,
 generatePipe
);
}
/*
/*This function updates the scene. It is called for every new frame.
 */
function update() {

  game.physics.arcade.overlap(
 player,
 pipes,
 gameOver);

 if (player.body.position.y > 400) {
   player.body.position.y = 0;
 }

 if (player.body.position.y < 0) {
   player.body.position.y = 400;
 }

}

function clickHandler(event){
  game.add.text(event.x, event.y, "Hello!",{font:"30px chrome", fill: "#63b5d"});
  game.sound.play("score");
  changeScore();
}

function changeScore(){
  score=score+1;
  labelScore.setText(score.toString());
}



// Executed when right arrow key is hit.
function moveRight() {
 //Moves player one step to the right of the game canvas.
 player.x = player.x + 10;
}
function moveLeft() {
 player.x = player.x - 10;
}
function moveUp() {
 //Remember the y coordinate values decrease on going up.
 player.y = player.y - 10;
}
function moveDown() {
 player.y = player.y;
}

function playerJump(){
  player.body.velocity.y=-100
}


function addPipeBlock(x, y) {

 var pipeBlock = game.add.sprite(x,y,"pipeBlock");
 pipes.push(pipeBlock);
 game.physics.arcade.enable(pipeBlock);
 pipeBlock.body.velocity.x = -200;

}
function generatePipe() {
 // calculate a random position for the gap
 var gap = game.rnd.integerInRange(1 ,5);
 // generate the pipes, except where the gap should be
 for (var count=0; count<20; count++) {
 if (count != gap && count != gap+1) {
 addPipeBlock(790, count*50);
 }
 }
}

function changeScore() {
 //increments global score variable by 1
 score++;
 // updates the score label
 labelScore.setText(score.toString());
}

function gameOver(){
 location.reload();
}
