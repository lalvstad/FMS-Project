/* 
This might be cool to have levels. 
-   First level, bubble just appears on screen. 
-   Second level, bubbles appear from the right side of the screen moving toward the left oscilating up and down. 
-   As levels go on, more and more bubbles appear
*/
let number_of_bubbles = 0;
let speed = 0; // will need to see how fast it moves

function levelSetting(levelNumber) {
  switch(levelNumber) {
    case 1: 
      number_of_bubbles = 20;
      speed = 30;
      console.log('Level set to 1\nNumber of Bubbles is set to 20');
    break;
    case 2: 
      number_of_bubbles = 30;
      speed = 50;
      console.log('Level set to 2\nNumber of Bubbles is set to 30');
    default: 
      if (levelNumber > 2) {
        number_of_bubbles = levelNumber * 15;
        speed = 50 + levelNumber * 3;
        console.log('Level set to ${levelNumber}\nNumber of Bubbles is set to ${NUMBER_OF_BUBBLES}');
      }
      else {
        throw new Error('LevelNumber is invalid. Level number is less than 0');
      }
  }
}

let dotMap = {}
// We can create a typing and clicking option as well. 
function createDots() {
  
  // Creates a dot somewhere within the canvas and adds its position to a HashMap containing dot locations.
  const dotNameSelection = 'abcdefghijklmnopqrstuvwxyz' // possible keys available
  let dotRadius = 30;
  let letter = Math.floor(Math.random() * (26)); // getting a letter position at random
  let dotNameGet = dotNameSelection.substring(letter, letter + 1); // fetching the letter from the string.
  fill('light-blue');
  let dot = [];
  let dotX = Math.floor(Math.random() * (1200 - dotRadius + 1));
  let doxY = Math.floor(Math.random() * (515 - dotRadius + 1));
  dot[1] = dotX;
  dot[2] = dotY;
  ellipse(dotX, dotY, dotRadius, dotRadius);
  dotMap[dotNameGet] = dot; // HashMap key is the letter the user will need to type to pop the bubble.
  
  // Will implement movement on Tuesday.
  
}



function setup() {
  createCanvas(1200, 515);
}

function draw() {
  background(220);
  background('white');
}

