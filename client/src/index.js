import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';
import { Provider } from 'react-redux';
import { store } from './store';
import dotenv from "dotenv";
dotenv.config();

//axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";
axios.defaults.baseURL = 'https://pi-recipesapp-production.up.railway.app/';
//axios.defaults.baseURL = "http://localhost:3001";

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);