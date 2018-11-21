import React, { Component } from "react";
import AlertSuccessMessage from "./components/AlertSuccessMessage";

import ProductResumeContract from "./contracts/ProductResume.json";
import getWeb3 from "./utils/getWeb3";
import truffleContract from "truffle-contract";

export default class AddProduct extends Component {
  state = {
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
    //
    productId: "",
    productName: "",
    productInfo: "",
    //
    addSuccess: false
  };

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const Contract = truffleContract(ProductResumeContract);
      Contract.setProvider(web3.currentProvider);
      const instance = await Contract.deployed();
      this.setState({ web3, accounts, contract: instance });
      console.log("eth is ready");
      console.log(this.state.contract);
    } catch (error) {
      alert(
        "Failed to load web3, accounts, or contract. Check console for details."
      );
      console.log(error);
    }
  };

  handleAdd = async () => {
    this.setState({ addSuccess: false });

    const { accounts, contract } = this.state;
    const { productId, productName, productInfo } = this.state;

    try {

      let result = await contract.addProduct(
        productId,
        productName,
        productInfo,
        { from: accounts[0] }
      );

      this.setState({ addSuccess: true });

      console.log(result);

    } catch (error) {
      console.error(error);
      alert("Add faile");
    }
  };

  handleChangeId = event => {
    this.setState({ productId: event.target.value });
  };

  handleChangeName = event => {
    this.setState({ productName: event.target.value });
  };

  handleChangeInfo = event => {
    this.setState({ productInfo: event.target.value });
  };

  render() {
    return (
      <div className="container">
        <h1>Add Product</h1>
        <hr />
        Product Id:
        <input
          type="text"
          className="form-control"
          value={this.state.productId}
          onChange={this.handleChangeId}
        />
        <br />
        Product Name:
        <input
          type="text"
          className="form-control"
          value={this.state.productName}
          onChange={this.handleChangeName}
        />
        <br />
        Product Info:
        <input
          type="text"
          className="form-control"
          value={this.state.productInfo}
          onChange={this.handleChangeInfo}
        />
        <br />
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.handleAdd}
        >
          Add Product
        </button>
        <br />
        <br />
        <div style={{display: this.state.addSuccess ? "block" : "none"}}>
          <AlertSuccessMessage msg="Add success!" />
        </div>
      </div>
    );
  }
}
