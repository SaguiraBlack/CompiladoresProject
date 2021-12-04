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
  rulesGrammar = rulesGrammar.map(rule=>{
    return {
      state: rule.state,
      transitions: rule.transitions.map(transition=> transition.split(' ').join(''))
    }
  })

	let grammar = new Grammar(terminals, noTerminals, rulesGrammar[0].state, rulesGrammar, terminalsStructure);
	return grammar;
}



function getGraphFormatFromItems(itemsGroup) {
  
}

function analizeSingleState(grammar, state) {
  console.log(state);
  // check for no terminals coincidences
  grammar.noTerminals.forEach(symbol => {
    console.log(symbol);
    let coincidences = [];
    state.forEach(element => {
      if (element.word.indexOf('.')+1 === element.word.indexOf(symbol)){
        coincidences.push(element)
      }
    });
    console.log('coincidences: '+coincidences.length);
		if(coincidences.length>0){
      console.log(coincidences);
      const newState = grammar.goTo(coincidences, symbol);
      console.log('new state');
      console.log(newState);
    }
  }); 

  // check for terminals coincidences
  grammar.terminals.forEach(symbol => {
    console.log(symbol);
    let coincidences = [];
    state.forEach(element => {
      if (element.word.indexOf('.')+1 === element.word.indexOf(symbol)){
        coincidences.push(element)
      }
    });
    console.log('coincidences: '+coincidences.length);
		if(coincidences.length>0){
      console.log(coincidences);
      const newState = grammar.goTo(coincidences, symbol);
      console.log('new state');
      console.log(newState);
    }
  }); 
}

function getLRTable(grammar) {
  const lock0 = grammar.lock([{state: "E'", word: '.E'}]);
  let states = [lock0];
  analizeSingleState(grammar, lock0)
}

const GrammarFactory = {createGrammar, getLRTable};
export default GrammarFactory;