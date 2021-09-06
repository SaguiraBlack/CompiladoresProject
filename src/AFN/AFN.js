export default class AFN{
	constructor(states, initState, acceptedStates, alphabet ){
		this.states=states; //array of State objects
		this.initState=initState;// state object
		this.acceptedStates=acceptedStates; //array of state obj
		this.alphabet=alphabet; //array of chars
	}

	getNodesAndEdges() {
		let nodes = [];
		let edges = [];
		this.exploreAFN(
		(transition, state, i)=>{
			nodes.push({
				data: { id: state.id},
				classes: state.accept?"accept":''
			});
			edges.push({
				data: { id: `${state.id}-${transition.state.id}`, 
						source: state.id, 
						target: transition.state.id, 
						label:transition.symbol },
				classes: transition.symbol!=='ε'?'symbol':''
			})
		},
		state=>{
			nodes.push({
				data: { id: state.id},
				classes: state.accept?"accept":''
			});		
		});
		return {nodes, edges};
	}

	//Depth first exploration
	exploreAFN(transitionCallback = ()=>{}, endCallback) {
		let visited = new Map();
		this.exploreAFNaux(this.initState, visited, transitionCallback, endCallback);
	}

	exploreAFNaux(state, visited, transitionCallback, endCallback){
		if(visited.has(state._id)){
			return;
		}
		if(state.transitions.length===0){
			endCallback(state);
			visited.set(state._id);
			return;
		} 
		for (let i = 0; i < state.transitions.length; i++) {
			const transition = state.transitions[i];
			transitionCallback(transition, state, i);	
			visited.set(state._id);
			this.exploreAFNaux(transition.state, visited, transitionCallback, endCallback);
		}
	}

}

