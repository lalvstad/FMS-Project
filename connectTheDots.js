let points = [
  [510, 130], [350, 170], [250, 250], [200, 300], [170, 300],
  [170, 330], [200, 330], [230, 330], [230, 420], [230, 490], [260, 490],
  [260, 420], [500, 420], [500, 490], [530, 490], [530, 420], [820, 420],
  [820, 490], [850, 490], [850, 420], [850, 330], [880, 330], [910, 330], [910, 300],
  [880, 300], [820, 250], [700, 170]
];

let points3 = [
  [550.0, 125.0],
[460.0, 135.0],
 [420.0, 125.0],
 [395.0, 75.0],
 [400.0, 125.0],
 [440.0, 170.0],
 [410.0, 180.0],
 [380.0, 165.0],
 [345.0, 185.0],
 [355.0, 225.0],
 [390.0, 260.0],
 [435.0, 250.0],
 [425.0, 265.0],
 [430.0, 305.0],
 [437.5, 345.0],
 [455.0, 395.0],
 [452.5, 440.0],
 [470.0, 455.0],
 [550.0, 472.5],
 [630.0, 455.0],
 [647.5, 440.0],
 [645.0, 395.0],
 [662.5, 345.0],
 [670.0, 305.0],
 [675.0, 265.0],
 [665.0, 250.0],
 [710.0, 260.0],
 [745.0, 225.0],
 [755.0, 185.0],
 [720.0, 165.0],
 [690.0, 180.0],
 [660.0, 170.0],
 [700.0, 125.0],
 [705.0, 75.0],
 [680.0, 125.0],
 [640.0, 135.0]
];

let points2 = [
  [600, 200], [550, 90], [480, 120], [535, 120], [570, 210], [490, 280],
  [550, 330], [540, 285], [585, 235], [550, 400], [500, 400], [500, 500],
  [545, 500], [560, 470], [580, 450], [610, 450], [640, 470],
  [655, 500], [715, 500], [715, 400], [650, 400], [625, 240], [680, 320],
  [720, 260], [670, 270], [620, 210], [720, 120], [635, 80], [660, 120],
  [620, 170] 
];

let levels = [points, points2, points3];
let level = 0;
let countdown = 5; // 5-second timer for level transitions
let selectedPoints = [];
let elapsedTime = 0;
let activated = true;
let countdownStarted = false;
let gameOver = false;

function setup() { 
  createCanvas(1200, 1200);
  startStopwatch();
  textFont('Silkscreen');
  textSize(25);
  
  let resetButton = createButton('Reset');
  resetButton.position(1200, 0);
  resetButton.mousePressed(resetPoints);
}

function draw() {
  background(255); // Clear canvas
  fill('orange');
  textSize(40);
  if (level === 0) {
    text('Category: BARN', 400, 50);
    text('Level: ' + (level + 1), 1000, 500);
  } else if (level === 1) {
    text('Category: WINDMILL', 400, 50);
    text('Level: ' + (level + 1), 1000, 500);
  } else {
    text('Category: COW', 400, 50);
    text('Level: ' + (level + 1), 1000, 500);
  }

  textSize(25);
  drawPoints();

  if (gameOver) {
    textSize(90);
    textFont('Silkscreen');
    fill('red');
    text('OOPS! Wrong Move!', 70, 300);
    textSize(30); 
    text('YOU LOST :( Try again!', 400, 350);
    return; 
  }

  strokeWeight(2);
  for (let i = 0; i < selectedPoints.length - 1; i++) {
    let currentPoint = selectedPoints[i];
    let nextPoint = selectedPoints[i + 1];
    let currentIndex = levels[level].indexOf(currentPoint);
    let nextIndex = levels[level].indexOf(nextPoint);

    if (Math.abs(currentIndex - nextIndex) === 1 || (currentIndex === levels[level].length - 1 && nextIndex === 0)) {
      stroke('green');
    } else {
      stroke('red');
      selectedPoints.pop();
      gameOver = true;
      activated = false;
      break;
    }

    line(currentPoint[0], currentPoint[1], nextPoint[0], nextPoint[1]);
  }

  if (selectedPoints.length === levels[level].length + 1) {
    textSize(163);
    textFont('Silkscreen');
    text('YOU WIN! :)', 35, 255);
    stopStopwatch();
    displayTimeTaken();

    if (level < levels.length - 1) {
      textSize(30);
      fill('pink');
      text(`Level ${level + 1} Complete! Next level in ${countdown} seconds`, 200, 100);

      if (!countdownStarted) {
        countdownStarted = true;
        setTimeout(() => {
          nextLevel();
          countdownStarted = false;
        }, countdown * 1000);
      }
    } else {
      textSize(30);
      fill('green');
      text(`Final Level Reached: ${level + 1}`, 300, 500);
    }
  }
}

function drawPoints() {
  fill('black');
  for (let i = 0; i < levels[level].length; i++) {
    let point = levels[level][i];
    ellipse(point[0], point[1], 10, 10);
    textSize(12);
    text(i + 1, point[0] + 6, point[1] + 4);
  }
}

function mousePressed() {
  if (activated) {
    for (let point of levels[level]) {
      if (dist(mouseX, mouseY, point[0], point[1]) < 10) {
        selectedPoints.push(point);
        break;
      }
    }
  }
}

function nextLevel() {
  level++;
  selectedPoints = [];
  resetStopwatch();
  startStopwatch();
}

function resetPoints() {
  selectedPoints = []; 
  gameOver = false;
  resetStopwatch();
  activated = true;
}

function startStopwatch() {
  startTime = Date.now() - elapsedTime;
  interval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
  }, 100);
}

function stopStopwatch() {
  clearInterval(interval);
}

function resetStopwatch() {
  clearInterval(interval);
  elapsedTime = 0;
}

function formatTime(time) {
  const milliseconds = Math.floor((time % 1000) / 100);
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

  return (
    (hours < 10 ? "0" + hours : hours) + ":" +
    (minutes < 10 ? "0" + minutes : minutes) + ":" +
    (seconds < 10 ? "0" + seconds : seconds) + "." +
    milliseconds
  );
}

function displayTimeTaken() {
  const timeTaken = formatTime(elapsedTime);
  textSize(24);
  fill('purple');
  textFont('Silkscreen');
  text('Time Taken: ' + timeTaken, 400, 300);
}

