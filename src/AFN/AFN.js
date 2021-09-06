export default class AFN{
	constructor(states, initStateId, acceptedStates, alphabet ){
		this.states=states; //array of State objects
		this.initStateId=initStateId;// int index
		this.acceptedStates=acceptedStates; //array of index
		this.alphabet=alphabet; //array of chars
	}

	get initState(){
		return this.states[this.initStateId];
	}

	getNodesAndEdges() {
		let nodes = [];
		let edges = [];
		this.exploreAFN(
			state=>{
				nodes.push({
					data: { id: state.id},
				});			
			}, 
		(transition, state, i)=>{
			edges.push({
				data: { id: `${state.id}-${transition.stateId}`, 
						source: state.id, 
						target: transition.stateId, 
						label:transition.symbol },
				classes: transition.symbol!=='ε'?'symbol':''
			})
		});
		return {nodes, edges};
	}

	//Depth first exploration
	exploreAFN(stateCallback, transitionCallback = ()=>{}) {
		this.exploreAFNaux(this.initState, stateCallback, transitionCallback);
	}

	exploreAFNaux(state, stateCallback, transitionCallback){
		stateCallback(state);
		if(state.transitions.length===0) return;
		for (let i = 0; i < state.transitions.length; i++) {
			const transition = state.transitions[i];
			transitionCallback(transition, state, i);	
			this.exploreAFNaux(this.states[transition.stateId], stateCallback, transitionCallback);
		}
	}

}

