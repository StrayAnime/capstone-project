var landscapeImg, landscape;
var obstaclesGroup, obstacle1, obstacle2;
var ninja, ninja_running;
var score;
var gameState = "play";
var ninjaStar, ninjaStarsGroup;

function preload(){
landscape = loadImage("landscape.png");
ninja_running = loadAnimation("0.3.png", "0.4.png", "0.5.png", "0.6.png", "0.7.png", "0.9.png", "1.0.png", "1.1.png", "1.2.png", "1.3.png", "1.5.png", "1.6.png", "1.7.png");

obstacle1 = loadImage("obstacle1.png");
obstacle2 = loadImage("obstacle2.png");
ninjaStar = loadImage("ninjaStar.png");
}

function setup() {
 createCanvas(600, 600);
 landscape = createSprite(300, 300);
  landscape.addImage("background", landscapeImg);
  landscape.velocityX = -4;

  ninja = createSprite(50,180,20,50);
  ninja.addAnimation("ninja_running", ninjaImg);
  ninja.scale = 0.3;

  obstaclesGroup = createGroup();
  ninjaStarsGroup = createGroup();
  
  score = 0;
  ninjaStar = 0;
}

function draw() {
background(0);
text("Score: "+ score, 500,50);

 if(gameState === "play"){
    score = score + Math.round(frameCount/60);
    
    if (landscape.x < 0){
        landscape.x = ground.width/2;
      }
      
      if(keyDown("space")&& ninja.y >=100) {
          ninja.velocityY = -10;
      }
      
      ninja.velocityY = ninja.velocityY + 0.7

      if(ninjaStarsGroup.isTouching(ninja)){
        ninjaStar = ninjaStar + 1;
        text("Stars: "+ ninjaStar, 550,50);
      }
    
          spawnObstacles();
          spawnNinjaStars();

          }
          if(gameState === "end") {
            stroke("red");
            fill ("red");
            textSize(30);
            text("GAME OVER", 230,250);
          
          }
          }
      
      if(obstaclesGroup.isTouching(ninja)){
          gameState = "end";
      }
     else if (gameState === "end") {
        landscape.velocityX = 0;
       
       obstaclesGroup.setVelocityXEach(0);
       obstaclesGroup.setLifetimeEach(-1);
     }
    

    drawSprites();

  
  function spawnObstacles(){
   if (frameCount % 60 === 0){
     var obstacle = createSprite(350,165,15,30);
     obstacle.velocityX = -6;
     
      var rand = Math.round(random(1,2));
      switch(rand) {
        case 1: obstacle.addImage(obstacle1);
                break;
        case 2: obstacle.addImage(obstacle2);
                break;
        default: break;
      }
            
      obstacle.scale = 0.4;
      obstacle.lifetime = 250;
     
      obstaclesGroup.add(obstacle);
   }
  }

  function ninjaStars(){
    if (frameCount % 100 === 0){
      var ninjaStar = createSprite(350,165,15,30);
      ninjaStar.velocityX = -5;
             
       ninjaStar.scale = 0.4;
       ninjaStar.lifetime = 3000;
      
       ninjaStarsGroup.add(ninjaStar);
    }
   }



  