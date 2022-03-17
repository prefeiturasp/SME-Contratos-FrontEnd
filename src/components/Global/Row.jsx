import React, { Component } from "react";

export default class Row extends Component {
  setClasses(classe, centered = false) {
    let klasse = "row ";
    if (classe) klasse += classe;
    if (centered) klasse += " d-flex justify-content-center";
    return klasse;
  }

  render() {
    return (
      <div
        className={this.setClasses(this.props.classe, this.props.centralizar)}
      >
        {this.props.children}
      </div>
    );
  }
}
