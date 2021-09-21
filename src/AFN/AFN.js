export default class AFN{
	constructor(states, initState, acceptedStates, alphabet, isAFD=false ){
		this.states=states; //array of State objects
		this.initState=initState;// state object
		this.acceptedStates=acceptedStates; //array of state obj
		this.alphabet=alphabet; //array of chars
		this.isAFD=isAFD;
	}

	getNodesAndEdges() {
		let nodes = [];
		let edges = [];
		let visited = new Set();
		this.exploreAFN(
		(transition, state, i)=>{
			if(!visited.has(state._id)){
				nodes.push({
					data: { id: state.id.toString()},
					classes: state.accept?"accept":''
				});
				visited.add(state._id);
			}
			edges.push({
				data: { id: `${state.id}-${transition.state.id}`, 
						source: state.id.toString(), 
						target: transition.state.id.toString(), 
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
	static exploreAFNObj(objInitState, transitionCallback , endCallback = ()=>{}) {
		let visited = new Map();
		function exploreAFNObjAux(state, visited, transitionCallback, endCallback) {
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
				exploreAFNObjAux(transition.state, visited, transitionCallback, endCallback);
			}
		}
		exploreAFNObjAux(objInitState, visited, transitionCallback, endCallback);
	}



	//Depth first exploration
	exploreAFN(transitionCallback , endCallback = ()=>{}) {
		let visited = new Map();
		this.exploreAFNaux(this.initState, visited, transitionCallback, endCallback);
	}

	exploreAFNaux(state, visited, transitionCallback, endCallback){
		if(visited.has(state._id)){
			return;
		}
 
		for (let i = 0; i < state.transitions.length; i++) {
			const transition = state.transitions[i];
			transitionCallback(transition, state, i);	
			visited.set(state._id);
			this.exploreAFNaux(transition.state, visited, transitionCallback, endCallback);
		}
		if(state.accept){
			endCallback(state);
			visited.set(state._id);
			return;
		}
	}

}

