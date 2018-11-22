import React, { Component } from "react";

export default class ProductListTable extends Component {
  state = {
    //
  };

  render() {

    const rows = this.props.products.map((product, index) => (
      <tr key={index}>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{product.info}</td>
        <td>{product.seq}</td>
      </tr>
    ));

    return (
      <table className="table table-bordered table-striped table-hover">
        <thead>
          <tr>
            <th>Id</th>
            <th>Product Name</th>
            <th>Product Info</th>
            <th>Product Seq No.</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}
