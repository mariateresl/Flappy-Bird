// the Game object used by the phaser.io library

var actions = { preload: preload, create: create, update: update };
var height = 400;
var width = 790;
var game = new Phaser.Game(width, height, Phaser.AUTO, "game", actions);
// Global score variable initialised to 0.
var score = 0;
// Global variable to hold the text displaying the score.
var labelScore;
// Global player variable declared but not initialised.
var player;
// Global pipes variable initialised to the empty array.
var pipes = [];
//// the interval (in seconds) at which new pipe columns are spawned
var pipeInterval = 10.0;
var margin = 30;
var gapSize = 200;
var blockHeight = 50;
var level= 1;
var splashDisplay;

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
    // game.sound.play("music");
    game.add.tileSprite(0, 0, 790, 400, 'mybg');
    // player.anchor.setTo(0, 0);
    // player.anchor.setTo(1, 1);

    //add welcome text
    //game.add.text(20, 20, "Benvenuta nel gioco ufficiale del fenicottero rosa!",
    //{font: "30px Arial", fill: "#FFFFFF"});
    // add score text
    //labelScore = game.add.text(20, 60, "0",
    //{font: "30px Arial", fill: "#FFFFFF"});
    // initialise the player and associate it with playerImg

    player = game.add.sprite(80, 200, "playerImg");
    player.anchor.setTo(0.5, 0.5);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(player);

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
    game.input.onDown.add(clickHandler);
    splashDisplay = game.add.text(100,200, "Premi INVIO per iniziare, SPAZIO per saltare");
    labelScore=game.add.text(200,20,score);

    game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(start);
    game.input.onDown.add(start);
}

function start (){

  //game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
  game.sound.play("music");

  player.body.gravity.y=100;
  game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(playerJump);
  game.input.onDown.add(playerJump);
  //game.input.onDown.add(playerJump);
  var pipeInterval = 3.0 * Phaser.Timer.SECOND;
  game.time.events.loop(
  pipeInterval,
  generatePipe
  );
  game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.remove(start);
  game.input.onDown.remove(start);
  splashDisplay.destroy();
}
/*
/*This function updates the scene. It is called for every new frame.
 */
function update() {

   game.physics.arcade.overlap(
   player,
   pipes,
   gameOver);

   //player.rotation += 5;
   player.rotation = Math.atan(player.body.velocity.y / 200);

   if (player.body.position.y > 400) {
     player.body.position.y = 0;
   }

   if (player.body.position.y < 0) {
     player.body.position.y = 400;
   }
if (score>1){
  gapSize=200;
  //level=level+1
  levelboard=game.add.text(20,50,"Hai superato il livello 1")
}
if (score>15){
  gapSize=150;
  level=level+1
  levelboard=game.add.text(20,50,"Hai superato il livello 2")
}
if (score>45){
  gapSize=100;
  level=level+1
  levelboard=game.add.text(20,50,"Hai superato il livello 3")
}

if (score>60){
  gapSize=0;
  level=level+1
  levelboard=game.add.text(20,50,"Game Over")
}

}

function clickHandler(event){
  //game.add.text(event.x, event.y, "Hello!",{font:"30px chrome", fill: "#63b5d"});
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
 var gapStart = game.rnd.integerInRange(margin, height - margin - gapSize);
 // generate the pipes, except where the gap should be

 for(var y = gapStart; y>0; y -= blockHeight){
   addPipeBlock(width, y-blockHeight);
 }
 for(var y = gapStart + gapSize; y < height; y += blockHeight){
   addPipeBlock(width,y);
 }
 changeScore()
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
