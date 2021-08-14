var GroundImg, ground;
var player, playerImg, playerCollided;
var coinImg;
var score = 0;
var gameState = "PLAY";

function preload() {
    
    playerImg = loadAnimation(
        "img/boy1.png",
        "img/boy2.png",
        "img/boy3.png",
        "img/boy4.png"
    );
    GroundImg = loadImage("img/bg3.png");
    coinImg = loadImage("img/coin.png");
    playerCollided = loadAnimation("img/boy1.png");
}

function setup() {
    createCanvas(600, 600);

    ground = createSprite(300, 370);
    ground.addImage(GroundImg);
    ground.scale = 2;
    player = createSprite(290, 420, 20, 20);
    player.addAnimation("player_running", playerImg);
    player.scale = 1.4;

    coinGroup = createGroup();
}

function draw() {
    background(255);
    drawSprites();
    // text(mouseX + ", " + mouseY, mouseX, mouseY);
    text("Score : " + score, 500, 40);

    if (gameState === "PLAY") {
        ground.velocityY = -4;
        if (ground.y < 200) {
            ground.y = ground.width / 2;
        }

        if (keyDown(LEFT_ARROW) && player.x >= 120) {
            player.x = player.x - 2;
        } else if (keyDown(RIGHT_ARROW) && player.x <= 460) {
            player.x = player.x + 2;
        }

        coin();

        if (coinGroup.collide(player, reduce)) {
            score = score + 1;
        }

        if (score === 50) {

            gameState = "END";
        }
    }
    if (gameState === "END") {
        textSize(30);
        text("You Reached the Mountain!!", 250, 250);
        ground.velocityY = 0;
        player.changeAnimation("collided", playerCollided);
        player.animation.looping = false;
    }
}



function coin() {
    if (frameCount % 60 === 0) {
        var coins = createSprite(300, 355, 10, 40);

        coins.x = Math.round(random(190, 400));
        coins.velocityY = 1;

        coins.addImage(coinImg);
        coins.scale = 0.1;

        coinGroup.add(coins);
    }
}

function reduce(obs, st) {
    obs.destroy();
}
