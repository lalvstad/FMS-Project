let points = [
  [510, 130], [350, 170], [250, 250], [200, 300], [170, 300],
  [170, 330], [200, 330], [230, 330], [230, 420], [230, 490], [260, 490],
  [260, 420], [500, 420], [500, 490], [530, 490], [530, 420], [820, 420],
  [820, 490], [850, 490], [850, 420], [850, 330], [880, 330], [910, 330], [910, 300],
  [880, 300], [820, 250], [700, 170]
];

let selectedPoints = [];
let elapsedTime = 0;
let activated = true;

function setup() { 
  createCanvas(1200, 515);
  startStopwatch();
  textFont('Silkscreen');
  textSize(25)
  text('Category: BARN', 500, 50)
  let resetButton = createButton('Reset');
  resetButton.position(1200, 0);
  resetButton.mousePressed(resetPoints);
  
}

function draw() {
  // Draw points
  
  drawPoints();

  // Creates reset button
  let resetButton = createButton('Reset');
  resetButton.position(1200, 0);

  // Calls resetPoints() when button pressed
  resetButton.mousePressed(resetPoints);

  // Draw lines between selected points
  strokeWeight(2);
  for (let i = 0; i < selectedPoints.length - 1; i++) {
    let currentPoint = selectedPoints[i];
    let nextPoint = selectedPoints[(i + 1) % selectedPoints.length];
    let currentIndex = points.indexOf(currentPoint);
    let nextIndex = points.indexOf(nextPoint);

      if (Math.abs(currentIndex - nextIndex) === 1 || (currentIndex = selectedPoints.length - 1 && nextIndex == 0)) {
      stroke('green'); // Correct connection
    } else {
      stroke('red'); // Incorrect connection
      selectedPoints.pop();
      textSize(200)
      textFont('Silkscreen');
      text('YOU LOSE! :(', 200, 255)
      stopStopwatch();
      activated = false;
    }

    stroke(Math.abs(currentIndex - nextIndex) === 1 ? 'green' : 'red');
    line(currentPoint[0], currentPoint[1], nextPoint[0], nextPoint[1]);
  }
  
  if (selectedPoints.length == points.length + 1) {
    textSize(200)
    textFont('Silkscreen');
    text('YOU WIN! :)', 0, 255)
    stopStopwatch();
    displayTimeTaken(); 
  } 
  
}

function drawPoints() {
  fill('black');
  
  for (let i = 0; i < points.length; i++) {
    let point = points[i];
    ellipse(point[0], point[1], 10, 10); // Draw black circles

    textSize(12);
    text(i + 1, point[0] + 6, point[1] + 4); // Offset the text slightly
  }
}

function resetPoints() {
  clear();
  selectedPoints = []; 
  resetStopwatch();
  activated = true;
}


function mousePressed() {
  if (activated) {
    if (selectedPoints.length > 0) {
      let lastPoint = selectedPoints[selectedPoints.length - 1];
      if (dist(mouseX, mouseY, lastPoint[0], lastPoint[1]) < 10) {
        selectedPoints.pop(); // Remove the last point
        if (selectedPoints.length > 0) {
          let previousPoint = selectedPoints[selectedPoints.length - 1];
          strokeWeight(2);
          stroke(255); // Set stroke color to white (background color) to "erase" the line
          line(previousPoint[0], previousPoint[1], lastPoint[0], lastPoint[1]);
        }  
        return; // Exit the function after undoing
      }
    }
  
    for (let point of points) {
      if (dist(mouseX, mouseY, point[0], point[1]) < 10) {
        selectedPoints.push(point);
        break;
      }
    }
  }
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
    + milliseconds
  );
}

function displayTimeTaken() {
  const timeTaken = formatTime(elapsedTime);
  textSize(24);
  fill('blue');
  textFont('Silkscreen');
  text('Time Taken: ' + timeTaken, 400, 300);
}