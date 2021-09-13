import AFNFactory from '../../AFN/AFNFactory';
import React, { useEffect} from 'react';
import Plotter from '../../Plotter/plotter';
import {useSelector, useDispatch} from 'react-redux';
import {decrement, incrementByAmount} from '../../app/slices/counterSlice';
import { addAFN } from '../../app/slices/AFNSlice';
import AFNList from './AFNList';

function AFNOperations (){
  const dispatch = useDispatch();
  const counter = useSelector(state=>  state.counter.value);
  const AFNlist = useSelector(state=>  state.AFNlist.value);

  useEffect(()=>{
    const afn1 = AFNFactory.createBasicAFN('a');
    const afn2 = AFNFactory.createBasicAFN('b');
    const joinAFN = AFNFactory.joinAFN(afn1, afn1);
    const joinAFN3 = AFNFactory.joinAFN(joinAFN, joinAFN);
    const optionalAFN1 = AFNFactory.optional(joinAFN3);
    dispatch(addAFN({
      name: 'AFN a',
      afn: JSON.stringify(afn1)
    }));
    dispatch(addAFN({
      name: 'AFN b',
      afn: JSON.stringify(afn2)
    }));
    dispatch(addAFN({
      name: 'AFN join a-a',
      afn: JSON.stringify(joinAFN)
    }));
    Plotter.renderAFN(optionalAFN1, 'ploter');
    //Plotter.renderAFN(joinAFN, 'ploter');
    //Plotter.renderAFN(joinAFN2, 'ploter2');
    //Plotter.renderAFN(joinAFN3, 'ploter3');
  }, []);

  function generateAFN() {
    const afn1 = AFNFactory.createBasicAFN('a');
    dispatch(addAFN({
      name: 'default',
      afn: afn1
    }))
  }

  return (
    <div className="flex">
      <div className="bg-white h-screen w-4/5">
        {counter}
        <button className="bg-blue text-white p-2 m-1 hover:bg-gray" onClick={()=> dispatch(incrementByAmount(5))} >+ </button>
        <button className="bg-blue text-white p-2 m-1 hover:bg-gray" onClick={()=> dispatch(decrement())}>- </button>
        <button className="bg-blue text-white p-2 m-1 hover:bg-gray" onClick={generateAFN}>Generate AFN</button>
        <div id="ploter" className="w-100 h-96 p-16"></div>
        <div id="ploter2" className="w-100 h-96 p-16"></div>
        <div id="ploter3" className="w-100 h-96 p-16"></div>
        <pre className="text-left">{JSON.stringify(AFNlist, null, 2)}</pre>
      </div>
        <AFNList />
    </div>
  )
}

export default AFNOperations;
