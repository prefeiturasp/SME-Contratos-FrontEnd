import React, { Component } from "react";
import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";
import CardSuperior from "./CardSuperior";
import CoadAccordion from "../../components/Global/CoadAccordion";
import { Button, Col, Row, Form } from "reactstrap";
import InformacoesContrato from "../../components/Contratos/InformacoesContrato";

export default class VisualizarContratos extends Component {
  handleSubmit = values => {
    console.log(values);
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <Page titulo="Termo de Contrato n. 000001111 - Empresa">
        <CardSuperior
          tipoServico={"Limpeza"}
          situacaoContratual={"Excepcionalidade"}
          estadoContrato={"Ativo"}
          totalmensal={"1334755.0"}
          dataEncerramento={"2019-10-31"}
        />
        <Container>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col lg={10}>
                <h2>
                  <i className="fas fa-file-signature"></i> Visualizar/Alterar
                  contrato
                </h2>
              </Col>
              <Col lg={2}>
                <Button disabled className="btn btn-coad-primary float-right">
                  Editar
                </Button>
              </Col>
            </Row>
            <CoadAccordion titulo={"Informações Contrato"}>
              <InformacoesContrato />
            </CoadAccordion>
            <CoadAccordion titulo={"Empresa Contratada"}>
              Empresa Contratada
            </CoadAccordion>
            <CoadAccordion titulo={"Informações Orçamentárias de Contrato"}>
              Informações Orçamentárias de Contrato
            </CoadAccordion>
            <CoadAccordion titulo={"Objeto de Contrato"}>
              Objeto de Contrato
            </CoadAccordion>
            <CoadAccordion titulo={"Gestão de Contrato"}>
              Gestão de Contrato
            </CoadAccordion>
            <CoadAccordion titulo={"Observações"}>Observações</CoadAccordion>
            <CoadAccordion titulo={"Unidade Envolvidas"}>
              Unidade Envolvidas
            </CoadAccordion>
            <CoadAccordion titulo={"Anexos"}>Anexos</CoadAccordion>
            <Row>
              <Col lg={12}>
                <div className="float-right">
                  <Button className="btn-coad-background-outline mt-3 mb-2">
                    Cancelar
                  </Button>
                  <Button className="btn btn-coad-primary mt-3 ml-2 mb-2">
                    Aplicar
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Container>
      </Page>
    );
  }
}
