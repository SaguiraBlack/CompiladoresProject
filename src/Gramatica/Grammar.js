export default class Grammar{
	constructor(terminals, noTerminals, initial, rules){
		this.terminals=terminals; //array of terminal symbols
		this.noTerminals=noTerminals;// array of symbols that aren´t terminal
		this.initial = initial; // initial symbol
		this.rules = rules; // dictionary of rules
	}

	lock(originalItem){
		let lockItems = [originalItem];
		let stack = [originalItem.word.charAt(0)];
		let toVisit = [];

		while (stack.length>0) {
			const nextState = stack.pop();	
			toVisit.push(nextState);
			const rule = this.rules.find( rule => rule.state===nextState);
			if(rule){
				rule.transitions.forEach(transition => {
					const newItem = {
						state: rule.state ,
						word: transition 
					}
					lockItems.push(newItem);
					if (toVisit.indexOf(newItem.word.charAt(0))===-1) {
						stack.push(newItem.word.charAt(0));
					}
				});
				toVisit.push(rule.state);
			}
		}

		return lockItems;
	}
}

