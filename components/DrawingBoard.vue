<template>
  <div height="100" width="100%">
    <vue-p5
      v-on="{ setup, draw, keypressed, mouseclicked, mouseout, mouseover }"
      id="drawingarea"
      class="bordered"
      height="100"
      width="100%"
    ></vue-p5>
  </div>
</template>

<script>
import Vue from "vue";

import VueP5, {
  mouseX,
  mouseY,
  strokeWeight,
  mouseOver,
  mouseOut,
} from "vue-p5";
//import mouseX from 'vue-p5';
//import mouseY from 'vue-p5';
//import strokeWeight from 'vue-p5';

//import {cos, sin} from Math;
//import {Point, DrawingState, drawSystem} from '../graphic_tree_split_up_js/Drawing.js';


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
    customfRule: String,
    xRule: String,
    customxRule: String,
  },
  data: function () {
    return {
      clearWatch: false,
      inCanvas: false,
      sket: false,
      fRules: [
        "FF",
        "F[+F]F[-F]F",
        "F[+F]F[-F][F]",
        "FF-[-F+F+F]+[+F-F-F]",
        "F[+F]F",
        "F[-F]F",
        "Custom",
      ],
      xRules: [
        "F[+X]F[-X]+X",
        "F[+X][-X]FX",
        "F-[[X]+X]+F[+FX]-X",
        "F-[[X]+X]+F[+FX]-X",
        "Custom",
      ],
    };
  },
  components: {
    VueP5: () => import("vue-p5"),
  },
  methods: {
    keypressed() {
      this.clearCanvas();
    },
    clearCanvas() {
      this.clearWatch = true;
      this.sket.clear();
    },
    mouseover(sketch) {
      this.inCanvas = true;
      console.log("over");
    },
    mouseout(sketch) {
      this.inCanvas = false;
      console.log("out");
    },
    setup(sketch) {
      var drawingarea = document.getElementById("drawingarea");
      sketch.resizeCanvas(drawingarea.offsetWidth, 0.75 * window.innerHeight);
      sketch.stroke(255);
      sketch.angleMode(this.DEGREES);
      sketch.noLoop();
      this.sket = sketch;
    },

    getRndFloat(min, max) {
      /** Parameters: min and max
       * returns float in interval [min, max)
       */
      return Math.random() * (max - min) + min;
    },

    drawForward(drawingState, params, sketch) {
      // make length stochastic
      var stoch_factor = 1;

      if (this.lengthStochastic == "50% Variable") {
        stoch_factor = this.getRndFloat(0.5, 1.5);
      } else if (this.lengthStochastic == "10% Variable") {
        stoch_factor = this.getRndFloat(0.9, 1.1);
      }
      // make angle stochastic
      var factor_angle = 1;
      if (this.branchStochastic == "1% Variable") {
        factor_angle = this.getRndFloat(0.99, 1.01);
      }
      if (this.branchStochastic == "0.1% Variable") {
        factor_angle = this.getRndFloat(0.999, 1.001);
        // console.log("0.1%" + factor_angle);
      }
      let { x, y } = drawingState.state.position;
      let d = drawingState.state.direction;
      // console.log("(drawForward) Angle d = " + d);
      var conversion = 180 / Math.PI;
      let newX =
        x +
        params.length *
          Math.cos((d / conversion) * factor_angle) *
          stoch_factor;
      let newY =
        y +
        params.length *
          Math.sin((d / conversion) * factor_angle) *
          stoch_factor;
      drawingState.push();
      //drawingState.stack.push(JSON.stringify(drawingState.state));
      sketch.strokeWeight(drawingState.state.strokeWeight || 1);
      sketch.line(x, y, newX, newY);
      drawingState.pop();
      //drawingState.state = JSON.parse(drawingState.stack.pop() || '{}');
      drawingState.state.position.x = newX;
      drawingState.state.position.y = newY;
    },

    drawSystem(system, fragmentIterator, drawingState, sketch) {
      const drawFrame = () => {
        const iter = fragmentIterator.next();
        if (iter.done) {
          return;
        }
        const fragment = iter.value;
        for (const character of fragment) {
          //if ( character == 'F'){
          //  drawForward(drawingState, system.params, sketch);
          //} else {
          const drawingFunction = system.commands[character];
          //// console.log(drawingFunction);

          if (drawingFunction) {
            drawingFunction(drawingState, system.params, sketch);
          }
          //}
        }
        if (!this.clearWatch) {
          requestAnimationFrame(drawFrame);
        }
      };
      if (!this.clearWatch) {
        requestAnimationFrame(drawFrame);
      }
      if (this.clearWatch) {
        this.clearCanvas();
      }
    },

    applyRule(rules, char) {
      /** apply a single rule
       *  returns the output of the rule if there is one,
       *  or the original character if there is no rule for it.
       */
      return rules[char] || char;
    },

    *fragmentGenerator(system, string) {
      for (const char of string) {
        yield this.applyRule(system.rules, char);
      }
    },

    renderAGeneration(system, previousGeneration) {
      /** Parameters
       * system
       * previousGeneration
       * ==================
       * apply rules for every character in previousGeneration
       */
      let nextGeneration = "";
      for (const character of previousGeneration) {
        const nextCharacters = this.applyRule(system.rules, character);
        nextGeneration += nextCharacters;
      }
      return nextGeneration;
    },
    
    getXrule() {
      if (this.choiceRule == "Stochastic") {
        var rand = Math.random();
        var n = this.xRules.length - 1;
        //console.log(rand)
        var x_num = -1;
        for (var i = 1; i <= n; i++) {
          if (rand < i / n) {
            x_num = i - 1;
            break;
          }
        }
        var x = this.xRules[x_num];
        //console.log('(getXrule) Rule for x = '+ x);
      } else if (this.xRule == 'Custom') {
        var x = this.customxRule;
      } else {
        var x = this.xRule;
      }
      console.log(this.customxRule);
      return x;
    },

    getFrule() {
      if (this.choiceRule == "Stochastic") {
        var rand = Math.random();
        var n = this.fRules.length - 1;
        //console.log(rand)
        var f_num = -1;
        for (var i = 1; i <= n; i++) {
          if (rand < i / n) {
            f_num = i - 1;
            break;
          }
        }
        var f = this.fRules[f_num];
      } else if (this.fRule == 'Custom') {
        var f = this.customfRule;
      } else {
        var f = this.fRule;
      }
      //console.log('(getFrule) Rule for f = '+ f);
      return f;
    },

    getRules() {
      let tree = {
        params: {
          angle: this.branchAng,
          length: this.branchLen,
        },
        axiom: this.initState,
        rules: {
          X: this.getXrule(),
          F: this.getFrule(),
        },
        commands: {
          /** Each command is a function. Its name corresponds to
           *  a symbol in the system state string.
           *  When we encounter the symbol, we run the function. */
          //'F': printme,
          F: this.drawForward,
          // (this.lengthStochastic,this.branchStochastic,drawingState, params)
          "-"(drawingState, params, sketch) {
            drawingState.state.direction -= params.angle;
          },
          "+"(drawingState, params, sketch) {
            drawingState.state.direction += params.angle;
          },
          "["(drawingState, params, sketch) {
            drawingState.push();
          },
          "]"(drawingState, params, sketch) {
            drawingState.pop();
          },
        },
      };
      return tree;
    },
    async mouseclicked(sketch) {
      var rect = document.getElementById("drawingarea").getBoundingClientRect();
      if (
        sketch.mouseX > 0 &&
        sketch.mouseY > 0 &&
        sketch.mouseY < rect.bottom - rect.top &&
        sketch.mouseX < rect.right - rect.left
      ) {
        console.log(rect.top, rect.right, rect.bottom, rect.left);
        console.log(sketch.mouseX, sketch.mouseY);
        console.log(sketch);
        //// console.log('clickity click');
        this.clearWatch = false;
        const origin = new Point(sketch.mouseX, sketch.mouseY);
        let system = this.getRules();
        let systemState = system.axiom;

        for (let i = 1; i < this.iters; i++) {
          console.log(i);
          system = this.getRules();
          const drawingState = new DrawingState(origin, -90);
          const shouldDraw = i === this.iters - 1;
          //systemState = renderAGeneration(system, systemState, drawingState, shouldDraw);
          systemState = this.renderAGeneration(system, systemState);
        }

        const drawingState = new DrawingState(origin, -90);
        const fragmentIterator = this.fragmentGenerator(system, systemState);
        this.drawSystem(system, fragmentIterator, drawingState, sketch);
      },
    },
  },
};

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
    this.state.position =
      (position && new Point(position.x, position.y)) || new Point(0, 0);
    this.state.direction = direction || 0; // right
    this.stack = [];
  }

  push() {
    this.stack.push(JSON.stringify(this.state));
  }

  pop() {
    this.state = JSON.parse(this.stack.pop() || "{}");
  }

  get depth() {
    return this.stack.length;
  }
}
</script>

<style scoped></style>
