let img;
let rows = 4;
let columns = 4;
let pieces = [];
let pieceSize;
let draggingPiece = null;
let offsetX, offsetY;
let puzzleCompleted = false;
let timer = 0;
let finalTime = 0;

function preload() {
  img = loadImage("/images/BunnyPuzzle.png"); 
}

// Track levels
let currentLevel = 0;
const levelConfigs = [
  {imagePath: "/images/BunnyPuzzle.png", rows: 4, columns: 4},
  {imagePath: "/images/UnicornPuzzle(2).png", rows: 5, columns: 5},
  {imagePath: "/images/FarmPuzzle(3).png", rows: 6, columns: 6},
];

// Reset game for next level
function loadLevel(level) {
  if (level >= levelConfigs.length) {
    console.log("All levels completed!");
    puzzleCompleted = true;
    return;
  }

  const config = levelConfigs[level];
  loadImage(config.imagePath, (loadedImage) => {
    img = loadedImage; // Assign the loaded image
    rows = config.rows;
    columns = config.columns;
    pieceSize = width / columns;
    img.resize(width, height);
    createPuzzlePieces();
    puzzleCompleted = false;
    timer = 0;
  });
}



function setup() {
  let canvas = createCanvas(800, 800);
  canvas.parent("PuzzleActivity-container");
  loadLevel(currentLevel);

  textFont('Silkscreen');
  }

function createPuzzlePieces() {
  pieces = [];

  for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
          let x = j * pieceSize;
          let y = i * pieceSize;
          let piece = {
              img: img.get(x, y, pieceSize, pieceSize), 
              x: random(width - pieceSize),
              y: random(height - pieceSize),
              correctX: x,
              correctY: y,
              isPlaced: false
          };
          pieces.push(piece);
      }
  }
}
  
function draw() {
  background(220);
  
  // Draw placed pieces first (these will appear at the back)
  let placedPieces = pieces.filter(piece => piece.isPlaced);
  for (let piece of placedPieces) {
      image(piece.img, piece.correctX, piece.correctY, pieceSize, pieceSize);
  }

  // Draw unplaced pieces on top
  let unplacedPieces = pieces.filter(piece => !piece.isPlaced);
  for (let piece of unplacedPieces) {
      image(piece.img, piece.x, piece.y, pieceSize, pieceSize);
  }

  // increment timer
  if (!puzzleCompleted) {
    timer += deltaTime / 1000; // increment in seconds
  }

  // Display the "Congratulations" message when the puzzle is completed
  if (puzzleCompleted) {
    let message1 = "Congratulations!";
    let message2 = "You've completed the puzzle!";
    let message3 = "Time: " + timer.toFixed(2) + " seconds"; // Display time

    let textPadding = 20;
    let lineSpacing = 40;
    let maxTextWidth = max(textWidth(message1), textWidth(message2), textWidth(message3)) + textPadding;
    let textHeight = 140;
    

    fill(255, 255, 255, 230);
    noStroke();
    rect(width / 2 - maxTextWidth / 2, height / 2 - textHeight / 2, maxTextWidth, textHeight, 10);
  
    fill(0, 150, 0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text(message1, width / 2, height / 2 - lineSpacing);
    text(message2, width / 2, height / 2);
    text(message3, width / 2, height / 2 + lineSpacing);
  } 
  else {
    // display timer top left
    fill(0);
    textSize(24);
    textAlign(LEFT, TOP);
    text("Time: " + timer.toFixed(2) + " seconds", 10, 10);
  }

}


function mousePressed() {
  if (puzzleCompleted) return; 
  for (let i = 0; i < pieces.length; i++) {
      let piece = pieces[i];
      if (mouseX > piece.x && mouseX < piece.x + pieceSize &&
          mouseY > piece.y && mouseY < piece.y + pieceSize &&
          !piece.isPlaced) {
          
          pieces.splice(i, 1);
          pieces.push(piece);

          draggingPiece = piece;
          offsetX = mouseX - piece.x;
          offsetY = mouseY - piece.y;
          return false;
      }
  }
}


function mouseDragged() {
  if (draggingPiece) {
      draggingPiece.x = mouseX - offsetX;
      draggingPiece.y = mouseY - offsetY;

      draggingPiece.x = constrain(draggingPiece.x, 0, width - pieceSize);
      draggingPiece.y = constrain(draggingPiece.y, 0, height - pieceSize);
  }
}

function mouseReleased() {
  if (draggingPiece) {
      let d = dist(draggingPiece.x, draggingPiece.y, draggingPiece.correctX, draggingPiece.correctY);
      if (d < pieceSize / 2) {
          draggingPiece.x = draggingPiece.correctX;
          draggingPiece.y = draggingPiece.correctY;
          draggingPiece.isPlaced = true;
      }
      draggingPiece = null;

      checkCompletion();
  }
}

function checkCompletion() {
  for (let piece of pieces) {
    if (!piece.isPlaced) return; 
  }

  puzzleCompleted = true;
  finalTime = timer;

  setTimeout(() => {
    currentLevel++;
    loadLevel(currentLevel); // next level
  }, 2000); 
}
