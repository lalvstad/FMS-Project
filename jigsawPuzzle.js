/* JIGSAW PUZZLE LOGIC & PSUEDO CODE
  Create a 2D array of rows and columns, each element is a different puzzlePiece object.
  Must get what side of the puzzlePiece you are trying to connect to,
  Then it checks the array to see if the piece being connected is the correct piece, (e.g If connecting to the right, check col+1)

  Use function mousePressed() for dragging pieces, and mouseReleased() to check if the distance of the piece is < 50 and if so, check the pieces sides
  if correct piece

  function connect(firstImageRowCol, secondImageRowCol) {
    position both pieces together on the correct side
    create a new object of the two pieces together so they can't break apart
  }

  function mousePressed() {
    pick image closest to mouse pointer
    update image positioning to follow mouseX and mouseY
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

function setup() {
  createCanvas(1400, 600);
  }
  
function draw() {
  background(220);
  background('white');
}