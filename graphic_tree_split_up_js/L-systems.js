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