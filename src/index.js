import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { MoralisProvider } from "react-moralis";
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

const appId = "guDfi6eriTuFcRzsaSeExWcShE18Wjs5fA89d6hm"
const serverUrl = "https://yierjn0f1z5m.usemoralis.com:2053/server"

root.render(
  // <React.StrictMode>
  <>
    <MoralisProvider appId={appId} serverUrl={serverUrl}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MoralisProvider>
  </>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
