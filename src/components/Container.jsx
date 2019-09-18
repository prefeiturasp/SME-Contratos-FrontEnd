import React, { Component } from 'react'

export default class Container extends Component {
  render() {
    return (
      <div id="wrapper">
      <div id="content-wrapper" class="d-flex flex-colum">
        <div id="content" className={this.props.classe}>{this.props.children}</div>
      </div>
    </div>
    )
  }
}

