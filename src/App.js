import './App.css';
import AFNFactory from './AFN/AFNFactory';
import Plotter from './Plotter/plotter';
import React from 'react';
import Navbar from './components/navbar';
import Index from './components';

class App extends React.Component{
  constructor(){
    super();
    this.state={
    }
  }
  componentDidMount(){
    const afn1 = AFNFactory.createBasicAFN('a');
    const afn2 = AFNFactory.createBasicAFN('b');
    const afn3 = AFNFactory.createBasicAFN('ultimo');
    const afn4 = AFNFactory.createBasicAFN('alterno');
    const joinAFN = AFNFactory.joinAFN(afn3, afn4);
    const joinAFN2 = AFNFactory.joinAFN(afn1, afn2);
    const concatAFN = AFNFactory.concatAFN(joinAFN, joinAFN2);
    //const concatAFN = AFNFactory.concatAFN(afn1, afn2);
    //const concatAFN2 = AFNFactory.concatAFN(joinAFN, concatAFN);
    Plotter.renderAFN(joinAFN, 'ploter');
    Plotter.renderAFN(joinAFN2, 'ploter2');
    Plotter.renderAFN(concatAFN, 'ploter3');
    /*const joinAFN = AFNFactory.joinAFN(afn1, afn2);
    const joinAFN2 = AFNFactory.joinAFN(afn3, afn4);
    //const joinAFN3 = AFNFactory.joinAFN(joinAFN2, afn4);
    console.log(joinAFN3);
    Plotter.renderAFN(joinAFN3, 'ploter');
    //Plotter.renderAFN(joinAFN3, 'ploter3');*/
  }

  render(){
  return (
    <div className="App">
      <Navbar/>
      <Index/>
      <div id="ploter" className="w-100 h-96 p-16"></div>
      <div id="ploter2" className="w-100 h-96 p-16"></div>
      <div id="ploter3" className="w-100 h-96 p-16"></div>
      <pre>{JSON.stringify(this.state.afn, null, 2)}</pre>
    </div>
  );
  }
}

export default App;
