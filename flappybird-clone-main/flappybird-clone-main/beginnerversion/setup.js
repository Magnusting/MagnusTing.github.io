 //game variables
const gameOverSound = new Audio("../assets/sounds/gameover.mp3");
const music = new Audio("../assets/sounds/.mp3");
      music.loop = true;
      music.volume = 0.5;
const debugModeIsOn = true;
const startKey = "s";
const restartKey = "r";
const hitboxColor = "#00FF02";
const destructionXPosition = -1000;
const spawnXPosition = canvas.width * 1.2
let gameState = "menu"; // menu, action or gameover

// bird variables
const birdImage = new Image(90, 90);
      birdImage.src = "../assets/images/bird.png";
const birdStartYPosition = 250;
const birdStartYSpeed = 0;
const birdStartYAccelleration = 0;
const birdBeginningYAccelleration = 0.7;
const birdXPosition = 250;
const birdHitboxRadius = 30;
const birdFlapSound = new Audio("../assets/sounds/flap.wav");
const birdFlapForce = -12;
const birdFlapKey = " ";
let birdYSpeed = birdStartYSpeed;
let birdYAccelleration = birdStartYAccelleration;
let birdYPosition = birdStartYPosition;
let birdCanFlap = false;


// score variables
const scoreImage = new Image(60, 60);
      scoreImage.src = "../assets/images/coin.png";
const scoreImageXPosition = 70;
const scoreImageYPosition = 70;
const scoreTextXPosition = 100;
const scoreTextYPosition = 90;
const scoreTextSize = 50;
const scoreTextColor = "yellow";
let scoreValue = 0;

// cloud variables
const cloudImage = new Image(200, 200);
      cloudImage.src = "../assets/images/cloud.png";
const cloudSpawnInterval = 10000; // milliseconds
const cloudXSpeed = -.7;
let cloudTimeSinceLastSpawn = 0; // milliseconds
let clouds = [
    {
        xPosition: canvas.width,
        yPosition: randomBetween(0, canvas.height/2), 
    },
    {
        xPosition: canvas.width -500,
        yPosition: randomBetween(0, canvas.height/2), 
    },
    {
        xPosition: canvas.width-1000,
        yPosition: randomBetween(0, canvas.height/2), 
    },
];

// fireball variables
const fireballImage = new Image(350, 350);
      fireballImage.src = "../assets/images/fireball.png";
const fireballXSpeed = -5.5;
const fireballHitboxRadius = 100;
const fireballSpawnInterval = 1000;
let fireballTimeSinceLastSpawn = fireballSpawnInterval; 
let fireballs = [];

// coin variables
const coinSound = new Audio("../assets/sounds/coin.wav");
const coinImage = scoreImage;
const coinHitboxRadius = 30;
const coinXSpeed = -3;
const coinSpawnInterval = 500;
const coinValue = 1;
let coinTimeSinceLastSpawn = coinSpawnInterval
let coins = []

// bacon variables
const baconSound = new Audio("../assets/sounds/coin.wav");
const baconImage = new Image(50, 50);
baconImage.src=("../assets/images/bacon.png")
const baconHitboxRadius = 30;
const baconXSpeed = -3;
const baconSpawnInterval = 10000000000000000000;
const baconValue = 1;
let baconTimeSinceLastSpawn = baconSpawnInterval
let baconXposition = canvas.width
let baconYposition = randomBetween(0, canvas.height)
let bacons = []

// spunks variables
const spunksSound = new Audio("../assets/sounds/shake.mp3");
const spunksImage = new Image(50, 50);
spunksImage.src=("../assets/images/spunks.png")
const spunksHitboxRadius = 30;
const spunksXSpeed = -3;
const spunksSpawnInterval = 10000;
const spunksValue = -0.01;
let spunksTimeSinceLastSpawn = spunksSpawnInterval
let spunksXposition = canvas.width
let spunksYposition = randomBetween(0, canvas.height)
let spunks = []

// menu text variables
const menuFirstText = "Press " + startKey + " to start";
const menuTextXPosition = 300;
const menuTextYPosition = 400; 
const menuSecondText = "Press space to flap wings";
const menuTextSize = 60;
const menuTextColor = "yellow";
const gameOverText = "Press " + restartKey + " to restart";

updatebacon();

function updatebacon() {
 
      for(let bacon of bacons) {
          bacon.xPosition += baconXSpeed;
   
          if(gameState == "action") {
              // check if the bacon collides with the bird
              if(theseCirclesCollide(
                  birdXPosition,
                  birdYPosition,
                  birdHitboxRadius,
                  bacon.xPosition,
                  bacon.yPosition,
                  baconHitboxRadius
              ))
              { // if they do, increase the score
                  baconSound.play();
                  scoreValue += baconValue;
                  bacons = bacons.remove(bacon);
              }
   
              if(bacon.xPosition < destructionXPosition) {
                  bacons = bacons.remove(bacon);
              }
          }
   
          drawImage(
              baconImage,
              bacon.xPosition,
              bacon.yPosition,
              baconImage.width,
              baconImage.height
          );
      }
   
      // spawn new diamonds
      if(gameState == "action" &&
      baconTimeSinceLastSpawn>baconSpawnInterval) {
          bacons.push({
              xPosition: spawnXPosition,
              yPosition: randomBetween(0, canvas.height)
          });
          baconTimeSinceLastSpawn = 0;
      }
   
      if(gameState == "action") {
          baconTimeSinceLastSpawn += timeSinceLastFrame;
      }
  }
  let highscores = [];

  updatespunks();

function updatespunks() {
 
      for(let spunk of spunks) {
          spunk.xPosition += spunksXSpeed;
   
          if(gameState == "action") {
              // check if the spunks collides with the bird
              if(theseCirclesCollide(
                  birdXPosition,
                  birdYPosition,
                  birdHitboxRadius,
                  spunk.xPosition,
                  spunk.yPosition,
                  spunksHitboxRadius
              ))
              { // if they do, increase the score
                  coinSound.play();
                  scoreValue += spunksValue;
                  spunk = spunks.remove(spunk);
                  birdImage.src=("../assets/images/hasbualla v2.png")
              }
   
              if(spunks.xPosition < destructionXPosition) {
                  spunk = spunks.remove(spunk);
              }
          }
   
          drawImage(
              spunksImage,
              spunk.xPosition,
              spunk.yPosition,
              spunksImage.width,
              spunksImage.height
          );
      }
   
      // spawn new diamonds
      if(gameState == "action" &&
      spunksTimeSinceLastSpawn>spunksSpawnInterval) {
          spunks.push({
              xPosition: spawnXPosition,
              yPosition: randomBetween(0, canvas.height)
          });
          spunksTimeSinceLastSpawn = 0;
      }
   
      if(gameState == "action") {
          spunksTimeSinceLastSpawn += timeSinceLastFrame;
      }

    }