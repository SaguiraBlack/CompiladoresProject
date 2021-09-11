import AFN from "./AFN";
import State from "./State";
import { Symbols } from "./Symbols";
import Transition from "./Transition";
import uniqid from 'uniqid';

function createBasicAFN(symbol){
	const nextState = new State(1, true);
	const transitions = [new Transition(symbol, nextState)];
	const initState = new State(0, false, transitions);
	const states = [initState,nextState];
	let afn = new AFN(states, //states
					  states[0], //init state
					  states[1], //accepted States
					  [symbol]); //alphabet

	return afn;
}

function getStateClone(state) {
	const stateClone = {...state};
	stateClone.transitions=[];
	stateClone._id=uniqid();
	return stateClone;
}

function copyAFN(afn) {
	let currentState = null;
	let nextState = null;
	let visited = new Map();
	let statesCopy = [];
	let acceptedStatesCopy = [];
	afn.exploreAFN(
		(transition, state, i)=>{
			if(!visited.has(state.id)){
				currentState=getStateClone(state);
				nextState = getStateClone(transition.state);
				//creating transition
				currentState.transitions.push(new Transition(transition.symbol, nextState ));
				//add to states
				if(nextState.accept) acceptedStatesCopy.push(nextState);
				statesCopy.push(currentState);
				statesCopy.push(nextState);
				visited.set(currentState.id, currentState);
				visited.set(nextState.id, nextState);
			}else{
				currentState=visited.get(state.id);
				if(!visited.has(transition.state.id)){
					nextState = getStateClone(transition.state);
				}else{
					nextState=visited.get(transition.state.id);
				}
				currentState.transitions.push(new Transition(transition.symbol, nextState ));
				//add to states
				if(nextState.accept) acceptedStatesCopy.push(nextState);
				statesCopy.push(nextState);
				visited.set(nextState.id, nextState);
			}
		});
	let afnCopy = new AFN(statesCopy, statesCopy[0], acceptedStatesCopy, afn.alphabet);
	return afnCopy
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

	let afn = new AFN(states, initState, [endState], afn1.alphabet.concat(afn2.alphabet));
	return afn
}


function concatAFN(afna, afnb) {
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

	afn1.exploreAFN(
		(transition, state, i)=>{
			id = updateStateId(state, states, id, visited1, transition);
		},
		state =>{ //last state
				id = updateStateId(state, states, id, visited1);
				state.accept=false;
				state.transitions.push(new Transition(Symbols.EPSILON, afn2.initState));
		},
	)
	afn2.exploreAFN(
		(transition, state, i)=>{
			id = updateStateId(state, states, id, visited2, transition);
		},
		state =>{ //last state
				id = updateStateId(state, states, id, visited2);
				if(endState===null){
					endState = new State(++id, true);
					states.push(endState);
				}
				state.accept=false;
				state.transitions.push(new Transition(Symbols.EPSILON, endState));
		},
	)

	let afn = new AFN(states, initState, [endState], afn1.alphabet.concat(afn2.alphabet));
	return afn
}

function closureStar(afna) {
	const afn1= AFNFactory.copyAFN(afna);
	let id = -1;
	let visited1 = new Map();
	let endState = null;
	let states = [];
	const initState = new State(++id, false);
	states.push(initState);
	visited1.set(initState._id, initState);
	initState.transitions.push(new Transition(Symbols.EPSILON, afn1.initState));
	afn1.exploreAFN(
		(transition, state, i)=>{
			id = updateStateId(state, states, id, visited1, transition);
		},
		state =>{ //last state
				id = updateStateId(state, states, id, visited1);
				state.accept=false;
				state.transitions.push(new Transition(Symbols.EPSILON, afn1.initState));
				endState = new State(++id, true);
				states.push(endState);
				visited1.set(endState._id, endState);
				state.transitions.push(new Transition(Symbols.EPSILON, endState));
				initState.transitions.push(new Transition(Symbols.EPSILON, endState));
		},
	)
	let afn = new AFN(states, initState, [endState], afn1.alphabet);
	return afn;
}

function closurePlus(afna) {
	const afn1= AFNFactory.copyAFN(afna);
	let states = [];
	afn1.exploreAFN(
		(transition, state, i)=>{	
		},
		state =>{ //last state
				state.transitions.push(new Transition(Symbols.EPSILON, afn1.initState));
		},
	)
	return afn1;
}

function optional(afna) {
	const afn1= AFNFactory.copyAFN(afna);
	afn1.exploreAFN(
		(transition, state, i)=>{	
		},
		endState =>{ //last state
				afn1.initState.transitions.push(new Transition(Symbols.EPSILON, endState));
		},
	)
	return afn1;
}

const AFNFactory = {createBasicAFN, copyAFN, joinAFN, concatAFN, closurePlus, closureStar, optional};
export default AFNFactory;