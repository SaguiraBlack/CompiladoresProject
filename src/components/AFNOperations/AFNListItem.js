import { Icon } from '@iconify/react';

function AFNListItem (props){
  
  function onHover(){
    if (props.id!==props.previewIndex) {
      props.setPreviewIndex(props.id)
    }
  }

  function onMouseOut(e){
    if(!e.relatedTarget?.classList.contains('AFNListItem')){
      console.log('out');
      props.setPreviewIndex(-1);
    }
  }

  function removeAFN() {
    props.removeAFN(props.id)
    if (props.myAFNs.length<=1) {
      props.setPreviewIndex(-1)
    }
  }

  return (
    <div className="w-full hover:bg-gray-middle p-3 pl-8 font-normal border-t-2 border-gray-middle flex AFNListItem" 
          onMouseOver={()=>onHover()} 
          onMouseOut={(e)=>onMouseOut(e)}>
      <label className="w-full m-auto AFNListItem">{props.name}</label>
      <div className="flex AFNListItem">
        <Icon icon="carbon:overflow-menu-vertical" width="25" className="m-auto AFNListItem" onClick={()=>removeAFN()}/>
      </div>
    </div>
  )
}

export default AFNListItem;