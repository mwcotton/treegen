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