import AFN from "./AFN";
import { Symbols } from "./Symbols";
import Transition from "./Transition";
import uniqid from 'uniqid';
import infixToPostfixRe from "./infix-to-postfix-regexp";
import AFNFactory from "./AFNFactory";
import State from "./State";

function convertAFNtoAFD(afn) {
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
		for (let i = 0; i < afn.alphabet.length; i++) {
			const symbol = afn.alphabet[i];
			const newStateArr = closure(moveTo(currentState.states, symbol));
			const idx = checkCoincidence(statesAFD, newStateArr);
			if (newStateArr.length>0) { //if new StateArr isn't in the states
				let newState;
				if (idx===-1) {
					newState = new StateT(newStateArr, checkAccept(newStateArr), ++id);
					stack.push(newState);
					statesAFD.push(newState);			
					//currentState.transitions.push(new Transition(symbol, newState));				
				} else {
					newState= statesAFD[idx];
				}
				currentState.transitions.push(new Transition(symbol, newState));
			}
		};	
	}
	prepareAFD(statesAFD);
	const acceptedStates = statesAFD.filter( state=> state.accept);
	return new AFN(statesAFD, stateT, acceptedStates, afn.alphabet, true);
}

function getAFDTable(afd) {
	let table = [afd.states.length];
	afd.states.forEach(state => {
		table[state.id] = Array(257).fill(-1);
		if (state.accept) table[state.id][256] = state.token;
		state.transitions.forEach(transition => {
			const ascii = transition.symbol.charCodeAt(0);
			table[state.id][ascii] = transition.state.id;
		});		
	});

	return table;
}

function tableToAFD(arr) {
	const states = [];
	const acceptedStates = [];
	const alphabet = [];

	arr.forEach((stateArr,i) => {
		const state = new State(i, stateArr[256]!==-1, [], stateArr[256]);
		if (stateArr[256]!==-1) acceptedStates.push(state);
		states.push(state);
		stateArr.forEach( (element,j) => {
			if (j<256) {
				if (element!==-1) {
					const char = String.fromCharCode(j);
					alphabet.push(char);
					state.transitions.push(new Transition(char, element));
				}			
			}
		});
	});
	states.forEach(state => {
		state.transitions.forEach(transition => {
			transition.state = states[transition.state];
		});		
	});

	return new AFN(states, states[0], acceptedStates, [...new Set(alphabet)], true);
}

function convertRegexToAFN(expression) {
    const postFix = infixToPostfixRe(expression); 
    console.log(postFix.toString());
	let AFNStack = [];
	let afnA;
	let afnB;
	let AFN;

	for (let i = 0; i < postFix.length; i++) {
		const char = postFix[i];
		switch (char) {
			case '.':
				afnA = AFNStack.pop();				
				afnB = AFNStack.pop();				
				AFN = AFNFactory.concatAFN(afnB, afnA);
				AFNStack.push(AFN);
				break;
			case '|':
				afnA = AFNStack.pop();				
				afnB = AFNStack.pop();				
				AFN = AFNFactory.joinAFN(afnB, afnA);
				AFNStack.push(AFN);
				break;	
			case '+':
				afnA = AFNStack.pop();				
				AFN = AFNFactory.closurePlus(afnA);
				AFNStack.push(AFN);
				break;	
			case '*':
				afnA = AFNStack.pop();				
				AFN = AFNFactory.closureStar(afnA);
				AFNStack.push(AFN);
				break;	
			case '?':
				afnA = AFNStack.pop();				
				AFN = AFNFactory.optional(afnA);
				AFNStack.push(AFN);
				break;
			default:
				AFN = AFNFactory.createBasicAFN(char);
				AFNStack.push(AFN);
				break;
		}	
	}
	return AFNStack.pop();
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

const prepareAFD = afdArray => afdArray.map(state => {
		delete state.states;
		delete state.statesId;
		state._id = uniqid();
		/*state.transitions.map( transition =>{
			transition.state = transition.state.id;
		});*/
		return 	state;
	});	

function checkCoincidence(statesAFD, stateArr) {
	let statesId = [];
	stateArr.forEach(state => {
		statesId.push(state._id);
	});
	for (let i = 0; i < statesAFD.length; i++) {
		const stateAFD = statesAFD[i];
		//console.log(JSON.stringify(stateAFD.statesId));
		const isEqual = JSON.stringify(stateAFD.statesId) === JSON.stringify(statesId);
		if (isEqual) {
			return i;	
		}	
	}
	return -1;
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

const AFNConverter = { closure, moveTo, convertAFNtoAFD, convertRegexToAFN, getAFDTable, tableToAFD};
export default AFNConverter;