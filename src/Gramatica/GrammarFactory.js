import Grammar from "./Grammar";

function createGrammar(expression){
    let rules = expression.split('\n');
    rules = rules.map((rule, i)=>{
      const decomposition = rule.split('->');
      return {
        state: decomposition[0],
        transitions: decomposition[1].split('|')
      }
    });
	let rulesGrammar = [{
        state: rules[0].state+"'",
        transitions: [rules[0].state+""]
	}, ...rules]
  const noTerminals = rulesGrammar.map((rule)=>rule.state);
  let terminals = [];
  let terminalsStructure = [];
  rulesGrammar.forEach(rule => {
    rule.transitions.forEach(transition => {
      transition.split(' ').forEach( symbol =>{
        if(noTerminals.indexOf(symbol)===-1 && 
            terminals.indexOf(symbol)===-1){
              terminals.push(symbol);
              terminalsStructure.push({
                symbol,
                token:0
              });
            } 
      })
    });
  });
  /*rulesGrammar = rulesGrammar.map(rule=>{
    return {
      state: rule.state,
      transitions: rule.transitions.map(transition=> transition.split(' ').join(''))
    }
  })*/

	let grammar = new Grammar(terminals, noTerminals, rulesGrammar[0].state, rulesGrammar, terminalsStructure);
	return grammar;
}

function AreEqualStates(stateA, stateB) {
  if(stateA.length!==stateB.length) return false;
  let equals = true;
  stateA.forEach((element,i) => {
    if (element.state!==stateB[i].state ||
        element.word!==stateB[i].word ) {
          equals=false;
    } 
  });
  return equals;
}

function analizeSingleState(grammar, state, finalStates, stack) {
  //console.log(state.id);
  //console.log(state.items);
  const allSymbols = grammar.noTerminals.concat(grammar.terminals);

  // check for no terminals and terminals coincidences
  allSymbols.forEach(symbol => {
    let coincidences = [];
    state.items.forEach(element => {
      if (element.word.indexOf('.')+1 === element.word.indexOf(symbol)){
        coincidences.push(element)
      }
    });

		if(coincidences.length>0){
      //console.log(symbol+' - coincidences: '+coincidences.length);
      const newState = grammar.goTo(coincidences, symbol);
      //console.log(newState);
      let alreadyPresent = false;
      let transitionStateId = -1;
      //check for transitions to previous states
      alreadyPresent = finalStates.some(element =>{
        transitionStateId = element.id
        return AreEqualStates(newState, element.items) 
      });
      if(!alreadyPresent){
          //New State!
          //console.log('new state');
          const newStateObj ={
              items:newState,
              id: finalStates.length,
              transitions: []
          }
          transitionStateId=finalStates.length;
          finalStates.push(newStateObj);
          stack.push(newStateObj);
      }
      //define transition
      finalStates[state.id].transitions.push({symbol, state: transitionStateId});

    }

  }); 
}

function getLRTable(grammar) {
  const lock0 = grammar.lock([{state: "E'", word: '.E'}]);
  //to track what states we have to check
  let stack = [
    {
      items:lock0,
      id: 0,
      transitions: []
    }];

  //to track the final States
  let finalStates = [
    {
      items:lock0,
      id: 0,
      transitions: []
    }];

  while (stack.length>0) {
    const currentState = stack.shift();
    analizeSingleState(grammar, currentState, finalStates, stack)
  }
  return finalStates;
}

const GrammarFactory = {createGrammar, getLRTable};
export default GrammarFactory;