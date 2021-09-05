import logo from './logo.svg';
import './App.css';
import AFNFactory from './AFN/AFNFactory';
import Plotter from './Plotter/plotter';
import React from 'react';

class App extends React.Component{
  constructor(props){
  super(props);
  const afn1 = AFNFactory.createBasicAFN('a');
  const afn2 = AFNFactory.createBasicAFN('b');
  const joinAFN = AFNFactory.joinAFN(afn1, afn2);
  console.log(joinAFN);
  }

  componentDidMount(){
    Plotter.init();
  }

  render(){
  return (
    <div className="App">
      <div id="ploter">
      </div>
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
