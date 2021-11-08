import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ToastStore from './store/toast.store';
import LoadingSpinnerStore from './store/loading-spinner.store';
import { Provider } from 'mobx-react';
import { BrowserRouter } from "react-router-dom";

const toastStore = new ToastStore();
const loadingSpinnerStore = new LoadingSpinnerStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider 
      toastStore={toastStore} 
      loadingSpinnerStore={loadingSpinnerStore}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
