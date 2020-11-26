
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacle1
var FoodGroup, obstacleGroup;
var score=0;
var ground
var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  
  
  bananaImage = loadImage("banana.png");
  obstacle1 = loadImage("obstacle.png");
  monkey_collidedImage = loadImage("sprite_8.png");

}



function setup() {
  createCanvas(600, 400);
  
  monkey = createSprite(50,380,20,50);
  
  monkey.addAnimation("running", monkey_running);
  
  monkey.scale = 0.1;
  
  ground = createSprite(200,380,1200,20);
 ground.shapeColor="lightgreen";
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
 
  
  
  invisibleGround = createSprite(200,390,400,10);
  invisibleGround.visible = false;
  

  obstacleGroup = new Group();
  FoodGroup = new Group();
  
  score = 0;
  
}


function draw() {
  background("skyblue");
  
  
  monkey.collide(ground);
  textSize(18);
  text("score= "+ score, 250, 20);
  
  
  
  if(gameState === PLAY){
    SpawnObstacle();
    SpawnFruit();
    
    ground.velocityX = -(20 + score/100);
    score = score + Math.round(getFrameRate()/62);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(FoodGroup.isTouching(monkey)){
  FoodGroup.destroyEach();
    }
   if(keyDown("space") && monkey.y>=320){
     monkey.velocityY=-12;
   }
    
    monkey.velocityY = monkey.velocityY + 0.3;
    
    if(obstacleGroup.isTouching(monkey)){
      gameState = END;
      
  }
  }
  
  else if(gameState === END) {
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    ground.velocityX = 0;
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
  
    
  }
  
  drawSprites();
  
}
function SpawnObstacle() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,355,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    obstacle .addImage (obstacle1);
    
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    
    obstacleGroup.add(obstacle);
    
  }
}

function SpawnFruit() {
  
    if (frameCount % 60 === 0) {
    var banana = createSprite(600,220,40,10);
    banana.y = Math.round(random(180,220));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    FoodGroup.add(banana);
  }
  
}