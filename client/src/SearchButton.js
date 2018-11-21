import React, { Component } from "react";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

library.add(faSearch);

export default class SearchButton extends Component {
  render() {
    return (
      <button className="btn btn-primary" onClick={this.props.onClick}>
        <FontAwesomeIcon icon="search" />
        &nbsp; Search
      </button>
    );
  }
}
