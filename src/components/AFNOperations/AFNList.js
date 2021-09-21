import { useState } from "react";
import AFNListItem from "./AFNListItem";

function AFNList (props){
  	const [showOpt, setShowOpt] = useState(-1);
	


	return (
	    <div className="w-full  pt-6 text-left flex-col overflow-y-auto max-h-1/2">
			<h2 className="text-blue font-semibold pl-8 pb-3 text-lg">{props.AFDList?"Mis AFD's":"Mis AFN's"}</h2>
			<div>
			{
				props.myAFNs.map((afn,i)=>{
					if (afn.afn.isAFD===props.AFDList) {
						return <AFNListItem key={i} name={afn.name} id={i} afn={afn.afn} showOpt={showOpt} setShowOpt={setShowOpt} 
							{...props}/>					
					}
					return '';
				})
			}
			</div>
	    </div>
  )
}

export default AFNList;