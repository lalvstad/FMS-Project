/* 
How bubbles get destroyed:
-   User inputs letter associated with the bubble
      1:  Locate key in dotMap
      2:  Move ellipse off screen 
      3:  Delete key/value association in dotMap 
      4:  Add +1 to correct counter
      5:  Play a positive noise
-   The bubble leaves the screen dimensions on the left side
      1:  If dotX is less than or equal to 0, delete key/value association in dotMap.
      2:  Initiate fail screen
*/

/* Known Bugs:
  -   If the window is unfocused, bubbles will bunch up together on the right side. OK for now
*/

let number_of_bubbles = 20;
let currentLevel = 1;
let speed = 0; // Important to know that this number * 60 is the amount of pixels travelled per second on screen.
let bubblesPopped = 0;
let started = false;
let alive = true;
let justFailed = false;
let timeoutIds = [];
let totalScore = 0;

function setup() {
  createCanvas(1200, 515);
  textFont('Silkscreen');
}

let dotCreationActive = false;

function draw() {
  background(220);
  background("rebeccapurple");
  if (!started) {
    const startButton = createButton('START');
    startButton.position(720, 470); 
    startButton.mousePressed(start);
    if (justFailed) { // Level fail needs to be here in order to be drawn correctly
      textSize(50);
      fill('white');
      text('Bubble Escaped!', 200, 255);
      text('You reached level ' + currentLevel, 200, 350);
    }
  }
  if (started) {
    textSize(40);
    fill('white');
    text('Bubbles left: ' + (number_of_bubbles - bubblesPopped), 750, 50);
    text('LEVEL ' + currentLevel, 25, 50);
    if (dotCreationActive) {
      alive = true;
      levelSetting();
      for (let i = 0; i < number_of_bubbles; i++) {
        if (justFailed) {
          break;
        }
        let timeoutId = setTimeout(() => {
          createDots();
        }, i * (2000 / speed + 500));
        timeoutIds.push(timeoutId); // timeout IDs need to be stored so we can clear the queue of createDots() functions that continue after level failure
      }
      dotCreationActive = false;
    }
    if (alive) {
      dotUpdate();
    }
    if (!alive) {
      justFailed = true;
      dotCreationActive = false;
      started = false;

      timeoutIds.forEach(clearTimeout);
      timeoutIds = [];
    }
    if (number_of_bubbles === bubblesPopped) {
      currentLevel += 1;
      bubblesPopped = 0;
      dotCreationActive = true;
    }
  }
}

function start() {
  justFailed = false;
  currentLevel = 1;
  started = true;
  dotCreationActive = true;
}

// LeveSetting is called at the start of the game, and will be called after popping all bubbles of the previous level.
function levelSetting() {
  if (currentLevel === 1) {
      number_of_bubbles = 20;
      speed = 1;
      console.log('Level set to 1\nNumber of Bubbles is set to 20');
  }
  else if (currentLevel === 2) {
      number_of_bubbles = 30;
      speed = 2;
      console.log('Level set to 2\nNumber of Bubbles is set to 30');
  }
  else {
      number_of_bubbles = 30 + (currentLevel * 2);
      speed = 2.0 + (currentLevel * 0.30);
      console.log('Level set to ${currentLevel}\nNumber of Bubbles is set to ${number_of_bubbles}');
    }
  }
// Creates dot hash map
const dotMap = new Map();
const dotRadius = 30;
let preventOverFlow = 0;

// We can create a typing and clicking option as well.
// Creates a dot somewhere along the right side of the canvas and adds its position as the value to a HashMap containing keys (letters).
function createDots() {
  const dotNameSelection = 'abcdefghijklmnopqrstuvwxyz'; // possible keys available
  let letter = Math.floor(Math.random() * (24)); // getting a letter position at random between 0 and 25 (inclusive)
  let dotNameGet = dotNameSelection.substring(letter, letter + 1); // fetching the letter from the string.
  
  // Prevents duplicate of the same letter
  while (dotMap.has(dotNameGet) && preventOverFlow < 25) { 
    letter = Math.floor(Math.random() * (24));
    dotNameGet = dotNameSelection.substring(letter, letter + 1);
    preventOverFlow++;
  }
  
  // Prevents infinite while loop @ ln 59
  if (dotMap.size < 25) { 
    fill('light-blue');
    let dot = [];
    dot[0] = 1201 - dotRadius; // dotX
    dot[1] = Math.floor(Math.random() * (420 - dotRadius) + 50); // dotY, 50 gives padding from the top text, 466 is Screen size in the y-direction - 50
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

// Updates all dots 60 times per second.
// future: maybe have the dots oscilate back and forth in the y-direction?
function dotUpdate()  { 
  for (let [key, value] of dotMap) {
    if (value[0] > 0) {
      value[0] -= speed;
      fill('white');
      ellipse(value[0], value[1], dotRadius, dotRadius);
      fill('black');
      textSize(30);
      text(key, value[0] - 8.5, value[1] + 10);
    }
    if (value[0] <= 0) { // Level Fail Event
      for (let [key, value] of dotMap) {
        dotMap.delete(key);
      }
      alive = false;
      dotCreationActive = false;
      break;
    }
  }
}

// Listens for a key press and checks if that key is one of the bubbles on screen.
document.body.addEventListener('keydown', function(event) {
  const keyPressed = event.key;
  if (dotMap.has(keyPressed)) {
    bubblesPopped += 1;
    totalScore++;
    dotMap.delete(keyPressed);
  }
});