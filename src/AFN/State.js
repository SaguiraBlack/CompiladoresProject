import uniqid from 'uniqid';
export default class State{
	constructor(id, accept, transitions=[], token=-1){
		this.id=id;//int index
		this._id=uniqid();
		this.accept=accept;//boolean 
		this.transitions=transitions;//array of transition object
		if (accept) {
			this.token = id;	
		}else{
			this.token = token;//int
		}
	}

}

