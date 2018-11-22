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
      
      {/* Header */}
      <div style={{height:"40px"}}></div>

      <Route exact path="/" component={ProductList} />
      <Route path="/query" component={Query} />
      <Route path="/add" component={AddProduct} />
      <Route path="/list" component={ProductList} />
      <Route path="/edit/:seq" component={EditProduct} />

      {/* Footer */}
      <div>
        <hr style={{width:"40px"}} />
        <div style={{textAlign:"center"}}>
          <span className="text-muted">Product Resume Blockchain System</span>
        </div>
      </div>

    </div>
  </BrowserRouter>,
  document.getElementById("root")
);

registerServiceWorker();
