import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { changeIndex, hidePreview, showPreview } from '../../app/slices/AFNPreviewSlice';
import { deleteAFN } from '../../app/slices/AFNSlice';

function AFNListItem (props){
	const AFNPreviewIndex = useSelector(state=>  state.AFNPreview.index);
	const AFNListLength = useSelector(state=>  state.AFNlist.value.length);
  const dispatch = useDispatch();
  
  function onHover(){
    if (props.id!==AFNPreviewIndex) {
      dispatch(showPreview());
      dispatch(changeIndex(props.id));
    }
  }

  function onMouseOut(e){
    if(!e.relatedTarget?.classList.contains('AFNListItem')){
      console.log('out');
      dispatch(hidePreview());
    }
  }

  function removeAFN() {
    dispatch(deleteAFN(props.id));
    if (AFNListLength<=1) {
      dispatch(hidePreview());
    }
  }

  return (
    <div className="w-full hover:bg-gray-middle p-3 pl-8 font-normal border-t-2 border-gray-middle flex AFNListItem" onMouseOver={()=>onHover()} onMouseOut={(e)=>onMouseOut(e)}>
      <label className="w-full m-auto AFNListItem">{props.name}</label>
      {/*AFNPreviewIndex*/}
      <div className="flex AFNListItem">
        <Icon icon="carbon:overflow-menu-vertical" width="25" className="m-auto AFNListItem" onClick={()=>removeAFN()}/>
      </div>
    </div>
  )
}

export default AFNListItem;