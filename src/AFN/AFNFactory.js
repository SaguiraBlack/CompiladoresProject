import AFN from "./AFN";
import State from "./State";
import { Symbols } from "./Symbols";
import Transition from "./Transition";

function createBasicAFN(char){
	const nextState = new State(1, true);
	const transitions = [new Transition(char, nextState)];
	const initState = new State(0, false, transitions);
	let afn = new AFN([initState,nextState],
						initState,
						[nextState],
						[char]);
	return afn;
}

function joinAFN(afn1, afn2) {
	const transitions = [
							new Transition(Symbols.EPSILON, afn1.initState),
							new Transition(Symbols.EPSILON, afn2.initState),
						];
	const initState = new State(0, false, transitions);
	const endState = new State(0, true);

	afn1.acceptedStates[0].transitions=[new Transition(Symbols.EPSILON, endState)];
	afn1.acceptedStates[0].accept=false;
	afn2.acceptedStates[0].transitions=[new Transition(Symbols.EPSILON, endState)];
	afn2.acceptedStates[0].accept=false;

	let afn = new AFN([initState].concat(afn1.states, afn2.states).concat([endState]),
						initState,
						[endState],
						afn1.alphabet.concat(afn2.alphabet));
	updateStatesId(afn);
	return afn;
}

function updateStatesId(afn) {
	for (let index = 0; index < afn.states.length; index++) {
		const state = afn.states[index];
		state.id=index;	
	}	
}

const AFNFactory = {createBasicAFN, joinAFN};
export default AFNFactory;