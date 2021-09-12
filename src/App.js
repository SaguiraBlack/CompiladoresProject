import './App.css';
import React from 'react';
import Navbar from './components/navbar';

import {BrowserRouter} from 'react-router-dom';
import Routes from './Routes';

function App (){
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Routes/>
      </div>
    </BrowserRouter>
  )
}


export default App;
