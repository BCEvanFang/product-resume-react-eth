import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

export default class AlertErrorMessage extends Component {
  render() {
    return (
      <h5 className="alert alert-danger" role="alert">
        <FontAwesomeIcon icon={faExclamationTriangle} />
        &nbsp; {this.props.msg}
      </h5>
    );
  }
}
