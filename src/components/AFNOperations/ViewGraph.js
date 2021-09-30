import React, { useEffect, useState } from "react";
import AFNFactory from '../../AFN/AFNFactory';
import Plotter from "../../Plotter/plotter";

function ViewGraph(props){
	const [name, setName] = useState('');

	//useEffect(()=>Plotter.reinitView(), []);
	useEffect(()=>{
		let refAFN = props.myAFNs[props.selectedGraph];
		if (props.selectedGraph!==-1 && refAFN!=null ) {
			setName(refAFN.name);
			const AFN = AFNFactory.copyAFN(refAFN.afn);
    		Plotter.renderAFNView(AFN, 'plotterView');
		}
	}, [props])

	return (
		<div className= {`w-3/6 h-4/6 fixed bg-white inset-0 m-auto p-5 pl-8 font-normal ${props.previewIndex!==-1?'flex-col':'hidden'}`} >
			<h2 className="text-blue font-semibold text-center pb-3 text-xl">{name}</h2>
			<div id="plotterView" className="w-100 h-full p-16" />
		</div>
	)
}

export default ViewGraph;