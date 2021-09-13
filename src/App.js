import React from 'react';
import Navbar from './components/navbar';

import {BrowserRouter} from 'react-router-dom';
import Routes from './Routes';

function App (){
  return (
    <BrowserRouter>
      <div className="font-Montserrat">
        <Navbar/>
        <Routes/>
      </div>
    </BrowserRouter>
  )
}


export default App;
