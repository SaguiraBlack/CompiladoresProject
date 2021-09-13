import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AFNFactory from "../AFN/AFNFactory";
import Plotter from "../Plotter/plotter";

function AFNPreview (){
	const [name, setName] = useState('');
	const AFNlist = useSelector(state=>  state.AFNlist.value);
	const AFNPreviewIndex = useSelector(state=>  state.AFNPreview.index);
	const showPreview = useSelector(state=>  state.AFNPreview.show);

	useEffect(()=>{
		let refAFN = AFNlist[AFNPreviewIndex];
		if (AFNPreviewIndex!==-1 && refAFN!=null ) {
			setName(refAFN.name);
			const AFN = AFNFactory.copyAFN(JSON.parse(refAFN.afn));
    		Plotter.renderAFN(AFN, 'plotterPreview');
		}
	}, [AFNPreviewIndex, AFNlist])

	return (
		<div className= {`w-3/6 h-4/6 fixed bg-white z-10 inset-0 m-auto p-5 pl-8 font-normal 
						border-2 border-gray-middle rounded-lg shadow-lg ${showPreview?'flex-col':'hidden'}`} >
			<h2 className="text-blue font-semibold text-center pb-3 text-xl">{name}</h2>
			<div id="plotterPreview" className="w-100 h-full p-16" />
		</div>
	)
}

export default AFNPreview;