import React, { Component } from "react";
import Page from "../../components/Page";
import { validarPrimeiroAcesso } from "../../services/auth.service";

export default class Home extends Component {

  componentDidMount() {
    validarPrimeiroAcesso();
  }

  render() {
    return (
      <Page>
        <h1>Bem vindo ao COAD</h1>
      </Page>
    );
  }
}
