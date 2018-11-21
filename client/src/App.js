import React, { Component } from "react";

// import SimpleStorageContract from "./contracts/SimpleStorage.json";
import ProductResumeContract from "./contracts/ProductResume.json";
import getWeb3 from "./utils/getWeb3";
import truffleContract from "truffle-contract";

import "./App.css";

class App extends Component {
  state = {
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
    //
    productId: "",
    productName: "",
    productInfo: "",
    // 從鏈上取得的產品資訊
    pruductFromChain: {
      id: "",
      name: "",
      info: ""
    }
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const Contract = truffleContract(ProductResumeContract);
      Contract.setProvider(web3.currentProvider);
      const instance = await Contract.deployed();

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      // this.setState({ web3, accounts, contract: instance }, this.runExample);
      this.setState({ web3, accounts, contract: instance }, this.getProductFromChain);

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error);
    }
  };

  // 儲存產品資訊
  handleSave = async () => {

    const { accounts, contract } =  this.state;
    const { productId, productName, productInfo } =  this.state;

    // Get the contract version
    try {
      let result = await contract.save(productId, productName, productInfo, { from: accounts[0] });
      console.log(result)

      // 更新資料
      this.getProductFromChain();

    } catch(e) {
      console.error(e);
      alert("save failed");
    }
  }

  handleProductIdChange = (event) => {
    this.setState({productId: event.target.value});
  }

  handleProductNameChange = (event) => {
    this.setState({productName: event.target.value});
  }

  handleProductInfoChange = (event) => {
    this.setState({productInfo: event.target.value});
  }

  // 從區塊鏈上取得產品資訊
  getProductFromChain = async () => {
    const { contract } = this.state;

    // Get the value from the contract to prove it worked.
    const response = await contract.get();

    this.setState({pruductFromChain: {
      id: response[0],
      name: response[1],
      info: response[2]
    }});
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="container">
        
        <h1>
          Product Resume
        </h1>

        <form className="form">
          <div className="form-group">
            <label>Product Id</label>
            <input type="text" className="form-control mx-sm-3" value={this.state.productId} onChange={this.handleProductIdChange}/>
          </div>
          <div className="form-group">
            <label>Product Name</label>
            <input type="text" className="form-control mx-sm-3" value={this.state.productName} onChange={this.handleProductNameChange}/>
          </div>
          <div className="form-group">
            <label>Product Description</label>
            <input type="text" className="form-control mx-sm-3" value={this.state.productInfo} onChange={this.handleProductInfoChange}/>
          </div>
          
          <button type="button" className="btn btn-primary" onClick={this.handleSave}>Save Product</button>
        </form>
        
        <hr/>

        <h1>
          Product Information
        </h1>

        <div>
          Product Id: <span>{this.state.pruductFromChain.id}</span>
        </div>
        <div>
          Product Name: <span>{this.state.pruductFromChain.name}</span>
        </div>
        <div>
          Product Information: <span>{this.state.pruductFromChain.info}</span>
        </div>

        <hr/>

      </div>
    );
  }
}

export default App;
