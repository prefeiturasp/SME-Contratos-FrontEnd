import React, { Component } from "react";

export default class Container extends Component {
  render() {
    return (
      <div className="p-grid mt-2 w-100">
        <div className="p-col-12">
          <div className="card">
            <h2>
              <i className={this.props.icone}></i> {this.props.subtitulo}
            </h2>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
