export default class Grammar{
	constructor(terminals, noTerminals, initial, rules, terminalsStructure){
		this.terminals=terminals; //array of terminal symbols
		this.noTerminals=noTerminals;// array of symbols that aren´t terminal
		this.initial = initial; // initial symbol
		this.rules = rules; // dictionary of rules
		this.terminalsStructure = terminalsStructure; // array of terminals objects with symbol and respective token
	}

	lock(originalItems){
		let lockItems = [...originalItems];
		let stack = [];
		originalItems.forEach(item => {
			const symbolIndex =item.word.indexOf('.')+1;
			stack.push(item.word.charAt(symbolIndex))	
		});
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
					lockItems.push({
						state: newItem.state,
						word: '.'+newItem.word
					});
					if (toVisit.indexOf(newItem.word.charAt(0))===-1) {
						stack.push(newItem.word.charAt(0));
					}
				});
				toVisit.push(rule.state);
			}
		}

		return lockItems;
	}

	move(items, symbol){
		let moveItems = [];
		items.forEach(item => {
			const symbolEnd = item.word.indexOf(symbol)+symbol.length-1;
      		if (item.word.indexOf('.')+1 === item.word.indexOf(symbol)){
				//if(item.word.charAt(symbolIndex)===symbol){
				let newWord = item.word.replace('.','');
				newWord = newWord.slice(0,symbolEnd)+'.'+newWord.slice(symbolEnd);
				moveItems.push({state:item.state, word:newWord});
			}
		});
		return moveItems;
	}

	goTo(items, symbol){
		const moveItems = this.move(items, symbol)
		//console.log(moveItems);
		const lockItems = this.lock(moveItems)
		return lockItems;
	}
}

