import { Icon } from '@iconify/react';
function AFNListItem (props){
  function onClick(){
    console.log('dfas');
  }

  return (
    <div className="w-full hover:bg-gray-middle p-3 pl-8 font-normal border-t-2 border-gray-middle flex" onClick={()=>onClick()} >
      <label className="w-full m-auto">{props.name}</label>
      <div className="flex">
        <Icon icon="carbon:overflow-menu-vertical" width="25" className="m-auto"/>
      </div>
    </div>
  )
}

export default AFNListItem;