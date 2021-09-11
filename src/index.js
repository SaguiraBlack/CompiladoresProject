import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore} from 'redux';
import reducers from './reducers';
import { Provider } from 'react-redux';

let store = createStore(reducers.counter);

const increment = ()=>{
  return{
    type:'INCREMENT',
  }
}
/*const decrement = ()=>{
  return{
    type:'DECREMENT',
  }
}*/
store.dispatch(increment());
store.dispatch(increment());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
