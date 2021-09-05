import logo from './logo.svg';
import './App.css';
import AFNFactory from './AFN/AFNFactory';

function App() {
  const afn1 = AFNFactory.createBasicAFN('a');
  const afn2 = AFNFactory.createBasicAFN('b');
  const joinAFN = AFNFactory.joinAFN(afn1, afn2);
  console.log(joinAFN);
  return (
    <div className="App">
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

export default App;
