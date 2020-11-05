var tower,towerImg;
var door,doorImg,doorsGroup;
var climber,climberImg,climbersGroup;
var ghost,ghostImg;
var invisibleBlock,invisibleBockGroup;
var gameState = "Play";
var spookySound;
function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage ("door.png");
  climberImg = loadImage ("climber.png");
  ghostImg = loadImage ("ghost-standing.png");
  
  spookySound = loadSound ("spooky.wav");
}
function setup() {
 createCanvas (600,600); 
  
  spookySound.loop();
  
  tower = createSprite (300,300);
  tower.addImage(towerImg);
  tower.velocityY = 3;
  
  ghost = createSprite (200,200,50,50);
  ghost.addImage (ghostImg);
  ghost.scale = 0.3
  
  doorsGroup = new Group ();
  climbersGroup = new Group ();
  
 invisibleBlockGroup = new Group ();
  
}
function draw (){
 background (0);

  if (gameState === "Play"){
  
 if (tower.y > 600){
   tower.y = 300;
 }
  
  if (keyDown("left")){
    ghost.x = ghost.x-3;
  }
  
  if (keyDown("right")){
    ghost.x = ghost.x+3;
  }
  
  if (keyDown("space")){
    ghost.velocityY = -5;
  }
  ghost.velocityY = ghost.velocityY + 0.8;
  
  if (climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
    
  }
  
  if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
    ghost.destroy();
    gameState = "End";
  }
  
  spawnDoors();
  
  drawSprites();
  }
  
  if (gameState === "End"){
    stroke("yellow");
    fill ("yellow");
    textSize (30);
    text("Game Over",230,250);
  }
}

function spawnDoors(){
  if (frameCount % 240 === 0){
    door = createSprite (200,-50);
    door.addImage (doorImg);
    
    climber = createSprite (200,10);
    climber.addImage (climberImg);
    climber.scale = 1;
    
    invisibleBlock = createSprite (200,50)
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    
    climber.velocityY = 1;
    
    door.velocityY = 1;
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    
    ghost.depth = door.depth;
    ghost.depth += 1; 
    
    door.lifetime = 800;
    climber.lifetime =800;
    invisibleBlock.lifetime = 800;
    
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}