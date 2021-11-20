var backImg, playerImg, monsterImg;
var player, back, edges, stone, stoneImg
var stoneGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver, restart;
var gameOverImg, restartImg;
var score = 0

function preload() {
  backImg = loadImage("Images/background.jpg");
  monsterImg = loadImage("Images/monster.png");
  playerImg = loadAnimation("Images/player1.png", "Images/player2.png");
  stoneImg = loadImage("Images/stone.png")
  gameOverImg = loadImage("Images/gameOver.png");
  restartImg = loadImage("Images/restart.png")
}

function setup() {
  createCanvas(1500, 750);
  back = createSprite(0, 0, 1500, 750);
  back.addImage(backImg);
  back.scale = 2.0;

  player = createSprite(105, 650, 10, 20);
  player.addAnimation("run", playerImg);
  player.scale = 1.0

  edges = createEdgeSprites()
  stoneGroup = new Group()

  gameOver = createSprite(750,200);
  gameOver.addImage(gameOverImg);

  restart = createSprite(730,300);
  restart.addImage(restartImg);

  gameOver.scale = 1.5;
  restart.scale = 1.5;

  gameOver.visible = false;
  restart.visible = false;

}

function draw() {
  background(0, 0, 0);
  if (gameState === PLAY) {
score = score+5;
  back.velocityX = -8

  if (back.x < 0) {
    back.x = back.width / 2;
  }

  if (keyDown("space")) {
    player.velocityY = -10;

  }

  player.velocityY = player.velocityY + 1.0;

  if(stoneGroup.isTouching(player)){
    gameState = END;
  }
  
  spawnObstacles()
}
else if(gameState === END ){
  gameOver.visible = true;
  restart.visible = true;

  back.velocityX = 0;
  player.velocityY = 0;
  stoneGroup.setVelocityXEach(0);
  stoneGroup.setLifetimeEach(-1);
  if(mousePressedOver(restart)) {
    reset();
  }

}
player.collide(edges[3])

  drawSprites();
  fill("black")
  text("SCORE:"+score,300,140);
}
function spawnObstacles() {
  if (frameCount % 300 === 0) {

    stone = createSprite(1400, 700);
    stone.velocityX = -6
    stone.addImage(stoneImg)
    stone.scale = 0.5;
    stoneGroup.add(stone);
    stone.lifetime = 500;
  }

}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;

  stoneGroup.destroyEach();
  score = 0
}