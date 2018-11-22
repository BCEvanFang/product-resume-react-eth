import React, { Component } from "react";
import { Link } from 'react-router-dom'

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
        <td>
          <Link to={"/edit/" + product.seq}>Edit</Link>
        </td>
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
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}
