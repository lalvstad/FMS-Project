let img;
let rows = 4;
let columns = 4;
let pieces = [];
let pieceSize;
let draggingPiece = null;
let offsetX, offsetY;
let puzzleCompleted = false;

function preload() {
  img = loadImage("/images/BunnyPuzzle.png"); 
}

function setup() {
  let canvas = createCanvas(800, 800);
  canvas.parent("PuzzleActivity-container");
  pieceSize = width / columns;
  img.resize(width, height);
  createPuzzlePieces();

  textFont('Silkscreen');
  }

function createPuzzlePieces() {
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

  // Display the "Congratulations" message when the puzzle is completed
  if (puzzleCompleted) {
    let message1 = "Congratulations!";
    let message2 = "You've completed the puzzle!";

    let textPadding = 20;
    let maxTextWidth = max(textWidth(message1), textWidth(message2)) + textPadding;
    let textHeight = 80;

    fill(255, 255, 255, 200);
    noStroke();
    rect(width / 2 - maxTextWidth / 2, height / 2 - textHeight / 2, maxTextWidth, textHeight, 10);
  
    fill(0, 150, 0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text(message1, width / 2, height / 2 - 16);
    text(message2, width / 2, height / 2 + 16);
  }
}


// Congratulations! Message
if (puzzleCompleted) {
  let message1 = "Congratulations!";
  let message2 = "You've completed the puzzle!";

  let textPadding = 20;
  let maxTextWidth = max(textWidth(message1), textWidth(message2)) + textPadding;
  let textHeight = 80;

  fill(255, 255, 255, 200);
  noStroke();
  rect(width / 2 - maxTextWidth / 2, height / 2 - textHeight / 2, maxTextWidth, textHeight, 10);
  
  fill(0, 150, 0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(message1, width / 2, height / 2 - 16);
  text(message2, width / 2, height / 2 + 16); 
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
}
