import logo from './logo.svg';
import './App.css';
import AFNFactory from './AFN/AFNFactory';
import Plotter from './Plotter/plotter';
import React from 'react';
import Navbar from './components/navbar';
import AFN from './AFN/AFN';

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
    const joinAFN = AFNFactory.joinAFN(afn1, afn2);
    const joinAFN2 = AFNFactory.joinAFN(afn3, afn4);
    const joinAFN3 = AFNFactory.joinAFN(joinAFN, joinAFN2);
    //const joinAFN3 = AFNFactory.joinAFN(joinAFN2, afn4);
    console.log(joinAFN3);
    Plotter.renderAFN(joinAFN3, 'ploter');
    //Plotter.renderAFN(joinAFN2, 'ploter2');
    //Plotter.renderAFN(joinAFN3, 'ploter3');
  }

  render(){
  return (
    <div className="App">
      <Navbar/>
      <div id="ploter" className="w-100 h-96 p-16"></div>
      <div id="ploter2" className="w-100 h-96 p-16"></div>
      <div id="ploter3" className="w-100 h-96 p-16"></div>
      <pre>{JSON.stringify(this.state.afn, null, 2)}</pre>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
  }
}

export default App;
