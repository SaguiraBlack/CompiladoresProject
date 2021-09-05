export default class State{
	constructor(id, accept, transitions=[], token=0){
		this.id=id;
		this.accept=accept;
		this.transitions=transitions;
		this.token = token;
	}
}

