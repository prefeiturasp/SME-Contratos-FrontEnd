import React, { useState } from "react";
import { Row, Col, FormGroup, Label, Card } from "reactstrap";
import { InputText } from "primereact/inputtext";
import { SelecionaEmpresa } from "../../components/Contratos/SelecionaEmpresa";

const EmpresaContratada = props => {
  const [empresa, setEmpresa] = useState(props.empresaContratada);
  return (
    <Row>
      <Col lg={8} xl={8} sx={12} md={12} sm={12}>
        <Row>
          <Col>
            <FormGroup>
              <Label>CNPJ Empresa</Label>
              <br />
              <SelecionaEmpresa className="p-fluid" />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label>Nome Empresa</Label>
              <InputText
                value={empresa.nome}
                placeholder={"Digite nome da empresa"}
                className="w-100"
              />
            </FormGroup>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default EmpresaContratada;
