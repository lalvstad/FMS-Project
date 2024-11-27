let points = [
  [510, 130], [350, 170], [250, 250], [200, 300], [170, 300],
  [170, 330], [200, 330], [230, 330], [230, 420], [230, 490], [260, 490],
  [260, 420], [500, 420], [500, 490], [530, 490], [530, 420], [820, 420],
  [820, 490], [850, 490], [850, 420], [850, 330], [880, 330], [910, 330], [910, 300],
  [880, 300], [820, 250], [700, 170]
];

let points2 = [
  [450.0, 120.0],
 [360.0, 130.0],
 [320.0, 120.0],
 [295.0, 70.0],
 [300.0, 120.0],
 [340.0, 165.0],
 [310.0, 175.0],
 [280.0, 160.0],
 [245.0, 180.0],
 [255.0, 220.0],
 [290.0, 255.0],
 [335.0, 245.0],
 [325.0, 260.0],
 [330.0, 300.0],
 [337.5, 340.0],
 [355.0, 390.0],
 [352.5, 435.0],
 [370.0, 450.0],
 [450.0, 467.5],
 [530.0, 450.0],
 [547.5, 435.0],
 [545.0, 390.0],
 [562.5, 340.0],
 [570.0, 300.0],
 [575.0, 260.0],
 [565.0, 245.0],
 [610.0, 255.0],
 [645.0, 220.0],
 [655.0, 180.0],
 [620.0, 160.0],
 [590.0, 175.0],
 [560.0, 165.0],
 [600.0, 120.0],
 [605.0, 70.0],
 [580.0, 120.0],
 [540.0, 130.0]
];

let points3 = [
  [200, 200], [150, 50], [80, 120], [135, 120], [170, 190], [90, 280],
  [150, 350], [150, 295], [185, 235], [150, 400], [120, 400], [120, 500],
  [175, 500], [180, 470], [190, 450], [210, 450], [220, 470],
  [225, 500], [280, 500], [280, 400], [250, 400], [225, 240], [250, 320],
  [320, 250], [270, 250], [220, 210], [290, 100], [225, 50], [240, 120],
  [220, 170], 
];

let levels = [points, points2, points3];
let level = 0;
let countdown = 10; // 10-second timer for level transitions
let selectedPoints = [];
let elapsedTime = 0;
let activated = true;
let countdownStarted = false;

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
  textSize(40);
  if (level === 0) {
    text('Category: BARN', 400, 50);
    text('Level: ' + (level + 1), 1000, 500);
  } else if (level === 1) {
    text('Category: COW', 400, 50);
    text('Level: ' + (level + 1), 1000, 500);
  } else {
    text('Category: WINDMILL', 400, 50);
    text('Level: ' + (level + 1), 1000, 500);
  }

  textSize(25);
  drawPoints();

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
      textSize(160);
      textFont('Silkscreen');
      text('YOU LOSE! :(', 0, 255);
      stopStopwatch();
      activated = false;
    }

    line(currentPoint[0], currentPoint[1], nextPoint[0], nextPoint[1]);
  }

  if (selectedPoints.length === levels[level].length + 1) {
    textSize(163);
    textFont('Silkscreen');
    text('YOU WIN! :)', 0, 255);
    stopStopwatch();
    displayTimeTaken();

    if (level < levels.length - 1) {
      textSize(30);
      fill('blue');
      text(`Level ${level + 1} Complete! Next level in ${countdown} seconds`, 100, 100);

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
  fill('blue');
  textFont('Silkscreen');
  text('Time Taken: ' + timeTaken, 400, 300);
}
