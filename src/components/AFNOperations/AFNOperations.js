import React from 'react';
import AllAFN from '../AllAFN';
import AFNListOperations from './AFNListOperations';
import Routes from './Routes';
import { useRouteMatch } from 'react-router';
import useAFNs from '../../context/useAFNs';

function AFNOperations (){
  const [myAFNs, setMyAFNs] = useAFNs();

  let { path, url } = useRouteMatch();

  function pushAFN(name, afn) {
    setMyAFNs( arr=>[...arr, {name, afn}]);
  }

  return (
    <div className="flex pt-16 h-screen">
      <AFNListOperations url={url}/>
      <div className="bg-white w-3/5">
        <h1 className="text-gray text-center font-bold text-4xl p-6">
          Creador de AFN's
        </h1>
        <Routes PATH={path} pushAFN={pushAFN} myAFNs={myAFNs} />
      </div>
      <AllAFN />
    </div>
  )
}

export default AFNOperations;
