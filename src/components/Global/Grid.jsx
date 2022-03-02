import React, { Component } from "react";

export default class Grid extends Component {
  toCssClasses(number, classe = "") {
    const cols = number ? number.split(" ") : [];
    let classes = "";
    if (cols[0]) classes += ` col-sx-${cols[0]}`;
    if (cols[1]) classes += ` col-sm-${cols[1]}`;
    if (cols[2]) classes += ` col-md-${cols[2]}`;
    if (cols[3]) classes += ` col-lg-${cols[3]}`;
    if (cols[4]) classes += ` col-xl-${cols[4]}`;
    if (classe) classes += ` ${classe}`;

    return classes;
  }
  render() {
    const gridClasses = this.toCssClasses(
      this.props.cols || "12",
      this.props.classe,
    );
    return <div className={gridClasses}>{this.props.children}</div>;
  }
}
