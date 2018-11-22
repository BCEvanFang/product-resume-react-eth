import React, { Component } from "react";
import AlertSuccessMessage from "./components/AlertSuccessMessage";

import ProductResumeContract from "./contracts/ProductResume.json";
import getWeb3 from "./utils/getWeb3";
import truffleContract from "truffle-contract";

export default class EditProduct extends Component {
  state = {
    web3: null,
    accounts: null,
    contract: null,
    //
    product: {
      id: "",
      name: "",
      info: ""
    },
    //
    saveSuccess: false
  };

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const Contract = truffleContract(ProductResumeContract);
      Contract.setProvider(web3.currentProvider);
      const instance = await Contract.deployed();
      this.setState(
        { web3, accounts, contract: instance },
        this.getProductData
      );
    } catch (error) {
      alert(
        "Failed to load web3, accounts, or contract. Check console for details."
      );
      console.log(error);
    }
  };

  // 取得指定seq的product
  getProductData = async () => {
    //
    const { contract } = this.state;
    //
    try {
      let seq = this.props.match.params.seq;
      const response = await contract.getProductBySeq(seq);
      this.setState({
        product: {
          id: response[0],
          name: response[1],
          info: response[2]
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  handleProductNameChange = event => {
    let p = { ...this.state.product };
    p.name = event.target.value;
    this.setState({ product: p });
  }; // end handleProductNameChange

  handleProductInfoChange = event => {
    let p = { ...this.state.product };
    p.info = event.target.value;
    this.setState({ product: p });
  }; // handleProductInfoChange

  handleSave = async () => {
    const { accounts, contract, product } = this.state;
    try {
      //
      this.setState({ saveSuccess: false });

      let result = await contract.updateProduct(
        product.id,
        product.name,
        product.info,
        { from: accounts[0] }
      );

      console.log(result);

      this.setState({ saveSuccess: true });

    } catch (error) {
      console.error(error);
    }
  }; // end handleSave

  render() {
    return (
      <div className="container">
        <h1>Edit Product</h1>
        <hr />
        <div>
          <div>
            Product Id:
            <input
              type="text"
              className="form-control"
              readOnly
              value={this.state.product.id}
            />
          </div>
          <br />

          <div>
            Product Name:
            <input
              type="text"
              className="form-control"
              value={this.state.product.name}
              onChange={this.handleProductNameChange}
            />
          </div>
          <br />

          <div>
            Product Info:
            <input
              type="text"
              className="form-control"
              value={this.state.product.info}
              onChange={this.handleProductInfoChange}
            />
          </div>
          <br />

          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleSave}
          >
            Save Product
          </button>
          <br />
          <br />
          <div style={{ display: this.state.saveSuccess ? "block" : "none" }}>
            <AlertSuccessMessage msg="Save success!" />
          </div>
        </div>
      </div>
    );
  }
}
