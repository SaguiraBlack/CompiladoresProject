import cytoscape from "cytoscape";
import cola from 'cytoscape-cola';

cytoscape.use( cola );
var cy=null;
var style=[ // the stylesheet for the graph
			{
			selector: 'node',
			style: {
				'background-color': '#F2F2F2',
				'color':'#222222',
				'label': 'data(id)',
				'text-valign':'center',
				"border-color": '#BBBBBB',
				"border-width": '1'
			}
			},
			{
			selector: 'edge',
			style: {
				'width': 1,
				'line-color': '#BBBBBB',
				'target-arrow-color': '#BBBBBB',
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
			{
			selector: ".symbol",
			style: {
				"color": '#222222'
			}
			},
			{
			selector: ".accept",
			style: {
				"border-color": '#1169A3',
				"border-width": '3'
			}
			},
		];

function init(elements, containerId) {
	elements.nodes[0].lock=true
	elements.nodes[0].position={
		x:100,
		y:100
	}
	if (cy===null) {
		cy = cytoscape({
			container: document.getElementById(containerId), // container to render in
			elements,
			style,
			layout:{
				name: "cose",
				randomize: false,
				grid: true,
				avoidOverlap: true,
				avoidOverlapPadding:1,
				roots: ''
			}
		});	
	}else{
        cy.json({elements, style});
		cy.layout({
				name: "cose",
				randomize: false,
				grid: true,
				avoidOverlap: true,
				avoidOverlapPadding:1,
				roots: ''
			}).run();
	}
}

function renderAFN(afn, containerId) {
	init(afn.getNodesAndEdges(), containerId);
}
const Plotter={init, renderAFN}
export default Plotter;