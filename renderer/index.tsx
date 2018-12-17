// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { App } from "./app/app";
import "./index.scss";
import { initializeStores } from "./stores/stores";

(async () => {
  await initializeStores();

  ReactDOM.render(<HashRouter>
    <App />
  </HashRouter>, document.getElementById("app"));
})();
