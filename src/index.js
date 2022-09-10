import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./global.css";
import "bootstrap/dist/css/bootstrap.css";
import reportWebVitals from "./reportWebVitals";
import { MoralisProvider } from "react-moralis";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

const appId = process.env.REACT_APP_APP_ID;
const serverUrl = process.env.REACT_APP_SERVER_URL;
// const appId = "3myjdpDbSDc5ymT3Wgn6bWPEpSRxCg2wZGdq5pRb"
// const serverUrl = "https://tm9ltqmmwggb.usemoralis.com:2053/server"

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
