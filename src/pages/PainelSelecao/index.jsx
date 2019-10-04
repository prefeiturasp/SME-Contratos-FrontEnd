import React from "react";
import Page from "../../components/Page";
import CardSection from "../../components/CardSection";
import IconeEquipamento from "../../assets/images/icon-equipamento.svg";
import IconeServico from "../../assets/images/icon-servicos.svg";
import IconeMapa from "../../assets/images/icon-mapa.svg";
import CardEquipamento from "../../components/CardEquipamento";

const tipoEquipamento = {
  educacionais: "Unidades Educacionais",
  centros: "Centros Educacionais Unificados",
  administrativas: "Unidades Administrativas"
};

export default () => (
  <Page titulo="Painel de seleção">
    <CardSection icone={IconeEquipamento} titulo="Escolha Equipamento">
      <CardEquipamento equipamento={tipoEquipamento} />
    </CardSection>
    <CardSection icone={IconeServico} titulo="Escolha Serviço">
      {/* Importar cards de serviços */}
    </CardSection>
    <CardSection icone={IconeMapa} titulo="Mapa das DRE's">
      {/* Importar cards de serviços */}
    </CardSection>
  </Page>
);
