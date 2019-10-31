import React from "react";
import { FormGroup, Label, Row, Col } from "reactstrap";
import { InputText } from "primereact/inputtext";

const InformacoesOrcamentaria = props => {
  const { dotacao, valorMensal, valorTotal} = props;
  return (
    <Row>
      <Col lg={8} xl={8}>
        <Row>
          <Col>
            <FormGroup>
              <Label>Dotação Orçamentária</Label>
              <InputText
                value={dotacao}
                placeholder={"Digite nome da empresa"}
                className="w-100"
              />
              <button className="btn bt-link font-weight-bold coad-color">Adicionar Dotação</button>
            </FormGroup>
          </Col>
        </Row>
      </Col>
      <Col lg={4} xl={4}>
        <Row>
          <Col>
            <FormGroup>
              <Label>Valor mensal do Contrato</Label>
              <InputText
                value={valorMensal}
                placeholder={"R$"}
                className="w-100"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label>Valor total do Contrato</Label>
              <InputText
                value={valorTotal}
                placeholder={"R$"}
                className="w-100"
              />
            </FormGroup>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default InformacoesOrcamentaria;