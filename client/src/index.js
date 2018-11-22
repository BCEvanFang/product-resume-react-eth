import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Query from "./Query";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct"
import ProductList from "./ProductList";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter, Route } from "react-router-dom";

// ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route exact path="/" component={ProductList} />
      <Route path="/query" component={Query} />
      <Route path="/add" component={AddProduct} />
      <Route path="/list" component={ProductList} />
      <Route path="/edit/:seq" component={EditProduct} />
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);

registerServiceWorker();
