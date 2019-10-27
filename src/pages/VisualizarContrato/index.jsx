import React, { Component } from "react";
import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";
import CardSuperior from './CardSuperior'

export default class VisualizarContratos extends Component {
  render() {
    return (
      <Page titulo="Termo de Contrato n. 000001111 - Empresa">
        <CardSuperior 
          tipoServico={'Limpeza'} 
          situacaoContratual={'Excepcionalidade'} 
          estadoContrato={'Ativo'} 
          totalmensal={'1334755.0'} 
          dataEncerramento={'2019-10-31'}        
        />
        <Container
          icone="pi pi-chart-bar"
          subtitulo="Visualizar / Alterar contrato"
        >
          <h1>Teste</h1>
        </Container>
      </Page>
    );
  }
}
