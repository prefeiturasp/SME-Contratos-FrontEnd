import React, { Component } from "react";
import Page from "../../components/Page";
import CardSection from "../../components/CardSection";
import IconeEquipamento from "../../assets/images/icon-equipamento.svg";
import IconeServico from "../../assets/images/icon-servicos.svg";
import IconeMapa from "../../assets/images/icon-mapa.svg";
import CardEquipamento from "../../components/CardEquipamento";
import CardServico from "../../components/CardServico";


class PainelSelecao extends Component {
  render() {
    return (
      <Page titulo="Painel de seleção">
        <CardSection icone={IconeEquipamento} titulo="Escolha Equipamento">
          <CardEquipamento />
        </CardSection>
        <CardSection icone={IconeServico} titulo="Escolha Serviço">
          <CardServico />
        </CardSection>
        <CardSection icone={IconeMapa} titulo="Mapa das DRE's">
          {/* Importar cards de serviços */}
        </CardSection>
      </Page>
    );
  }
}

export default PainelSelecao;
