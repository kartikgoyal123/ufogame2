
var ufo,ufoImage,obstaceImage,obstacleGroup,backgroundImg,bg;
var life=3;
var gameState=0;


function preload(){

   ufoImage = loadImage("ufo.png");  
   obstaceImage = loadImage("stone.png");
   backgroundImg = loadImage("space.jpg");
   gameOverImg = loadImage("gameover.png")
}


function setup(){
createCanvas(displayWidth - 20, displayHeight-30);
 ufo = createSprite(650,300);
 ufo.addImage(ufoImage);
 ufo.scale = 0.5;

 gameOver = createSprite(600,300);
 gameOver.addImage(gameOverImg);
 gameOver.scale = 2;

 obstaclesGroup = createGroup();

}

function draw(){
   background(backgroundImg);
   gameOver.visible = false;
   if(keyDown(UP_ARROW)){
  changePosition(0,-10);
}
else if(keyDown(DOWN_ARROW)){
  changePosition(0,10);
}

  camera.position.x = ufo.x;
  camera.position.y = displayHeight/2;

  spawnObstacles();
  
  if(obstaclesGroup.isTouching(ufo)){
   life=life-1;
   obstaclesGroup.destroyEach();
}
  if(life===0){
    gameState=1;
  }
  if (gameState===1){
      gameOver.visible = true;
      ufo.visible=false;
      obstaclesGroup.setLifetimeEach(-1);
       obstaclesGroup.setVelocityXEach(0); 
       obstaclesGroup.destroyEach();
  }  
  drawSprites();
  textSize(50)
  fill("red")
  text("You have "+ life+" life", 100,100);
}

function changePosition(x,y){
    ufo.x = ufo.x + x;
    ufo.y = ufo.y + y;
}

function spawnObstacles(){
    if (frameCount % 50 === 0){
      var obstacle = createSprite(1300,0,10,40);
      obstacle.y = Math.round(random(displayHeight));
      obstacle.velocityX = -6; 
      obstacle.addImage(obstaceImage);
      obstacle.scale = 0.3;
      obstacle.lifetime = 210;
      obstaclesGroup.add(obstacle);
    }
   }
   