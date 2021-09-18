import { Symbols } from "./Symbols";
import Transition from "./Transition";

function convertAFNtoAFD(afn) {
	console.log(afn.alphabet);
	//initial AFD state
	let id=-1;
	const states = closure([afn.initState]);
	const stateT = new StateT(states, checkAccept(states), ++id); // a set of AFN states turned to AFD state

	//create return array and stack
	let stack  = [];
	let statesAFD  = []; //contains an array of AFN states
	stack.push(stateT);
	statesAFD.push(stateT);

	while (stack.length>0) {
		const currentState = stack.pop();
		afn.alphabet.forEach(symbol => {
			const newStateArr = closure(moveTo(currentState.states, symbol));
			if (newStateArr.length>0 && !checkCoincidence(statesAFD, newStateArr)) { //if new StateArr isn't in the states
				console.log('crea State');
				const newState = new StateT(newStateArr, checkAccept(newStateArr), ++id);
				stack.push(newState);
				statesAFD.push(newState);			
				currentState.transitions.push(new Transition(symbol, newState));
			}
		});	
	}
	return statesAFD;
}

class StateT{
	constructor(states=[], accept=false, id=-1, token=0){
		this.id=id;//int index
		this.accept=accept;//boolean
		this.states=states;//array of transition object
		this.token = token;//int
		this.transitions=[];
		this.statesId = [];
		states.forEach(state => {
			this.statesId.push(state._id);
		});
	}
}

function checkCoincidence(statesAFD, stateArr) {
	let statesId = [];
	stateArr.forEach(state => {
		statesId.push(state._id);
	});
	console.log(JSON.stringify(statesId));
	statesAFD.forEach(stateAFD => {
		//console.log(JSON.stringify(stateAFD.statesId));
		const isEqual = JSON.stringify(stateAFD.statesId) === JSON.stringify(statesId);
		if (isEqual) {
			console.log('is equal!');
			return true;	
		}
	});
	return false;
}

function checkAccept(stateArr) {
	for (let i = 0; i < stateArr.length; i++) {
		if (stateArr[i].accept) return true;
	}
	return false;
}
function closure(stateArr) {
	return moveTo(stateArr, Symbols.EPSILON);
}

function moveTo(stateArr, symbol) {
	let stack = [...stateArr];
	let closureMap = new Map();
	if(symbol===Symbols.EPSILON){
		stateArr.forEach(state => {
			closureMap.set(state._id, state);
		});
	}
	while (stack.length>0) {
		const state = stack.pop();
		state.transitions.forEach(transition => {
			if(transition.symbol===symbol && !closureMap.has(transition.state._id)){
				closureMap.set(transition.state._id, transition.state);
				stack.push(transition.state);
			}
		});
		
	}
    const newStateArr = Array.from(closureMap, ([name, value]) => (value));
	return newStateArr;
}

const AFNConverter = { closure, moveTo, convertAFNtoAFD};
export default AFNConverter;