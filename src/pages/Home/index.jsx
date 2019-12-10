import React, { Component } from "react";
import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";
import { validarPrimeiroAcesso } from "../../service/auth.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
     
    };
  }

  componentDidMount() {
    validarPrimeiroAcesso();
  }
  

  render() {
    return (
      <Page titulo="Painel Princpal">
        <Container subtitulo="Painel Principal" icone="pi pi-chart-bar">
          <hr />
          <p>Aqui será o painel principal do sistema.</p>
          <br />
        </Container>
      </Page>
    );
  }
}
