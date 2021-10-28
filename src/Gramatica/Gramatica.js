export default class Gramatica{
	constructor(terminals, noTerminals, initial, rules){
		this.terminals=terminals; //array of terminal symbols
		this.noTerminals=noTerminals;// array of symbols that aren´t terminal
		this.initial = initial; // initial symbol
		this.rules = rules; // dictionary of rules
	}
}

