import Grammar from "./Grammar";

function createGrammar(expression){
    let rules = expression.split(' ').join('').split('\n');
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
  const terminals = [];
  rulesGrammar.forEach(rule => {
    rule.transitions.forEach(transition => {
      
    });
  });

	let grammar = new Grammar(terminals, noTerminals, rulesGrammar[0].state, rulesGrammar);
	return grammar;
}

function findItemsGroups(grammar) {
  
}

function getGraphFormatFromItems(itemsGroup) {
  
}
const GrammarFactory = {createGrammar};
export default GrammarFactory;