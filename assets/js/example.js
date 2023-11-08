let canvas;
let ctx;
canvas = document.querySelector("#main-bg");
ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let bgImg, playerImg;
let playerX = canvas.width/2 - 32;
let playerY = canvas.height - 64;

let gameOver = false;
let score = 0;

let bulletList = [];
let enemyList = [];



function Bullet() {
  this.x = 0;
  this.y = 0;
  this.init = function() {
    this.x = playerX + 20;
    this.y = playerY;
    this.alive = true;
    bulletList.push(this);
  };
  this.update = function() {
    this.y -= 7;
  };

  this.checkHit = function() {
    for(let i = 0; i <= enemyList.length; i++) {
      if (this.y <= enemyList[i].y &&
          this.x <= enemyList[i].x + 16 &&
          this.x >= enemyList[i].x
      ){
        score++;
        this.alive = false;
        enemyList.splice(i, 1);
      }
    }
  }
}

function generateRandomValue(min, max) {
  let randomNunm = Math.floor(Math.random()*(max - min + 1)) + min;
  return randomNunm;
}

function enemy() {
  this.x = 0;
  this.y = 0;
  this.init = function() {
    this.x = generateRandomValue(0, canvas.width - 64);
    this.y = 0;
    enemyList.push(this);
  };
  this.update = function() {
    this. y += 2; //enemies' speed

    if (this.y >= canvas.height - 64) {
      gameOver = true;
      console.log(gameOver);
    }
  }
}

function loadImage() {
    bgImg = new Image();
    bgImg.src = "../images/bg.jpg";

    playerImg = new Image();
    playerImg.src = "../images/player.png";

    bulletImg = new Image();
    bulletImg.src = "../images/bullet.png";

    enemyImg = new Image();
    enemyImg.src = "../images/enemy.png";

    explosionImg = new Image();
    explosionImg.src = "../images/explosion.png";
} 

let keysDown = {};

function keyboardListner() {
  document.addEventListener("keydown", function(event) {
    keysDown[event.keyCode] = true;
  });
  document.addEventListener("keyup", function(evnet) {
    delete keysDown[event.keyCode];

    if(evnet.keyCode == 32){
      createBullet();
    };
  });
}

function createBullet(){
  //console.log("Create Bullet!");
  let b = new Bullet();
  b.init();
  //console.log(bulletList);
}

function createEnemy() {
  const interval = setInterval(function(){
    let e = new enemy();
    e.init();
  }, 1000);
}

const speed = 5;

function update() {
  if(87 in keysDown || 38 in keysDown) {
    playerY -= speed;
  }
  if(65 in keysDown || 37 in keysDown) {
    playerX -= speed;
  }
  if(83 in keysDown || 40 in keysDown) {
    playerY += speed;
  }
  if(68 in keysDown || 39 in keysDown) {
    playerX += speed;
  }
  if(playerX <= 0) {
    playerX = 0;
  }
  if(playerX >= canvas.width -64) {
    playerX = canvas.width - 64;
  }
  if(playerY <= 0) {
    playerY = 0;
  }
  if(playerY >= canvas.height - 64) {
    playerY = canvas.height - 64;
  }

  for(let i = 0; i<bulletList.length; i++) {
    if(bulletList[i].alive){
      bulletList[i].update();
      bulletList[i].checkHit();
    }
  }

  for (let i = 0; i<enemyList.length; i++) {
    enemyList[i].update();
  }
}

function render() {
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(playerImg, playerX, playerY);
    ctx.fillText(`Score: ${score}`, 20, 20);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";

    for(let i = 0; i<bulletList.length; i++){
      if(bulletList[i].alive) {
      ctx.drawImage(bulletImg, bulletList[i].x, bulletList[i].y)
    };
    };

    for(let i = 0; i<enemyList.length; i++){
      ctx.drawImage(enemyImg, enemyList[i].x, enemyList[i].y)
    };
}

function loop() {
  if(!gameOver) {
  update();
  render();
  requestAnimationFrame(loop);
  }
}

loadImage();
keyboardListner();
createEnemy();
loop();
  