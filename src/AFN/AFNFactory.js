import AFN from "./AFN";
import State from "./State";
import { Symbols } from "./Symbols";
import Transition from "./Transition";

function createBasicAFN(symbol){
	const nextState = new State(1, true);
	const transitions = [new Transition(symbol, nextState)];
	const initState = new State(0, false, transitions);
	let afn = new AFN([initState,nextState], //states
						initState,
						[nextState], //accepted States
						[symbol]); //alphabet
	return afn;
}

function copyAFN(afn) {
	const statesCopy = JSON.parse(JSON.stringify(afn.states));
	const initStateCopy = JSON.parse(JSON.stringify(afn.initState));
	const acceptedStatesCopy = JSON.parse(JSON.stringify(afn.acceptedStates));
	return new AFN(statesCopy, initStateCopy, acceptedStatesCopy, afn.alphabet);
}
function updateStateId( state, states, id, visited, transition) {
	if(!visited.has(state._id)){
		state.id=++id;
		if (visited.has(transition?.state._id)) {
			if(transition){
				const state =visited.get(transition?.state._id) 
				transition.state = state;
			}
			
		}
		states.push(state);
		visited.set(state._id, state);
		return id;
	}else{
	}
	return id;
}

function joinAFN(afna, afnb) {
    const afn1= AFNFactory.copyAFN(afna);
    const afn2= AFNFactory.copyAFN(afnb);
	let id = -1;
	let visited1 = new Map();
	let visited2 = new Map();
	let endState = null;
	let states = [];
	const initState = new State(++id, false);
	states.push(initState);
	visited1.set(initState._id, initState);
	initState.transitions.push(new Transition(Symbols.EPSILON, afn1.initState));
	initState.transitions.push(new Transition(Symbols.EPSILON, afn2.initState));
	console.log('-----JOIN-------');
	afn1.exploreAFN(
		(transition, state, i)=>{
			id = updateStateId(state, states, id, visited1, transition);
		},
		state =>{ //last state
				id = updateStateId(state, states, id, visited1);
				if(endState===null){
					endState = new State(++id, true);
					states.push(endState);
				}
				state.accept=false;
				state.transitions.push(new Transition(Symbols.EPSILON, endState));
		},
	)
		
	afn2.exploreAFN(
		(transition, state, i)=>{
			id = updateStateId(state, states, id, visited2, transition);
		},
		state =>{ //last state
				id = updateStateId(state, states, id, visited2);
				state.accept=false;
				state.transitions.push(new Transition(Symbols.EPSILON, endState));
		},
	)

	let afn = new AFN(states,
						initState,
						[endState],
						afn1.alphabet.concat(afn2.alphabet));
	return afn
}
/*
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
}*/


const AFNFactory = {createBasicAFN, copyAFN, joinAFN};
export default AFNFactory;