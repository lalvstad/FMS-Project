let points = [
  [510, 80], [350, 120], [250, 200], [200, 250], [190, 250],
  [190, 260], [200, 260], [200, 460], [230, 460], [230, 370],
  [230, 370], [500, 370], [500, 460], [530, 370], [850, 370],
  [850, 460], [880, 460], [880, 260], [890, 260], [890, 250],
  [880, 250], [850, 200], [700, 120]
];
/* HashMap Test 
Arrays are traversed using an index
HashMaps are traveresed using a key associated with the value you want;
This will make accessing a point a time complexity of O(1) instead of O(n). 
*/
/*
let pointsMap = {};
let keyIterator = 1;
let keyName = "point" + keyIterator;
points.forEach(element => {
  pointsMap[keyName] = element;
  keyIterator++;
  keyName = "point" + keyIterator;
})

for (let key in pointsMap) {
  console.log('Element ${key} is at ${pointsMap[key]}');
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
let selectedPoints = {};
*/

function setup() { 
  createCanvas(1200, 515);
  background('red'); // Use a valid color string
}

function draw() {
  background('lightpurple');

  // Draw points
  fill('red');
  for (let point of points) {
      ellipse(point[0], point[1], 10, 10); // Draw red circles
  }

  // Draw lines between selected points
  stroke('black');
  strokeWeight(2);
  noFill();
  beginShape();
  for (let sp of selectedPoints) {
      vertex(sp[0], sp[1]); // Connect the selected points
  }
  /*
  We need to add an if statement that determines if the selected point is the next point in order after the previous,
  and change the line color accordingly
  We will need to substring the key to obtain the number, and compare
  This would be the implementation with a HashMap. NOT TESTED OR DEBUGGED
  
  let previousKey = 0;
  for (let key in selectedMap) {
    let currKey = Integer.parse(key.substring(4)); -- Idek if Integer.parse is a thing in JavaScript, but it is in Java
    if (previousKey === currKey-1 || previousKey === 0) {
      stroke('green');
    } 
    else {
      stroke('red');
    }
    let point = selectedMap[key];
    vertex(point[0], point[1]);
    previousKey = currKey;
  }
  */
  endShape();
}


function mousePressed() {
  for (let point of points) {
      if (dist(mouseX, mouseY, point[0], point[1]) < 10) {
          selectedPoints.push(point);
      }
  }
}

/* HashMap version of mousePressed()
  function mousePressed() {
    for (let key in pointsMap) {
      let selected = pointsMap[key];
      if (dist(mouseX, mouseY, selected[0], selected[1]) < 10) {
        selectedMap[key] = selected;
      }
    }
  }
*/

  