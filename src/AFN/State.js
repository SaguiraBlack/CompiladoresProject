export default class State{
	constructor(id, accept, transitions=[], token=0){
		this.id=id;//int index
		this.accept=accept;//boolean 
		this.transitions=transitions;//array of int index
		this.token = token;//int
	}

}

