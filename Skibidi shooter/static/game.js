const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const playerImg = new Image();
playerImg.src = "/static/cameraman.png";

const toiletImg = new Image();
toiletImg.src = "/static/toilet.png";

let keys = {};
let player = { x: 400, y: 500, width: 50, height: 50, speed: 5 };
let toilets = [];
let score = 0;
let gameOver = false;

// Handle keyboard input
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

// Spawn Skibidi Toilet
function spawnToilet() {
  toilets.push({
    x: Math.random() * (canvas.width - 50),
    y: -50,
    width: 50,
    height: 50,
    speed: 2 + Math.random() * (score / 10 + 2)
  });
}

function update() {
  if (gameOver) return;

  // Move player
  if (keys["ArrowLeft"] && player.x > 0) player.x -= player.speed;
  if (keys["ArrowRight"] && player.x < canvas.width - player.width) player.x += player.speed;
  if (keys["ArrowUp"] && player.y > 0) player.y -= player.speed;
  if (keys["ArrowDown"] && player.y < canvas.height - player.height) player.y += player.speed;

  // Move toilets
  toilets.forEach(t => t.y += t.speed);

  // Remove off-screen toilets
  toilets = toilets.filter(t => t.y < canvas.height + 50);

  // Collision detection
  for (let t of toilets) {
    if (
      player.x < t.x + t.width &&
      player.x + player.width > t.x &&
      player.y < t.y + t.height &&
      player.y + player.height > t.y
    ) {
      gameOver = true;
      alert("💀 You got Skibidi'd! Final Score: " + score);
      location.reload();
    }
  }

  // Spawn new toilets
  if (Math.random() < 0.02 + score * 0.0005) spawnToilet();

  // Increase score
  score += 1;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw player
  ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);

  // Draw toilets
  for (let t of toilets) {
    ctx.drawImage(toiletImg, t.x, t.y, t.width, t.height);
  }

  // Score
  ctx.fillStyle = "white";
  ctx.font = "24px sans-serif";
  ctx.fillText("Score: " + score, 20, 30);
}

function gameLoop() {
  update();
  draw();
  if (!gameOver) requestAnimationFrame(gameLoop);
}

gameLoop(); 