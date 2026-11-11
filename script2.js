let img;
let sunCircles = [];

async function setup() {
  createCanvas(400, 600);
  img = await loadImage('plant.png');
}

function draw() {
  background('#8EE3EF');
  noStroke();

  // Slower cycle speed (changed from 0.015 to 0.006)
  let cycle = abs(sin(frameCount * 0.006));
  
  // Sun travels vertically and grows massive to fill the canvas at peak
  let sunY = lerp(height + 100, 150, cycle);
  let sunSize = lerp(80, 450, cycle);

  // Spawn new radiating circles periodically
  if (frameCount % 35 === 0) {
    sunCircles.push({
      x: width / 2,
      y: sunY,
      r: 20,
      alpha: 255
    });
  }

  // Update and draw all radiating circles
  for (let i = sunCircles.length - 1; i >= 0; i--) {
    let c = sunCircles[i];
    c.y -= 1.0; 
    c.r += 2.0; 
    c.alpha = map(c.y, height, 0, 255, 0);

    if (c.alpha > 0) {
      let radialGradient = drawingContext.createRadialGradient(
        c.x, c.y, 0,
        c.x, c.y, c.r
      );
      
      radialGradient.addColorStop(0, `rgba(39, 65, 86, ${c.alpha / 255 * 0.4})`);
      radialGradient.addColorStop(1, 'rgba(20, 10, 40, 0)');

      drawingContext.fillStyle = radialGradient;
      circle(c.x, c.y, c.r * 2);
    } else {
      sunCircles.splice(i, 1);
    }
  }

  // Draw the main sun with a radial gradient
  let mainSunGrad = drawingContext.createRadialGradient(
    width / 2, sunY, 0,
    width / 2, sunY, sunSize
  );
  mainSunGrad.addColorStop(0, 'rgb(39, 65, 86)');
  mainSunGrad.addColorStop(1, 'rgba(20, 10, 40, 0)');

  drawingContext.fillStyle = mainSunGrad;
  circle(width / 2, sunY, sunSize * 2);

 let a = map(mouseX, 0, width, 0, 255);
  drawingContext.fillStyle = '#140a28';
  drawingContext.letterSpacing = '-5px'
  fill('#8EE3EF');
  textFont('Impact');
  textSize(102);
  textStyle(BOLD);
  text ('OUR FLORA', width / 2, 325);


  drawingContext.letterSpacing = '0px'
  fill(142, 227, 239, a);
  textFont('Helvetica');
  textSize(20);
  textStyle(BOLD);
    textAlign(CENTER);
    text("STAND UP FOR WHAT CAN'T", width / 2, mouseY);
    textSize(25);
    text("STAND UP FOR ITSELF", width / 2, mouseY + 30);

 
  image(img, 0, 250, 1000, 350);
  image(img, -400, 250, 1000, 350);
  image(img, 0, 400, 1000, 350);
  image(img, -400, 450, 1000, 350);
}