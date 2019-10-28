import React, { Component } from "react";
import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";
import AtribuirTermoContrato from "../../components/Contratos/AtribuirTermoContrato"

export default class AtribuicaoTermoContrato extends Component {
  render() {
    return (
      <Page titulo="Atribuir Termo de Contrato">
        <Container subtitulo="Atribuir Termo de Contrato" icone="pi pi-pencil">
            <AtribuirTermoContrato/>
        </Container>
      </Page>
    );
  }
}
