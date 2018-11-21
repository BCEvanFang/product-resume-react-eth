import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Query from "./Query";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter, Route } from "react-router-dom";

// ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/query" component={Query} />
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);

registerServiceWorker();
