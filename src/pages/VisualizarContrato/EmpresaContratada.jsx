import React from "react";
import { Row, Col, FormGroup, Label, Card } from "reactstrap";
import { InputText } from "primereact/inputtext";

const EmpresaContratada = props => {
  const { nomeEmpresa, cnpj } = props;
  return (
    <Row>
      <Col lg={8} xl={8} sx={12} md={12} sm={12}>
        <Row>
          <Col>
            <FormGroup>
              <Label>CNPJ Empresa</Label>
              <InputText
                value={cnpj}
                placeholder={"Ex: 000.000.000/000-00"}
                className="w-100"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label>Nome Empresa</Label>
              <InputText
                value={nomeEmpresa}
                placeholder={"Digite nome da empresa"}
                className="w-100"
              />
            </FormGroup>
          </Col>
        </Row>
      </Col>
      <Col lg={4} xl={4} sx={12} md={12} sm={12}>
        <Card className="m-4">
          <div className="p-2">
            <strong>Mensal</strong>
            <h2>R$: 0.000,00</h2>
            <strong>Total: R$ 00.000.000,00</strong>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default EmpresaContratada;
