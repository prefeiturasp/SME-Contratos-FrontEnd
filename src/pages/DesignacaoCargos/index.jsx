import React, { Component } from "react";
import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";
import DesignacaoCargosCoad from "../../components/Contratos/DesignacaoCargosCoad";
import DesignacaoCargosDivisoes from "../../components/Contratos/DesignacaoCargosDivisoesENucleos"

export default class DesignacaoCargos extends Component {  
  
  render() {
    return (
      <Page titulo="Designação de Cargos">
        <Container subtitulo="Editar/Adicionar Designações de Cargos" icone="pi pi-chart-bar">
          <hr/>

              <DesignacaoCargosCoad/>

              <DesignacaoCargosDivisoes/>

        </Container>
      </Page>
    );
  }
}
