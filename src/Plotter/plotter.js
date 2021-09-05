import cytoscape from "cytoscape";

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

var elements={
	nodes:[
		{ // node a
			data: { id: '0' }
		},
		{ // node b
			data: { id: '1' }
		},
	],
	edges:[
		{ // edge ab
			data: { id: '0-1', source: '0', target: '1', label:'a' }
		}
	]
} // list of graph elements to start with
			
function init() {
	let cy = cytoscape({
 		container: document.getElementById('ploter'), // container to render in
		elements,
		style,
		layout: {
			name: 'grid',
			rows: 1
		}
	});
}

const Plotter={init}
export default Plotter;