import logo from './logo.svg';
import './App.css';
import AFNFactory from './AFN/AFNFactory';
import Plotter from './Plotter/plotter';
import React from 'react';
import Navbar from './components/navbar';

class App extends React.Component{

  componentDidMount(){
    const afn1 = AFNFactory.createBasicAFN('a');
    const afn2 = AFNFactory.createBasicAFN('b');
    const joinAFN = AFNFactory.joinAFN(afn1, afn2);
    Plotter.renderAFN(joinAFN);
  }

  render(){
  return (
    <div className="App">
      <Navbar/>
      <div id="ploter" className="w-100 h-80 p-16">
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
