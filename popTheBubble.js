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
let speed = 0; // Important to know that this number * 60 is the amount of pixels travelled per second on screen.
let bubblesPopped = 0;

function setup() {
  createCanvas(1200, 515);
}

function draw() {
  background(220);
  background('white');
  text('Bubbles left: ' + (number_of_bubbles - bubblesPopped), 1200, 0);
  dotUpdate();
}

// leveSetting is called at the start of the game, and will be called after popping all bubbles of the previous level.
function LevelSetting(levelNumber) {
  switch(levelNumber) {
    case 1: 
      number_of_bubbles = 20;
      speed = 1;
      console.log('Level set to 1\nNumber of Bubbles is set to 20');
    break;
    case 2: 
      number_of_bubbles = 30;
      speed = 2;
      console.log('Level set to 2\nNumber of Bubbles is set to 30');
    default: 
      if (levelNumber > 2) {
        number_of_bubbles = levelNumber * 15;
        speed = 3 + (levelNumber * 0.80);
        console.log('Level set to ${levelNumber}\nNumber of Bubbles is set to ${number_of_bubbles}');
      }
      else {
        throw new Error('Level number is invalid. Level number is less than 0');
      }
  }
}

const dotMap = new Map();
const dotRadius = 30;

// We can create a typing and clicking option as well.
// Creates a dot somewhere within the canvas and adds its position to a HashMap containing dot locations.
function CreateDots() {
  const dotNameSelection = 'abcdefghijklmnopqrstuvwxyz'; // possible keys available
  let letter = Math.floor(Math.random() * (24)); // getting a letter position at random between 0 and 25 (inclusive)
  let dotNameGet = dotNameSelection.substring(letter, letter + 1); // fetching the letter from the string.
  
  // Prevents duplicate of the same letter
  let preventOverFlow = 0;
  while (dotMap.has(dotNameGet) && preventOverFlow != 25) { 
    letter = Math.floor(Math.random() * (24));
    dotNameGet = dotNameSelection.substring(letter, letter + 1);
    preventOverFlow++;
  }
  
  // Prevents infinite while loop @ ln 59
  if (dotMap.size() < 25) { 
    fill('light-blue');
    let dot = [];
    dot[0] = 1201 - dotRadius; // dotX
    dot[1] = Math.floor(Math.random() * (516 - dotRadius)); // dotY
    ellipse(dot[0], dot[1], dotRadius, dotRadius);
    dotMap.set(dotNameGet, dot); // insert into HashMap
    // Need to create text that follows the bubble
  }

  /*
  *** Number of bubbles on screen is limited to 25 to prevent duplicates of letters on screen ***
   Solution works fine for now, if we wanted to allow duplicates, we would need to put multiple dot locations into a 'Set' data structure as the
   value for the associated key (letter). I didn't want to do the work of implementing how we would create these sets and how data would be accessed rn.
  */
}

let LevelDisplayActivator = true;

function LevelDisplay(levelNumber) {
  if (LevelDisplayActivator) {
    textSize(200);
    text('LEVEL ${levelNumber}', 200, 255);
    setTimeout(() => {clear();}, 5000);
    LevelDisplayActivator = false;
  }
}

function LevelStart(levelNumber) {
  LevelSetting(levelNumber);
  for (let i = 0; i < number_of_bubbles; i++) {
    setInterval(CreateDots(), 4000/speed + 500); // configures the amount of time between the creation of dots
  }
}

// Updates all dots 60 times per second. Hopefully works!
// future: maybe have the dots oscilate back and forth in the y-direction?
function dotUpdate()  { 
  for (let [key, value] of dotMap) {
    if (value[0] > 0) {
      text(key, value[0], value[1]);
      value[0] -= speed;
      ellipse(value[0], value[1], dotRadius, dotRadius);
    }
    if (value[0] <= 0) {
      dotMap.delete(key);
    }
  }
}

// Need to implement an EventListener waiting for the key-press of one of the keys in dotMap

node.addEventListener('keydown', function(event) {
  const keyPressed = event.key;
  if (dotMap.has(keyPressed)) {
    bubblesPopped += 1;
    dotMap.remove(keyPressed);
  }
})