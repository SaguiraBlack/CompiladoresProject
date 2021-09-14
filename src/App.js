import React from 'react';
import Navbar from './components/navbar';

import {BrowserRouter} from 'react-router-dom';
import Routes from './Routes';
import Footer from './components/Footer';

function App (){
  return (
    <BrowserRouter>
      <div className="font-Montserrat">
        <Navbar/>
        <Routes/>
        <Footer/>
      </div>
    </BrowserRouter>
  )
}


export default App;
