import AFNFactory from '../../AFN/AFNFactory';
import React, { useEffect, useState} from 'react';
import { useDispatch} from 'react-redux';
import { addAFN } from '../../app/slices/AFNSlice';
import AFNList from './AFNList';
import AFNPreview from '../AFNPreview';
import AFNListOperations from './AFNListOperations';
import Routes from './Routes';
import { useRouteMatch } from 'react-router';

function AFNOperations (){
  const [myAFNs, setMyAFNs] = useState([]);
  const [previewIndex, setPreviewIndex] = useState(-1);
  const [showPreview, setShowPreview] = useState(false);
  let { path, url } = useRouteMatch();

  useEffect(()=>{
    const afn1 = AFNFactory.createBasicAFN('a');
    const afn2 = AFNFactory.createBasicAFN('b');
    const joinAFN = AFNFactory.joinAFN(afn1, afn1);
    const closureAFN = AFNFactory.closurePlus(joinAFN);

    pushAFN('afn a', afn1);
    pushAFN('afn b', afn2);
    pushAFN('joint a-a', joinAFN);
    pushAFN('closure a-a', closureAFN);

  }, []);

  function pushAFN(name, afn) {
    setMyAFNs( arr=>[...arr, {name, afn}]);
  }
  function removeAFN(index) {
    setMyAFNs( arr=>arr.filter((item, i) => i!==index));
  }
  return (
    <div className="flex">
      <AFNPreview myAFNs={myAFNs} previewIndex={previewIndex} />
      <AFNListOperations url={url}/>
      <div className="bg-white h-screen w-3/5">
        <h1 className="text-gray text-center font-bold text-4xl p-6">
          Creador de AFN's
        </h1>
        <Routes path={path} />
      </div>
      <AFNList myAFNs={myAFNs} removeAFN={removeAFN} setPreviewIndex={(i)=>setPreviewIndex(i)} previewIndex={previewIndex}/>
    </div>
  )
}

export default AFNOperations;
