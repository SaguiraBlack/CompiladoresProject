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
        transitions: [rules[0].state+"'"]
	}, ...rules]
	let grammar = new Grammar(null, null, rulesGrammar[0].state, rulesGrammar);
	return grammar;
}
const GrammarFactory = {createGrammar};
export default GrammarFactory;