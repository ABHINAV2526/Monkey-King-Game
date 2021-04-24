var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var PLAY = 1
var END = 0
var gameState = PLAY
var survivalTime = 0

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}


function setup() {
  createCanvas(600, 300)

  monkey = createSprite(50, 250, 20, 30)
  monkey.addAnimation("run", monkey_running)
  monkey.scale = 0.13

  ground = createSprite(300, 290, 600, 30)
  ground.shapeColor = "black"

  obstacleGroup = createGroup()
  bananaGroup = createGroup()

  score = 0

  survivalTime = 0

}


function draw() {
  background("lightgreen")

  monkey.collide(ground)

  if (gameState === PLAY) {

    spawnBananas()

    spawnObstacles()
    
    
    if(frameCount%30===0){
      survivalTime = survivalTime+1
    }
    
stroke(20)
    fill("black")
    textSize(30)
      text("Survival Time - " + survivalTime, 185, 35)
    
    if (keyDown("space") && monkey.y >= 220) {
      monkey.velocityY = -14;
    }

    monkey.velocityY = monkey.velocityY + 0.6

    fill("red")
    textSize(22)
    text("Score - " + score, 490, 30)
    

  } else if (gameState === END) {

    monkey.velocityY = 0;
    monkey.destroy()

    bananaGroup.setVelocityEach(0);
    bananaGroup.setLifetimeEach(0);
    bananaGroup.destroyEach()

    obstacleGroup.setVelocityEach(0);
    obstacleGroup.setLifetimeEach(0);
    obstacleGroup.destroyEach()

    stroke(20)
    fill("black")
    textSize(30)
    text("Survival Time - " + survivalTime, 185, 35)

    fill("orange")
    stroke("black")
    strokeWeight(6)
    textSize(70)
    text("GameOver", 135, 140)

    fill("white")
    stroke("black")
    strokeWeight(5)
    textSize(25)
    text("Press 'R' To Restart", 200, 170)

  }

  if (bananaGroup.isTouching(monkey)) {
    score = score + 3
    bananaGroup[0].destroy()
  }

  if (obstacleGroup.isTouching(monkey) && gameState === PLAY) {
    gameState = END
    
  }

 reset()  
 
  drawSprites()
}

function spawnBananas() {

  if (frameCount % 80 === 0) {
    banana = createSprite(600, 150, 20, 20)
    banana.addImage(bananaImage)
    banana.scale = 0.15
    banana.velocityX = -7
    banana.setLifetime = 100
    banana.y = Math.round(random(40, 120))
    bananaGroup.add(banana)

  }
}

function spawnObstacles() {

  if (frameCount % 250 === 0) {
    obstacle = createSprite(600, 250, 9, 9);
    obstacle.addImage(obstacleImage)
    obstacle.scale = 0.18
    obstacle.velocityX = -7
    obstacle.setLifetime = 100
    obstacleGroup.add(obstacle)
  }
}

function reset() {

  if (keyDown("r") && gameState === END) {

    monkey = createSprite(50, 250, 20, 30)
    monkey.addAnimation("run", monkey_running)
    monkey.scale = 0.13
    
    survivalTime = 0
    gameState = PLAY
    score = 0
  }
}