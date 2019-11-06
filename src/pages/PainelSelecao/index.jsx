import React, { Component } from "react";
import Page from "../../components/Global/Page";
import CardSection from "../../components/Contratos/CardSection";
import IconeEquipamento from "../../assets/images/icon-equipamento.svg";
import IconeServico from "../../assets/images/icon-servicos.svg";
import IconeMapa from "../../assets/images/icon-mapa.svg";
import CardEquipamento from "../../components/Contratos/CardEquipamento";
import CardServico from "../../components/Contratos/CardServico";
import { Button, ButtonGroup } from "reactstrap";
import { redirect } from "../../utils/redirect";

class PainelSelecao extends Component {
  render() {
    return (
      <Page titulo="Escolha visualização de painel de contratos">
        <ButtonGroup className="mb-4">
          <Button className="btn-coad-background" size="sm"><i className="pi pi-table mx-4"></i></Button>
          <Button onClick={()=> redirect('#/contratos-continuos')} className="btn-coad-background-outline" size="sm" outline><i className="pi pi-list mx-4"></i></Button>
        </ButtonGroup>

        <CardSection icone={IconeEquipamento} titulo="Escolha Equipamento">
          <CardEquipamento />
        </CardSection>
        
        <CardSection icone={IconeServico} titulo="Escolha Categoria de Serviço">
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
