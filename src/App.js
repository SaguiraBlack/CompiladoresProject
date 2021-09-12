import './App.css';
import AFNFactory from './AFN/AFNFactory';
import Plotter from './Plotter/plotter';
import React, { useEffect} from 'react';
import Navbar from './components/navbar';
import Index from './components';
import {useSelector, useDispatch} from 'react-redux';
import {decrement, incrementByAmount} from './app/slices/counterSlice';
import { addAFN } from './app/slices/AFNSlice';

function App (){
  const dispatch = useDispatch();
  const counter = useSelector(state=>  state.counter.value);
  const AFNlist = useSelector(state=>  state.AFNlist.value);

  useEffect(()=>{
    const afn1 = AFNFactory.createBasicAFN('a');
    const afn2 = AFNFactory.createBasicAFN('b');

    const joinAFN = AFNFactory.joinAFN(afn1, afn1);
    const joinAFN2 = AFNFactory.joinAFN(afn2, afn2);
    const joinAFN3 = AFNFactory.joinAFN(joinAFN, joinAFN);
    //const closurePlusAFN1 = AFNFactory.closurePlus(joinAFN3);
    const optionalAFN1 = AFNFactory.optional(joinAFN3);

    console.log(optionalAFN1);
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
    <div className="App">
      <Navbar/>
      {counter}
      <button className="bg-blue text-white p-2 m-1 hover:bg-gray" onClick={()=> dispatch(incrementByAmount(5))} >+ </button>
      <button className="bg-blue text-white p-2 m-1 hover:bg-gray" onClick={()=> dispatch(decrement())}>- </button>
      <button className="bg-blue text-white p-2 m-1 hover:bg-gray" onClick={generateAFN}>Generate AFN</button>
      <Index/>
      <div id="ploter" className="w-100 h-96 p-16"></div>
      <div id="ploter2" className="w-100 h-96 p-16"></div>
      <div id="ploter3" className="w-100 h-96 p-16"></div>
      <pre className="text-left">{JSON.stringify(AFNlist, null, 2)}</pre>
    </div>
  )
}


export default App;
