import React, { Component } from "react";
import Container from "../../Global/Container";
import { Messages } from "primereact/messages";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { createContrato } from "../../../service/Contratos.service";

export default class AtribuirTermoContrato extends Component {
  constructor(props) {
    super(props);
    this.state = {
      termo_contrato: ""
    };
  }
  handleClickCadastratar() {
    const payLoad = {
      termo_contrato: this.state.termo_contrato
    };
    createContrato(payLoad);
    this.messages.show({
      severity: "success",
      summary: "TC: "+this.state.termo_contrato,
      detail: "Cadastrado com sucesso!"
    });
  }
  clear() {
    this.messages.clear();
  }
  render() {
    const footer = (
      <span className="float-right">
        <Button
          label="Cadastrar"
          style={{ marginRight: ".25em" }}
          onClick={this.handleClickCadastratar.bind(this)}
        />
      </span>
    );
    return (
      <Container>
        <Messages ref={el => (this.messages = el)}></Messages>
        <h6 style={{ marginLeft: 15, fontWeight: "bold" }}>
          Atribuir Novo Termo de Contrato
        </h6>
        <Card footer={footer}>
          <div className="p-grid p-fluid">
            <div className="p-col-6">
              <label for="termo_contrato">Termo de Contrato</label>
              <InputText
                value={this.state.termo_contrato}
                onChange={e =>
                  this.setState(
                    { termo_contrato: e.target.value }
                  )
                }
                placeholder="Ex.: 00/00"
              />
            </div>
          </div>
        </Card>
      </Container>
    );
  }
}
