let points = [
  [510, 80], [350, 120], [250, 200], [200, 250], [190, 250],
  [190, 260], [200, 260], [200, 460], [230, 460], [230, 370],
  [230, 370], [500, 370], [500, 460], [530, 370], [850, 370],
  [850, 460], [880, 460], [880, 260], [890, 260], [890, 250],
  [880, 250], [850, 200], [700, 120]
];

let selectedPoints = [];

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
  endShape();
}

function mousePressed() {
  for (let point of points) {
      if (dist(mouseX, mouseY, point[0], point[1]) < 10) {
          selectedPoints.push(point); // Add the clicked point to selected points
      }
  }
}

  