import { useEffect } from "react";
import { useSelector } from "react-redux";
import AFNListItem from "./AFNListItem";

function AFNList (){
  	const AFNlist = useSelector(state=>  state.AFNlist.value);
	useEffect(()=>{
		if (AFNlist.length>0) {
			let afn1 = JSON.parse(AFNlist[0].afn);
			//console.log(afn1);
		}
	})

	return (
	    <div className="w-1/5 bg-gray-light pt-6  text-left flex-col">
			<h2 className="text-blue font-semibold pl-8 pb-3 text-lg">Mis AFN's</h2>
			<div>
			{
				AFNlist.map((afn,i)=>{
					return <AFNListItem key={i} name={afn.name}/>
				})
			}
			</div>
	    </div>
  )
}

export default AFNList;