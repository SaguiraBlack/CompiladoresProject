import cytoscape from "cytoscape";

// eslint-disable-next-line
var cy;
var style=[ // the stylesheet for the graph
			{
			selector: 'node',
			style: {
				'background-color': '#444',
				'color':'#fff',
				'label': 'data(id)',
				'text-valign':'center'
			}
			},
			{
			selector: 'edge',
			style: {
				'width': 1,
				'line-color': '#ccc',
				'target-arrow-color': '#ccc',
				'target-arrow-shape': 'triangle',
				'curve-style': 'bezier'
			}
			},
			{
			selector: "edge[label]",
			css: {
				"label": "data(label)",
				"text-margin-y": "-10px"
			}
			},
		];

function init(elements) {
	cy = cytoscape({
 		container: document.getElementById('ploter'), // container to render in
		elements,
		style,
		layout:{
			name: "cose",
			refresh: 30
		}
	});
}

function renderAFN(afn) {
	let edges = [];
	const nodes = afn.states.map( state =>{
		const transitions = state.transitions.map( transition =>({
			data: { id: `${state.id}-${transition.state.id}`, 
					source: state.id, 
					target: transition.state.id, 
					label:transition.char }
		}));
		edges = edges.concat(transitions);
		return {
			data: { id: state.id}
		}
	});
	init({
		nodes,
		edges
	});

}
const Plotter={init, renderAFN}
export default Plotter;