import AFNFactory from '../../AFN/AFNFactory';
import React, { useEffect, useState} from 'react';
import AFNList from './AFNList';
import AFNPreview from '../AFNPreview';
import AFNListOperations from './AFNListOperations';
import Routes from './Routes';
import { useRouteMatch } from 'react-router';

function AFNOperations (){
  const [myAFNs, setMyAFNs] = useState([]);
  const [previewIndex, setPreviewIndex] = useState(-1);
  let { path, url } = useRouteMatch();

  useEffect(()=>{
    const afn1 = AFNFactory.createBasicAFN('a');
    const afn2 = AFNFactory.createBasicAFN('b');
    const joinAFN = AFNFactory.joinAFN(afn1, afn2);
    const closureAFN = AFNFactory.closurePlus(afn1);
    pushAFN('afn a', afn1);
    pushAFN('afn b', afn2);
    pushAFN('join a-b', joinAFN);
    pushAFN('closure a', closureAFN);

  }, []);

  function pushAFN(name, afn) {
    setMyAFNs( arr=>[...arr, {name, afn}]);
  }
  function removeAFN(index) {
    setMyAFNs( arr=>arr.filter((item, i) => i!==index));
  }

  return (
    <div className="flex pt-16 h-screen">
      <AFNPreview myAFNs={myAFNs} previewIndex={previewIndex} />
      <AFNListOperations url={url}/>
      <div className="bg-white w-3/5">
        <h1 className="text-gray text-center font-bold text-4xl p-6">
          Creador de AFN's
        </h1>
        <Routes PATH={path} pushAFN={pushAFN} myAFNs={myAFNs} />
      </div>
      <div className="flex-col w-1/5 h-full bg-gray-light">
        <AFNList myAFNs={myAFNs} removeAFN={removeAFN} setPreviewIndex={(i)=>setPreviewIndex(i)} previewIndex={previewIndex} AFDList={false}/>
        <AFNList myAFNs={myAFNs} removeAFN={removeAFN} setPreviewIndex={(i)=>setPreviewIndex(i)} previewIndex={previewIndex} AFDList={true}/>
      </div>
    </div>
  )
}

export default AFNOperations;
