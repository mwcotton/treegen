function log(message) {
    const logElement = document.getElementById('log');
    const textNode = document.createTextNode(message);
    const listElement = document.createElement('li');
    listElement.append(textNode);
    logElement.append(listElement);
}

const tree = {
    axiom: getIni(),
    rules: {
      X: getXrule(),
      F: getFrule(),
    },
}

function applyRule(rules, char) {
    return rules[char] || char;
}


function renderAGeneration(system, previousGeneration) {
  let nextGeneration = '';
  for (const character of previousGeneration) {
    nextGeneration += applyRule(system.rules, character);
  }
  return nextGeneration;
}

numIters = 5;
system = tree;

let systemState = system.axiom;
log(systemState);
for (let i = 1; i < numIters; i++) {
  systemState = renderAGeneration(system, systemState);
  log(systemState);
}

function getIni() {
  const ini_inputs = {
    'ini_x': 'X',
    'ini_f': 'F',    
  };
  var input = 'ini_f';
  var ini = ini_inputs[input];
  return ini;
}

function getXrule() {
  const x_inputs = {
    'x_1': 'F[+X]F[-X]+X',
    'x_2': 'F[+X][-X]FX',
    'x_3': 'F-[[X]+X]+F[+FX]-X',
    'x_4': 'F-[[X]+X]+F[+FX]-X',
  }
  var input = 'x_2';
  var x = x_inputs[input];
  console.log(x_inputs)
  console.log(x)
  return x;
}

function getFrule() {
  const f_inputs = {
    'f_1': 'FF',
    'f_2': 'F[+F]F[-F]F',
    'f_3': 'F[+F]F[-F][F]',
    'f_4': 'FF-[-F+F+F]+[+F-F-F]',
  }
  var input = 'f_2';
  var f = f_inputs[input];
  console.log(f)
  return f;
}

