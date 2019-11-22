import React, { Component } from "react";
import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";
import { Messages } from "primereact/messages";
import DesignacaoCargosCoad from "../../components/Contratos/DesignacaoCargosCoad";
import DesignacaoCargosDivisoes from "../../components/Contratos/DesignacaoCargosDivisoesENucleos"

export default class DesignacaoCargos extends Component {  
  
  showMessage(messageParams){
    window.scrollTo(0, 0);
    this.messages.show(messageParams);  
  }
  
  render() {
    return (
      <Page >
        <Messages ref={el => (this.messages = el)}></Messages>
        <h4>Designação de Cargos</h4>
        <Container subtitulo="Editar/Adicionar Designações de Cargos" icone="pi pi-chart-bar">
          <hr/>

              <DesignacaoCargosCoad showMessage={this.showMessage.bind(this)}/>

              <DesignacaoCargosDivisoes showMessage={this.showMessage.bind(this)}/>

        </Container>
      </Page>
    );
  }
}
