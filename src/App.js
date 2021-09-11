import './App.css';
import AFNFactory from './AFN/AFNFactory';
import Plotter from './Plotter/plotter';
import React, { useEffect, useState } from 'react';
import Navbar from './components/navbar';
import Index from './components';
import {useSelector} from 'react-redux';

function App (){
  const [AFN, setAFN] = useState({});

  const counter = useSelector(state=>  state);

  useEffect(()=>{
    const afn1 = AFNFactory.createBasicAFN('a');
    const afn2 = AFNFactory.createBasicAFN('b');

    const joinAFN = AFNFactory.joinAFN(afn1, afn1);
    const joinAFN2 = AFNFactory.joinAFN(afn2, afn2);
    const joinAFN3 = AFNFactory.joinAFN(joinAFN, joinAFN);

    console.log(joinAFN);
    Plotter.renderAFN(joinAFN, 'ploter');
    Plotter.renderAFN(joinAFN2, 'ploter2');
    Plotter.renderAFN(joinAFN3, 'ploter3');
    setAFN(joinAFN);
  }, []);

  return (
    <div className="App">
      <Navbar/>
      <button className="bg-blue text-white p-3 hover:bg-gray">Increment {counter}</button>
      <Index/>

      <div id="ploter" className="w-100 h-96 p-16"></div>
      <div id="ploter2" className="w-100 h-96 p-16"></div>
      <div id="ploter3" className="w-100 h-96 p-16"></div>
      <pre className="text-left">{JSON.stringify(AFN, null, 2)}</pre>
    </div>
  )
}

export default App;
