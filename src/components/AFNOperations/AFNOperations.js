import AFNFactory from '../../AFN/AFNFactory';
import React, { useEffect} from 'react';
import Plotter from '../../Plotter/plotter';
import {useSelector, useDispatch} from 'react-redux';
import {decrement, incrementByAmount} from '../../app/slices/counterSlice';
import { addAFN } from '../../app/slices/AFNSlice';
import AFNList from './AFNList';
import AFNListOperations from './AFNListOperations';
import Basic from './Basic';
import Join from './Join';
import Concat from './Concat';
import ClosurePlus from './ClosurePlus';
import ClosureStar from './ClosureStar';
import Optional from './Optional';

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
    //Plotter.renderAFN(optionalAFN1, 'ploter');
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
      <AFNListOperations/>
      <div className="bg-white h-screen w-3/5">
        <h1 className="text-gray text-center font-bold text-4xl p-6">
          Creador de AFN's
        </h1>
        <Basic/>
        <Join/>
        <Concat/>
        <ClosurePlus/>
        <ClosureStar/>
        <Optional/>
      </div>
      <AFNList/>
    </div>
  )
}

export default AFNOperations;
