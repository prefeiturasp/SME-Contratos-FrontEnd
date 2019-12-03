import React, { Component } from "react";
import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";
import ListarModelosAteste from "../../components/Atestes/ListarModelosAteste";

export default class AtribuicaoTermoContrato extends Component {
  render() {
    return (
      <Page>
        <h4>Modelos de Atestes</h4>
        <Container>
          <ListarModelosAteste />
        </Container>
      </Page>
    );
  }
}