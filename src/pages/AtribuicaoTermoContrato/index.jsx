import React, { Component } from "react";
import { Messages } from "primereact/messages";
import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";
import AtribuirTermoContrato from "../../components/Contratos/AtribuirTermoContrato";
import ListarTermoContrato from "../../components/Contratos/ListarTermoContrato";

export default class AtribuicaoTermoContrato extends Component {
  constructor() {
    super();
    this.mensagemSucessoEdicao = this.mensagemSucessoEdicao.bind(this);
  }

  mensagemSucessoEdicao() {
    window.scrollTo(0, 0);
    this.messages.show({
      severity: "success",
      life: 5000,
      detail: "Alterações realizadas com sucesso"
    });
  }

  render() {
    return (
      <Page>
        <Messages ref={el => (this.messages = el)}></Messages>
        <h4>Atribuir Termo de Contrato</h4>
        <Container>
          <Container
            subtitulo="Atribuir Termo de Contrato"
            icone="pi pi-pencil"
          >
            <AtribuirTermoContrato />
          </Container>
          <Container>
            <ListarTermoContrato
              mensagemSucessoEdicao={this.mensagemSucessoEdicao}
            />
          </Container>
        </Container>
      </Page>
    );
  }
}
