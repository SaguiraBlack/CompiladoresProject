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
      transitions: [],
      reductions: []
    }];

    //get common transitions
  while (stack.length>0) {
    const currentState = stack.shift();
    analizeSingleState(grammar, currentState, finalStates, stack)
  }
  //get reduction transitions
  finalStates.forEach(state => {
    state.items.forEach(item => {
      if(item.word.indexOf('.')===item.word.length-1){
        const follows = grammar.follow(item.state);
        /*console.log(state.id);
        console.log(item);
        console.log(follows);*/
        state.reductions = follows.map( symbol =>{
          let idState;
          let idTransition;

          grammar.rules.forEach((rule, i) => {
            if(rule.state===item.state){
              idState=i;
              rule.transitions.forEach((transition, j) => {
                if(transition===item.word.replace('.','')){
                  idTransition = j;
                }
              });
            } 
          });

          const coords = idState===0?'aceptar':idState+','+idTransition 
          return {
            symbol,
            state: coords 
          }
        })
      }
    }); 
  });

  return finalStates;
}

function findTransition(LRTable, state, symbol) {
  let nextState = '';
  LRTable[state].transitions.concat(LRTable[state].reductions).some(element => {
    if(element==null){
      nextState = 'no acepta';
      return true;
    }
    if(element.symbol===symbol){
      nextState = element.state
      return true
    }
  });
  return nextState;
}
function getSintacticTable(LRTable, grammar, lexTable) {
  console.log('sintactic table'); 
  console.log(LRTable);
  console.log(grammar);
  console.log(lexTable);

  let stack = [0];
  //get symbols of expression
  const symbols = lexTable.map((element)=>{
    let symbol;
    grammar.terminalsStructure.some(obj => {
      if(obj.token === element[0]){
        symbol= obj.symbol;
        return true;
      }
    });
    return symbol
  })
  symbols.push('$')
  //Make table
  let sintacticTable = [];
  let counter = 2400;
  let accion = ''
  let currentState = 0;

  while (counter>0) {
    console.log('------');
    //Pila
    let stackItem = stack[stack.length-1];
    //Cadena
    let stringItem = symbols[0];

    sintacticTable.push({
      pila: stack.join(' '),
      cadena: symbols.join(' '),
      accion
    }) 
    //add state number to stack
    if(isNaN(stackItem)){
      const nextState = findTransition(LRTable, currentState, stackItem);
      console.log(nextState);
      
      stack.push(nextState);
    }else{
      console.log(stack);
      console.log(stackItem+'-'+stringItem);

      //check for some displacement or reduction in the LR Table
      let nextState = findTransition(LRTable, stackItem, stringItem);
      if(nextState==='')nextState='no acepta'
      console.log('nextState: ', nextState);
      //desplazamiento
      if (!isNaN(nextState)) {
          accion = 'd'+nextState
          currentState = stack[stack.length-1];
          console.log('CURRENT STATE: ', currentState);
          stack.push(stringItem);
          stack.push(parseInt(accion.charAt(1)));
          symbols.shift();
      //reducccion
      } else {
          if(nextState==='aceptar' || nextState==='no acepta'){
            accion = nextState
            sintacticTable[sintacticTable.length-1].accion = accion; 
            break;
          } 
          accion = 'r'+nextState
          const coords = accion.slice(1,accion.length).split(',');
          const item = {
            state:grammar.rules[coords[0]].state,
            word:grammar.rules[coords[0]].transitions[coords[1]]
          }
          console.log(item);
          const numberOfItems =item.word.split(' ').length*2; 
          //remove items from stack
          for (let i = 0; i < numberOfItems; i++) {
            stack.pop();
          }
          currentState=stack[stack.length-1];
          console.log('CURRENT STATE: ', currentState);
          //add state of item
          stack.push(item.state);//f
      }
      console.log(accion);
      sintacticTable[sintacticTable.length-1].accion = accion; 
      counter--;
    }
  } //End While
  return sintacticTable;
}

const GrammarFactory = {createGrammar, getLRTable, getSintacticTable};
export default GrammarFactory;