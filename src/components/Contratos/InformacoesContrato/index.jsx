import React, { Component } from "react";
import { Form, Row, Col, FormGroup, Label } from "reactstrap";
import { InputText } from "primereact/inputtext";
import { SelecionaTipoServico } from "../SelecionaTipoServico";
import { SelecionaSituacaoContrato } from "../SelecionaSituacaoContrato";

export default class InformacoesContrato extends Component {
  state = {
    termoContrato: "",
    tipoServico: 1,
    numeroProcesso: "",
    situacao: "Ativo",
    edital: "",
    estadoContrato: "EMERGENCIAL",
    dataAssinatura: "",
    dataOrdemInicio: "",
    vigencia: "",
    dataEncerramento: ""
  };

  handleSubmit = values => {
    console.log(values);
  };

  render() {
    const { termoContrato, numeroProcesso } = this.state;
    const { handleSubmit } = this.props;
    return (
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={4} xl={4}>
            <FormGroup>
              <Label form="termoContrato">Número Termo de Contrato</Label>
              <InputText
                id="termoContrato"
                value={termoContrato}
                onChange={e => this.setState({ termoContrato: e.target.value })}
                placeholder={'Ex: 001/002'}
                className='w-100'
              />
            </FormGroup>
          </Col>
          <Col xs={12} sm={12} md={12} lg={8} xl={8}>
          <Label form="tipoServico">Tipo de Serviço</Label>
          <br />
          <SelecionaTipoServico id='tipoServico' className='w-100' />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={4} xl={4}>
            <FormGroup>
              <Label form="numeroProcesso">Número de Processo</Label>
              <InputText
                id="numeroProcesso"
                value={numeroProcesso}
                onChange={e => this.setState({ numeroProcesso: e.target.value })}
                placeholder={'Ex: 0000.2019/0000000-0'}
                className='w-100'
              />
            </FormGroup>
          </Col>
          <Col xs={12} sm={12} md={12} lg={8} xl={8}>
          <Label form="situacaoContrato">Situação de Contrato</Label>
          <br />
          <SelecionaSituacaoContrato id='situacaoContrato' className='w-100' />
          </Col>
        </Row>
      </Form>
    );
  }
}
