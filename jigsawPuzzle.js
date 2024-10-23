function setup() {
  createCanvas(1400, 600);
  }
  
  function draw() {
    background(220);
    background('white');
  }
  
  // Create a graph data structure. Make each piece an object that containes pointers to the correct pieces that fit the sides.
  // On click, get the piece, and code the movement and placement. When trying to connect, check that the piece connecting to is the correct
  // pointer for that side.
  // Graph is complete when a counter of pointer matches is equal to the maximum amount of matches. (When there are no more pointers to check) 