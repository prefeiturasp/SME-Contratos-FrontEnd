import React, { Component } from "react";
import { validarPrimeiroAcesso } from "../../service/auth.service";
import PainelSelecaoContratos from "../PainelSelecao";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    validarPrimeiroAcesso();
  }

  render() {
    return <PainelSelecaoContratos />;
  }
}
