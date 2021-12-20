import React from 'react';
import Navbar from './components/navbar';
import {BrowserRouter} from 'react-router-dom';
import Routes from './Routes';
import Footer from './components/Footer';
import AFNContext from './context/AFNContext';
import useProviderAFNs from './context/useProviderAFNs';
import CreateAFNs from './context/CreateAFNs';

function App (){


  return (
    <AFNContext.Provider value={useProviderAFNs()}>
      <CreateAFNs />
      <BrowserRouter>
        <div className="font-Montserrat ">
          <Navbar/>
          <Routes/>
          <Footer/>
        </div>
      </BrowserRouter>
    </AFNContext.Provider>
  )
}


export default App;
