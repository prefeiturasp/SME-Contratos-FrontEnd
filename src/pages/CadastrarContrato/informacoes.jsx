import React, { Component } from "react";
import { Row, Col, Card } from "reactstrap";
import { Field, ErrorMessage } from "formik";
import { CoadTextInput, CoadSelect } from "../../components/Contratos/CoadForm";

export default class Informacoes extends Component {
  render() {
    return (
      <>
        <Card className="card">
          <strong className="mb-3">Informações de Contrato</strong>
          <Row>
            <Col lg={4} xl={4}>
              <CoadTextInput
                label="Número Termo de Contrato"
                name="termo_contrato"
                id="termo_contrato"
                placeholder="Ex: 0000000000000"
                type="text"
              />
            </Col>
            <Col lg={8} xl={8}>
              <CoadSelect name="tipo_servico" label="Tipo de Serviço">
                <option> Selecione </option>
                <option value="1"> Opção 1 </option>
                <option value="2"> Opção 2 </option>
                <option value="3"> Opção 3 </option>
                <option value="4"> Opção 4 </option>
              </CoadSelect>
            </Col>
          </Row>
          <Row>
            <Col lg={4} xl={4}>
            <CoadTextInput
                label="Número do Processo"
                name="numero_processo"
                id="numero_processo"
                placeholder="Ex: 0000000000000"
                type="text"
              />
            </Col>
            <Col lg={8} xl={8}>
            <CoadSelect name="situacao" label="Situação de Contrato">
                <option> Selecione </option>
                <option value="1"> Opção 1 </option>
                <option value="2"> Opção 2 </option>
                <option value="3"> Opção 3 </option>
                <option value="4"> Opção 4 </option>
              </CoadSelect>
            </Col>
          </Row>
          <Row>
            <Col lg={4} xl={4}>
            <CoadTextInput
                label="Número do Edital"
                name="numero_edital"
                id="numero_edital"
                placeholder="Ex: 0000000000000"
                type="text"
              />
            </Col>
            <Col lg={8} xl={8}>
            <CoadTextInput
                label="Número do Edital"
                name="numero_edital"
                id="numero_edital"
                placeholder="Ex: 0000000000000"
                type="radio"
              />
            </Col>
          </Row>
          <hr />
          <Row>
            <Col lg={4} xl={4}></Col>
            <Col lg={8} xl={8}></Col>
          </Row>
          <Row>
            <Col lg={4} xl={4}></Col>
            <Col lg={8} xl={8}></Col>
          </Row>
        </Card>
      </>
    );
  }
}
