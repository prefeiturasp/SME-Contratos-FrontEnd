import React, { Component } from "react";

export default class Container extends Component {
  render() {
    return (
      <div className="p-grid mt-2">
        <div className="p-col-12">
          <div className="card">{this.props.children}</div>
        </div>
      </div>
    );
  }
}
