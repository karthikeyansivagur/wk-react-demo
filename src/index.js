import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

window.basename = window.basename || "";
// window.onhashchange = function() {
//   //code
//   console.log('Hash changed:', window.location);
//   // todo: postmessage
// }

// no history prop for BrowserRouter, ONLY for Router
console.log("basename:", window.basename);
ReactDOM.render(
  <BrowserRouter basename={window.basename}>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
// registerServiceWorker();
