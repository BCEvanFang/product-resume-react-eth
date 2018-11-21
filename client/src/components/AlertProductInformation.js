import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default class AlertProductInformation extends Component {
  render() {
    return (
      <div className="alert alert-success" role="alert">
        <h5>
          <FontAwesomeIcon icon={faCheck} />
          &nbsp; Product is on chain!
        </h5>
        <div>
          Id: {this.props.product.id}
        </div>
        <div>
          Name: {this.props.product.name}
        </div>
        <div>
          Information: {this.props.product.info}
        </div>
      </div>
    );
  }
}
