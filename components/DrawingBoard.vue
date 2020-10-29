<template>
    <div height=100 width=100%>
    <vue-p5 v-on="{setup, draw, keypressed, mouseclicked}" id="drawingarea" class="bordered" height=100 width=100%></vue-p5>
    </div>
</template>

<script>
import Vue from 'vue';
import VueP5 from 'vue-p5';
import mouseX from 'vue-p5';
import mouseY from 'vue-p5';

export default {
    props: {
        lengthStochastic: String,
        branchStochastic: String,
        branchLen: Number,
        iters: Number,
        branchAng: Number,
        initState: String,
        choiceRule: String,
        fRule: String,
        xRule: String
    },
    data: function() {
        return {
        fRules: ["FF", "F[+F]F[-F]F", "F[+F]F[-F][F]", "FF-[-F+F+F]+[+F-F-F]", "F[+F]F", "F[-F]F"],
        xRules: ["F[+X]F[-X]+X", "F[+X][-X]FX", "F-[[X]+X]+F[+FX]-X", "F-[[X]+X]+F[+FX]-X"],
        }
    },
    components: {
        VueP5: () => import("vue-p5"),
    },
    methods: {
        setup(sketch) {
            var drawingarea = document.getElementById("drawingarea");
            sketch.resizeCanvas(drawingarea.offsetWidth, 0.75* window.innerHeight);
            sketch.background('white');
            sketch.angleMode(this.DEGREES);
            sketch.noLoop();
        },
        async mouseclicked(sketch) {
            console.log('clickity click');
            const origin = new Point(mouseX, mouseY);
            console.log(mouseX, mouseY)
            let system = {
            params: {
                angle: this.branchAng,
                length: this.branchLen
            },
            axiom: this.initState,
            rules: {
                X: this.xRule,
                F: this.fRule
            },
            commands: {
                /** Each command is a function. Its name corresponds to 
                 *  a symbol in the system state string. 
                 *  When we encounter the symbol, we run the function. */
                'F': drawForward,
                '-'(drawingState, params) {
                drawingState.state.direction -= params.angle;
                },
                '+'(drawingState, params) {
                drawingState.state.direction += params.angle;
                },
                '['(drawingState, params) {
                drawingState.push();
                },
                ']'(drawingState, params) {
                drawingState.pop();
                },
            }
            }
            let systemState = system.axiom;
            for (let i = 1; i < this.iters; i++) {
              const drawingState = new DrawingState(origin, -90);
              const shouldDraw = i === this.iters - 1;
              systemState = renderAGeneration(system, systemState, drawingState, shouldDraw);
              console.log(i);
            // Draw Your L-Systems :)
            }
        },
    }
}
async function mouseClicked() {
  system = getRules();
  let systemState = system.axiom;
  numIters = getNumIters();
  
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

//   const CANVAS_BOUNDS = new Point(1000, 1000);

function applyRule(rules, char) {
    /** apply a single rule
     *  returns the output of the rule if there is one, 
     *  or the original character if there is no rule for it.
     */
    return rules[char] || char;
  }
  
  function *fragmentGenerator(system, string) {
    for (const char of string) {
      yield applyRule(system.rules, char);
    }
  }
  
  function renderAGeneration (system, previousGeneration) {
    /** Parameters
     * system
     * previousGeneration
     * ==================
     * apply rules for every character in previousGeneration
     */
    let nextGeneration = '';
    for (const character of previousGeneration) {
      const nextCharacters = applyRule(system.rules, character);
      nextGeneration += nextCharacters;
    }
    return nextGeneration;
  }

function getIni() {
    const ini_inputs = {
      'ini_x': 'X',
      'ini_f': 'F',    
    };
    var input = document.getElementById("select_init").value
    var ini = ini_inputs[input];
    return ini;
  }
  
  function getXrule() {
    const x_inputs = {
      1: 'F[+X]F[-X]+X',
      2: 'F[+X][-X]FX',
      3: 'F-[[X]+X]+F[+FX]-X',
      4: 'F-[[X]+X]+F[+FX]-X',
    }
    if (document.getElementById("type_rules").value == 'stochastic') {
      var rand = Math.random();
      var n = Object.keys(x_inputs).length;
      //console.log(rand)
      var x_num = 0;
      for (var i = 1; i <= n; i++) {    
        if (rand < i/n) {
          x_num = i;
          break;
        }
      }
    } else {
      var x_num = document.getElementById("x_rule").value
    }
    var x = x_inputs[parseFloat(x_num)];
    //console.log(x);
    return x;
  }
  
  function getFrule() {
    const f_inputs = {
      1: 'FF',
      2: 'F[+F]F[−F]F',
      3: 'F[+F]F[-F][F]',
      4: 'FF-[-F+F+F]+[+F-F-F]',
      5: 'F[+F]F',
      6: 'F[−F]F',
    }
    if (document.getElementById("type_rules").value == 'stochastic') {
      var rand = Math.random();
      var n = Object.keys(f_inputs).length;
      //console.log(rand)
      var f_num = 0;
      for (var i = 1; i <= n; i++) {    
        if (rand < i/n) {
          f_num = i;
          break;
        }
      }
    } else {
      var f_num = document.getElementById("f_rule").value
    }
    var f = f_inputs[parseFloat(f_num)];
    console.log(f);
    return f;
  }
  
  function getRndFloat(min, max) {
    /** Parameters: min and max
     * returns float in interval [min, max)
     */
    return Math.random() * (max - min)  + min;
    }

    function getRules() {
        /** declaring the axiom and production rules */
        let tree = {
          params: {
            angle: parseFloat(document.getElementById("angle").value),
            length: parseFloat(document.getElementById("length").value),
          },
          axiom: getIni(),
          rules: {
            X: getXrule(),
            F: getFrule(),
          },
          commands: {
            /** Each command is a function. Its name corresponds to 
             *  a symbol in the system state string. 
             *  When we encounter the symbol, we run the function. */
            'F': drawForward,
            '-'(drawingState, params) {
              drawingState.state.direction -= params.angle;
            },
            '+'(drawingState, params) {
              drawingState.state.direction += params.angle;
            },
            '['(drawingState, params) {
              drawingState.push();
            },
            ']'(drawingState, params) {
              drawingState.pop();
            },
          }
        }
        return tree;
      }
      
      function getNumIters() {
        var numIters = document.getElementById("iter").value;
        return numIters;
      }
</script>

<style scoped>

</style>