import React, { Component } from "react";
import SearchButton from "./components/SearchButton";
import AlertErrorMessage from "./components/AlertErrorMessage"
import AlertProductInformation from "./components/AlertProductInformation"

// Eth stuffs
import getWeb3 from "./utils/getWeb3";
import truffleContract from "truffle-contract";

// Contract
import ProductResumeContract from "./contracts/ProductResume.json";

class Query extends Component {

  state = {
    // Eth related
    web3: null,
    accounts: null,
    contract: null,
    //
    searchValue: "",
    // 是否有click過search button
    hasSearched: false,
    // 查詢結果
    product: {
      id: "",
      name: "",
      info: ""
    }
  }

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      
      const accounts = await web3.eth.getAccounts();

      const Contract = truffleContract(ProductResumeContract);
      
      Contract.setProvider(web3.currentProvider);
      
      const instance = await Contract.deployed();

      this.setState({ web3, accounts, contract: instance });

      console.log("Web3, account, contract, are ready");

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert("Failed to load web3, accounts, or contract. Check console for details.");

      console.error(error);
    }
  }

  handleSearchValueChange = (event) => {
    this.setState({searchValue: event.target.value});
  }

  // 查詢產品
	handleSearch = async () => {
    //
    const { contract, searchValue } =  this.state;

    this.setState({hasSearched: true});

    // Get product from blockchain
    try {

      let response = await contract.getProduct(searchValue);
      
      this.setState({product: {
        id: response[0],
        name: response[1],
        info: response[2]
      }})

    } catch (error) {
      console.error(error);
    }
  }
  // end handleSearch

  render() {
    return (
      <div className="container" style={{textAlign: "center", marginTop: "100px"}}>
        <h1>Product Query</h1>
        <div className="search-area" style={{marginTop: "30px"}}>
          <input
            className="form-control"
            type="text"
            placeholder="Product ID"
            style={{ width: "500px", display: "inline" }}
            onChange={this.handleSearchValueChange}
          />
          &nbsp;&nbsp;
          <SearchButton onClick={this.handleSearch}></SearchButton>
        </div>

        <hr/>

        <div style={{textAlign: "left"}}>
          <div style={{display: this.state.product.id === "" && this.state.hasSearched === true ? "block" : "none"}}>
            <AlertErrorMessage msg="Product not found"/>
          </div>
          <div style={{display: this.state.product.id !== "" ? "block" : "none"}}>
            <AlertProductInformation product={this.state.product}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Query;
