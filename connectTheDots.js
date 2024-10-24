let points = [
  [510, 80], [350, 120], [250, 200], [200, 250], [170, 250],
  [170, 280], [200, 280], [230, 280], [230, 370], [230, 460], [260, 460],
  [260, 370], [500, 370], [500, 460], [530, 460], [530, 370], [820, 370],
  [820, 460], [850, 460], [850, 370], [850, 280], [880, 280], [910, 280], [910, 250],
  [880, 250], [820, 200], [700, 120]
];


/* HashMap Test 
Arrays are traversed using an index
HashMaps are traveresed using a key associated with the value you want;
This will make accessing a point a time complexity of O(1) instead of O(n). 
*/
/*
const pointsMap = new Map();
let keyIterator = 1;
let keyName = "point" + keyIterator;
points.forEach(element => {
  pointsMap.set(keyName, element);
  keyIterator++;
  keyName = "point" + keyIterator;
})

for (let [key, value] of pointsMap) {
  console.log('Element ${key} is at ${value}');
  if (keyIterator === points.length) {
    console.log('All points stored successfully in HashMap');
  }
  else {
    console.log('MEMORY ERROR: Memory was lost inserting Array[points] into HashMap[pointsMap]');
  }
}
*/

let selectedPoints = [];
/* if we want selectedPoints HashMap as well
const selectedPoints = new Map();
*/

function setup() { 
  createCanvas(1200, 515);
  background('red'); // Use a valid color string
}

function draw() {
  background('#DDA0DD'); // Use a valid color

  // Draw points
  fill('red');
  for (let i = 0; i < points.length; i++) {
    let point = points[i];
    ellipse(point[0], point[1], 10, 10); // Draw red circles

    fill('black');
    textSize(12);
    text(i + 1, point[0] + 6, point[1] + 4); // Offset the text slightly
  }

  // Draw lines between selected points
  strokeWeight(2);
  for (let i = 0; i < selectedPoints.length - 1; i++) {
    let currentPoint = selectedPoints[i];
    let nextPoint = selectedPoints[i + 1];
    let currentIndex = points.indexOf(currentPoint);
    let nextIndex = points.indexOf(nextPoint);

    if (Math.abs(currentIndex - nextIndex) === 1) {
      stroke('green'); // Correct connection
    } else {
      stroke('red'); // Incorrect connection
    }

    stroke(Math.abs(currentIndex - nextIndex) === 1 ? 'green' : 'red');
    line(currentPoint[0], currentPoint[1], nextPoint[0], nextPoint[1]);
  }
}
  /*
  We need to add an if statement that determines if the selected point is the next point in order after the previous,
  and change the line color accordingly
  We will need to substring the key to obtain the number, and compare
  This would be the implementation with a HashMap. NOT TESTED OR DEBUGGED
  
  let previousKey = 0;
  for (let [key, value] of selectedMap) {
    let currKey = parseInt(key.substring(4), 10); // parseInt(keyNumber, base-10)
    if (previousKey === currKey-1 || previousKey === 0) {
      stroke('green');
    } 
    else {
      stroke('red');
    }
    let point = selectedMap.get(key);
    vertex(point[0], point[1]);
    previousKey = currKey;
  }
  */


function mousePressed() {
  if (selectedPoints.length > 0) {
    let lastPoint = selectedPoints[selectedPoints.length - 1];
    if (dist(mouseX, mouseY, lastPoint[0], lastPoint[1]) < 10) {
      selectedPoints.pop(); // Remove the last point
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

/* HashMap version of mousePressed()
let lastPoint = null;
  function mousePressed() {
    if (selectedMap.size > 0) {
      pointValue = selectedMap.get(lastPoint);
      if (dist(mouseX, mouseY, pointValue[0], pointValue[0])) {
        selectedPoints.delete(lastPoint);
        return;
      }
    }
    for (let [key, value] of pointsMap) {
      if (dist(mouseX, mouseY, value[0], value[1]) < 10) {
        selectedMap.set(key, value);
        lastPoint = key;
      }
    }
  }
*/

  