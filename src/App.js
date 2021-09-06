import logo from './logo.svg';
import './App.css';
import AFNFactory from './AFN/AFNFactory';
import Plotter from './Plotter/plotter';
import React from 'react';
import Navbar from './components/navbar';

class App extends React.Component{
  constructor(){
    super();
    this.state={
    }
  }
  componentDidMount(){
    const afn1 = AFNFactory.createBasicAFN('a');
    const afn2 = AFNFactory.createBasicAFN('b');
    this.setState({afn:afn2});
    //Plotter.renderAFN(afn2);
    const concatAFN = AFNFactory.concatAFN(afn1, afn2);
    const afn3 = AFNFactory.createBasicAFN('ultimo');
    const concatAFN2 = AFNFactory.concatAFN(concatAFN, afn3);
    const afn4 = AFNFactory.createBasicAFN('alterno');
    const joinAFN = AFNFactory.joinAFN(concatAFN2, afn4);
    Plotter.renderAFN(joinAFN);
  }

  render(){
  return (
    <div className="App">
      <Navbar/>
      <div id="ploter" className="w-100 h-screen p-16">
      </div>
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
