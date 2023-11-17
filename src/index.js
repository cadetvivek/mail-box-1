import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "../node_modules/react-bootstrap/dist/react-bootstrap.min.js"
import { Provider } from 'react-redux';
import Store from './Components/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Provider store={Store}>


       <App />
   </Provider>
  
);


