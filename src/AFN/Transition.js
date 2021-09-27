export default class Transition{
	constructor(symbol, state){
		this.symbol=symbol; //string
		this.state=state;//state object
		if (symbol.includes('-')) {
			this.min = symbol.charAt(0);
			this.max = symbol.charAt(2);
		}else{
			this.min = null;
			this.max = null;
		}
	}
}

