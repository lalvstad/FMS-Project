/* 
This might be cool to have levels. 
-   First level, bubble just appears on screen. 
-   Second level, bubbles appear from the right side of the screen moving toward the left oscilating up and down. 
-   As levels go on, more and more bubbles appear
*/

/* 
How bubbles get destroyed:
-   User inputs letter associated with the bubble
      1:  Locate key in dotMap
      2:  Move ellipse off screen 
      3:  Delete key/value association in dotMap 
      4:  Add +1 to correct counter
      5:  Play a positive noise
-   The bubble leaves the screen dimensions on the left side
      1:  If dotX is less than or equal to 0, delete key/value association in dotMap 
      2:  Create red flash on screen
*/


let number_of_bubbles = 0;
let speed = 0; // will need to see how fast it moves

function levelSetting(levelNumber) {
  switch(levelNumber) {
    case 1: 
      number_of_bubbles = 20;
      speed = 1;
      console.log('Level set to 1\nNumber of Bubbles is set to 20');
    break;
    case 2: 
      number_of_bubbles = 30;
      speed = 3;
      console.log('Level set to 2\nNumber of Bubbles is set to 30');
    default: 
      if (levelNumber > 2) {
        number_of_bubbles = levelNumber * 15;
        speed = 5 + levelNumber * 1.10;
        console.log('Level set to ${levelNumber}\nNumber of Bubbles is set to ${number_of_bubbles}');
      }
      else {
        throw new Error('Level number is invalid. Level number is less than 0');
      }
  }
}

let dotMap = {}

// We can create a typing and clicking option as well.
// Creates a dot somewhere within the canvas and adds its position to a HashMap containing dot locations.
function createDots() {
  const dotNameSelection = 'abcdefghijklmnopqrstuvwxyz' // possible keys available
  const dotRadius = 30;
  let letter = Math.floor(Math.random() * (24)); // getting a letter position at random between 0 and 25 (inclusive)
  let dotNameGet = dotNameSelection.substring(letter, letter + 1); // fetching the letter from the string.
  
  // Prevents duplicate of the same letter
  while (dotMap.containsKey(dotNameGet)) { 
    letter = Math.floor(Math.random() * (24));
    dotNameGet = dotNameSelection.substring(letter, letter + 1);
  }
  
  // Prevents infinite while loop @ ln 42
  if (dotMap.size() < 25) { 
    fill('light-blue');
    let dot = [];
    dot[0] = Math.floor(Math.random() * (1200 - dotRadius + 1)); // dotX
    dot[1] = Math.floor(Math.random() * (515 - dotRadius + 1)); // dotY
    ellipse(dot[0], dot[1], dotRadius, dotRadius);
    dotMap[dotNameGet] = dot; // insert into HashMap
    // Need to create text that follows the bubble
  }

  /*
  *** Number of bubbles on screen is limited to 25 to prevent duplicates of letters on screen ***
   Solution works fine for now, if we wanted to allow duplicates, we would need to put multiple dot locations into a 'Set' data structure as the
   value for the associated key (letter). I didn't want to do the work of implementing how we would create these sets and how data would be accessed rn.
  */

  /* Will implement movement on Tuesday. There is actually no way to remove shapes after they have been drawn, 
     so moving them off the viewable canvas will suffice. */
  // Maybe oscilates back and forth on y-axis??
  while (dot[0] > 0) {
    dot[0] = dot[0] - speed;
  }
  if (dot[0] <= 0) {
    dotMap.remove(dotNameGet);
  }
}

function levelStart(levelNumber) {
  levelSetting(levelNumber);
  for (let i = 0; i < number_of_bubbles; i++) {
    setInterval(createDots(), 4000/speed + 500); // configures the amount of time between the creation of dots
  }
}



function setup() {
  createCanvas(1200, 515);
}

function draw() {
  background(220);
  background('white');
}

