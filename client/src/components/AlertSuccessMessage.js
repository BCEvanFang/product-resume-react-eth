import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default class AlertSuccessMessage extends Component {
  render() {
    return (
      <div className="alert alert-success" role="alert">
        <FontAwesomeIcon icon={faCheck} />
        &nbsp; {this.props.msg}
      </div>
    );
  }
}
