import { Symbols } from "./Symbols";

var idx = 0;
var lex = '';
var stack = [];

function analizeString(afdTable, string) {
	idx = 0;
	lex = '';
	stack = [];
	const lexTable = [];
	while (true) {
		const token = yyLex(afdTable, string);
		lexTable.push([token, lex]);
		if (token ===Symbols.END) break;
	}	
	return lexTable;
}

function yyLex(afdTable, string) {
	stack.push(idx);
	if (idx>=string.length) {
		lex="";
		return Symbols.END;
	}
	//initial AFD state
	let passByAcceptedState = false;
	let currentState = 0;
	let iniLex = idx;
	let endLex = -1;
	let token = -1;


	while (idx<string.length) {
		const char = string.charAt(idx);
		const ascii = char.charCodeAt(0);
		const nextState = afdTable[currentState][ascii];

		if (nextState!==-1) {
			if (afdTable[nextState][256]!==-1) {
				passByAcceptedState = true;
				token =afdTable[nextState][256];
				endLex = idx; 
			}
			idx++;
			currentState = nextState;
			continue;
		}
		break;
	}
	if (!passByAcceptedState) {
		idx = iniLex+1;
		lex = string.substring(iniLex, 1);
		token = -1;
		return token; //ERROR
	}
	console.log(iniLex+','+endLex);
	lex = string.substring(iniLex, endLex+1);
	console.log(lex);
	idx = endLex+1;
	return token;
}

/*function undoToken() {
	if (stack.length==0) return false;
	idx = stack.pop();
	return true;
}*/
const LexicalAnalizer = { analizeString};
export default LexicalAnalizer;