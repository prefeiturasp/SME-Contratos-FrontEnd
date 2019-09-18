import React, { Component } from "react";

export default class Row extends Component {

    
    setClasses(classe){
        let klasse = 'row '
        if(classe) klasse += classe
        return klasse
    }

  render() {
    return (
      <div className={this.setClasses(this.props.classe)}>{this.props.children}</div>
    );
  }
}
