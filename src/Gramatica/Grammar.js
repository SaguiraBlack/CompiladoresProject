import { Symbols } from "../AFN/Symbols";

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
			const symbolEnd = item.word.indexOf(symbol)+symbol.length;
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
	
	first(string){
		let first = []
		if(string===Symbols.EPSILON) return [Symbols.EPSILON];
		const symbols = string.split(' ');
		//cuando es terminal
		this.terminals.forEach(terminal => {
			const idx = symbols.indexOf(terminal) 
			if(idx===0) first.push(terminal);	
		});

		//cuando es no terminal
		if(first.length===0){
			this.rules.forEach(rule => {
				const idx = symbols.indexOf(rule.state);
				if(idx===0){
					rule.transitions.forEach(transition => {
						console.log(transition);
						if(transition.indexOf(rule.state)===0){
						}else{
							first = first.concat(this.first(transition))
						}
					});
				} 	
				if(first.indexOf(Symbols.EPSILON)!==-1 && symbols.length>1){
					first = first.concat(this.first(symbols[1]));
				}
			});
		}
		return [...new Set(first)];
	}

	follow(state){
		let follow = []
		// 1)
		if(state=== this.initial){
			follow.push('$');
		}
		this.rules.forEach(rule => {
			rule.transitions.forEach(transition => {
				const symbols = transition.split(' ');
				const idx =symbols.indexOf(state)
				if( idx!==-1){
					const nextSymbol = symbols[idx+1];
					if(nextSymbol!=null){
						const firstNext = this.first(nextSymbol);
						const idxEpsilon =firstNext.indexOf(Symbols.EPSILON) 
						// 2)
						if( idxEpsilon===-1){
							follow = follow.concat(firstNext);
						// 2.1)
						}else{
							firstNext.splice(idxEpsilon, 1);
							follow = follow.concat(firstNext).concat(this.follow(rule.state));
						}
					// 3)
					}else{
						follow = follow.concat(this.follow(rule.state));
					}
				}
			});
		});
		return [...new Set(follow)];
	}
}

