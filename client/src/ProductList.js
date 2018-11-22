import React, { Component } from "react";
import ProductListTable from "./components/ProductListTable";

import ProductResumeContract from "./contracts/ProductResume.json";
import getWeb3 from "./utils/getWeb3";
import truffleContract from "truffle-contract";

export default class ProductList extends Component {
  state = {
    // eth
    web3: null,
    accounts: null,
    contract: null,
    //
    count: 0, // 全部的產品數量
    products: [], // 產品清單
  };

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const Contract = truffleContract(ProductResumeContract);
      Contract.setProvider(web3.currentProvider);
      const instance = await Contract.deployed();
      this.setState({ web3, accounts, contract: instance }, this.getProductData);
      // console.log(this.state.contract);
    } catch (error) {
      alert(
        "Failed to load web3, accounts, or contract. Check console for details."
      );
      console.log(error);
    }
  };

  getProductData = async () => {
    const { contract } = this.state;

    try {
      // 取得 product 總數
      const response = await contract.getProductCount();
      const count = parseInt(response, 10);
      this.setState({count})

      if(count > 0) {
        // 依序取得所有的Product
        let list = [];

        for(let i = 0; i < count; i++) {
          let result = await contract.getProductBySeq(i);
          list.push({
            id: result._id,
            name: result._name,
            info: result._info,
            seq: parseInt(result._seq, 10),
          });
        }
        
        this.setState({products: list});
      }

    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Product List</h1>

        <hr />

        <h4>
          Total Product:{" "}
          <span className="badge badge-primary">{this.state.count}</span>
        </h4>

        <br />

        <ProductListTable products={this.state.products} />

        <table />
      </div>
    );
  }
}
