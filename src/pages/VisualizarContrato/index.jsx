import React, { Component } from "react";
import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";
import CardSuperior from "./CardSuperior";
import CoadAccordion from '../../components/Global/CoadAccordion'

export default class VisualizarContratos extends Component {
  render() {
    return (
      <Page titulo="Termo de Contrato n. 000001111 - Empresa">
        <CardSuperior
          tipoServico={"Limpeza"}
          situacaoContratual={"Excepcionalidade"}
          estadoContrato={"Ativo"}
          totalmensal={"1334755.0"}
          dataEncerramento={"2019-10-31"}
        />
        <Container
          icone="fas fa-file-signature"
          subtitulo="Visualizar/Alterar contrato"
        >
          <h1>Teste</h1>
          <CoadAccordion titulo={'Informações Contrato'}>
          Anim pariatur cliche reprehenderit,
           enim eiusmod high life accusamus terry richardson ad squid. Nihil
           anim keffiyeh helvetica, craft beer labore wes anderson cred
           nesciunt sapiente ea proident.
          </CoadAccordion>
        </Container>
      </Page>
    );
  }
}
