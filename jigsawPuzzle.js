/* JIGSAW PUZZLE LOGIC & PSUEDO CODE
  Create a 2D array of rows and columns, each element is a different puzzlePiece object.
  Must get what side of the puzzlePiece you are trying to connect to,
  Then it checks the array to see if the piece being connected is the correct piece, (e.g If connecting to the right, check col+1)

  Use function mousePressed() for dragging pieces, and mouseReleased() to check if the distance of the piece is < 50 and if so, check the pieces sides
  if correct piece

  p5.js actually has a lot of pre-built functions for dragging pieces

  function connect(firstImageRowCol, secondImageRowCol) {
    position both pieces together on the correct side
    create a new object of the two pieces together so they can't break apart
  }

  function mousePressed() {
    pick image closest to mouse pointer
    update image positioning using drag functions of p5js
    return false <- to prevent default web functions like highlighting
  }
  
  function mouseReleased() {
    get image closest to mouseReleased
    find the second closest image
    determine which side is closest to the other
    if their positions match in array {
      create a new array of each pieces' row and column index
      run connect(firstImageRowCol, secondImageRowCol)
    }
    else {
      run a light buzzer sound or idk
      visual cue like red flash or something
    }
  }
*/

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
  for (let piece of pieces) {
      if (!piece.isPlaced) {
          image(piece.img, piece.x, piece.y, pieceSize, pieceSize);
      } else {
          image(piece.img, piece.correctX, piece.correctY, pieceSize, pieceSize);
      }
  }

// Congratulations! Message
  if (puzzleCompleted) {
    fill(255, 255, 255, 200); 
    noStroke();
    rect(width / 2 - 200, height / 2 - 40, 400, 80, 10);

    fill(0, 150, 0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Congratulations! You've completed the puzzle!", width / 2, height / 2);
  }
}


function mousePressed() {
  if (puzzleCompleted) return; 

  for (let piece of pieces) {
      if (mouseX > piece.x && mouseX < piece.x + pieceSize &&
          mouseY > piece.y && mouseY < piece.y + pieceSize &&
          !piece.isPlaced) {
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
