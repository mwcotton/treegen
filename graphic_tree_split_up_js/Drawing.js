class Point {
    constructor(xOrPoint, y) {
      if (xOrPoint.x !== undefined && xOrPoint.y !== undefined) {
        this.x = xOrPoint.x;
        this.y = xOrPoint.y;
      } else {
        this.x = xOrPoint;
        this.y = y;
      }
    }
  }

class DrawingState {
    constructor(position, direction) {
      this.state = Object.create(null);
      this.state.position = position && new Point(position.x, position.y) || new Point(0, 0);
      this.state.direction = direction || 0; // right
      this.stack = [];
    }
  
    push() {
      this.stack.push(JSON.stringify(this.state));
    }
  
    pop() {
      this.state = JSON.parse(this.stack.pop() || '{}');
    }
  
    get depth() {
      return this.stack.length;
    }
  }

function drawForward(drawingState, params) {
    // make length stochastic
    var stoch_factor = 1;
    if (document.getElementById("select_length").value == "ini_stoch50"){
      stoch_factor = getRndFloat(0.5,1.5);
      console.log("stochastic " + stoch_factor);
    }
    else if (document.getElementById("select_length").value == "ini_stoch10"){
      stoch_factor = getRndFloat(0.9,1.1);
    }
    // make angle stochastic
    var factor_angle = 1;
    if (document.getElementById("select_angle").value == "angle_var-1"){
      factor_angle = getRndFloat(0.99,1.01);
      console.log('1%' + factor_angle);
    }
    else if (document.getElementById("select_angle").value == "angle_var-01"){
      factor_angle = getRndFloat(0.999,1.001);
      console.log('0.1%' + factor_angle);
    }
    let {x, y} = drawingState.state.position;
    let d = drawingState.state.direction;
    let newX = x + params.length * cos(d * factor_angle) * stoch_factor;
    let newY = y + params.length * sin(d * factor_angle) * stoch_factor;
    push();
    strokeWeight(drawingState.state.strokeWeight || 1);
    line(x, y, newX, newY);
    pop();
    drawingState.state.position.x = newX;
    drawingState.state.position.y = newY;
  };

  function drawSystem(system, fragmentIterator, drawingState) {
    const drawFrame = () => {
      const iter = fragmentIterator.next();
      if (iter.done) {
        return;
      }
      const fragment = iter.value;
      for (const character of fragment) {
        const drawingFunction = system.commands[character];
        if (drawingFunction) {
          drawingFunction(drawingState, system.params);
        }
      }
      requestAnimationFrame(drawFrame);
    };
    requestAnimationFrame(drawFrame);
  }

  const CANVAS_BOUNDS = new Point(1000, 1000);

function setup() {
  /** create a canvas and configure p5 */
  createCanvas(CANVAS_BOUNDS.x, CANVAS_BOUNDS.y);
  angleMode(DEGREES);
  noLoop();
}

//numIters = 6;
//system = tree;

async function mouseClicked() {
  system = getRules();
  let systemState = system.axiom;
  numIters = getNumIters();
  const origin = new Point(mouseX, mouseY);
  //let systemState = 0;

  for (let i = 1; i < numIters; i++) {
    system = getRules();
    //systemState = system.axiom;
    const drawingState = new DrawingState(origin, -90);
    const shouldDraw = i === numIters - 1;
    systemState = renderAGeneration(system, systemState, drawingState, shouldDraw);
    console.log(i);
  }
  
  const drawingState = new DrawingState(origin, -90);
  const fragmentIterator = fragmentGenerator(system, systemState);
  drawSystem(system, fragmentIterator, drawingState);
}