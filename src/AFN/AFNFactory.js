import AFN from "./AFN";
import State from "./State";
import { Symbols } from "./Symbols";
import Transition from "./Transition";

function createBasicAFN(symbol){
	const nextState = new State(1, true);
	const transitions = [new Transition(symbol, nextState.id)];
	const initState = new State(0, false, transitions);
	let afn = new AFN([initState,nextState],
						initState.id,
						[nextState.id],
						[symbol]);
	return afn;
}
function updateAndPushState(transition, state, i, states, id) {
	const newState = JSON.parse(JSON.stringify(state));
	newState.id = id;
	newState.transitions[i].stateId = id+1;
	states.push(newState);
	return newState;
}

function joinAFN(afn1, afn2) {
	let id = -1;
	const initState = new State(++id, false);
	let states = [initState];
	let idAccept= 0;
	afn1.exploreAFN(
		state =>{
			if(state.transitions.length===0){
				const newState = JSON.parse(JSON.stringify(state));
				newState.id = ++id;
				newState.accept=false;
				const endState = new State(++id, true);
				idAccept = id;
				newState.transitions.push(new Transition(Symbols.EPSILON, idAccept))
				states.push(newState);
				states.push(endState);
			}
		},
		(transition, state, i)=>{
			const newState = updateAndPushState(transition, state, i, states, ++id);
			if(state.id===0) initState.transitions.push(new Transition(Symbols.EPSILON, newState.id))
		}
	)

	afn2.exploreAFN(
		state =>{
			if(state.transitions.length===0){
				const newState = JSON.parse(JSON.stringify(state));
				newState.id = ++id;
				newState.accept=false;
				newState.transitions.push(new Transition(Symbols.EPSILON, idAccept))
				states.push(newState);
			}
		},
		(transition, state, i)=>{
			const newState = updateAndPushState(transition, state, i, states, ++id);
			if(state.id===0) initState.transitions.push(new Transition(Symbols.EPSILON, newState.id))
		}
	)

	let afn = new AFN(states,
						initState.id,
						[id],
						afn1.alphabet.concat(afn2.alphabet));
	return afn
}

function concatAFN(afn1, afn2) {
	let id = 0;
	let states = [];
	afn1.exploreAFN(
		state =>{
			if(state.transitions.length===0){
				const newState = JSON.parse(JSON.stringify(state));
				id = newState.id;
				newState.accept=false;
				newState.transitions.push(new Transition(Symbols.EPSILON, id+1))
				states.push(newState);
			}
		},
		(transition, state, i)=>{
			states.push(JSON.parse(JSON.stringify(state)));
		}
	)
	afn2.exploreAFN(
		state =>{
			if(state.transitions.length===0){
				const newState = JSON.parse(JSON.stringify(state));
				newState.id = ++id;
				states.push(newState);
			}
		},
		(transition, state, i)=>{
			updateAndPushState(transition, state, i, states, ++id);
		}
	)

	let afn = new AFN(states, 0, [id], afn1.alphabet.concat(afn2.alphabet));
	return afn
}


const AFNFactory = {createBasicAFN, joinAFN, concatAFN};
export default AFNFactory;