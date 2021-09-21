import { Icon } from '@iconify/react';

function AFNListItem (props){

  function onHover(){
    if (props.id!==props.previewIndex) {
      props.setPreviewIndex(props.id)
    }
  }

  function onMouseOut(e){
    if(!e.relatedTarget?.classList.contains('AFNListItem')){
      props.setPreviewIndex(-1);
    }
  }

  function removeAFN() {
    props.setShowOpt(-1);
    props.removeAFN(props.id)
    if (props.myAFNs.length<=1) {
      props.setPreviewIndex(-1)
    }
  }

  function toggle(e) {
    if (props.showOpt===props.id) {
      props.setShowOpt(-1);
    }else{
      props.setShowOpt(props.id); 
    }
  }

  return (
    <div className="w-full hover:bg-gray-middle p-3 pl-8 relative font-normal border-t-2 border-gray-middle flex AFNListItem" 
          onMouseOver={()=>onHover()} 
          onMouseOut={(e)=>onMouseOut(e)}>
      <label className="w-full m-auto AFNListItem">{props.name}</label>
      <div className="flex AFNListItem">
        <Icon icon="carbon:overflow-menu-vertical" width="25" className="m-auto AFNListItem" 
              onClick={toggle} />
      </div>
      <div className={` ${props.showOpt===props.id?'block':'hidden'} absolute right-3 -top-6 rounded-lg border-2 border-gray bg-gray-light p-1`}>
        <div className="flex space-x-3 p-1">
          <Icon icon="carbon:delete" width="25" className="m-auto AFNListItem" onClick={()=>removeAFN()}/>
          <Icon icon="carbon:document-export" width="25" className="m-auto AFNListItem" onClick={()=>props.exportFile(props.id)}/>
			  </div>
			</div>
    </div>
  )
}

export default AFNListItem;