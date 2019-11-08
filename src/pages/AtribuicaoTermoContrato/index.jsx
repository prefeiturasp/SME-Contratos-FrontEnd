import React, { Component } from "react";
import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";
import AtribuirTermoContrato from "../../components/Contratos/AtribuirTermoContrato";
import ListarTermoContrato from "../../components/Contratos/ListarTermoContrato";

export default class AtribuicaoTermoContrato extends Component {
  render() {
    return (
      <Page titulo="Atribuir Termo de Contrato">
        <Container>
          <Container
            subtitulo="Atribuir Termo de Contrato"
            icone="pi pi-pencil"
          >
            <AtribuirTermoContrato />
          </Container>
          <Container>
            <ListarTermoContrato />
          </Container>
        </Container>
      </Page>
    );
  }
}
