import AFNListItem from "./AFNListItem";

function AFNList (props){
	return (
	    <div className="w-1/5 bg-gray-light pt-6  text-left flex-col">
			<h2 className="text-blue font-semibold pl-8 pb-3 text-lg">Mis AFN's</h2>
			<div>
			{
				props.myAFNs.map((afn,i)=>{
					return <AFNListItem key={i} name={afn.name} id={i} afn={afn.afn} 
							{...props}/>
				})
			}
			</div>
	    </div>
  )
}

export default AFNList;