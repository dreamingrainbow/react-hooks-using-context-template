/**
 * Copyright M.A.D. Computer Consulting LLC 2019
 * Example Create-React-App -- ReactJs Hooks using Context
 * @fileOverview index.js Load ReactJS, and The Application Context Provider.
 * @author Michael A. Dennis <michaeladennis@yahoo.com>
 * @version 0.0.1
 */
import React from "react";
import ReactDOM from "react-dom";
import AppProvider from "./AppProvider";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
