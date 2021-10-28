import { useEffect, useState } from "react";
import AFNFactory from "../AFN/AFNFactory";
import Plotter from "../Plotter/plotter";

function AFNPreview(props){
	const [name, setName] = useState('');

	useEffect(()=>Plotter.reinit(), []);
	useEffect(()=>{
		let refAFN = props.myAFNs[props.previewIndex];
		if (props.previewIndex!==-1 && refAFN!=null ) {
			setName(refAFN.name);
			const AFN = AFNFactory.copyAFN(refAFN.afn);
    		Plotter.renderAFN(AFN, 'plotterPreview');
		}
	}, [props])

	return (
		<div className= {`w-3/6 h-4/6 fixed bg-white z-10 inset-0 m-auto p-5 pl-8 font-normal 
						border-2 border-gray-middle rounded-lg shadow-lg ${ (props.selectedGraph || props.previewIndex!==-1)?'flex-col':'hidden'}`} >
			<h2 className="text-blue font-semibold text-center pb-3 text-xl">{name}</h2>
			<div id="plotterPreview" className="w-100 h-full p-16" />
		</div>
	)
}

export default AFNPreview;