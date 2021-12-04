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
	const rulesGrammar = [{
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

	let grammar = new Grammar(terminals, noTerminals, rulesGrammar[0].state, rulesGrammar, terminalsStructure);
	return grammar;
}


const GrammarFactory = {createGrammar};
export default GrammarFactory;